import { NextResponse } from "next/server";
import { loadPayrollContext } from "@/lib/payroll/service";
import { calculatePayroll } from "@/lib/payroll/engine";

export async function GET(request: Request) {
  try {
    const empId = "926fa8c6-ce8e-4554-830a-c1f58cf77200"; // Ramon Adion
    const start = "2026-08-30";
    const end = "2026-09-05";
    const freq = "Weekly";

    const ctx = await loadPayrollContext(empId, start, end, freq as any);
    const res = calculatePayroll(ctx);

    return NextResponse.json({
      success: true,
      gross_pay: res.basic_pay,
      policy: null,
      history: ctx.employee.history,
      earnings: res.earnings
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
  }
}
