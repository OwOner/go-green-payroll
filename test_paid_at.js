async function test() {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient('http://127.0.0.1:54531', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
  
  const { error } = await supabase.from('payroll_runs').select('paid_at').limit(1)
  console.log('paid_at check error:', error)
}
test()
