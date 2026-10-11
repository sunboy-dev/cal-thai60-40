import type { Satang } from './calc';

const two = new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const trim = new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 });

/** 10000 -> "100.00" */
export const fmt = (s: Satang): string => two.format(s / 100);
/** 10000 -> "฿100.00" */
export const baht = (s: Satang): string => `฿${fmt(s)}`;
/** 15000 -> "150" (ตัดทศนิยมที่ไม่จำเป็น) */
export const fmtShort = (s: Satang): string => trim.format(s / 100);

/** รับเฉพาะตัวเลข ทศนิยมไม่เกิน 2 ตำแหน่ง ไม่เกิน 6 หลัก */
export function sanitizeAmount(input: string): string {
  const cleaned = input.replace(/,/g, '').replace(/[^\d.]/g, '');
  const [intPart = '', ...rest] = cleaned.split('.');
  const int = intPart.replace(/^0+(?=\d)/, '').slice(0, 6);
  if (rest.length === 0) return int;
  return `${int || '0'}.${rest.join('').slice(0, 2)}`;
}

export const parseAmount = (raw: string): number => {
  const n = Number(raw);
  return raw === '' || raw === '.' || !Number.isFinite(n) ? 0 : n;
};
