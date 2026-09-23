-- Migration 051: Hard Downgrade to Simple Present/Absent System
-- Drops tax and statutory engines, complex work policies, leave requests, and timesheets.
-- Simplifies payroll calculation to Basic Pay + Manual Deductions.

-- 1. Drop unused subsystems
DROP TABLE IF EXISTS payroll_earnings CASCADE;
DROP TABLE IF EXISTS pagibig_configs CASCADE;
DROP TABLE IF EXISTS philhealth_configs CASCADE;
DROP TABLE IF EXISTS employee_statutory_profiles CASCADE;
DROP TABLE IF EXISTS statutory_schedule_allocations CASCADE;
DROP TABLE IF EXISTS company_statutory_schedules CASCADE;
DROP TABLE IF EXISTS government_contribution_brackets CASCADE;
DROP TABLE IF EXISTS government_contribution_tables CASCADE;
DROP TABLE IF EXISTS tax_brackets CASCADE;
DROP TABLE IF EXISTS tax_tables CASCADE;
DROP TABLE IF EXISTS leave_requests CASCADE;
DROP TABLE IF EXISTS employee_leave_balances CASCADE;
DROP TABLE IF EXISTS leave_types CASCADE;
DROP TABLE IF EXISTS timesheet_status_history CASCADE;
DROP TABLE IF EXISTS timesheet_details CASCADE;
DROP TABLE IF EXISTS timesheets CASCADE;
DROP TABLE IF EXISTS employee_work_policies CASCADE;
DROP TABLE IF EXISTS work_policies CASCADE;

-- 2. Simplify attendance_records
ALTER TABLE public.attendance_records
  DROP COLUMN IF EXISTS time_in,
  DROP COLUMN IF EXISTS time_out,
  DROP COLUMN IF EXISTS regular_hours,
  DROP COLUMN IF EXISTS overtime_hours,
  DROP COLUMN IF EXISTS night_differential_hours,
  DROP COLUMN IF EXISTS is_rest_day,
  DROP COLUMN IF EXISTS project_id;

-- Re-tighten status constraint (clean up any NULLs first, default to Present if they existed without status)
UPDATE public.attendance_records SET status = 'Present' WHERE status IS NULL;
ALTER TABLE public.attendance_records
  ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.attendance_records
  ADD CONSTRAINT chk_attendance_status CHECK (status IN ('Present', 'Absent'));

-- 3. Simplify employee_compensation_history
ALTER TABLE public.employee_compensation_history
  DROP COLUMN IF EXISTS salary_basis,
  DROP COLUMN IF EXISTS daily_rate,
  DROP COLUMN IF EXISTS weekly_rate,
  DROP COLUMN IF EXISTS hourly_rate,
  DROP COLUMN IF EXISTS salary_type,
  DROP COLUMN IF EXISTS basic_salary;

-- The rate_type and amount were populated in 050, so we just enforce them.
ALTER TABLE public.employee_compensation_history
  ALTER COLUMN rate_type SET NOT NULL,
  ALTER COLUMN amount SET NOT NULL;

-- 4. Simplify payroll_items
ALTER TABLE public.payroll_items
  DROP COLUMN IF EXISTS taxable_income,
  DROP COLUMN IF EXISTS non_taxable_income,
  DROP COLUMN IF EXISTS withholding_tax,
  DROP COLUMN IF EXISTS tax_table_id,
  DROP COLUMN IF EXISTS pagibig_config_id,
  DROP COLUMN IF EXISTS philhealth_config_id,
  DROP COLUMN IF EXISTS statutory_schedule_id;

-- Ensure present_days, absent_days, holiday_days, paid_days exist and are NOT NULL
UPDATE public.payroll_items SET present_days = 0 WHERE present_days IS NULL;
UPDATE public.payroll_items SET absent_days = 0 WHERE absent_days IS NULL;
UPDATE public.payroll_items SET holiday_days = 0 WHERE holiday_days IS NULL;
UPDATE public.payroll_items SET paid_days = 0 WHERE paid_days IS NULL;

ALTER TABLE public.payroll_items
  ALTER COLUMN present_days SET NOT NULL,
  ALTER COLUMN absent_days SET NOT NULL,
  ALTER COLUMN holiday_days SET NOT NULL,
  ALTER COLUMN paid_days SET NOT NULL;

-- 5. Add holiday_exemptions (already created in 050, but let's ensure it exists just in case)
CREATE TABLE IF NOT EXISTS public.holiday_exemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    holiday_id UUID NOT NULL REFERENCES public.holidays(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(holiday_id, employee_id)
);
ALTER TABLE public.holiday_exemptions ENABLE ROW LEVEL SECURITY;

-- 6. Update holidays
ALTER TABLE public.holidays
  DROP COLUMN IF EXISTS holiday_pay_rule_id;
DROP TABLE IF EXISTS holiday_pay_rules CASCADE;

-- 7. Add standard_working_days_per_period (already in 050, ensure it)
ALTER TABLE public.company_settings 
  ADD COLUMN IF NOT EXISTS standard_working_days_per_period NUMERIC(8,2) DEFAULT 26.00;
