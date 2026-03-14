// Typing test utilities and calculations

export interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  charsTyped: number;
  correctChars: number;
  errors: number;
}

export const WORD_LISTS = {
  common: [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  ],
  programming: [
    'function', 'variable', 'constant', 'array', 'object', 'string', 'number', 'boolean', 'null', 'undefined',
    'class', 'interface', 'type', 'enum', 'module', 'export', 'import', 'async', 'await', 'promise',
    'callback', 'closure', 'scope', 'this', 'super', 'extends', 'implements', 'abstract', 'static', 'const',
    'let', 'var', 'if', 'else', 'switch', 'case', 'break', 'continue', 'return', 'yield',
    'try', 'catch', 'finally', 'throw', 'new', 'delete', 'typeof', 'instanceof', 'in', 'of',
    'map', 'filter', 'reduce', 'forEach', 'find', 'includes', 'slice', 'splice', 'push', 'pop',
    'shift', 'unshift', 'concat', 'join', 'split', 'trim', 'replace', 'toLowerCase', 'toUpperCase', 'charAt',
    'indexOf', 'lastIndexOf', 'substring', 'substr', 'padStart', 'padEnd', 'repeat', 'match', 'search', 'regex',
    'JSON', 'parse', 'stringify', 'Object', 'create', 'assign', 'keys', 'values', 'entries', 'defineProperty',
    'Math', 'random', 'floor', 'ceil', 'round', 'min', 'max', 'abs', 'pow', 'sqrt',
  ],
};

export function generateWordList(words: string[], count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ');
}

export function calculateWPM(charsTyped: number, timeSeconds: number): number {
  if (timeSeconds === 0) return 0;
  const minutes = timeSeconds / 60;
  return Math.round((charsTyped / 5) / minutes);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

export function compareInput(original: string, typed: string): { correct: number; errors: number } {
  let correct = 0;
  let errors = 0;
  
  const maxLength = Math.max(original.length, typed.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < typed.length) {
      if (i < original.length && original[i] === typed[i]) {
        correct++;
      } else {
        errors++;
      }
    }
  }
  
  return { correct, errors };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const GAME_MODES = {
  CLASSIC: 'classic',
  SPEED_RUN: 'speed-run',
  ENDURANCE: 'endurance',
  ACCURACY_CHALLENGE: 'accuracy-challenge',
} as const;

export const GAME_MODE_CONFIGS = {
  [GAME_MODES.CLASSIC]: {
    name: 'Classic',
    duration: 60,
    description: 'Type for 60 seconds. Focus on speed and accuracy.',
  },
  [GAME_MODES.SPEED_RUN]: {
    name: 'Speed Run',
    duration: 30,
    description: 'Quick 30-second sprint. Show your peak performance.',
  },
  [GAME_MODES.ENDURANCE]: {
    name: 'Endurance',
    duration: 300,
    description: 'Type for 5 minutes. Test your consistency.',
  },
  [GAME_MODES.ACCURACY_CHALLENGE]: {
    name: 'Accuracy Challenge',
    duration: 60,
    minAccuracy: 95,
    description: 'Maintain 95%+ accuracy. Quality over speed.',
  },
} as const;
