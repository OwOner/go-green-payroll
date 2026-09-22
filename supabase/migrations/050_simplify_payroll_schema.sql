-- 050_simplify_payroll_schema.sql

-- 1. attendance_records
-- Deprecate time-based columns by dropping NOT NULL constraints
ALTER TABLE public.attendance_records
  ALTER COLUMN time_in DROP NOT NULL,
  ALTER COLUMN time_out DROP NOT NULL,
  ALTER COLUMN regular_hours DROP NOT NULL,
  ALTER COLUMN overtime_hours DROP NOT NULL,
  ALTER COLUMN night_differential_hours DROP NOT NULL,
  ALTER COLUMN is_rest_day DROP NOT NULL;

-- User instruction: "leave the new status nullable for historical records if ambiguous"
-- The original table had `status TEXT NOT NULL`
ALTER TABLE public.attendance_records ALTER COLUMN status DROP NOT NULL;

-- Nullify historical ambiguous statuses, keeping only 'Present' and 'Absent' intact if they exist.
UPDATE public.attendance_records 
SET status = NULL 
WHERE status NOT IN ('Present', 'Absent');

-- 2. employee_compensation_history
ALTER TABLE public.employee_compensation_history 
  ADD COLUMN IF NOT EXISTS rate_type TEXT,
  ADD COLUMN IF NOT EXISTS amount NUMERIC(12,2);

-- Migrate existing salary_type and basic_salary/daily_rate data
UPDATE public.employee_compensation_history 
SET rate_type = CASE WHEN salary_type = 'Daily' THEN 'Daily' ELSE 'Monthly' END,
    amount = CASE WHEN salary_type = 'Daily' THEN COALESCE(daily_rate, COALESCE(basic_salary, 0)) ELSE COALESCE(basic_salary, COALESCE(daily_rate, 0)) END
WHERE rate_type IS NULL;

-- 3. payroll_items
ALTER TABLE public.payroll_items 
  RENAME COLUMN gross_pay TO basic_pay;

-- User instruction: "leave deprecated fields NULL for new records where possible"
ALTER TABLE public.payroll_items
  ALTER COLUMN taxable_income DROP NOT NULL,
  ALTER COLUMN non_taxable_income DROP NOT NULL,
  ALTER COLUMN withholding_tax DROP NOT NULL,
  ALTER COLUMN calculation_engine_version DROP NOT NULL;

-- Add simple attendance summary for the register
ALTER TABLE public.payroll_items
  ADD COLUMN IF NOT EXISTS present_days NUMERIC(8,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS absent_days NUMERIC(8,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS holiday_days NUMERIC(8,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS paid_days NUMERIC(8,2) DEFAULT 0;

-- 4. holiday_exemptions
CREATE TABLE IF NOT EXISTS public.holiday_exemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    holiday_id UUID NOT NULL REFERENCES public.holidays(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(holiday_id, employee_id)
);

ALTER TABLE public.holiday_exemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view holiday exemptions" ON public.holiday_exemptions FOR SELECT USING (true);
CREATE POLICY "Admins can manage holiday exemptions" ON public.holiday_exemptions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.roles r JOIN public.profiles p ON p.role_id = r.id WHERE p.id = auth.uid() AND r.name IN ('Super Admin', 'Payroll Admin', 'HR Admin'))
);

-- 5. company_settings
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS standard_working_days_per_period NUMERIC(8,2) DEFAULT 26.00;
