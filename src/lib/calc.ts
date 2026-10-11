/**
 * ไทยช่วยไทย พลัส (60/40)
 * รัฐช่วย 60% ของราคาสินค้า แต่ไม่เกิน 200 บาท/วัน และ 1,000 บาท/เดือน
 *
 * เงินทุกจำนวนคิดเป็น "สตางค์" (จำนวนเต็ม) เพื่อเลี่ยงปัญหาทศนิยมของ float
 */
export type Satang = number;

export const GOV_RATE = 0.6;
export const DAILY_CAP = 200; // บาท
export const MONTHLY_CAP = 1000; // บาท

export const toSatang = (baht: number): Satang => Math.round(baht * 100);
export const toBaht = (s: Satang): number => s / 100;

export const DAILY_CAP_S: Satang = toSatang(DAILY_CAP);
/** ยอดซื้อสูงสุดที่รัฐช่วยเต็ม 200 บาท = 200 ÷ 0.60 = 333.33 */
export const MAX_FULL_SUPPORT_S: Satang = Math.floor(DAILY_CAP_S / GOV_RATE);

/** ใช้สิทธิเต็มเดือน: ซื้อรวม 1,666.67 / เติมเอง 666.67 */
export const FULL_MONTH_BUY_S: Satang = Math.round(toSatang(MONTHLY_CAP) / GOV_RATE);
export const FULL_MONTH_YOU_S: Satang = FULL_MONTH_BUY_S - toSatang(MONTHLY_CAP);

export interface Calc {
  priceS: Satang;
  govS: Satang;
  youS: Satang;
  /** true เมื่อรัฐช่วยเต็มเพดานรายวันแล้ว ส่วนเกินผู้ใช้จ่ายเอง */
  capped: boolean;
}

export function calculate(priceBaht: number): Calc {
  const priceS = Number.isFinite(priceBaht) && priceBaht > 0 ? toSatang(priceBaht) : 0;
  const rawGov = Math.round(priceS * GOV_RATE);
  const govS = Math.min(rawGov, DAILY_CAP_S);
  return { priceS, govS, youS: priceS - govS, capped: rawGov > DAILY_CAP_S };
}

export interface SplitPlan {
  days: Calc[];
  youTotalS: Satang;
  savingS: Satang;
}

/**
 * ถ้ายอดเกินเพดานรายวัน ลองแบ่งซื้อวันละไม่เกิน 333.33 แล้วเทียบว่าเติมเองถูกลงเท่าไหร่
 * (ยังไม่นับเพดานรายเดือน 1,000 บาท)
 */
export function splitPlan(priceBaht: number): SplitPlan | null {
  const full = calculate(priceBaht);
  if (!full.capped) return null;

  const days: Calc[] = [];
  let left = full.priceS;
  while (left > 0) {
    const chunk = Math.min(left, MAX_FULL_SUPPORT_S);
    days.push(calculate(toBaht(chunk)));
    left -= chunk;
  }
  const youTotalS = days.reduce((sum, d) => sum + d.youS, 0);
  return { days, youTotalS, savingS: full.youS - youTotalS };
}
