import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { FileDown, Filter } from "lucide-react"

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period } = await searchParams
  const supabase = await createClient()

  // Ensure Admin Access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from('profiles').select('roles(name)').eq('id', user.id).single()
  const roleName = (profile?.roles as any)?.name
  if (roleName !== 'Super Admin' && roleName !== 'Payroll Manager') {
    return (
      <div className="p-8 text-center text-slate-500">
        You do not have permission to view reports.
      </div>
    )
  }

  // 1. Fetch available completed periods for filter
  const { data: completedRuns } = await supabase
    .from('payroll_runs')
    .select(`
      id,
      payroll_periods ( id, period_start, period_end, pay_date )
    `)
    .in('status', ['Approved', 'Paid'])
    .order('created_at', { ascending: false })

  // 2. Fetch payroll items for aggregation based on filter
  let query = supabase
    .from('payroll_items')
    .select(`
      gross_pay,
      net_pay,
      total_deductions,
      payroll_runs!inner(id, payroll_period_id)
    `)
    .in('payroll_runs.status', ['Approved', 'Paid'])

  if (period) {
    query = query.eq('payroll_runs.payroll_period_id', period)
  }

  const { data: items } = await query

  // Calculate Aggregations
  let totalGross = 0
  let totalNet = 0
  let totalDeductions = 0
  
  items?.forEach(i => {
    totalGross += Number(i.gross_pay || 0)
    totalNet += Number(i.net_pay || 0)
    totalDeductions += Number(i.total_deductions || 0)
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Reports</h2>
          <p className="text-slate-500">Payroll summaries and simple financial reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
        <Filter className="w-5 h-5 text-slate-400 shrink-0" />
        <form className="flex flex-1 gap-3 items-center">
          <select 
            name="period" 
            defaultValue={period || ""} 
            className="p-2 text-sm border border-slate-200 rounded-lg bg-slate-50 flex-1 max-w-xs"
          >
            <option value="">All Time</option>
            {completedRuns?.map((run: any) => (
              <option key={run.payroll_periods.id} value={run.payroll_periods.id}>
                {new Date(run.payroll_periods.period_start).toLocaleDateString()} - {new Date(run.payroll_periods.period_end).toLocaleDateString()}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Apply
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white rounded-xl border-slate-200 shadow-sm p-6 flex flex-col gap-1">
          <div className="text-slate-500 font-medium text-sm">Gross Payroll</div>
          <div className="text-2xl font-bold text-slate-900">₱{totalGross.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </Card>
        <Card className="bg-white rounded-xl border-slate-200 shadow-sm p-6 flex flex-col gap-1">
          <div className="text-slate-500 font-medium text-sm">Total Deductions</div>
          <div className="text-2xl font-bold text-orange-600">₱{totalDeductions.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </Card>
        <Card className="bg-white rounded-xl border-slate-200 shadow-sm p-6 flex flex-col gap-1">
          <div className="text-slate-500 font-medium text-sm">Net Payroll</div>
          <div className="text-2xl font-bold text-emerald-600">₱{totalNet.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </Card>
      </div>
    </div>
  )
}
