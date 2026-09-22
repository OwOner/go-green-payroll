import { fetchAttendanceMatrix } from '../src/app/(dashboard)/attendance/actions';

async function test() {
  const { employees, records } = await fetchAttendanceMatrix('2026-08-31', '2026-09-29');
  console.log(`Employees: ${employees.length}`);
  console.log(`Records: ${records.length}`);
}

test().catch(console.error);
