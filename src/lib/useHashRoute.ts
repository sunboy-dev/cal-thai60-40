import { useEffect, useState } from 'react';

export type Route = 'home' | 'how';

const read = (): Route => (window.location.hash === '#/how' ? 'how' : 'home');

/** SPA routing แบบเบาที่สุด: ปุ่ม back ของมือถือใช้งานได้ ไม่ต้องพึ่ง router */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
