import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54531'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data: runs, error } = await supabase
    .from('payroll_runs')
    .select('id, status, created_at')
    .order('created_at', { ascending: false })
    .limit(3)
    
  console.log("Recent Payroll Runs:", runs)
  
  if (runs && runs.length > 0) {
    const runId = runs[0].id;
    console.log("Checking diagnostics for:", runId)
    
    const { data: items, error: itemsErr } = await supabase
      .from('payroll_items')
      .select('id, gross_pay, net_pay, total_deductions, payroll_earnings(amount), payroll_deductions(amount)')
      .eq('payroll_run_id', runId)
      
    console.log("Items error:", itemsErr)
      
    console.log("Found", items?.length, "items")
    let hasRecErr = false;
    for (const item of items || []) {
      const sumEarnings = item.payroll_earnings.reduce((sum: number, e: any) => sum + Number(e.amount), 0)
      if (Math.abs(Number(item.gross_pay) - sumEarnings) > 0.05) {
        console.log(`Reconciliation failed: Gross pay ${item.gross_pay} != sum earnings ${sumEarnings} for item ${item.id}`)
        hasRecErr = true;
      }
      if (Number(item.net_pay) < 0) {
        console.log(`NEGATIVE NET PAY: Item ${item.id} has net pay ${item.net_pay}`)
        hasRecErr = true;
      }
    }
    if (!hasRecErr) console.log("No reconciliation errors found.")
  }
}
check()
