"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { loadPayrollContext } from "@/lib/payroll/service"
import { calculatePayroll } from "@/lib/payroll/engine"

// Utility function to get or create a payroll period
async function getOrCreatePeriod(start: string, end: string, freq: string) {
  const supabase = await createClient();
  const { data: period } = await supabase
    .from('payroll_periods')
    .select('*')
    .eq('period_start', start)
    .eq('period_end', end)
    .eq('pay_frequency', freq)
    .single();

  if (period) return period;

  // Since we removed timesheet-actions dependency for this simplified version, create it here
  const { data: newPeriod, error } = await supabase
    .from('payroll_periods')
    .insert({
      period_start: start,
      period_end: end,
      pay_frequency: freq,
      pay_date: end // simplistic default
    })
    .select('*')
    .single();
    
  if (error) throw new Error(error.message);
  return newPeriod;
}

export async function previewPayrollRun(formData: FormData) {
  const supabase = await createClient()
  
  const start = formData.get('period_start') as string
  const end = formData.get('period_end') as string
  const freq = formData.get('pay_frequency') as string
  const payDate = formData.get('pay_date') as string

  // Validate dates
  if (new Date(start) >= new Date(end)) {
    return { error: "Start date must be before end date." }
  }
  if (new Date(payDate) < new Date(end)) {
    return { error: "Pay date must be on or after the period end date." }
  }

  // Get or Create the authoritative period ID
  let periodId: string;
  try {
    const period = await getOrCreatePeriod(start, end, freq);
    periodId = period.id;
  } catch (err: any) {
    return { error: `Failed to resolve payroll period: ${err.message}` };
  }

  // Check for duplicate runs (ignore Rejected or Cancelled)
  const { data: existingRun } = await supabase
    .from('payroll_runs')
    .select('id, status')
    .eq('payroll_period_id', periodId)
    .neq('status', 'Rejected')
    .neq('status', 'Cancelled')
    .limit(1)
    
  if (existingRun && existingRun.length > 0) {
    return { error: "An active payroll run for this exact period and frequency already exists." }
  }

  // Find active employees
  const { data: activeEmployees } = await supabase
    .from('employees')
    .select('id, first_name, last_name, employment_type')
    .eq('employment_status', 'Active')

  if (!activeEmployees || activeEmployees.length === 0) {
    return { error: "No active employees found to process." }
  }

  // Calculate payroll for each employee
  const previewResults = [];

  for (const emp of activeEmployees) {
    try {
      const context = await loadPayrollContext(emp.id, start, end, freq as any);
      const result = calculatePayroll(context);

      const activeComp = context.employee.history[0];
      const diagnostic = {
        rate_type: activeComp.rate_type,
        rate: `₱${activeComp.amount.toString()}`,
        present_days: result.present_days,
        absent_days: result.absent_days,
        holiday_days: result.holiday_days,
        paid_days: result.paid_days
      };

      let status = 'Ready';
      if (result.basic_pay.lessThanOrEqualTo(0) && result.paid_days > 0) {
        status = 'Warning: ₱0 calculated despite paid days — check compensation configuration.';
      } else if (result.paid_days === 0) {
        status = 'Warning: 0 paid days.';
      }

      previewResults.push({
        employee_id: emp.id,
        name: `${emp.first_name} ${emp.last_name}`,
        gross_pay: result.basic_pay.toNumber(),
        basic_pay: result.basic_pay.toNumber(),
        total_deductions: result.total_deductions.toNumber(),
        net_pay: result.net_pay.toNumber(),
        status,
        diagnostic,
        earnings: result.earnings.map(e => ({
          type: e.type,
          description: e.description,
          amount: e.amount.toNumber()
        })),
        deductions: result.deductions.map(d => ({
          type: d.type,
          description: d.description,
          amount: d.amount.toNumber()
        }))
      });
    } catch (err: any) {
      previewResults.push({
        employee_id: emp.id,
        name: `${emp.first_name} ${emp.last_name}`,
        gross_pay: null,
        basic_pay: null,
        total_deductions: null,
        net_pay: null,
        status: `Error: ${err.message}`,
        diagnostic: {
          error_context: `Failed to calculate payroll for ${emp.first_name} ${emp.last_name}`,
          resolution: 'Review employee configuration.'
        },
        earnings: [],
        deductions: []
      });
    }
  }

  return { success: true, preview: previewResults }
}

export async function submitPayrollRun(formData: FormData, status: 'Draft' | 'Pending Approval') {
  const supabase = await createClient()
  
  const start = formData.get('period_start') as string
  const end = formData.get('period_end') as string
  const freq = formData.get('pay_frequency') as string
  const payDate = formData.get('pay_date') as string

  // Get current user for audit
  const { data: { user } } = await supabase.auth.getUser()
  
  // 1. Get or Create Period
  let period;
  try {
    period = await getOrCreatePeriod(start, end, freq);
  } catch (err: any) {
    return { error: `Failed to resolve payroll period: ${err.message}` };
  }

  // 2. Create Run
  const { data: run, error: rErr } = await supabase
    .from('payroll_runs')
    .insert({
      payroll_period_id: period.id,
      status: status,
      created_by: user?.id
    })
    .select('id')
    .single()

  if (rErr) return { error: rErr.message }

  // 3. Log to Status History
  await supabase
    .from('payroll_status_history')
    .insert({
      payroll_run_id: run.id,
      status: status,
      changed_by: user?.id,
      reason: status === 'Draft' ? 'Initial Draft Save' : 'Submitted for Approval'
    })

  // 4. Audit Log
  await supabase
    .from('audit_logs')
    .insert({
      user_id: user?.id,
      action: status === 'Draft' ? 'PAYROLL_DRAFTED' : 'PAYROLL_SUBMITTED',
      entity_type: 'payroll_runs',
      entity_id: run.id,
      reason: `Payroll ${status} generated`
    })

  // 5. Calculate and insert payroll items
  const activeEmployees = await supabase
    .from('employees')
    .select('id, first_name, last_name, employment_type')
    .eq('employment_status', 'Active')

  if (activeEmployees.data && activeEmployees.data.length > 0) {
    for (const emp of activeEmployees.data) {
      try {
        const context = await loadPayrollContext(emp.id, start, end, freq as any);
        const result = calculatePayroll(context);
        
        const { data: payrollItem, error: itemErr } = await supabase
          .from('payroll_items')
          .insert({
            payroll_run_id: run.id,
            employee_id: emp.id,
            present_days: result.present_days,
            absent_days: result.absent_days,
            holiday_days: result.holiday_days,
            paid_days: result.paid_days,
            basic_pay: result.basic_pay.toNumber(),
            total_deductions: result.total_deductions.toNumber(),
            net_pay: result.net_pay.toNumber(),
            calculation_engine_version: result.calculation_engine_version,
          })
          .select('id')
          .single()

        if (!itemErr && payrollItem) {
          // Insert deductions
          if (result.deductions.length > 0) {
            await supabase.from('payroll_deductions').insert(
              result.deductions.map(d => ({
                payroll_item_id: payrollItem.id,
                description: d.description,
                amount: d.amount.toNumber(),
                source: d.source,
                source_id: d.source_id
              }))
            )
          }
        }
      } catch (err: any) {
        console.error(`Error calculating payroll for employee ${emp.id}:`, err);
      }
    }
  }

  revalidatePath('/payroll')
  redirect('/payroll')
}
