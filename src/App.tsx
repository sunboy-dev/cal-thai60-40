import Calculator from './pages/Calculator';
import HowItWorks from './pages/HowItWorks';
import { useHashRoute } from './lib/useHashRoute';

export default function App() {
  return useHashRoute() === 'how' ? <HowItWorks /> : <Calculator />;
}
