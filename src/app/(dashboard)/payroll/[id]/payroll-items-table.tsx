"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import PayrollItemExclusionAction from "./item-exclusion-action"

export default function PayrollItemsTable({ items, runId }: { items: any[], runId: string }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items?.slice(startIndex, endIndex) || []

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-medium">Employee</th>
              <th className="px-6 py-3 font-medium text-center whitespace-nowrap">Attendance (P/A/H)</th>
              <th className="px-6 py-3 font-medium text-center">Paid Days</th>
              <th className="px-6 py-3 font-medium text-right">Basic Pay</th>
              <th className="px-6 py-3 font-medium text-right">Deductions</th>
              <th className="px-6 py-3 font-medium text-right text-emerald-600">Net Pay</th>
              <th className="px-6 py-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(!items || items.length === 0) ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p>No items found for this payroll run.</p>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  <p>No items on this page.</p>
                </td>
              </tr>
            ) : (
              currentItems.map((item: any) => (
                <tr key={item.id} className={`hover:bg-slate-50 ${item.is_excluded ? 'opacity-50 grayscale bg-slate-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">
                        {(item.employees as any)?.first_name} {(item.employees as any)?.last_name}
                      </span>
                      {item.is_excluded && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                          Excluded
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{(item.employees as any)?.employee_code}</div>
                    {item.is_excluded && item.exclusion_reason && (
                      <div className="text-xs text-slate-500 mt-1 italic">Reason: {item.exclusion_reason}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-medium whitespace-nowrap">
                    {item.present_days} / {item.absent_days} / {item.holiday_days}
                  </td>
                  <td className="px-6 py-4 text-center font-bold">
                    {item.paid_days}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {Number(item.basic_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-right text-red-500">
                    {Number(item.total_deductions) > 0 ? '-' : ''}{Number(item.total_deductions).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    {Number(item.net_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 h-8 px-3">
                        <Eye className="w-4 h-4 mr-1" /> Details
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Calculation Breakdown - {(item.employees as any)?.first_name} {(item.employees as any)?.last_name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-sm">
                            <h4 className="font-semibold text-slate-700 mb-2">Earnings</h4>
                            {item.earnings_breakdown && Object.entries(item.earnings_breakdown).map(([k, v]) => (
                              <div key={k} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                                <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                                <span className="font-medium">{Number(v).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-red-50 rounded-lg p-4 border border-red-100 text-sm">
                            <h4 className="font-semibold text-red-700 mb-2">Deductions</h4>
                            {(!item.deductions_breakdown || Object.keys(item.deductions_breakdown).length === 0) ? (
                              <p className="text-red-500 italic">No deductions for this period.</p>
                            ) : (
                              Object.entries(item.deductions_breakdown).map(([k, v]) => (
                                <div key={k} className="flex justify-between py-1 border-b border-red-100 last:border-0">
                                  <span className="text-red-600 capitalize">{k.replace(/_/g, ' ')}</span>
                                  <span className="font-medium text-red-700">{Number(v).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                </div>
                              ))
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                            <span className="font-bold text-emerald-800">Final Net Pay</span>
                            <span className="text-xl font-black text-emerald-600">
                              {Number(item.net_pay).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Link 
                      href={`/payroll/payslip/${item.id}`} 
                      target="_blank"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 h-8 px-3"
                    >
                      <FileText className="w-4 h-4 mr-1" /> Payslip
                    </Link>

                    <div className="ml-2">
                      <PayrollItemExclusionAction 
                        itemId={item.id} 
                        runId={runId} 
                        status={item.payroll_runs?.status || "Draft"} 
                        isExcluded={item.is_excluded} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{startIndex + 1}</span> to <span className="font-medium text-slate-900">{Math.min(endIndex, items.length)}</span> of <span className="font-medium text-slate-900">{items.length}</span> employees
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <div className="text-sm font-medium px-2">
              Page {currentPage} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
