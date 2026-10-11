import { useId } from 'react';
import { sanitizeAmount } from '../lib/format';

const PRESETS = ['50', '100', '200', '333.33'];

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export default function AmountInput({ value, onChange }: Props) {
  const id = useId();
  return (
    <div>
      <label className="label" htmlFor={id}>ราคาสินค้า</label>
      <div className="amount">
        <span className="num amount__sym" aria-hidden="true">฿</span>
        <input
          id={id}
          className="amount__input"
          value={value}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          onChange={(e) => onChange(sanitizeAmount(e.target.value))}
          onFocus={(e) => e.currentTarget.select()}
        />
        <span className="amount__unit">บาท</span>
      </div>
      <div className="chips" role="group" aria-label="ยอดที่ใช้บ่อย">
        {PRESETS.map((p) => (
          <button key={p} type="button" className="chip num" onClick={() => onChange(p)}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
