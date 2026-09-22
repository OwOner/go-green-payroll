"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getDeductions() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('cash_advances')
    .select(`
      *,
      employee:employees(
        id,
        first_name,
        last_name,
        employee_code
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching deductions:", error)
    return []
  }

  return data || []
}

export async function createDeduction(formData: FormData) {
  const supabase = await createClient()
  
  const employeeId = formData.get('employee_id') as string
  const amountStr = formData.get('amount') as string
  const reason = formData.get('reason') as string
  const deductionPerPayrollStr = formData.get('repayment_amount_per_payroll') as string
  
  if (!employeeId || !amountStr || !deductionPerPayrollStr) {
    return { error: "Missing required fields" }
  }

  const amount = parseFloat(amountStr)
  const repayment = parseFloat(deductionPerPayrollStr)

  if (isNaN(amount) || amount <= 0) return { error: "Invalid total amount" }
  if (isNaN(repayment) || repayment <= 0) return { error: "Invalid deduction per payroll" }
  if (repayment > amount) return { error: "Deduction per payroll cannot exceed total amount" }

  const { error } = await supabase.from('cash_advances').insert({
    employee_id: employeeId,
    amount,
    date: new Date().toISOString().split('T')[0],
    reason: reason || "Manual Deduction",
    repayment_amount_per_payroll: repayment,
    remaining_balance: amount,
    status: 'Active'
  })

  if (error) {
    console.error("Error creating deduction:", error)
    return { error: error.message }
  }

  revalidatePath('/deductions')
  return { success: true }
}

export async function cancelDeduction(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('cash_advances')
    .update({ status: 'Cancelled' })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/deductions')
  return { success: true }
}
