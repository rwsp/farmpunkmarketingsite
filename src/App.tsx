import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { FieldManual } from './pages/FieldManual';
import { MechanicPage } from './pages/MechanicPage';
import { QuickReference } from './pages/QuickReference';
import { Endgame } from './pages/Endgame';
import { BlackMarkets } from './pages/BlackMarkets';
import { ConsoleCommands } from './pages/ConsoleCommands';
import { EarlyAccess } from './pages/EarlyAccess';
import { NotFound } from './pages/NotFound';
import { useScrollToTop } from './hooks/useScrollToTop';

export default function App() {
  useScrollToTop();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/field-manual" element={<FieldManual />} />
        <Route path="/field-manual/:slug" element={<MechanicPage />} />
        <Route path="/quick-reference" element={<QuickReference />} />
        <Route path="/endgame" element={<Endgame />} />
        <Route path="/black-markets" element={<BlackMarkets />} />
        <Route path="/console" element={<ConsoleCommands />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
