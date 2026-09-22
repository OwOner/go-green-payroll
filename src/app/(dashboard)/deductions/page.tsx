"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { getDeductions, createDeduction, cancelDeduction } from "./actions"
import { createClient } from "@/lib/supabase/client"
import { Plus, XCircle, AlertCircle, Search, ChevronDown } from "lucide-react"

export default function DeductionsPage() {
  const [deductions, setDeductions] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const data = await getDeductions()
      setDeductions(data)
      
      const supabase = createClient()
      const { data: emps } = await supabase.from('employees').select('id, first_name, last_name, employee_code').order('first_name')
      if (emps) setEmployees(emps)
      
      setLoading(false)
    }
    load()
  }, [])

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    // If it's a one-off deduction, user might leave repayment amount empty.
    // If so, set repayment = total amount.
    const amount = formData.get('amount') as string
    let repayment = formData.get('repayment_amount_per_payroll') as string
    if (!repayment) {
      formData.set('repayment_amount_per_payroll', amount)
    }

    const res = await createDeduction(formData)
    
    if (res.error) {
      setError(res.error)
    } else {
      ;(e.target as HTMLFormElement).reset()
      setSelectedEmployee(null)
      setSearchQuery('')
      // Reload list
      const data = await getDeductions()
      setDeductions(data)
    }
    setIsSubmitting(false)
  }

  async function handleCancel(id: string) {
    if (!confirm("Are you sure you want to cancel this deduction?")) return
    const res = await cancelDeduction(id)
    if (!res.error) {
      const data = await getDeductions()
      setDeductions(data)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Deductions & Advances</h2>
        <p className="text-slate-500">Manage manual deductions, penalties, and cash advances for employees.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Form */}
        <Card className="bg-white rounded-xl border-slate-200 shadow-sm p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Deduction</h3>
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</label>
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Type to search employee..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setIsDropdownOpen(true)
                      if (selectedEmployee && e.target.value !== `${selectedEmployee.first_name} ${selectedEmployee.last_name}`) {
                        setSelectedEmployee(null)
                      }
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                  <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {employees.filter(e => `${e.first_name} ${e.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-500 text-center">No employees found.</div>
                    ) : (
                      employees.filter(e => `${e.first_name} ${e.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())).map(e => (
                        <div
                          key={e.id}
                          onMouseDown={() => {
                            setSelectedEmployee(e)
                            setSearchQuery(`${e.first_name} ${e.last_name}`)
                            setIsDropdownOpen(false)
                          }}
                          className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm border-b border-slate-50 last:border-0"
                        >
                          <div className="font-medium text-slate-900">{e.first_name} {e.last_name}</div>
                          <div className="text-xs text-slate-500">{e.employee_code}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {/* Hidden input for form submission */}
                <input 
                  type="hidden" 
                  name="employee_id" 
                  value={selectedEmployee?.id || ''} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reason / Description</label>
              <input type="text" name="reason" placeholder="e.g. Cash Advance, Penalty" required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none" />
            </div>

            <div className="space-y-1 mt-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Amount (PHP)</label>
              <input type="number" step="0.01" min="0.01" name="amount" required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none" />
              <p className="text-[11px] text-slate-500 mt-1">The full total amount of the deduction or cash advance that the employee owes.</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Deduct per Payroll (PHP)</label>
              <input type="number" step="0.01" min="0.01" name="repayment_amount_per_payroll" placeholder="Leave empty for one-time full deduction" className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none" />
              <p className="text-[11px] text-slate-500 mt-1">The partial amount to subtract from the salary each payroll. If left empty, the entire Total Amount will be deducted at once next payroll.</p>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50">
              <Plus className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Add Deduction'}
            </button>
          </form>
        </Card>

        {/* List */}
        <Card className="bg-white rounded-xl border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Active & Past Deductions</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Reason</th>
                  <th className="px-6 py-3 font-medium text-right">Total</th>
                  <th className="px-6 py-3 font-medium text-right">Balance</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading deductions...</td></tr>
                ) : deductions.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No deductions found.</td></tr>
                ) : deductions.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {d.employee?.first_name} {d.employee?.last_name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{d.reason}</td>
                    <td className="px-6 py-4 text-right">{d.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="px-6 py-4 text-right font-medium text-red-600">{d.remaining_balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        d.status === 'Active' ? 'bg-amber-100 text-amber-800' :
                        d.status === 'Partially Paid' ? 'bg-blue-100 text-blue-800' :
                        d.status === 'Cancelled' ? 'bg-slate-100 text-slate-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(d.status === 'Active' || d.status === 'Partially Paid') && (
                        <button onClick={() => handleCancel(d.id)} className="text-red-500 hover:text-red-700 transition-colors inline-flex items-center gap-1 text-xs font-medium">
                          <XCircle className="w-4 h-4" /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  )
}
