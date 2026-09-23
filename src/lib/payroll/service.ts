import { createClient } from "@/lib/supabase/server";
import { PayrollContext, PayFrequency } from "./types";
import Decimal from "decimal.js";

// Note: This service currently stubs out the actual Supabase database fetches.
// In Phase 8, when we run the payroll, we will implement the full SQL queries 
export async function loadPayrollContext(
  employeeId: string, 
  periodStart: string,
  periodEnd: string,
  payFrequency: PayFrequency
): Promise<PayrollContext> {
  const supabase = await createClient();

  // 1. Fetch or resolve the Payroll Period ID
  const { data: dbPeriod } = await supabase
    .from('payroll_periods')
    .select('*, payroll_runs(id, status)')
    .eq('period_start', periodStart)
    .eq('period_end', periodEnd)
    .eq('pay_frequency', payFrequency)
    .single();

  let payrollPeriodId = "preview-period-id";
  if (dbPeriod) {
    payrollPeriodId = dbPeriod.id;
  }

  const periodData = {
    id: payrollPeriodId,
    period_start: periodStart,
    period_end: periodEnd,
    pay_frequency: payFrequency,
  };

  // 2. Fetch Employee and Compensation
  const { data: employee, error: empError } = await supabase
    .from('employees')
    .select('*, employee_compensation_history(*)')
    .eq('id', employeeId)
    .single();

  if (empError || !employee) throw new Error("Failed to load employee.");

  // Get active compensation for the period
  const activeComp = employee.employee_compensation_history
    .filter((c: any) => {
      const from = new Date(c.effective_from);
      const to = c.effective_to ? new Date(c.effective_to) : null;
      const pEnd = new Date(periodData.period_end);
      const pStart = new Date(periodData.period_start);
      return from <= pEnd && (!to || to >= pStart);
    })
    .sort((a: any, b: any) => new Date(b.effective_from).getTime() - new Date(a.effective_from).getTime())[0];

  if (!activeComp) {
    throw new Error(`No active compensation found for employee ${employeeId} during this period.`);
  }

  if (!activeComp.rate_type || activeComp.amount === undefined || activeComp.amount === null) {
    throw new Error(
      `Compensation record for this employee is missing rate_type or amount. ` +
      `Ensure the database migration has run successfully.`
    );
  }

  const empData = {
    id: employee.id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    employment_type: employee.employment_type as any,
    history: [{
      id: activeComp.id,
      effective_from: activeComp.effective_from,
      effective_to: activeComp.effective_to,
      rate_type: activeComp.rate_type as "Monthly" | "Daily",
      amount: new Decimal(activeComp.amount),
    }]
  };

  // 3. Fetch Company Settings
  const { data: settings } = await supabase
    .from('company_settings')
    .select('standard_working_days_per_period')
    .limit(1)
    .single();
    
  const standardWorkingDays = new Decimal(settings?.standard_working_days_per_period || 26);

  // 4. Fetch Attendance Records
  // We use actual attendance_records instead of timesheets for the simple engine
  const { data: attendanceData } = await supabase
    .from('attendance_records')
    .select('*')
    .eq('employee_id', employeeId)
    .gte('work_date', periodStart)
    .lte('work_date', periodEnd);
    
  const attendance = (attendanceData || []).map((r: any) => ({
    id: r.id,
    work_date: r.work_date,
    status: r.status
  }));

  // 5. Fetch Holidays
  const { data: holidayData } = await supabase
    .from('holidays')
    .select('*')
    .gte('holiday_date', periodStart)
    .lte('holiday_date', periodEnd)
    .eq('active', true);

  const holidays = (holidayData || []).map((h: any) => ({
    id: h.id,
    date: h.holiday_date,
    name: h.name
  }));

  // 6. Fetch Holiday Exemptions
  let holidayExemptions: string[] = [];
  if (holidays.length > 0) {
    const holidayIds = holidays.map(h => h.id);
    const { data: exemptionsData } = await supabase
      .from('holiday_exemptions')
      .select('holiday_id')
      .eq('employee_id', employeeId)
      .in('holiday_id', holidayIds);
      
    holidayExemptions = (exemptionsData || []).map((e: any) => e.holiday_id);
  }

  // 7. Fetch Manual Deductions
  let manualDeductions: any[] = [];
  if (dbPeriod && dbPeriod.payroll_runs && dbPeriod.payroll_runs.length > 0) {
    const currentRun = dbPeriod.payroll_runs[0];
    const { data: items } = await supabase
      .from('payroll_items')
      .select('id')
      .eq('payroll_run_id', currentRun.id)
      .eq('employee_id', employeeId)
      .single();
      
    if (items) {
      const { data: deds } = await supabase
        .from('payroll_deductions')
        .select('*')
        .eq('payroll_item_id', items.id);
        
      manualDeductions = (deds || []).map((d: any) => ({
        id: d.id,
        description: d.description,
        amount: new Decimal(d.amount)
      }));
    }
  }

  // 8. Fetch active cash advances
  const { data: cashAdvancesData } = await supabase
    .from('cash_advances')
    .select('*')
    .eq('employee_id', employeeId)
    .in('status', ['Active', 'Partially Paid'])

  const cashAdvances = cashAdvancesData?.map((ca: any) => ({
    id: ca.id,
    amount: new Decimal(ca.amount),
    repayment_amount_per_payroll: new Decimal(ca.repayment_amount_per_payroll),
    remaining_balance: new Decimal(ca.remaining_balance),
    reason: ca.reason
  })) || [];

  return {
    employee: empData,
    period: periodData,
    attendance,
    holidays,
    holidayExemptions,
    manualDeductions,
    cashAdvances,
    standardWorkingDays
  };
}

export async function finalizePayrollCalculation(
  payrollRunId: string, 
  results: any[]
): Promise<void> {
  throw new Error("finalizePayrollCalculation is not fully implemented yet.");
}
