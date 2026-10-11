import AppBar from '../components/AppBar';
import { DAILY_CAP, FULL_MONTH_BUY_S, FULL_MONTH_YOU_S, MAX_FULL_SUPPORT_S, MONTHLY_CAP, calculate, toBaht } from '../lib/calc';
import { baht, fmt } from '../lib/format';

const EXAMPLES: { price: number; note?: string }[] = [
  { price: 100 },
  { price: 200 },
  { price: toBaht(MAX_FULL_SUPPORT_S), note: 'รัฐเต็ม' },
  { price: 500, note: 'เกินเพดาน' },
];

export default function HowItWorks() {
  return (
    <div className="screen">
      <AppBar variant="how" />
      <main className="screen__body">
        <h1 className="display">
          รัฐจ่าย 60%
          <br />
          เราจ่าย 40%
        </h1>

        <section className="panel panel--soft">
          <div className="muted">สูตร</div>
          <div className="num formula">รัฐช่วย = ราคา × 0.60</div>
          <div className="num formula">เติมเอง = ราคา × 0.40</div>
          <p className="small">รัฐช่วยไม่เกิน {DAILY_CAP} บาท/วัน และ {MONTHLY_CAP.toLocaleString('th-TH')} บาท/เดือน</p>
        </section>

        <section>
          <h2 className="h-sm">ตัวอย่าง</h2>
          <ul className="list">
            {EXAMPLES.map(({ price, note }) => (
              <li key={price} className="list__row">
                <span>ซื้อ {fmt(Math.round(price * 100))}{note ? ` (${note})` : ''}</span>
                <span className="num">เติม {fmt(calculate(price).youS)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel panel--line">
          <h2 className="h-md">ใช้สิทธิเต็มเดือน</h2>
          <p className="small">
            ซื้อรวม <span className="num">{baht(FULL_MONTH_BUY_S)}</span> เติมเอง{' '}
            <span className="num">{baht(FULL_MONTH_YOU_S)}</span> รัฐช่วย{' '}
            <span className="num">{baht(MONTHLY_CAP * 100)}</span>
          </p>
        </section>
      </main>

      <footer className="screen__foot">
        <a className="btn-primary" href="#/">กลับไปคำนวณ</a>
      </footer>
    </div>
  );
}
