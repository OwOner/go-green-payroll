import Decimal from "decimal.js";

// -----------------------------------------------------------------------------
// ENUMS & PRIMITIVES
// -----------------------------------------------------------------------------
export type PayFrequency = "Daily" | "Weekly" | "Semi-Monthly" | "Monthly";
export type EmploymentType = "Regular" | "Probationary" | "Contractual" | "Part-Time";

// -----------------------------------------------------------------------------
// PAYROLL CONTEXT
// -----------------------------------------------------------------------------
export interface PayrollPeriod {
  id: string;
  period_start: string; // YYYY-MM-DD
  period_end: string;   // YYYY-MM-DD
  pay_frequency: PayFrequency;
}

export interface EmployeeCompensation {
  id: string;
  effective_from: string;
  effective_to: string | null;
  rate_type: "Monthly" | "Daily";
  amount: Decimal;
}

export interface EmployeeData {
  id: string;
  first_name: string;
  last_name: string;
  employment_type: EmploymentType;
  history: EmployeeCompensation[];
}

export interface AttendanceRecord {
  id: string;
  work_date: string;
  status: string; // 'Present' | 'Absent'
}

export interface HolidayRecord {
  id: string;
  date: string;
  name: string;
}

export interface ManualDeduction {
  id?: string;
  description: string;
  amount: Decimal;
}

export interface CashAdvance {
  id: string;
  amount: Decimal;
  repayment_amount_per_payroll: Decimal;
  remaining_balance: Decimal;
  reason?: string;
}

/**
 * The unified context object containing all required inputs to run a deterministic calculation
 * for a single employee in a single payroll period under the simplified Present/Absent system.
 */
export interface PayrollContext {
  employee: EmployeeData;
  period: PayrollPeriod;
  attendance: AttendanceRecord[];
  holidays: HolidayRecord[];
  holidayExemptions: string[]; // Array of holiday IDs the employee is exempt from
  manualDeductions: ManualDeduction[];
  cashAdvances?: CashAdvance[];
  standardWorkingDays: Decimal; // Usually 26.00
}

// -----------------------------------------------------------------------------
// CALCULATION RESULTS
// -----------------------------------------------------------------------------
export interface DeductionResult {
  type: string;
  description: string;
  amount: Decimal; 
  source?: string;
  source_id?: string;
}

export interface EarningResult {
  type: string;
  description: string;
  amount: Decimal;
}

export interface PayrollCalculationResult {
  employee_id: string;
  payroll_period_id: string;
  
  // Attendance Summary
  present_days: number;
  absent_days: number;
  holiday_days: number;
  paid_days: number;
  
  // Breakdown
  earnings: EarningResult[]; // usually just one "Basic Pay"
  deductions: DeductionResult[];
  
  // Aggregates
  basic_pay: Decimal;
  total_deductions: Decimal;
  net_pay: Decimal;
  
  // Metadata
  calculation_engine_version: string;
}
