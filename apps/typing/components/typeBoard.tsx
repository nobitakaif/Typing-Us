"use client"
import { useState, useEffect, useCallback, useRef } from "react";
import { generateWords, calculateWPM, calculateAccuracy } from "@/lib/words";
import Results from "@/components/Results";
import { RotateCcw } from "lucide-react";

const TypingTest = () => {
  const { duration } = useParams<{ duration: string }>();
  const navigate = useRouter();
  const totalTime = parseInt(duration || "30", 10);

  const [words] = useState(() => generateWords(200));
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullText = words.join(" ");

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    setStarted(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      let correct = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === fullText[i]) correct++;
      }
      setCorrectChars(correct);
      setTotalTyped(typed.length);
    }
  }, [finished, typed, fullText]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    if (!started) startTimer();
    const value = e.target.value;
    // Prevent typing beyond text length
    if (value.length <= fullText.length) {
      setTyped(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (finished) return;
    // Prevent backspace beyond what's typed
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    navigate.push(0); // reload route
  };

  const wpm = calculateWPM(correctChars, totalTime);
  const accuracy = calculateAccuracy(correctChars, totalTyped);

  if (finished) {
    return <Results wpm={wpm} accuracy={accuracy} time={totalTime} onRestart={restart} onHome={() => navigate.push("/")} />;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background px-4"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-3xl animate-fade-in">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate.push("/")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← back
          </button>
          <div className="flex items-center gap-4">
            <span
              className={`font-mono text-4xl font-bold transition-colors ${
                timeLeft <= 5 && started ? "text-destructive" : "text-primary"
              }`}
            >
              {timeLeft}
            </span>
            <button
              onClick={restart}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Restart"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Text display */}
        <div className="relative rounded-xl border border-border bg-card p-8 font-mono text-xl leading-relaxed tracking-wide">
          <div className="select-none" aria-hidden="true">
            {fullText.split("").map((char, i) => {
              let className = "text-untyped";
              if (i < typed.length) {
                className = typed[i] === char ? "text-correct" : "text-incorrect";
              }
              if (i === typed.length) {
                return (
                  <span key={i} className="relative">
                    <span className="bg-cursor animate-blink absolute -left-[1px] top-0 h-full w-[2px]" />
                    <span className={className}>{char}</span>
                  </span>
                );
              }
              return (
                <span key={i} className={className}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Hidden input */}
          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 h-full w-full cursor-default opacity-0"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        {/* Hint */}
        {!started && (
          <p className="mt-6 text-center text-sm text-muted-foreground animate-fade-in">
            Start typing to begin the test
          </p>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
