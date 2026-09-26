"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addCompensationHistory(formData: FormData) {
  const supabase = await createClient()

  const employee_id = formData.get("employee_id") as string
  const salary_basis = formData.get("salary_basis") as string  // Monthly | Daily | Weekly | Hourly
  const rate = parseFloat(formData.get("rate") as string)      // the raw rate in its basis unit
  const pay_frequency = formData.get("pay_frequency") as string
  const effective_from = formData.get("effective_from") as string

  if (!employee_id || !salary_basis || !pay_frequency || !effective_from) {
    return { error: "Missing required fields" }
  }

  if (isNaN(rate) || rate <= 0) {
    return { error: "Rate must be a positive number." }
  }

  if (!['Monthly', 'Daily'].includes(salary_basis)) {
    return { error: `Invalid salary basis: "${salary_basis}". Must be Monthly or Daily.` }
  }

  const rateColumns: Record<string, object> = {
    Monthly: {
      rate_type: 'Monthly',
      amount: rate
    },
    Daily: {
      rate_type: 'Daily',
      amount: rate
    }
  };

  // First, get the most recent compensation to check dates
  const { data: previousComps, error: fetchError } = await supabase
    .from('employee_compensation_history')
    .select('*')
    .eq('employee_id', employee_id)
    .order('effective_from', { ascending: false })

  if (fetchError) {
    return { error: fetchError.message }
  }

  const mostRecent = previousComps && previousComps.length > 0 ? previousComps[0] : null;

  if (mostRecent) {
    const newDate = new Date(effective_from);
    const oldDate = new Date(mostRecent.effective_from);

    if (newDate < oldDate) {
      return { error: "New effective date cannot be before the most recent compensation's effective date." }
    }

    if (newDate.getTime() === oldDate.getTime()) {
      // Update the existing record instead of creating a new one and capping
      const { error: updateSameDayError } = await supabase
        .from('employee_compensation_history')
        .update({
          pay_frequency,
          ...rateColumns[salary_basis]
        })
        .eq('id', mostRecent.id)

      if (updateSameDayError) {
        return { error: "Failed to update today's compensation record." }
      }
      
      revalidatePath(`/employees/${employee_id}`)
      revalidatePath('/employees')
      return { success: true }
    }

    // Cap the previous record
    const effectiveToDate = new Date(newDate);
    effectiveToDate.setDate(effectiveToDate.getDate() - 1);

    const { error: updateError } = await supabase
      .from('employee_compensation_history')
      .update({ effective_to: effectiveToDate.toISOString().split('T')[0] })
      .eq('id', mostRecent.id)

    if (updateError) {
      return { error: "Failed to cap previous compensation period." }
    }
  }

  // Insert the new record
  const { error: insertError } = await supabase
    .from('employee_compensation_history')
    .insert({
      employee_id,
      pay_frequency,
      effective_from,
      working_hours_per_day: 8,
      working_days_per_week: 5,
      ...rateColumns[salary_basis],
    })

  if (insertError) {
    return { error: insertError.message }
  }

  revalidatePath(`/employees/${employee_id}`)
  revalidatePath('/employees')
  return { success: true }
}

export async function fetchEmployeeAttendance(employeeId: string, startDate: string, endDate: string) {
  const supabase = await createClient()
  
  const { data: records, error } = await supabase
    .from('attendance_records')
    .select('*')
    .eq('employee_id', employeeId)
    .gte('work_date', startDate)
    .lte('work_date', endDate)
    .order('work_date', { ascending: false })
    
  if (error) {
    console.error("Error fetching employee attendance:", error)
    return []
  }
  
  return records || []
}

export async function assignEmployeeWorkPolicy(payload: {
  employee_id: string,
  work_policy_id: string,
  effective_from: string,
  effective_to?: string
}) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("employee_work_policies")
    .insert([{
      employee_id: payload.employee_id,
      work_policy_id: payload.work_policy_id,
      effective_from: payload.effective_from,
      effective_to: payload.effective_to || null
    }])

  if (error) {
    console.error("Error assigning work policy:", error)
    return { error: error.message }
  }

  revalidatePath(`/employees/${payload.employee_id}`)
  return { success: true }
}

export async function removeEmployeeWorkPolicy(assignmentId: string, employeeId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("employee_work_policies")
    .delete()
    .eq("id", assignmentId)

  if (error) {
    console.error("Error removing work policy:", error)
    return { error: error.message }
  }

  revalidatePath(`/employees/${employeeId}`)
  return { success: true }
}

export async function updateEmployeeWorkPolicy(assignmentId: string, employeeId: string, payload: {
  work_policy_id: string,
  effective_from: string,
  effective_to?: string
}) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("employee_work_policies")
    .update({
      work_policy_id: payload.work_policy_id,
      effective_from: payload.effective_from,
      effective_to: payload.effective_to || null
    })
    .eq("id", assignmentId)

  if (error) {
    console.error("Error updating work policy assignment:", error)
    return { error: error.message }
  }

  revalidatePath(`/employees/${employeeId}`)
  return { success: true }
}

export async function togglePayrollExemption(employeeId: string, isExempt: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('employees')
    .update({ is_payroll_exempt: isExempt })
    .eq('id', employeeId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/employees/${employeeId}`)
  return { success: true }
}

export async function createCashAdvance(formData: FormData) {
  const supabase = await createClient()

  const employee_id = formData.get("employee_id") as string
  const amount = parseFloat(formData.get("amount") as string)
  const date = formData.get("date") as string
  const repayment_amount_per_payroll = parseFloat(formData.get("repayment_amount_per_payroll") as string)
  const reason = formData.get("reason") as string

  if (!employee_id || isNaN(amount) || !date || isNaN(repayment_amount_per_payroll)) {
    return { success: false, error: "Missing required fields or invalid amounts" }
  }

  if (amount <= 0 || repayment_amount_per_payroll <= 0) {
    return { success: false, error: "Amount and repayment amount must be positive" }
  }

  const { error } = await supabase
    .from("cash_advances")
    .insert({
      employee_id,
      amount,
      date,
      reason,
      repayment_amount_per_payroll,
      remaining_balance: amount,
      status: 'Active'
    })

  if (error) {
    console.error("Error creating cash advance:", error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/employees/${employee_id}`)
  return { success: true }
}

export async function updateCashAdvance(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get("id") as string
  const employee_id = formData.get("employee_id") as string
  const repayment_amount_per_payroll = parseFloat(formData.get("repayment_amount_per_payroll") as string)

  if (!id || !employee_id || isNaN(repayment_amount_per_payroll) || repayment_amount_per_payroll <= 0) {
    return { success: false, error: "Invalid repayment amount" }
  }

  const { error } = await supabase
    .from("cash_advances")
    .update({ repayment_amount_per_payroll })
    .eq("id", id)

  if (error) {
    console.error("Error updating cash advance:", error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/employees/${employee_id}`)
  return { success: true }
}

export async function toggleCashAdvanceStatus(id: string, employee_id: string, newStatus: string) {
  const supabase = await createClient()

  if (!['Active', 'Paused'].includes(newStatus)) {
    return { success: false, error: "Invalid status toggle" }
  }

  const { error } = await supabase
    .from("cash_advances")
    .update({ status: newStatus })
    .eq("id", id)

  if (error) {
    console.error("Error toggling cash advance status:", error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/employees/${employee_id}`)
  return { success: true }
}
