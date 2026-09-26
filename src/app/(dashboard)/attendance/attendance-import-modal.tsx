"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, FileUp, Loader2, Info } from "lucide-react"
import * as XLSX from "xlsx"
import { bulkImportAttendance, previewAttendanceImport } from "./actions"

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employees: any[]
  onSaved: () => void
}

type PreviewRow = {
  id: string
  originalRowNumber: number
  employeeCode: string
  employeeName: string
  date: string
  status: string
  notes: string
  
  employeeId: string | null
  state: 'NEW' | 'CONFLICT' | 'INVALID' | 'IMPORT DUPLICATE'
  errors: string[]
  warnings: string[]
}

export default function AttendanceImportModal({ open, onOpenChange, employees, onSaved }: ImportModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([])
  const [isDragging, setIsDragging] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = (file: File) => {
    setLoading(true)
    const reader = new FileReader()
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]

        // Find the actual header row by looking for 'Employee Code'
        // Use raw: true to extract the actual underlying Excel Date serial numbers instead of the formatted visual string
        const aoa = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true }) as any[][]
        let headerRowIndex = 0
        let actualHeaders: string[] = []
        for (let i = 0; i < aoa.length; i++) {
          if (aoa[i][0] === 'Employee Code') {
            headerRowIndex = i
            actualHeaders = aoa[i].map(col => {
              if (typeof col === 'number' && col > 20000 && col < 50000) {
                // Convert Excel date serial to YYYY-MM-DD
                const jsDate = new Date((col - (25567 + 2)) * 86400 * 1000)
                return jsDate.toISOString().split('T')[0]
              }
              return String(col)
            })
            break
          }
        }

        // Parse data starting from the row after headers, using our extracted headers
        const data = XLSX.utils.sheet_to_json(ws, { 
          range: headerRowIndex + 1,
          header: actualHeaders,
          raw: false
        }) as any[]

        await processRows(data)
      } catch (err) {
        console.error(err)
        alert("Failed to parse Excel file. Please ensure it matches the template format.")
      } finally {
        setLoading(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    processFile(file)
  }

  const processRows = async (data: any[]) => {
    const rows: PreviewRow[] = []
    
    // Pass 1: Basic validation and resolution
    data.forEach((row, index) => {
      // Find employee info
      const code = String(row['Employee Code'] || '').trim()
      const name = String(row['Employee Name'] || '').trim()

      // Skip completely empty rows or legend rows
      if (!code && !name) return
      if (code.toLowerCase().includes('legend')) return
      if (row['Employee Code'] === 'Attendance Export' || row['Employee Code'] === 'Attendance Template') return

      let employeeId: string | null = null
      let codeErrors: string[] = []
      let codeWarnings: string[] = []
      let codeState: PreviewRow['state'] = 'NEW'

      // Validate Code
      if (!code) {
        codeErrors.push("Missing Employee Code")
        codeState = 'INVALID'
      } else {
        const emp = employees.find(e => e.employee_code === code)
        if (!emp) {
          codeErrors.push(`Employee Code ${code} does not exist`)
          codeState = 'INVALID'
        } else {
          employeeId = emp.id
          // Check Name Warning
          const dbName = `${emp.first_name} ${emp.last_name}`.trim()
          if (name && name.toLowerCase() !== dbName.toLowerCase()) {
            codeWarnings.push(`Name mismatch: DB has "${dbName}"`)
          }
        }
      }

      // Iterate over date columns
      Object.keys(row).forEach(key => {
        // Exclude known non-date headers
        if (key === 'Employee Code' || key === 'Employee Name') return

        const rawVal = row[key]
        const status = String(rawVal || '').trim()

        // Ignore blank cells
        if (!status) return

        let pRow: PreviewRow = {
          id: Math.random().toString(36).substring(7),
          originalRowNumber: index + 2,
          employeeCode: code,
          employeeName: name,
          date: '',
          status: status,
          notes: '',
          employeeId: employeeId,
          state: codeState,
          errors: [...codeErrors],
          warnings: [...codeWarnings]
        }

        // Validate Date header
        let parsedDate = key
        
        // If it's already YYYY-MM-DD from our extractor, leave it alone to avoid JS timezone shifts
        if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
          parsedDate = key
        }
        // If it looks like a number (excel date format might bubble up)
        else if (!isNaN(Number(key)) && Number(key) > 20000 && Number(key) < 50000) { 
          const jsDate = new Date((Number(key) - (25567 + 2)) * 86400 * 1000)
          parsedDate = jsDate.toISOString().split('T')[0]
        } 
        else {
          const d = new Date(key)
          if (isNaN(d.getTime())) {
            pRow.errors.push(`Invalid Date header format: "${key}"`)
            pRow.state = 'INVALID'
          } else {
            // Local date extraction for user-typed strings like "Sep 1, 2026"
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            parsedDate = `${year}-${month}-${day}`
          }
        }
        pRow.date = parsedDate

        // Validate Status
        if (!['Present', 'Absent'].includes(status)) {
          pRow.errors.push(`Invalid Status "${status}". Must be Present or Absent.`)
          pRow.state = 'INVALID'
        }

        rows.push(pRow)
      })
    })

    // Pass 2: Detect file duplicates (IMPORT DUPLICATE)
    const comboMap = new Map<string, PreviewRow[]>()
    rows.forEach(r => {
      if (r.employeeCode && r.date) {
        const key = `${r.employeeCode}_${r.date}`
        if (!comboMap.has(key)) comboMap.set(key, [])
        comboMap.get(key)!.push(r)
      }
    })

    for (const [, duplicates] of comboMap.entries()) {
      if (duplicates.length > 1) {
        duplicates.forEach(d => {
          if (d.state !== 'INVALID') {
            d.state = 'IMPORT DUPLICATE'
            d.errors.push("Duplicate employee + date within the uploaded file")
          }
        })
      }
    }

    // Pass 3: Database Conflicts
    const validRowsToImport = rows.filter(r => r.state === 'NEW' && r.employeeId && r.date && r.status)
    if (validRowsToImport.length > 0) {
      const payload = validRowsToImport.map(r => ({
        employee_id: r.employeeId!,
        work_date: r.date,
        status: r.status,
        notes: r.notes
      }))

      const { success, conflicts } = await previewAttendanceImport(payload)
      
      if (success && conflicts) {
        const conflictSet = new Set(conflicts)
        rows.forEach(r => {
          if (r.state === 'NEW' && r.employeeId) {
            const key = `${r.employeeId}_${r.date}`
            if (conflictSet.has(key)) {
              r.state = 'CONFLICT'
            }
          }
        })
      }
    }

    setPreviewRows(rows)
    setStep(2)
  }

  const handleImport = async () => {
    const validRows = previewRows.filter(r => r.state === 'NEW' && r.employeeId)
    if (validRows.length === 0) {
      alert("No valid new records to import.")
      return
    }

    setLoading(true)
    const payload = validRows.map(r => ({
      employee_id: r.employeeId!,
      work_date: r.date,
      status: r.status,
      notes: r.notes
    }))

    const res = await bulkImportAttendance(payload)
    setLoading(false)

    if (res.success) {
      alert(`Successfully imported ${res.insertedCount} attendance records.`)
      onSaved()
      onOpenChange(false)
    } else {
      alert(`Import failed: ${res.error}`)
    }
  }

  const reset = () => {
    setStep(1)
    setPreviewRows([])
  }

  const validCount = previewRows.filter(r => r.state === 'NEW').length
  const conflictCount = previewRows.filter(r => r.state === 'CONFLICT').length
  const errorCount = previewRows.filter(r => r.state === 'INVALID' || r.state === 'IMPORT DUPLICATE').length

  return (
    <Dialog open={open} onOpenChange={(v) => { if(!loading) { onOpenChange(v); if(!v) setTimeout(reset, 300) } }}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import Attendance</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Upload your completed attendance Excel template." : "Review your records before confirming the import."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div 
            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'bg-primary/5 border-primary' : 'border-slate-200 bg-slate-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUp className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">Select Excel File</h3>
            <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">
              Must be a .xlsx file formatted exactly like the downloadable template.
            </p>
            <input 
              type="file" 
              accept=".xlsx, .xls"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Processing..." : "Browse Files"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg flex-1">
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <div className="font-bold">{validCount}</div>
                  <div className="text-xs">Valid (New)</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-lg flex-1">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <div className="font-bold">{conflictCount}</div>
                  <div className="text-xs">Conflicts (Skipped)</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg flex-1">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <div className="font-bold">{errorCount}</div>
                  <div className="text-xs">Errors (Skipped)</div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto border border-slate-200 rounded-lg relative min-h-[300px]">
              <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                  <TableRow>
                    <TableHead className="w-[60px]">Row</TableHead>
                    <TableHead>Employee Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>State</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewRows.map((r, i) => (
                    <TableRow key={i} className={r.state !== 'NEW' ? 'bg-slate-50/50 text-slate-500' : ''}>
                      <TableCell>{r.originalRowNumber}</TableCell>
                      <TableCell className="font-mono text-xs">{r.employeeCode}</TableCell>
                      <TableCell>
                        {r.employeeName}
                        {r.warnings.length > 0 && (
                          <div className="text-[10px] text-amber-600 flex items-center mt-1">
                            <Info className="w-3 h-3 mr-1" /> {r.warnings.join(', ')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.status}</TableCell>
                      <TableCell>
                        {r.state === 'NEW' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">NEW</span>}
                        {r.state === 'CONFLICT' && (
                          <span className="inline-flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">CONFLICT</span>
                            <span className="text-[10px] text-amber-700">Already exists in DB</span>
                          </span>
                        )}
                        {(r.state === 'INVALID' || r.state === 'IMPORT DUPLICATE') && (
                          <span className="inline-flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">{r.state}</span>
                            {r.errors.map((e, idx) => <span key={idx} className="text-[10px] text-red-700">{e}</span>)}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {previewRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">No data found in file.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          {step === 2 && (
             <Button onClick={handleImport} disabled={loading || validCount === 0}>
               {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
               Import {validCount} Record{validCount !== 1 ? 's' : ''}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
