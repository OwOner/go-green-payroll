import { authorizeModule } from "@/lib/supabase/server"
import AttendanceClient from "./attendance-client"
import { fetchCurrentPayrollPeriod } from "./actions"

export default async function AttendancePage() {
  await authorizeModule('attendance')
  const { startDate, endDate } = await fetchCurrentPayrollPeriod()
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Manage daily attendance records (Present / Absent) for payroll.
        </p>
      </div>

      <AttendanceClient initialStartDate={startDate} initialEndDate={endDate} />
    </div>
  )
}
