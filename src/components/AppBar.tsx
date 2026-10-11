interface Props {
  variant: 'home' | 'how';
}

export default function AppBar({ variant }: Props) {
  if (variant === 'how') {
    return (
      <header className="appbar appbar--back">
        <a className="icon-btn" href="#/" aria-label="ย้อนกลับ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </a>
        <span className="appbar__title">วิธีคิด</span>
      </header>
    );
  }
  return (
    <header className="appbar">
      <span className="wordmark">คิดเงิน 60/40</span>
      <a className="icon-btn" href="#/how" aria-label="วิธีคิด">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" />
        </svg>
      </a>
    </header>
  );
}
