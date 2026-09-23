import { Card, CardContent } from "@/components/ui/card"
import { Users, Banknote, Landmark, AlertCircle, ArrowUpRight, TrendingUp, Sparkles, Activity } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Run all independent queries concurrently to prevent waterfall delays
  const [
    { count: activeEmployeesCount },
    { count: pendingPayrollsCount },
    { data: recentRuns }
  ] = await Promise.all([
    // 1. Fetch Active Employees
    supabase
      .from('employees')
      .select('id', { count: 'exact', head: true })
      .eq('employment_status', 'Active'),
      
    // 2. Fetch Payroll Runs for 'Pending Approval'
    supabase
      .from('payroll_runs')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'Pending Approval'),
      
    // 3. Fetch Completed Payroll Runs for list
    supabase
      .from('payroll_runs')
      .select(`
        id,
        status,
        payroll_periods ( period_start, period_end ),
        payroll_items ( basic_pay, net_pay )
      `)
      .in('status', ['Paid', 'Completed', 'Approved'])
      .order('created_at', { ascending: false })
      .limit(3)
  ])

  // Calculate totals from recent runs
  let totalGross = 0;
  let totalNet = 0;
  
  if (recentRuns) {
    recentRuns.forEach(run => {
      run.payroll_items?.forEach((item: any) => {
        totalGross += Number(item.basic_pay || 0);
        totalNet += Number(item.net_pay || 0);
      });
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Workspace Overview
        </h2>
        <p className="text-slate-500 font-medium">
          Summary of live payroll data and pending approvals.
        </p>
      </div>

      {/* Metric Widgets */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Employees */}
        <Card className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Employees</h3>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{activeEmployeesCount || 0}</div>
              <div className="text-xs text-slate-500 mt-1">Real-time count</div>
            </div>
          </div>
        </Card>

        {/* Gross Payroll */}
        <Card className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gross Payroll</h3>
              <Banknote className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{formatCurrency(totalGross)}</div>
              <div className="text-xs text-slate-500 mt-1">Across recent runs</div>
            </div>
          </div>
        </Card>

        {/* Net Payroll */}
        <Card className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Net Payroll</h3>
              <Landmark className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{formatCurrency(totalNet)}</div>
              <div className="text-xs text-slate-500 mt-1">Across recent runs</div>
            </div>
          </div>
        </Card>

        {/* Pending Approval */}
        <Card className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Approvals</h3>
              <AlertCircle className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{pendingPayrollsCount || 0}</div>
              <div className="text-xs text-slate-500 mt-1">{pendingPayrollsCount ? 'Requires attention' : 'All caught up'}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="md:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Payroll Runs</h3>
              <p className="text-sm text-slate-500 mt-1">Overview of your most recently processed payrolls.</p>
            </div>
          </div>
          
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Period</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium text-right">Net Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(!recentRuns || recentRuns.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No completed payroll runs yet.
                  </td>
                </tr>
              )}
              {recentRuns?.map((run: any) => {
                const runNetTotal = run.payroll_items?.reduce((sum: number, item: any) => sum + Number(item.net_pay || 0), 0) || 0;
                return (
                  <tr key={run.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {new Date(run.payroll_periods.period_start).toLocaleDateString()} - {new Date(run.payroll_periods.period_end).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500">Regular</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-right tabular-nums">{formatCurrency(runNetTotal)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center pl-2 py-0.5 border-l-2 border-[#2B6CB0] text-xs font-medium text-slate-700">
                        {run.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>

        {/* Side Widget */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Actions</h3>
          <p className="text-sm text-slate-500 mb-6 border-b border-border pb-4">Common administrative tasks.</p>
          
          <div className="flex flex-col gap-2">
            <Link href="/payroll/run" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-border transition-colors">
              <span className="font-medium text-slate-700">Run Payroll</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
            
            <Link href="/employees/new" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-border transition-colors">
              <span className="font-medium text-slate-700">Add Employee</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
            
            <Link href="/leave" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-border transition-colors">
              <span className="font-medium text-slate-700">Review Leaves</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
