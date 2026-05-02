import { useEffect, useMemo, useState } from 'react';
import testCasesText from '../../TESTCASES.md?raw';
import {
  parseTestCases,
  renderInline,
  renderMarkdownBlocks,
  structureCell,
  type Test,
  type TestGroup,
  type SmokeTest,
  type SmokeSection,
  type SmokeItem
} from '../lib/parseTestCases';
import {
  useTestState,
  getStatus,
  aggregateGroup,
  countByStatus,
  type Status,
  type AggregateStatus
} from '../hooks/useTestState';
import './test-cases.css';

const STATUSES: Status[] = ['PASS', 'FAIL', 'NOT_TESTED', 'NA'];
const STATUS_LABEL: Record<Status, string> = {
  PASS: 'Pass',
  FAIL: 'Fail',
  NOT_TESTED: 'Not tested',
  NA: 'N/A'
};
const AGGREGATE_LABEL: Record<AggregateStatus, string> = {
  PASS: 'PASS',
  FAIL: 'FAIL',
  NOT_TESTED: 'NOT TESTED',
  NA: 'N/A',
  IN_PROGRESS: 'IN PROGRESS'
};

type FilterMode = 'all' | Status;
type ViewMode = 'full' | 'smoke';
const MODE_KEY = 'farmpunk-tc-view-mode-v1';

