import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Printer } from "lucide-react"

export default async function PayslipPage({ params }: { params: Promise<{ id: string, itemId: string }> }) {
  const { id: runId, itemId } = await params
  const supabase = await createClient()

  const { data: item, error } = await supabase
    .from('payroll_items')
    .select(`
      *,
      employees (
        id,
        first_name,
        last_name,
        employee_code,
        department_id,
        position_id,
        departments ( name ),
        positions ( title )
      ),
      payroll_runs (
        id,
        payroll_periods (
          period_start,
          period_end,
          pay_date,
          pay_frequency
        )
      ),
      payroll_deductions (
        id,
        description,
        amount,
        source
      )
    `)
    .eq('id', itemId)
    .eq('payroll_run_id', runId)
    .single()

  if (error || !item) {
    notFound()
  }

  const employee = item.employees as any
  const run = item.payroll_runs as any
  const period = run.payroll_periods
  
  const deductions = item.payroll_deductions as any[] || []

  const formatMoney = (amount: number) => {
    return Number(amount).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto">
        {/* Action Bar - Hidden in Print */}
        <div className="flex justify-end mb-6 print:hidden">
          <button 
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print Payslip
          </button>
        </div>

        {/* Payslip Document */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 print:border-none print:shadow-none print:p-4">
          
          {/* Header */}
          <div className="text-center mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wider mb-1">Nexus Corporation</h1>
            <p className="text-slate-500 font-medium text-sm">PAYSLIP</p>
          </div>

          {/* Employee & Period Details */}
          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div>
              <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                <span className="text-slate-500 font-medium">Employee Name:</span>
                <span className="font-bold text-slate-900">{employee.first_name} {employee.last_name}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                <span className="text-slate-500 font-medium">Employee ID:</span>
                <span className="text-slate-900">{employee.employee_code}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-slate-500 font-medium">Position:</span>
                <span className="text-slate-900">{employee.positions?.title || '-'}</span>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                <span className="text-slate-500 font-medium">Pay Period:</span>
                <span className="text-slate-900">
                  {new Date(period.period_start).toLocaleDateString()} - {new Date(period.period_end).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                <span className="text-slate-500 font-medium">Pay Date:</span>
                <span className="text-slate-900">{new Date(period.pay_date).toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-slate-500 font-medium">Frequency:</span>
                <span className="text-slate-900">{period.pay_frequency}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Earnings */}
            <div>
              <h3 className="font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 uppercase text-xs tracking-wider">Earnings</h3>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700">Basic Pay</span>
                  <span className="font-medium">{formatMoney(item.basic_pay)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 mt-4 pt-2">
                <span>Total Basic Pay</span>
                <span>{formatMoney(item.basic_pay)}</span>
              </div>
            </div>

            {/* Right Column: Deductions */}
            <div>
              <h3 className="font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 uppercase text-xs tracking-wider">Deductions</h3>
              
              {deductions.length > 0 ? (
                <div className="space-y-2 mb-4 text-sm text-red-600">
                  {deductions.map(d => (
                    <div key={d.id} className="flex justify-between">
                      <span>{d.description}</span>
                      <span className="font-medium">-{formatMoney(d.amount)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic mb-4">No deductions</div>
              )}

              <div className="flex justify-between font-bold text-red-600 border-t border-slate-200 mt-4 pt-2">
                <span>Total Deductions</span>
                <span>-{formatMoney(item.total_deductions)}</span>
              </div>
            </div>
          </div>

          {/* Net Pay */}
          <div className="mt-12 bg-slate-50 border border-slate-200 p-6 rounded-lg print:bg-transparent print:border-t-2 print:border-slate-900 print:rounded-none flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900 uppercase tracking-wider">Net Pay</span>
            <span className="text-3xl font-black text-emerald-600 print:text-slate-900">{formatMoney(item.net_pay)}</span>
          </div>

        </div>
        
        {/* Simple Client Component for Print trigger */}
        <PrintScript />
      </div>
    </div>
  )
}

function PrintScript() {
  return (
    <script dangerouslySetInnerHTML={{__html: `
      document.querySelector('button')?.addEventListener('click', () => {
        window.print();
      });
    `}} />
  )
}
