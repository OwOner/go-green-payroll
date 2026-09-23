"use client"

import { Printer } from "lucide-react"

export function PayslipPrintButton() {
  return (
    <button 
      onClick={() => typeof window !== 'undefined' && window.print()}
      className="inline-flex items-center gap-2 bg-white text-ink px-4 py-2 rounded-none font-bold hover:bg-slate-100 transition-colors border border-line"
    >
      <Printer className="w-4 h-4" /> Print to PDF
    </button>
  )
}
