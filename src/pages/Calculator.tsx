import { useMemo, useRef, useState } from 'react';
import AppBar from '../components/AppBar';
import AmountInput from '../components/AmountInput';
import ResultCard from '../components/ResultCard';
import SplitTip from '../components/SplitTip';
import { MAX_FULL_SUPPORT_S, calculate, splitPlan, toBaht } from '../lib/calc';
import { baht, fmt, parseAmount } from '../lib/format';

export default function Calculator() {
  const [raw, setRaw] = useState('250');
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  const price = parseAmount(raw);
  const calc = useMemo(() => calculate(price), [price]);
  const plan = useMemo(() => splitPlan(price), [price]);

  const copyTopUp = async () => {
    try {
      await navigator.clipboard.writeText(fmt(calc.youS).replace(/,/g, ''));
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard ใช้ไม่ได้ (เช่นไม่ใช่ https) — เงียบไว้ ผู้ใช้ยังอ่านตัวเลขได้ */
    }
  };

  return (
    <div className="screen">
      <AppBar variant="home" />
      <main className="screen__body">
        <div>
          <span className="badge">ไทยช่วยไทย พลัส (60/40)</span>
          <h1 className="display">ซื้อของราคานี้ ต้องเติมเงินเท่าไหร่?</h1>
        </div>

        <AmountInput value={raw} onChange={setRaw} />

        {calc.capped && (
          <p className="notice" role="status">
            ยอดนี้เกินเพดานที่รัฐช่วย 200 บาท/วัน ส่วนที่เกินคุณจ่ายเองทั้งหมด
          </p>
        )}

        <ResultCard calc={calc} />

        {plan && (
          <SplitTip plan={plan} now={calc} onApply={() => setRaw(toBaht(MAX_FULL_SUPPORT_S).toFixed(2))} />
        )}
      </main>

      <footer className="screen__foot">
        <button type="button" className="btn-primary" onClick={copyTopUp} disabled={calc.youS === 0}>
          {copied ? 'คัดลอกแล้ว' : `คัดลอกยอดเติม ${baht(calc.youS)}`}
        </button>
        <p className="caption">
          รัฐช่วยสูงสุด 200 บาท/วัน และ 1,000 บาท/เดือน
          <br />
          ตัวเลขเป็นการประมาณ ตรวจสอบเงื่อนไขล่าสุดในแอปเป๋าตัง
        </p>
      </footer>
    </div>
  );
}
