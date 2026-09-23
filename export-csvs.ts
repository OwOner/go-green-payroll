import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = 'http://127.0.0.1:54531'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\3debbe52-0ef0-420c-b32d-422e1c6d9b37\\scratch'
  
  // Get all payroll runs
  const { data: runs } = await supabase.from('payroll_runs').select('*, payroll_periods(*)')
  if (!runs) return
  
  console.log(`Found ${runs.length} runs to export.`)

  for (const run of runs) {
    const { data: items } = await supabase.from('payroll_items').select('*, employees(*)').eq('payroll_run_id', run.id)
    if (!items || items.length === 0) continue

    // Headers based on current schema
    const headers = [
      'Employee Code', 'Name', 'Gross Pay/Basic Pay', 'Taxable Income', 'Non Taxable Income', 'Withholding Tax',
      'SSS', 'PhilHealth', 'Pag-IBIG', 'Total Deductions', 'Net Pay'
    ]

    const rows = [headers.join(',')]

    for (const item of items) {
      const emp = item.employees
      
      // parse statutory from JSON if possible, otherwise just use total deductions as fallback
      // Actually, we'll just dump all raw JSON statutory values if they exist, but they are stored in payroll_items usually, wait...
      // Let's just dump the raw DB row for safety in a JSON file as well!
      
      rows.push([
        emp.employee_code,
        `"${emp.first_name} ${emp.last_name}"`,
        item.basic_pay, // renamed from gross_pay in migration 50
        item.taxable_income,
        item.non_taxable_income,
        item.withholding_tax,
        'N/A', 'N/A', 'N/A', // Assuming statutory details are inside total_deductions or separate tables
        item.total_deductions,
        item.net_pay
      ].join(','))
    }

    const csvPath = path.join(artifactDir, `payroll_register_run_${run.id}.csv`)
    fs.writeFileSync(csvPath, rows.join('\n'))
    console.log(`Exported CSV for run ${run.id}`)
    
    // Also save raw JSON dump of payroll items for absolute safety
    const jsonPath = path.join(artifactDir, `payroll_items_dump_run_${run.id}.json`)
    fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2))
    console.log(`Exported JSON dump for run ${run.id}`)
  }
}

run()
