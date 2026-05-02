import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { FieldManual } from './pages/FieldManual';
import { MechanicPage } from './pages/MechanicPage';
import { SkillsPage } from './pages/SkillsPage';
import { PerksPage } from './pages/PerksPage';
import { CartelAttacksPage } from './pages/CartelAttacksPage';
import { QuickReference } from './pages/QuickReference';
import { Endgame } from './pages/Endgame';
import { BlackMarkets } from './pages/BlackMarkets';
import { ConsoleCommands } from './pages/ConsoleCommands';
import { EarlyAccess } from './pages/EarlyAccess';
import { Install } from './pages/Install';
import { Feedback } from './pages/Feedback';
import { NotFound } from './pages/NotFound';
import { useScrollToTop } from './hooks/useScrollToTop';

// QA tool — lazy-loaded so the ~330KB of test-case markdown doesn't bloat
// the marketing bundle. Internal route, not linked from the nav.
const TestCases = lazy(() =>
  import('./pages/TestCases').then(m => ({ default: m.TestCases }))
);

export default function App() {
  useScrollToTop();
  return (
    <Routes>
      {/* Standalone routes — bypass FarmPunk layout (chrome-free) */}
      <Route
        path="/test-cases"
        element={
          <Suspense fallback={<div style={{ padding: 24, color: '#8b949e', background: '#0d1117', minHeight: '100vh', fontFamily: 'system-ui' }}>Loading test cases…</div>}>
            <TestCases />
          </Suspense>
        }
      />

      {/* Everything else gets the FarmPunk shell */}
      <Route path="/*" element={<MainSite />} />
    </Routes>
  );
}

function MainSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/field-manual" element={<FieldManual />} />
        <Route path="/field-manual/skills" element={<SkillsPage />} />
        <Route path="/field-manual/perks" element={<PerksPage />} />
        <Route path="/field-manual/cartel-attacks" element={<CartelAttacksPage />} />
        <Route path="/field-manual/:slug" element={<MechanicPage />} />
        <Route path="/quick-reference" element={<QuickReference />} />
        <Route path="/endgame" element={<Endgame />} />
        <Route path="/black-markets" element={<BlackMarkets />} />
        <Route path="/console" element={<ConsoleCommands />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="/install" element={<Install />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
