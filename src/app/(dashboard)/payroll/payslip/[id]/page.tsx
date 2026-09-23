import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PayslipPrintButton } from "@/components/ui/payslip-print-button"

export default async function PayslipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return <div className="p-10 text-red-500">Error: Not Authenticated</div>

  // 1. Fetch Payroll Item with all related snapshots and periods
  const { data: item, error } = await supabase
    .from('payroll_items')
    .select(`
      id,
      basic_pay,
      net_pay,
      total_deductions,
      employee_id,
      payroll_runs!inner (
        status,
        payroll_periods ( period_start, period_end, pay_date, pay_frequency )
      ),
      employees ( first_name, last_name, employee_code, employment_type )
    `)
    .eq('id', id)
    .single()

  if (error) return <div className="p-10 text-red-500">Error fetching item: {error.message}</div>
  if (!item) return <div className="p-10 text-red-500">Error: Payroll item not found in database</div>

  // Basic RLS/Security Check
  const { data: profile } = await supabase.from('profiles').select('roles(name)').eq('id', user.id).single()
  const roleName = (profile?.roles as any)?.name
  const isAdmin = roleName?.includes('Admin') || roleName === 'Payroll Manager'
  
  if (!isAdmin) {
    const { data: emp } = await supabase.from('employees').select('id').eq('user_id', user.id).single()
    if (item.employee_id !== emp?.id) {
      return <div className="p-10 text-red-500">Error: Unauthorized. You cannot view this payslip. (Role: {roleName})</div>
    }
  }

  // 2. Fetch Earnings & Deductions concurrently
  const [{ data: earnings }, { data: deductions }, { data: companyData }] = await Promise.all([
    supabase
      .from('payroll_earnings')
      .select('description, amount, source')
      .eq('payroll_item_id', id),
    supabase
      .from('payroll_deductions')
      .select('description, amount, source')
      .eq('payroll_item_id', id),
    supabase
      .from('company_settings')
      .select('company_name, address')
      .single()
  ])

  const payslipItem = item as any;
  const displayEarnings = earnings || [];
  const displayDeductions = deductions || [];
  const company = companyData || { company_name: "Nexus Corp.", address: "123 Corporate Tower, Ayala Ave, Makati City" };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-sans tabular-nums text-ink">
      {/* Non-printable controls */}
      <div className="flex justify-between items-center print:hidden bg-ink p-4 rounded-none text-white shadow-none">
        <div>
          <h2 className="font-bold">Payslip Actions</h2>
          <p className="text-slate-400 text-sm">Print this document.</p>
        </div>
        <div className="flex gap-3">
          <PayslipPrintButton />
        </div>
      </div>

      {/* Printable Payslip */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            margin: 0;
          }
          body {
            padding: 2cm;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}} />
      <div className="bg-white rounded-xl border border-line p-8 sm:p-12 print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-line pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-ink tracking-tight uppercase">{company.company_name}</h1>
            <p className="text-slate-500 mt-1 font-medium">{company.address}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Payslip</h2>
            <p className="text-ink font-bold mt-2">
              {new Date(payslipItem.payroll_runs.payroll_periods.period_start).toLocaleDateString()} - {new Date(payslipItem.payroll_runs.payroll_periods.period_end).toLocaleDateString()}
            </p>
            <p className="text-slate-500 text-sm font-medium">Payout: {new Date(payslipItem.payroll_runs.payroll_periods.pay_date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-slate-50 print:border-slate-200">
          <div>
            <p className="text-sm text-slate-500 mb-1">Employee Name</p>
            <p className="font-bold text-slate-900 text-lg uppercase">{payslipItem.employees.first_name} {payslipItem.employees.last_name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 mb-1">Employee ID</p>
            <p className="font-bold font-mono text-slate-900 uppercase">{payslipItem.employees.employee_code}</p>
            <p className="text-sm text-slate-700 font-medium">{payslipItem.employees.employment_type}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Earnings */}
          <div>
            <h3 className="font-bold text-ink border-b border-line pb-2 mb-4 uppercase text-sm tracking-wider">Earnings</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">Basic Pay</span>
                <span className="font-medium text-ink">{Number(item.basic_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              {displayEarnings.map((e: any, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-700">{e.description || e.source}</span>
                  <span className="font-medium text-ink">{Number(e.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-ink mt-6 pt-4 border-t border-line">
              <span>Gross Pay</span>
              <span>{Number(item.basic_pay + displayEarnings.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0)).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="font-bold text-ink border-b border-line pb-2 mb-4 uppercase text-sm tracking-wider">Deductions</h3>
            <div className="space-y-3">
              {displayDeductions.length === 0 && (
                <div className="text-sm text-slate-500 italic">No deductions</div>
              )}
              {displayDeductions.map((d: any, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-700">{d.description || d.source}</span>
                  <span className="font-medium text-ink">{Number(d.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-ink mt-6 pt-4 border-t border-line">
              <span>Total Deductions</span>
              <span>{Number(item.total_deductions).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex justify-between items-center print:border print:border-slate-200 print:bg-slate-50 mt-12">
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Net Pay</h3>
            <p className="text-slate-500 text-sm font-medium">Final Disbursed Amount</p>
          </div>
          <div className="text-4xl font-black text-slate-900 tracking-tight">
            {Number(item.net_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}
          </div>
        </div>

      </div>
    </div>
  )
}
