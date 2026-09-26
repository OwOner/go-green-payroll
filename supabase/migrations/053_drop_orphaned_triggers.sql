-- Migration 053: Drop orphaned triggers left behind by the hard downgrade (migration 051)
-- Migration 051 dropped the timesheets, timesheet_details, and related tables,
-- but did NOT drop the triggers that reference them. This migration cleans them up.

-- 1. Drop the staleness trigger on attendance_records -> timesheets
--    (timesheets table was dropped in 051, so this trigger crashes on every attendance save)
DROP TRIGGER IF EXISTS trigger_mark_timesheet_stale ON public.attendance_records;
DROP FUNCTION IF EXISTS public.mark_timesheet_stale();

-- 2. Drop the immutability function that referenced the now-gone timesheets table
DROP FUNCTION IF EXISTS public.check_timesheet_immutability();

-- 3. Drop triggers for statutory tables dropped in 051
--    (government_contribution_tables, philhealth_configs, pagibig_configs, brackets were all dropped)
DROP FUNCTION IF EXISTS public.check_config_immutability() CASCADE;
DROP FUNCTION IF EXISTS public.check_bracket_immutability() CASCADE;

-- 4. Drop immutability triggers for statutory schedules (dropped in 051)
DROP FUNCTION IF EXISTS public.check_schedule_immutability() CASCADE;
DROP FUNCTION IF EXISTS public.check_allocation_immutability() CASCADE;
