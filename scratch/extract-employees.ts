import * as fs from 'fs';

const seedPath = './supabase/seed-utf8.sql';
const outputPath = './employee-seed.sql';

const content = fs.readFileSync(seedPath, 'utf8');

const extractInsert = (tableName: string) => {
    const regex = new RegExp(`INSERT INTO "public"."${tableName}"[\\s\\S]*?;`, 'g');
    const match = content.match(regex);
    return match ? match.join('\n\n') : '';
};

const employeesSql = extractInsert('employees');
const compHistorySql = extractInsert('employee_compensation_history');
const departmentsSql = extractInsert('departments');
const positionsSql = extractInsert('positions');

fs.writeFileSync(outputPath, `-- Departments\n${departmentsSql}\n\n-- Positions\n${positionsSql}\n\n-- Employees Data\n${employeesSql}\n\n-- Compensation History Data\n${compHistorySql}\n`);
console.log('Successfully generated employee-seed.sql');
