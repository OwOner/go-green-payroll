import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54531'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' // Using Service Role key for full access
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCount(table: string) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
  
  if (error) {
    console.log(`${table}: ERROR - ${error.message}`)
    return
  }
  console.log(`${table}: ${count} rows`)
}

async function run() {
  const tables = [
    'payroll_items',
    'payroll_earnings',
    'attendance_records',
    'payroll_adjustments'
  ]
  
  for (const t of tables) {
    await getCount(t)
  }
}

run()
