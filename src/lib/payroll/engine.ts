import Decimal from "decimal.js";
import { 
  PayrollContext, 
  PayrollCalculationResult, 
  EarningResult, 
  DeductionResult 
} from "./types";

export const CALCULATION_ENGINE_VERSION = "3.0.0-simple";

export function calculatePayroll(context: PayrollContext): PayrollCalculationResult {
  if (!context.employee.history || context.employee.history.length === 0) {
    throw new Error(`No compensation history found for employee ${context.employee.id}.`);
  }

  const activeComp = context.employee.history[0]; // Assuming pre-filtered active comp
  const amount = activeComp.amount;
  const rateType = activeComp.rate_type;

  // 1. Calculate Attendance Days
  let presentDays = 0;
  let absentDays = 0;

  // We explicitly check for 'Present' and 'Absent'. Missing records are ignored.
  const presentDates = new Set<string>();
  for (const record of context.attendance) {
    if (record.status === 'Present') {
      presentDays++;
      presentDates.add(record.work_date);
    } else if (record.status === 'Absent') {
      absentDays++;
    }
  }

  // 2. Calculate Holiday Days (no double counting)
  let holidayDays = 0;
  for (const holiday of context.holidays) {
    const isExempt = context.holidayExemptions.includes(holiday.id);
    const hasPresentRecord = presentDates.has(holiday.date);

    if (isExempt) {
      // If exempt, they only get paid if they actually worked (Present).
      // If they were present, it's already counted in presentDays. We don't add to holidayDays.
      // So holidayDays += 0
    } else {
      // If not exempt, the holiday is paid.
      // But if they were ALSO present, we don't want to double count the day in paid_days.
      // So if hasPresentRecord is true, presentDays already has it. We shouldn't add to paidDays twice.
      // To keep semantics clean: "A holiday should not also increase Present Days unless the employee actually has a Present attendance record."
      // So we just count it as a Holiday Day if it's NOT already counted as a Present day, or we count it as a Holiday Day but ensure Paid Days = Present + Holiday - Overlap.
      // Actually, user said: "If an applicable holiday falls on a day with Present attendance, Present Days = 1, Holiday Days = 1, Paid Days = 1."
      holidayDays++;
    }
  }

  // Calculate total Paid Days (avoiding double counting)
  // We can just iterate over all dates that are either a Present day or an applicable Holiday day.
  const paidDates = new Set<string>(presentDates);
  for (const holiday of context.holidays) {
    const isExempt = context.holidayExemptions.includes(holiday.id);
    if (!isExempt) {
      paidDates.add(holiday.date);
    }
  }
  const paidDays = paidDates.size;

  // If there are no attendance records and no holidays, paid days is 0.
  
  // 3. Calculate Basic Pay
  let basicPay = new Decimal(0);
  if (rateType === 'Monthly') {
    // basic_pay = (monthly_rate / standard_working_days_per_period) * paid_days
    const dailyEquivalent = amount.dividedBy(context.standardWorkingDays);
    basicPay = dailyEquivalent.times(paidDays).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  } else {
    // basic_pay = daily_rate * paid_days
    basicPay = amount.times(paidDays).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  }

  const earnings: EarningResult[] = [
    {
      type: "Basic Pay",
      description: "Basic Pay",
      amount: basicPay
    }
  ];

  // 4. Manual Deductions
  const deductions: DeductionResult[] = [];
  let totalDeductions = new Decimal(0);

  for (const manualDed of context.manualDeductions) {
    deductions.push({
      type: "Manual",
      description: manualDed.description,
      amount: manualDed.amount,
      source: "Manual",
      source_id: manualDed.id
    });
    totalDeductions = totalDeductions.plus(manualDed.amount);
  }

  // 5. Cash Advances (protected by available net pay)
  let availableNetPay = basicPay.sub(totalDeductions);
  if (availableNetPay.lessThan(0)) availableNetPay = new Decimal(0);

  if (context.cashAdvances && context.cashAdvances.length > 0) {
    for (const ca of context.cashAdvances) {
      if (ca.remaining_balance.greaterThan(0) && availableNetPay.greaterThan(0)) {
        let repayment = ca.repayment_amount_per_payroll;
        if (ca.remaining_balance.lessThan(repayment)) repayment = ca.remaining_balance;
        if (repayment.greaterThan(availableNetPay)) repayment = availableNetPay;

        deductions.push({
          type: "Loan",
          description: `Cash Advance Repayment${ca.reason ? ` - ${ca.reason}` : ''}`,
          amount: repayment,
          source: "Cash Advance",
          source_id: ca.id
        });
        
        totalDeductions = totalDeductions.plus(repayment);
        availableNetPay = availableNetPay.sub(repayment);
      }
    }
  }

  // 6. Final Net Pay
  let netPay = basicPay.sub(totalDeductions);
  if (netPay.lessThan(0)) netPay = new Decimal(0);

  return {
    employee_id: context.employee.id,
    payroll_period_id: context.period.id,
    
    present_days: presentDays,
    absent_days: absentDays,
    holiday_days: holidayDays,
    paid_days: paidDays,
    
    earnings,
    deductions,
    
    basic_pay: basicPay,
    total_deductions: totalDeductions,
    net_pay: netPay,
    
    calculation_engine_version: CALCULATION_ENGINE_VERSION
  };
}
