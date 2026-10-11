import { describe, expect, it } from 'vitest';
import { calculate, splitPlan } from './calc';

describe('calculate', () => {
  it('แบ่ง 60/40 ปกติ', () => {
    expect(calculate(100)).toMatchObject({ govS: 6000, youS: 4000, capped: false });
    expect(calculate(250)).toMatchObject({ govS: 15000, youS: 10000, capped: false });
  });
  it('333.33 รัฐช่วยเต็ม 200 และเติมเอง 133.33', () => {
    expect(calculate(333.33)).toMatchObject({ govS: 20000, youS: 13333, capped: false });
  });
  it('เกินเพดานรายวัน', () => {
    expect(calculate(500)).toMatchObject({ govS: 20000, youS: 30000, capped: true });
  });
  it('ค่าว่าง/ติดลบ = 0', () => {
    expect(calculate(NaN).priceS).toBe(0);
    expect(calculate(-5).priceS).toBe(0);
  });
});

describe('splitPlan', () => {
  it('500 บาท แบ่ง 2 วัน เติมเอง 200 ประหยัด 100', () => {
    const plan = splitPlan(500)!;
    expect(plan.days).toHaveLength(2);
    expect(plan.youTotalS).toBe(20000);
    expect(plan.savingS).toBe(10000);
  });
  it('ไม่เกินเพดาน = ไม่มีแผน', () => {
    expect(splitPlan(300)).toBeNull();
  });
});
