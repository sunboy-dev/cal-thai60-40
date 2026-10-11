# คิดเงิน 60/40 (ไทยช่วยไทย พลัส)

React + TypeScript + Vite · mobile first · ฟอนต์ Google Sans

```bash
npm install
npm run dev     # พัฒนา
npm test        # ทดสอบสูตรใน src/lib/calc.ts
npm run build   # ตรวจ type + build
```

สูตรทั้งหมดอยู่ใน `src/lib/calc.ts` (คิดเป็นสตางค์ ไม่ใช้ float): รัฐช่วย 60% ไม่เกิน 200 บาท/วัน.
ค่าคงที่ (อัตรา/เพดาน) ควรตรวจกับเงื่อนไขล่าสุดของโครงการก่อนใช้งานจริง.
