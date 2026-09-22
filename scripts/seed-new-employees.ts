import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { format, subDays } from 'date-fns';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const employeesToSeed = [
  "Anjelo Cochico",
  "Christian Genesis Valladolid",
  "Daniel Labayo",
  "Danillo Labayo",
  "Erezon Banares",
  "Japhet Palmares",
  "Jay-ar Lacay",
  "Jerome Bajaro",
  "John Lloyd Navarro",
  "John Paul Espano",
  "John Rey Balderama",
  "Julius Lawrence Fortajada",
  "Ramon Adion"
];

async function seed() {
  console.log("Starting Destructive Wipe...");

  // WIPE DATA
  await supabase.from('attendance_records').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared attendance");
  await supabase.from('employee_compensation_history').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared employee_compensation_history");
  await supabase.from('payroll_records').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared payroll records");
  await supabase.from('payroll_runs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared payroll runs");
  await supabase.from('cash_advances').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared cash advances");
  await supabase.from('employees').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared employees");

  console.log("Seeding New Employees...");

  const baseRate = 500; // default daily rate
  const insertedEmployees = [];

  for (let i = 0; i < employeesToSeed.length; i++) {
    const fullName = employeesToSeed[i];
    const parts = fullName.split(' ');
    // Handle multi-word last names if needed, but simple split for now:
    const firstName = parts.slice(0, -1).join(' ') || fullName;
    const lastName = parts.slice(-1)[0] || '';
    
    const empCode = `EMP-${String(i + 1).padStart(3, '0')}`;

    const { data: emp, error } = await supabase.from('employees').insert({
      employee_code: empCode,
      first_name: firstName,
      last_name: lastName,
      employment_status: 'Active',
      employment_type: 'Daily',
      date_hired: '2026-01-01'
    }).select().single();

    if (error) {
      console.error(`Error inserting ${fullName}:`, error);
      continue;
    }
    console.log(`Inserted ${empCode} - ${fullName}`);
    insertedEmployees.push(emp);

    // Insert compensation
    const { error: compError } = await supabase.from('employee_compensation_history').insert({
      employee_id: emp.id,
      amount: baseRate + (i * 10), // Give them slightly different rates just for variety
      rate_type: 'daily',
      effective_from: '2026-01-01',
      salary_type: 'Daily',
      basic_salary: 0,
      pay_frequency: 'Weekly'
    });
    
    if (compError) {
      console.error(`Error inserting compensation for ${empCode}:`, compError);
    }
  }

  console.log("Seeding Attendance Dates for September 2026...");
  
  // Seed attendance for Sept 1 to Sept 15
  const attendanceToInsert = [];
  
  for (const emp of insertedEmployees) {
    // Generate dates from Sep 1 to Sep 15
    for (let day = 1; day <= 15; day++) {
      const dateStr = `2026-09-${String(day).padStart(2, '0')}`;
      const isWeekend = new Date(dateStr).getDay() === 0 || new Date(dateStr).getDay() === 6;
      
      // Randomly make them absent sometimes (mostly present)
      const isAbsent = !isWeekend && Math.random() > 0.9;
      
      if (!isWeekend) {
        attendanceToInsert.push({
          employee_id: emp.id,
          work_date: dateStr,
          status: isAbsent ? 'Absent' : 'Present',
          source: 'manual_entry'
        });
      }
    }
  }

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < attendanceToInsert.length; i += batchSize) {
    const batch = attendanceToInsert.slice(i, i + batchSize);
    const { error } = await supabase.from('attendance_records').insert(batch);
    if (error) {
      console.error("Error inserting attendance batch:", error);
    }
  }
  
  console.log("Seeded attendance records.");
  console.log("Done!");
}

seed().catch(console.error);
