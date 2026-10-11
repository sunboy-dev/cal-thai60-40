import { MAX_FULL_SUPPORT_S, type Calc, type SplitPlan } from '../lib/calc';
import { baht } from '../lib/format';

interface Props {
  plan: SplitPlan;
  now: Calc;
  onApply: () => void;
}

export default function SplitTip({ plan, now, onApply }: Props) {
  return (
    <aside className="tip">
      <h2 className="tip__title">แบ่งซื้อ {plan.days.length} วัน คุ้มกว่า</h2>
      <p className="tip__body">
        ซื้อวันละไม่เกิน <span className="num">{baht(MAX_FULL_SUPPORT_S)}</span> รัฐช่วยเต็ม 200 บาททุกวัน
        เติมเองรวม <span className="num">{baht(plan.youTotalS)}</span> แทน{' '}
        <span className="num">{baht(now.youS)}</span> ประหยัด <span className="num">{baht(plan.savingS)}</span>
      </p>
      <button type="button" className="link-btn" onClick={onApply}>
        ตั้งยอดเป็น {baht(MAX_FULL_SUPPORT_S)}
      </button>
    </aside>
  );
}
