import { useCallback, useEffect, useState } from 'react';

export type Status = 'PASS' | 'FAIL' | 'NOT_TESTED' | 'NA';
export type AggregateStatus = Status | 'IN_PROGRESS';

export type TestRecord = {
  status: Status;
  notes: string;
  updatedAt: number;
};

export type TestState = Record<string, TestRecord>;

const STORAGE_KEY = 'farmpunk-test-state-v1';

function loadState(): TestState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveState(state: TestState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or storage disabled — fail quietly, the in-memory copy still works
  }
}

export function useTestState() {
  const [state, setState] = useState<TestState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setStatus = useCallback((id: string, status: Status) => {
    setState(prev => ({
      ...prev,
      [id]: {
        status,
        notes: prev[id]?.notes ?? '',
        updatedAt: Date.now()
      }
    }));
  }, []);

  const setNotes = useCallback((id: string, notes: string) => {
    setState(prev => ({
      ...prev,
      [id]: {
        status: prev[id]?.status ?? 'NOT_TESTED',
        notes,
        updatedAt: Date.now()
      }
    }));
  }, []);

  const reset = useCallback(() => {
    setState({});
  }, []);

  const importState = useCallback((s: TestState) => {
    setState(s);
  }, []);

  return { state, setStatus, setNotes, reset, importState };
}

export function getStatus(state: TestState, id: string): Status {
  return state[id]?.status ?? 'NOT_TESTED';
}

export function aggregateGroup(testIds: string[], state: TestState): AggregateStatus {
  if (testIds.length === 0) return 'NA';
  const statuses = testIds.map(id => getStatus(state, id));
  const real = statuses.filter(s => s !== 'NA');
  if (real.length === 0) return 'NA';
  if (real.some(s => s === 'FAIL')) return 'FAIL';
  if (real.every(s => s === 'PASS')) return 'PASS';
  return 'IN_PROGRESS';
}

export function countByStatus(testIds: string[], state: TestState) {
  const out = { PASS: 0, FAIL: 0, NOT_TESTED: 0, NA: 0 };
  for (const id of testIds) {
    out[getStatus(state, id)]++;
  }
  return out;
}
