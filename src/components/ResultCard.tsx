import { DAILY_CAP, DAILY_CAP_S, type Calc } from '../lib/calc';
import { baht, fmt, fmtShort } from '../lib/format';

export default function ResultCard({ calc }: { calc: Calc }) {
  const govPct = calc.priceS ? (calc.govS / calc.priceS) * 100 : 60;
  const quotaPct = Math.min(100, (calc.govS / DAILY_CAP_S) * 100);

  return (
    <section className="result" aria-labelledby="result-label">
      <div id="result-label" className="result__label">คุณต้องเติมเงินเข้าเป๋าตัง</div>
      <div className="result__amount num" aria-live="polite">{baht(calc.youS)}</div>

      <div className="split" aria-hidden="true">
        <span className="split__gov" style={{ width: `${govPct}%` }} />
        <span className="split__you" style={{ width: `${100 - govPct}%` }} />
      </div>

      <dl className="rows">
        <div className="rows__item">
          <dt>ราคาสินค้า</dt>
          <dd className="num">{fmt(calc.priceS)}</dd>
        </div>
        <div className="rows__item">
          <dt>{calc.capped ? 'รัฐช่วยจ่าย (เต็มเพดาน)' : 'รัฐช่วยจ่าย 60%'}</dt>
          <dd className="num up">−{fmt(calc.govS)}</dd>
        </div>
        <div className="rows__item rows__item--you">
          <dt>{calc.capped ? 'คุณจ่ายเอง' : 'คุณจ่ายเอง 40%'}</dt>
          <dd className="num">{fmt(calc.youS)}</dd>
        </div>
      </dl>

      <div className="quota">
        <div className="rows__item">
          <span>ซื้อครั้งนี้ใช้โควตารัฐ</span>
          <span className="num">{fmtShort(calc.govS)} / {DAILY_CAP}</span>
        </div>
        <div className="quota__track" aria-hidden="true">
          <div className="quota__fill" style={{ width: `${quotaPct}%` }} />
        </div>
      </div>
    </section>
  );
}
