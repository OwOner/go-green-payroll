"use server"

export async function getPayrollDiagnostics(runId: string): Promise<{hasBlockingErrors: boolean, errors: any[], warnings: any[]}> {
  // We stripped out the complex tax/statutory engine and reconciliation in the downgrade.
  // Payroll calculation is now a simple Present/Absent system, so there are no blocking 
  // background diagnostics required before approval.
  return {
    hasBlockingErrors: false,
    errors: [],
    warnings: []
  }
}
