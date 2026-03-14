export interface TestResult {
  id: string;
  timestamp: number;
  gameMode: string;
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  charsTyped: number;
}

export interface StatisticsData {
  totalTests: number;
  bestWpm: number;
  averageWpm: number;
  bestAccuracy: number;
  averageAccuracy: number;
  totalCharsTyped: number;
  lastTest?: TestResult;
  recentTests: TestResult[];
}

const STORAGE_KEY = 'typing-test-statistics';
const RESULTS_KEY = 'typing-test-results';
const MAX_STORED_RESULTS = 100;

export function saveTestResult(result: Omit<TestResult, 'id' | 'timestamp'>): TestResult {
  const testResult: TestResult = {
    ...result,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };

  const stored = localStorage.getItem(RESULTS_KEY);
  const results: TestResult[] = stored ? JSON.parse(stored) : [];
  results.unshift(testResult);

  // Keep only the last MAX_STORED_RESULTS
  if (results.length > MAX_STORED_RESULTS) {
    results.length = MAX_STORED_RESULTS;
  }

  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  updateStatistics();

  return testResult;
}

export function getStatistics(): StatisticsData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultStatistics();
}

export function getDefaultStatistics(): StatisticsData {
  return {
    totalTests: 0,
    bestWpm: 0,
    averageWpm: 0,
    bestAccuracy: 0,
    averageAccuracy: 0,
    totalCharsTyped: 0,
    recentTests: [],
  };
}

export function getTestResults(): TestResult[] {
  const stored = localStorage.getItem(RESULTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function updateStatistics(): void {
  const results = getTestResults();

  if (results.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultStatistics()));
    return;
  }

  const stats: StatisticsData = {
    totalTests: results.length,
    bestWpm: Math.max(...results.map((r) => r.wpm)),
    averageWpm: Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length),
    bestAccuracy: Math.max(...results.map((r) => r.accuracy)),
    averageAccuracy: Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length),
    totalCharsTyped: results.reduce((sum, r) => sum + r.charsTyped, 0),
    lastTest: results[0],
    recentTests: results.slice(0, 10),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function getLeaderboard(): TestResult[] {
  const results = getTestResults();
  return results.sort((a, b) => b.wpm - a.wpm).slice(0, 20);
}

export function getPersonalBest(gameMode?: string): TestResult | null {
  const results = getTestResults();
  const filtered = gameMode ? results.filter((r) => r.gameMode === gameMode) : results;

  if (filtered.length === 0) return null;

  return filtered.reduce((best, current) => (current.wpm > best.wpm ? current : best));
}
