"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Ban, Undo2, PlusCircle, MinusCircle } from "lucide-react"
import { togglePayrollItemExclusion } from "./actions"
import { addRunDeduction, addRunBonus } from "./override-actions"

export default function PayrollItemExclusionAction({ 
  itemId, 
  runId, 
  status, 
  isExcluded 
}: { 
  itemId: string; 
  runId: string; 
  status: string; 
  isExcluded: boolean;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeductionDialogOpen, setIsDeductionDialogOpen] = useState(false)
  const [isBonusDialogOpen, setIsBonusDialogOpen] = useState(false)
  const [reason, setReason] = useState("")
  
  const [deductionDescription, setDeductionDescription] = useState("")
  const [deductionAmount, setDeductionAmount] = useState("")
  
  const [bonusDescription, setBonusDescription] = useState("")
  const [bonusAmount, setBonusAmount] = useState("")
  
  const [loading, setLoading] = useState(false)

  // Only allow excluding/including if status is Draft
  if (status !== 'Draft') {
    return null;
  }

  const handleToggle = async () => {
    if (!isExcluded && !reason.trim()) return;
    
    setLoading(true)
    await togglePayrollItemExclusion(itemId, runId, !isExcluded, reason)
    setLoading(false)
    setIsDialogOpen(false)
    setReason("")
  }

  const handleAddDeduction = async () => {
    if (!deductionDescription.trim() || !deductionAmount) return;
    setLoading(true)
    await addRunDeduction(itemId, runId, deductionDescription, Number(deductionAmount))
    setLoading(false)
    setIsDeductionDialogOpen(false)
    setDeductionDescription("")
    setDeductionAmount("")
  }

  const handleAddBonus = async () => {
    if (!bonusDescription.trim() || !bonusAmount) return;
    setLoading(true)
    await addRunBonus(itemId, runId, bonusDescription, Number(bonusAmount))
    setLoading(false)
    setIsBonusDialogOpen(false)
    setBonusDescription("")
    setBonusAmount("")
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 h-8 w-8 p-0 text-slate-500 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isExcluded ? (
            <DropdownMenuItem onClick={handleToggle} className="text-emerald-600 cursor-pointer">
              <Undo2 className="mr-2 h-4 w-4" />
              <span>Include in Run</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="text-orange-600 cursor-pointer">
              <Ban className="mr-2 h-4 w-4" />
              <span>Exclude from Run</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsBonusDialogOpen(true)} className="cursor-pointer text-emerald-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Bonus</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeductionDialogOpen(true)} className="cursor-pointer text-red-600">
            <MinusCircle className="mr-2 h-4 w-4" />
            <span>Add Deduction</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exclude Employee From Payroll</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-500 mb-4">
              This will remove the employee's calculation from the totals and reports, but will preserve the calculated line items in case you need to re-include them before approval.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Exclusion</label>
              <Input 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                placeholder="e.g. Resigned, Deferred pay, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>Cancel</Button>
            <Button variant="default" onClick={handleToggle} disabled={!reason.trim() || loading}>
              Confirm Exclusion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeductionDialogOpen} onOpenChange={setIsDeductionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add One-Off Deduction</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-slate-500">
              This deduction will be applied directly to this employee's current payroll run.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={deductionDescription} 
                onChange={(e) => setDeductionDescription(e.target.value)} 
                placeholder="e.g. Late Penalty, Unpaid Leave"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (PHP)</label>
              <Input 
                type="number"
                step="0.01"
                min="0.01"
                value={deductionAmount} 
                onChange={(e) => setDeductionAmount(e.target.value)} 
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeductionDialogOpen(false)} disabled={loading}>Cancel</Button>
            <Button variant="default" onClick={handleAddDeduction} disabled={!deductionDescription.trim() || !deductionAmount || loading}>
              Add Deduction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBonusDialogOpen} onOpenChange={setIsBonusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add One-Off Bonus</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-slate-500">
              This bonus will be applied directly to this employee's current payroll run.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={bonusDescription} 
                onChange={(e) => setBonusDescription(e.target.value)} 
                placeholder="e.g. Performance Bonus, Holiday Pay"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (PHP)</label>
              <Input 
                type="number"
                step="0.01"
                min="0.01"
                value={bonusAmount} 
                onChange={(e) => setBonusAmount(e.target.value)} 
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBonusDialogOpen(false)} disabled={loading}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleAddBonus} disabled={!bonusDescription.trim() || !bonusAmount || loading}>
              Add Bonus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