export function TestCases() {
  const { groups, smoke } = useMemo(() => parseTestCases(testCasesText), []);

  const fullSuiteIds = useMemo(() => groups.flatMap(g => g.tests.map(t => t.id)), [groups]);
  const smokeIds = useMemo(
    () => (smoke ? smoke.sections.flatMap(s => s.items.map(i => i.id)) : []),
    [smoke]
  );

  const { state, setStatus, setNotes, reset, importState } = useTestState();
  const [mode, setMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(MODE_KEY);
    return saved === 'smoke' ? 'smoke' : 'full';
  });
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [openTests, setOpenTests] = useState<Record<string, boolean>>({});
  const [openSmokeRefs, setOpenSmokeRefs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Test Cases · FarmPunk QA';
    return () => { document.title = prev; };
  }, []);

  // Active set switches with mode — dashboard reflects whatever you're working on
  const activeIds = mode === 'smoke' ? smokeIds : fullSuiteIds;
  const counts = useMemo(() => countByStatus(activeIds, state), [activeIds, state]);
  const total = activeIds.length;
  const completed = counts.PASS + counts.FAIL + counts.NA;
  const completionPct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const toggleGroup = (title: string) =>
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  const toggleTest = (id: string) =>
    setOpenTests(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSmokeRef = (slug: string) =>
    setOpenSmokeRefs(prev => ({ ...prev, [slug]: !prev[slug] }));

  const expandAllGroups = () => {
    const next: Record<string, boolean> = {};
    for (const g of groups) next[g.title] = true;
    setOpenGroups(next);
  };
  const collapseAllGroups = () => setOpenGroups({});

  const handleReset = () => {
    if (window.confirm('Clear ALL test results from this browser? This cannot be undone.')) {
      reset();
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmpunk-test-results-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (typeof parsed !== 'object' || parsed === null) throw new Error('not an object');
        importState(parsed);
        alert('Test results imported.');
      } catch (err) {
        alert('Import failed: ' + (err instanceof Error ? err.message : 'invalid file'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const matchesFilter = (id: string, name: string, body: string): boolean => {
    if (search) {
      const needle = search.toLowerCase();
      const hay = `${id} ${name} ${body}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    if (filter === 'all') return true;
    return getStatus(state, id) === filter;
  };

  return (
    <div className="qa-app">
      {/* ── App bar ──────────────────────────────────────────── */}
      <header className="qa-bar">
        <div className="qa-bar__brand">
          <span className="qa-bar__title">FarmPunk · QA Test Runner</span>
          <span className="qa-bar__sub">
            {mode === 'smoke'
              ? `Rapid Smoke Test · ${smokeIds.length} steps`
              : `Full Suite · ${groups.length} groups · ${fullSuiteIds.length} tests`}
            {' · TESTCASES.md'}
          </span>
        </div>

        <div className="qa-bar__center">
          <div className="qa-toggle" role="tablist" aria-label="Test view">
            <button
              role="tab"
              aria-selected={mode === 'full'}
              className={`qa-toggle__btn${mode === 'full' ? ' qa-toggle__btn--active' : ''}`}
              onClick={() => setMode('full')}
            >
              Full Suite
              <span className="qa-toggle__count">{fullSuiteIds.length}</span>
            </button>
            <button
              role="tab"
              aria-selected={mode === 'smoke'}
              className={`qa-toggle__btn${mode === 'smoke' ? ' qa-toggle__btn--active' : ''}`}
              onClick={() => setMode('smoke')}
              disabled={!smoke}
            >
              Rapid Smoke Test
              <span className="qa-toggle__count">{smokeIds.length}</span>
            </button>
          </div>
        </div>

        <div className="qa-bar__actions">
          <label className="qa-btn qa-btn--ghost">
            Import
            <input type="file" accept="application/json" onChange={handleImport} hidden />
          </label>
          <button className="qa-btn qa-btn--ghost" onClick={handleExport}>Export JSON</button>
          <button className="qa-btn qa-btn--danger" onClick={handleReset}>Reset all</button>
        </div>
      </header>

      {/* ── Dashboard ────────────────────────────────────────── */}
      <section className="qa-dash">
        <div className="qa-dash__counters">
          <Counter label="Total"        value={total}             tone="muted" />
          <Counter label="Pass"         value={counts.PASS}       tone="pass" />
          <Counter label="Fail"         value={counts.FAIL}       tone="fail" />
          <Counter label="Not tested"   value={counts.NOT_TESTED} tone="pending" />
          <Counter label="N/A"          value={counts.NA}         tone="na" />
          <Counter label="Complete"     value={`${completionPct}%`} tone="info" />
        </div>
        <div className="qa-dash__bar" aria-hidden="true">
          <div className="qa-dash__bar-pass" style={{ width: pct(counts.PASS, total) }} title={`${counts.PASS} pass`} />
          <div className="qa-dash__bar-fail" style={{ width: pct(counts.FAIL, total) }} title={`${counts.FAIL} fail`} />
          <div className="qa-dash__bar-na"   style={{ width: pct(counts.NA, total) }}   title={`${counts.NA} N/A`} />
        </div>
      </section>

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <section className="qa-toolbar">
        {mode === 'full' && (
          <div className="qa-toolbar__group">
            <button className="qa-btn qa-btn--ghost qa-btn--sm" onClick={expandAllGroups}>Expand all</button>
            <button className="qa-btn qa-btn--ghost qa-btn--sm" onClick={collapseAllGroups}>Collapse all</button>
          </div>
        )}
        <div className="qa-toolbar__group">
          <label className="qa-toolbar__label">Filter</label>
          <select
            className="qa-select"
            value={filter}
            onChange={e => setFilter(e.target.value as FilterMode)}
          >
            <option value="all">All ({total})</option>
            <option value="PASS">Pass ({counts.PASS})</option>
            <option value="FAIL">Fail ({counts.FAIL})</option>
            <option value="NOT_TESTED">Not tested ({counts.NOT_TESTED})</option>
            <option value="NA">N/A ({counts.NA})</option>
          </select>
        </div>
        <div className="qa-toolbar__group qa-toolbar__group--grow">
          <input
            className="qa-input"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search id, name, steps, or expected…"
          />
        </div>
      </section>

      {/* ── List ─────────────────────────────────────────────── */}
      <main className="qa-list">
        {mode === 'full' && groups.map(group => (
          <GroupCard
            key={group.title}
            group={group}
            isOpen={!!openGroups[group.title]}
            onToggle={() => toggleGroup(group.title)}
            state={state}
            openTests={openTests}
            onToggleTest={toggleTest}
            onSetStatus={setStatus}
            onSetNotes={setNotes}
            matchesFilter={(t) => matchesFilter(t.id, t.name, `${t.steps} ${t.expected}`)}
            isFiltering={filter !== 'all' || !!search}
          />
        ))}

        {mode === 'smoke' && smoke && (
          <SmokeView
            smoke={smoke}
            state={state}
            openTests={openTests}
            onToggleTest={toggleTest}
            openRefs={openSmokeRefs}
            onToggleRef={toggleSmokeRef}
            onSetStatus={setStatus}
            onSetNotes={setNotes}
            matchesFilter={(item) => matchesFilter(item.id, item.label, `${item.action ?? ''} ${item.expected ?? ''} ${item.body ?? ''}`)}
            isFiltering={filter !== 'all' || !!search}
          />
        )}

        {mode === 'smoke' && !smoke && (
          <div className="qa-empty">No Rapid Smoke Test section found in TESTCASES.md.</div>
        )}
      </main>
    </div>
  );
}

function pct(n: number, total: number): string {
  if (total === 0) return '0%';
  return `${(n / total) * 100}%`;
}

function Counter({
  label, value, tone
}: {
  label: string;
  value: string | number;
  tone: 'muted' | 'pass' | 'fail' | 'pending' | 'na' | 'info';
}) {
  return (
    <div className={`qa-counter qa-counter--${tone}`}>
      <div className="qa-counter__label">{label}</div>
      <div className="qa-counter__value">{value}</div>
    </div>
  );
}

// ── Full-suite group card ──────────────────────────────────────
function GroupCard({
  group, isOpen, onToggle,
  state, openTests, onToggleTest,
  onSetStatus, onSetNotes,
  matchesFilter, isFiltering
}: {
  group: TestGroup;
  isOpen: boolean;
  onToggle: () => void;
  state: ReturnType<typeof useTestState>['state'];
  openTests: Record<string, boolean>;
  onToggleTest: (id: string) => void;
  onSetStatus: (id: string, s: Status) => void;
  onSetNotes: (id: string, notes: string) => void;
  matchesFilter: (t: Test) => boolean;
  isFiltering: boolean;
}) {
  const ids = group.tests.map(t => t.id);
  const agg = aggregateGroup(ids, state);
  const counts = countByStatus(ids, state);
  const filtered = group.tests.filter(matchesFilter);

  if (isFiltering && filtered.length === 0) return null;
  const shouldShowOpen = isOpen || isFiltering;
  const visibleTests = isFiltering ? filtered : group.tests;

  return (
    <article className={`qa-group qa-group--${agg.toLowerCase()}`}>
      <header className="qa-group__head" onClick={onToggle}>
        <span className={`qa-group__caret${shouldShowOpen ? ' qa-group__caret--open' : ''}`}>▶</span>
        <span className="qa-group__title">{group.title}</span>
        <span className={`qa-badge qa-badge--${agg.toLowerCase()}`}>{AGGREGATE_LABEL[agg]}</span>
        <span className="qa-group__counts">
          {counts.PASS} pass · {counts.FAIL} fail · {counts.NOT_TESTED} pending · {counts.NA} n/a · {ids.length} total
        </span>
      </header>

      {shouldShowOpen && (
        <div className="qa-group__body">
          {group.blurb && (
            <p className="qa-group__blurb"
               dangerouslySetInnerHTML={{ __html: renderInline(group.blurb) }}
            />
          )}
          <div className="qa-group__tests">
            {visibleTests.map(test => (
              <TestRow
                key={test.id}
                id={test.id}
                name={test.name}
                steps={test.steps}
                expected={test.expected}
                status={getStatus(state, test.id)}
                notes={state[test.id]?.notes ?? ''}
                isOpen={!!openTests[test.id]}
                onToggle={() => onToggleTest(test.id)}
                onSetStatus={(s) => onSetStatus(test.id, s)}
                onSetNotes={(n) => onSetNotes(test.id, n)}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// ── Smoke-test view ───────────────────────────────────────────
function SmokeView({
  smoke, state,
  openTests, onToggleTest,
  openRefs, onToggleRef,
  onSetStatus, onSetNotes,
  matchesFilter, isFiltering
}: {
  smoke: SmokeTest;
  state: ReturnType<typeof useTestState>['state'];
  openTests: Record<string, boolean>;
  onToggleTest: (id: string) => void;
  openRefs: Record<string, boolean>;
  onToggleRef: (slug: string) => void;
  onSetStatus: (id: string, s: Status) => void;
  onSetNotes: (id: string, notes: string) => void;
  matchesFilter: (item: SmokeItem) => boolean;
  isFiltering: boolean;
}) {
  return (
    <>
      {smoke.intro && (
        <article className="qa-smoke-intro">
          <p dangerouslySetInnerHTML={{ __html: renderInline(smoke.intro) }} />
        </article>
      )}

      {smoke.sections.map(section =>
        section.testable
          ? (
            <SmokeTestableSection
              key={section.slug}
              section={section}
              state={state}
              openTests={openTests}
              onToggleTest={onToggleTest}
              onSetStatus={onSetStatus}
              onSetNotes={onSetNotes}
              matchesFilter={matchesFilter}
              isFiltering={isFiltering}
            />
          ) : (
            <SmokeReferenceSection
              key={section.slug}
              section={section}
              isOpen={!!openRefs[section.slug]}
              onToggle={() => onToggleRef(section.slug)}
            />
          )
      )}
    </>
  );
}

function SmokeTestableSection({
  section, state,
  openTests, onToggleTest,
  onSetStatus, onSetNotes,
  matchesFilter, isFiltering
}: {
  section: SmokeSection;
  state: ReturnType<typeof useTestState>['state'];
  openTests: Record<string, boolean>;
  onToggleTest: (id: string) => void;
  onSetStatus: (id: string, s: Status) => void;
  onSetNotes: (id: string, notes: string) => void;
  matchesFilter: (item: SmokeItem) => boolean;
  isFiltering: boolean;
}) {
  const ids = section.items.map(i => i.id);
  const agg = aggregateGroup(ids, state);
  const counts = countByStatus(ids, state);
  const visible = isFiltering ? section.items.filter(matchesFilter) : section.items;
  if (isFiltering && visible.length === 0) return null;

  return (
    <article className={`qa-group qa-group--${agg.toLowerCase()}`}>
      <header className="qa-group__head qa-group__head--static">
        <span className="qa-group__title">{section.title}</span>
        <span className={`qa-badge qa-badge--${agg.toLowerCase()}`}>{AGGREGATE_LABEL[agg]}</span>
        <span className="qa-group__counts">
          {counts.PASS} pass · {counts.FAIL} fail · {counts.NOT_TESTED} pending · {counts.NA} n/a · {ids.length} total
        </span>
      </header>
      <div className="qa-group__body">
        <div className="qa-group__tests">
          {visible.map(item => (
            <TestRow
              key={item.id}
              id={item.id}
              name={item.label}
              // Smoke items either have action/expected (script table) or a single body (numbered list)
              steps={item.action ?? item.body ?? ''}
              expected={item.expected ?? ''}
              showExpected={Boolean(item.expected)}
              status={getStatus(state, item.id)}
              notes={state[item.id]?.notes ?? ''}
              isOpen={!!openTests[item.id]}
              onToggle={() => onToggleTest(item.id)}
              onSetStatus={(s) => onSetStatus(item.id, s)}
              onSetNotes={(n) => onSetNotes(item.id, n)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function SmokeReferenceSection({
  section, isOpen, onToggle
}: {
  section: SmokeSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="qa-ref">
      <header className="qa-ref__head" onClick={onToggle}>
        <span className={`qa-group__caret${isOpen ? ' qa-group__caret--open' : ''}`}>▶</span>
        <span className="qa-ref__title">{section.title}</span>
        <span className="qa-ref__hint">reference</span>
      </header>
      {isOpen && (
        <div
          className="qa-ref__body"
          dangerouslySetInnerHTML={{ __html: renderMarkdownBlocks(section.body) }}
        />
      )}
    </article>
  );
}

// ── Single test/step row (used by both views) ─────────────────
function TestRow({
  id, name, steps, expected, showExpected = true,
  status, notes, isOpen, onToggle,
  onSetStatus, onSetNotes
}: {
  id: string;
  name: string;
  steps: string;
  expected: string;
  showExpected?: boolean;
  status: Status;
  notes: string;
  isOpen: boolean;
  onToggle: () => void;
  onSetStatus: (s: Status) => void;
  onSetNotes: (n: string) => void;
}) {
  const stepsStruct = useMemo(() => structureCell(steps), [steps]);
  const expectedStruct = useMemo(() => structureCell(expected), [expected]);

  return (
    <article className={`qa-test qa-test--${status.toLowerCase()}${isOpen ? ' qa-test--open' : ''}`}>
      <header className="qa-test__head">
        <div className="qa-test__title">
          <span className="qa-test__id">{id}</span>
          <span className="qa-test__name">{name}</span>
        </div>
        <div className="qa-test__controls">
          <div className="qa-status-group" role="radiogroup" aria-label={`Status for ${id}`}>
            {STATUSES.map(s => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={status === s}
                className={`qa-status qa-status--${s.toLowerCase()}${status === s ? ' qa-status--active' : ''}`}
                onClick={() => onSetStatus(s)}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
          <button className="qa-test__expand" onClick={onToggle} aria-expanded={isOpen}>
            {isOpen ? 'Hide details ▴' : 'Details ▾'}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="qa-test__body">
          {steps && (
            <Section title={showExpected ? 'Action' : 'Steps'} intro={stepsStruct.intro} sections={stepsStruct.sections} />
          )}
          {showExpected && expected && (
            <Section title="Expected" intro={expectedStruct.intro} sections={expectedStruct.sections} />
          )}

          <div className="qa-test__notes">
            <label className="qa-test__notes-label" htmlFor={`notes-${id}`}>Notes</label>
            <textarea
              id={`notes-${id}`}
              className="qa-textarea"
              value={notes}
              onChange={e => onSetNotes(e.target.value)}
              placeholder="Capture failure context, deviations, console output…"
              rows={3}
            />
          </div>
        </div>
      )}
    </article>
  );
}

function Section({
  title, intro, sections
}: {
  title: string;
  intro: string;
  sections: { label: string; body: string }[];
}) {
  return (
    <div className="qa-section">
      <h4 className="qa-section__title">{title}</h4>
      {intro && (
        <p className="qa-section__intro" dangerouslySetInnerHTML={{ __html: renderInline(intro) }} />
      )}
      {sections.map(s => (
        <div key={s.label} className="qa-section__sub">
          <span className="qa-section__sub-label">{s.label}</span>
          <span dangerouslySetInnerHTML={{ __html: renderInline(s.body) }} />
        </div>
      ))}
    </div>
  );
}
