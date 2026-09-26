"use client"

import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateAttendanceRecord } from "./actions"
import { format } from "date-fns"

interface AttendanceDetailDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emp: any
  date: string
  record: any | null
  onSaved: () => void
}

export default function AttendanceDetailDrawer({ open, onOpenChange, emp, date, record, onSaved }: AttendanceDetailDrawerProps) {
  const [status, setStatus] = useState(record?.status || "Present")
  const [remarks, setRemarks] = useState(record?.remarks || "")
  const [reason, setReason] = useState("")
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (record && !reason.trim()) {
      alert("Please provide a reason for this manual correction.")
      return
    }

    setIsSubmitting(true)

    const payload = {
      employee_id: emp.id,
      work_date: date,
      status,
      internal_notes: remarks || null
    }

    const res = await updateAttendanceRecord(record?.id || null, payload, reason)
    setIsSubmitting(false)

    if (res.success) {
      onSaved()
      onOpenChange(false)
    } else {
      alert("Failed to save: " + res.error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[400px] overflow-y-auto">
        <SheetHeader className="px-4 sm:px-6 pt-4 border-b pb-4 mb-4">
          <SheetTitle>Mark Attendance</SheetTitle>
          <SheetDescription>
            {format(new Date(date), 'MMMM d, yyyy')} — {emp.first_name} {emp.last_name}
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 sm:px-6 space-y-6">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Remarks (Optional)</Label>
            <Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="E.g. Arrived late" />
          </div>

          {record && (
            <div className="space-y-2 p-4 border border-slate-200 bg-slate-50 rounded-md mt-4">
              <Label className="text-slate-900 font-semibold">Reason for Correction</Label>
              <p className="text-xs text-muted-foreground mb-2">You are modifying an existing record. A reason is required for the audit trail.</p>
              <Input 
                value={reason} 
                onChange={e => setReason(e.target.value)} 
                placeholder="E.g. Correcting mistake" 
              />
            </div>
          )}
        </div>

        <SheetFooter className="px-4 sm:px-6 pb-6 mt-12">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSubmitting || (record && !reason.trim())}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
