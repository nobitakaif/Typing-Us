'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';

interface WordDisplayProps {
  words: string;
  input: string;
}

export default function WordDisplay({ words, input }: WordDisplayProps) {
  const wordArray = words.split(' ');
  const inputWords = input.trim() === '' ? [] : input.split(' ');
  const currentWordIndex = inputWords.length - 1;

  const getCharColor = (wordIdx: number, charIdx: number): string => {
    if (wordIdx < currentWordIndex) {
      // Previous words - show correct/incorrect
      const typedWord = inputWords[wordIdx] || '';
      const expectedWord = wordArray[wordIdx] || '';
      if (typedWord === expectedWord) return 'text-green-500';
      return 'text-red-500';
    }

    if (wordIdx === currentWordIndex && inputWords.length > 0) {
      // Current word being typed
      const typedWord = inputWords[currentWordIndex] || '';
      const expectedChar = wordArray[wordIdx]?.[charIdx];
      const typedChar = typedWord[charIdx];

      if (charIdx < typedWord.length) {
        return typedChar === expectedChar ? 'text-green-500' : 'text-red-500';
      }
      return 'text-foreground/50';
    }

    // Upcoming words
    return 'text-foreground/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card className="p-8 bg-card border-border backdrop-blur-sm">
        <div className="flex flex-wrap gap-3 text-2xl leading-relaxed font-mono">
          {wordArray.map((word, wordIdx) => {
            const isCurrentWord = wordIdx === currentWordIndex;
            const isPastWord = wordIdx < currentWordIndex;
            
            return (
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: wordIdx * 0.02 }}
                className={`inline-block transition-all duration-200 ${
                  isCurrentWord ? 'bg-primary/20 px-3 py-1 rounded-lg ring-1 ring-primary/50' : ''
                } ${isPastWord ? 'opacity-60' : ''}`}
              >
                {word.split('').map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    className={`${getCharColor(wordIdx, charIdx)} font-semibold transition-colors duration-100`}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={
                      isCurrentWord && charIdx < (inputWords[currentWordIndex]?.length || 0)
                        ? { scale: [1, 1.15, 1], opacity: [1, 0.9, 1] }
                        : {}
                    }
                    transition={{ duration: 0.15 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
