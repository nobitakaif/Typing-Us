'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';

interface TypingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange : (value: string) => void;
}

const TypingInput = forwardRef<HTMLInputElement, TypingInputProps>(
  ({ onChange, disabled, placeholder, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <Card className="p-6 border-border focus-within:border-primary transition-colors">
          <input
            ref={ref}
            type="text"
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-lg font-mono text-foreground placeholder-muted-foreground"
            autoComplete="off"
            spellCheck="false"
            {...props}
          />
        </Card>
        <p className="text-xs text-muted-foreground text-center">
          {disabled ? 'Test finished! Click to try again.' : 'Start typing to begin the test.'}
        </p>
      </motion.div>
    );
  }
);

TypingInput.displayName = 'TypingInput';

export default TypingInput;
