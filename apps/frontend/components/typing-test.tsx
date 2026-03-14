'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  generateWordList,
  calculateWPM,
  calculateAccuracy,
  compareInput,
  formatTime,
  GAME_MODES,
  GAME_MODE_CONFIGS,
  WORD_LISTS,
} from '@/lib/words';
import { saveTestResult } from '@/lib/statistics-storage';
import GameModeSelector from './game-mode-selector';
import WordDisplay from './word-display';
import StatisticsPanel from './statistics-panel';
import TypingInput from './typing-input';
import ResultsModal from './results-modal';

type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];

export default function TypingTest() {
  const [gameMode, setGameMode] = useState<GameMode>(GAME_MODES.CLASSIC);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [words, setWords] = useState('');
  const [input, setInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize test
  useEffect(() => {
    const config = GAME_MODE_CONFIGS[gameMode as keyof typeof GAME_MODE_CONFIGS];
    const duration = config?.duration || 60;
    setTimeRemaining(duration);
    const wordList = generateWordList(WORD_LISTS.common, 300);
    setWords(wordList);
    setInput('');
    setTestStarted(false);
    setTestFinished(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
  }, [gameMode]);

  // Timer effect
  useEffect(() => {
    if (!testStarted || testFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTestFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testFinished]);

  // Update stats
  useEffect(() => {
    if (!testStarted) return;

    const config = GAME_MODE_CONFIGS[gameMode as keyof typeof GAME_MODE_CONFIGS];
    const totalDuration = config?.duration || 60;
    const timeElapsed = totalDuration - timeRemaining;

    if (timeElapsed > 0) {
      const calculatedWpm = calculateWPM(input.length, timeElapsed);
      setWpm(calculatedWpm);

      const comparison = compareInput(words, input);
      const calculatedAccuracy = calculateAccuracy(comparison.correct, input.length);
      setAccuracy(calculatedAccuracy);
      setErrors(comparison.errors);
    }
  }, [input, timeRemaining, testStarted, words, gameMode]);

  const handleStart = useCallback(() => {
    setTestStarted(true);
    setInput('');
    startTimeRef.current = Date.now();
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (value: string) => {
    if (testFinished) return;
    if (!testStarted && value) {
      handleStart();
    }
    setInput(value);
  };

  const handleReset = useCallback(() => {
    // Save the test result if the test was finished
    if (testFinished && input.length > 0) {
      const config = GAME_MODE_CONFIGS[gameMode as keyof typeof GAME_MODE_CONFIGS];
      const totalDuration = config?.duration || 60;
      
      const comparison = compareInput(words, input);
      saveTestResult({
        gameMode,
        wpm,
        accuracy,
        errors,
        duration: totalDuration,
        charsTyped: input.length,
      });
    }
    
    setGameMode(GAME_MODES.CLASSIC);
  }, [testFinished, input, gameMode, words, wpm, accuracy, errors]);

  return (
    <div className="space-y-8">
      {/* {!testStarted && !testFinished && (
        <GameModeSelector selectedMode={gameMode} onSelect={setGameMode} />
      )} */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <StatisticsPanel
          wpm={wpm}
          accuracy={accuracy}
          timeRemaining={timeRemaining}
          errors={errors}
        />

        {!testFinished && (
          <>
            <WordDisplay words={words} input={input} />
            <TypingInput
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              disabled={testFinished}
              placeholder={testStarted ? '' : 'Click here or start typing to begin...'}
            />
          </>
        )}

        {testFinished && (
          <ResultsModal
            wpm={wpm}
            accuracy={accuracy}
            errors={errors}
            timeElapsed={GAME_MODE_CONFIGS[gameMode as keyof typeof GAME_MODE_CONFIGS]?.duration || 60}
            onReset={handleReset}
          />
        )}
      </motion.div>
    </div>
  );
}
