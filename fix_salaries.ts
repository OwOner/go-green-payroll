import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54531'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fixSalaries() {
  console.log("Fetching all employees...")
  const { data: employees, error: empError } = await supabase.from('employees').select('id, date_hired')
  
  if (empError) {
    console.error("Error fetching employees:", empError)
    return
  }

  let fixedCount = 0;
  let createdCount = 0;

  for (const emp of employees) {
    // Get their active compensation
    const { data: comps, error: compError } = await supabase
      .from('employee_compensation_history')
      .select('*')
      .eq('employee_id', emp.id)
      .order('effective_from', { ascending: false })

    if (compError) {
      console.error(`Error fetching comp for ${emp.id}:`, compError)
      continue
    }

    if (!comps || comps.length === 0) {
      // Create a default monthly salary
      const { error: insertError } = await supabase
        .from('employee_compensation_history')
        .insert({
          employee_id: emp.id,
          salary_basis: 'Monthly',
          salary_type: 'Monthly',
          pay_frequency: 'Semi-Monthly',
          effective_from: emp.date_hired,
          reason: 'System default fix',
          basic_salary: 35000,
          working_hours_per_day: 8,
          working_days_per_week: 5
        })
      if (insertError) {
        console.error(`Failed to insert for ${emp.id}:`, insertError)
      } else {
        createdCount++
      }
    } else {
      // Check if the most recent has a 0 rate
      const active = comps[0]
      let needsFix = false
      let updates: any = {}

      if (active.salary_basis === 'Monthly' && (!active.basic_salary || active.basic_salary <= 0)) {
        needsFix = true
        updates = { basic_salary: 35000 }
      } else if (active.salary_basis === 'Daily' && (!active.daily_rate || active.daily_rate <= 0)) {
        needsFix = true
        updates = { daily_rate: 1000, basic_salary: 1000 }
      } else if (active.salary_basis === 'Weekly' && (!active.weekly_rate || active.weekly_rate <= 0)) {
        needsFix = true
        updates = { weekly_rate: 7000, basic_salary: 7000 }
      } else if (active.salary_basis === 'Hourly' && (!active.hourly_rate || active.hourly_rate <= 0)) {
        needsFix = true
        updates = { hourly_rate: 150, basic_salary: 150 }
      } else if (!active.salary_basis) {
        needsFix = true
        updates = { salary_basis: 'Monthly', salary_type: 'Monthly', basic_salary: 35000 }
      }

      if (needsFix) {
        const { error: updateError } = await supabase
          .from('employee_compensation_history')
          .update(updates)
          .eq('id', active.id)

        if (updateError) {
          console.error(`Failed to update ${emp.id}:`, updateError)
        } else {
          fixedCount++
        }
      }
    }
  }

  console.log(`Done! Fixed ${fixedCount} corrupted salaries and created ${createdCount} missing salaries.`)
}

fixSalaries()
