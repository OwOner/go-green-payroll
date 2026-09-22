import { calculatePayroll } from "../engine";
import { PayrollContext } from "../types";
import Decimal from "decimal.js";

function getBaseContext(): PayrollContext {
  return {
    employee: {
      id: "emp-1",
      first_name: "Juan",
      last_name: "Dela Cruz",
      employment_type: "Regular",
      history: [
        {
          id: "comp-1",
          effective_from: "2026-01-01",
          effective_to: null,
          rate_type: "Monthly",
          amount: new Decimal(26000), // Makes it easy: 26000 / 26 = 1000 per day
        }
      ]
    },
    period: {
      id: "period-1",
      period_start: "2026-09-01",
      period_end: "2026-09-15",
      pay_frequency: "Semi-Monthly"
    },
    attendance: [],
    holidays: [],
    holidayExemptions: [],
    manualDeductions: [],
    cashAdvances: [],
    standardWorkingDays: new Decimal(26)
  };
}

describe("Simplified Payroll Calculation Engine", () => {
  
  test("Test 1: Normal attendance, no holidays, no deductions", () => {
    const ctx = getBaseContext();
    // 10 Present days
    for (let i = 1; i <= 10; i++) {
      ctx.attendance.push({
        id: `att-${i}`,
        work_date: `2026-09-${i.toString().padStart(2, '0')}`,
        status: "Present"
      });
    }

    const result = calculatePayroll(ctx);
    
    expect(result.present_days).toBe(10);
    expect(result.paid_days).toBe(10);
    // 1000/day * 10 = 10000
    expect(result.basic_pay.toString()).toBe("10000");
    expect(result.total_deductions.toString()).toBe("0");
    expect(result.net_pay.toString()).toBe("10000");
  });

  test("Test 2: Zero attendance gives zero basic pay", () => {
    const ctx = getBaseContext();
    const result = calculatePayroll(ctx);
    
    expect(result.present_days).toBe(0);
    expect(result.paid_days).toBe(0);
    expect(result.basic_pay.toString()).toBe("0");
    expect(result.net_pay.toString()).toBe("0");
  });

  test("Test 3: Applicable holiday on a non-working day (paid)", () => {
    const ctx = getBaseContext();
    // 10 Present days
    for (let i = 1; i <= 10; i++) {
      ctx.attendance.push({
        id: `att-${i}`,
        work_date: `2026-09-${i.toString().padStart(2, '0')}`,
        status: "Present"
      });
    }
    // Holiday on the 11th
    ctx.holidays.push({
      id: "hol-1",
      date: "2026-09-11",
      name: "Special Holiday"
    });

    const result = calculatePayroll(ctx);
    
    expect(result.present_days).toBe(10);
    expect(result.holiday_days).toBe(1);
    expect(result.paid_days).toBe(11);
    expect(result.basic_pay.toString()).toBe("11000");
  });

  test("Test 4: Applicable holiday on a day employee is Present (no double counting)", () => {
    const ctx = getBaseContext();
    // 10 Present days, including the 10th
    for (let i = 1; i <= 10; i++) {
      ctx.attendance.push({
        id: `att-${i}`,
        work_date: `2026-09-${i.toString().padStart(2, '0')}`,
        status: "Present"
      });
    }
    // Holiday ALSO on the 10th
    ctx.holidays.push({
      id: "hol-1",
      date: "2026-09-10",
      name: "Special Holiday"
    });

    const result = calculatePayroll(ctx);
    
    expect(result.present_days).toBe(10);
    expect(result.holiday_days).toBe(1); // It counts as a holiday
    expect(result.paid_days).toBe(10); // But paid days is still 10, no double dip
    expect(result.basic_pay.toString()).toBe("10000");
  });

  test("Test 5: Exempt employee on a holiday (not paid)", () => {
    const ctx = getBaseContext();
    // 10 Present days
    for (let i = 1; i <= 10; i++) {
      ctx.attendance.push({
        id: `att-${i}`,
        work_date: `2026-09-${i.toString().padStart(2, '0')}`,
        status: "Present"
      });
    }
    // Holiday on the 11th
    ctx.holidays.push({
      id: "hol-1",
      date: "2026-09-11",
      name: "Special Holiday"
    });
    // Employee is exempt from this holiday
    ctx.holidayExemptions.push("hol-1");

    const result = calculatePayroll(ctx);
    
    expect(result.present_days).toBe(10);
    expect(result.holiday_days).toBe(0); // Exempt, so not counted as holiday day
    expect(result.paid_days).toBe(10); 
    expect(result.basic_pay.toString()).toBe("10000");
  });

  test("Test 6: Manual deductions apply correctly", () => {
    const ctx = getBaseContext();
    ctx.attendance.push({
      id: "att-1",
      work_date: "2026-09-01",
      status: "Present"
    });
    ctx.manualDeductions.push({
      description: "Loss of tools",
      amount: new Decimal(200)
    });

    const result = calculatePayroll(ctx);
    
    expect(result.basic_pay.toString()).toBe("1000");
    expect(result.total_deductions.toString()).toBe("200");
    expect(result.net_pay.toString()).toBe("800");
  });

  test("Test 7: Cash advance repayment respects available net pay", () => {
    const ctx = getBaseContext();
    // 1 day = 1000 basic pay
    ctx.attendance.push({
      id: "att-1",
      work_date: "2026-09-01",
      status: "Present"
    });
    
    // Repayment wants 500, we have 1000 net pay available -> takes 500
    ctx.cashAdvances.push({
      id: "loan-1",
      amount: new Decimal(2000),
      repayment_amount_per_payroll: new Decimal(500),
      remaining_balance: new Decimal(1000)
    });

    let result = calculatePayroll(ctx);
    expect(result.total_deductions.toString()).toBe("500");
    expect(result.net_pay.toString()).toBe("500");
    
    // Test repayment caps at available net pay
    ctx.cashAdvances[0].repayment_amount_per_payroll = new Decimal(1500);
    result = calculatePayroll(ctx);
    expect(result.total_deductions.toString()).toBe("1000"); // Takes all available net pay
    expect(result.net_pay.toString()).toBe("0");

    // Test repayment caps at remaining balance
    ctx.cashAdvances[0].remaining_balance = new Decimal(250);
    result = calculatePayroll(ctx);
    expect(result.total_deductions.toString()).toBe("250");
    expect(result.net_pay.toString()).toBe("750");
  });

});
