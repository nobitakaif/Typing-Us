import { Keyboard, RotateCcw, Home } from "lucide-react";

interface ResultsProps {
  wpm: number;
  accuracy: number;
  time: number;
  onRestart: () => void;
  onHome: () => void;
}

const Results = ({ wpm, accuracy, time, onRestart, onHome }: ResultsProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-slide-up text-center">
        <Keyboard className="mx-auto mb-6 h-12 w-12 text-primary" />
        <h2 className="mb-8 font-sans text-3xl font-bold text-foreground">
          Test Complete!
        </h2>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-mono text-4xl font-bold text-primary">{wpm}</p>
            <p className="mt-1 text-sm text-muted-foreground">WPM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-mono text-4xl font-bold text-foreground">{accuracy}%</p>
            <p className="mt-1 text-sm text-muted-foreground">Accuracy</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-mono text-4xl font-bold text-foreground">{time}s</p>
            <p className="mt-1 text-sm text-muted-foreground">Duration</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:border-primary hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          <button
            onClick={onHome}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
