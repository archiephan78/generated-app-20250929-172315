import { useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { Controls } from '@/components/sudoku/Controls';
import { SudokuGrid } from '@/components/sudoku/SudokuGrid';
import { Keypad } from '@/components/sudoku/Keypad';
import { useSudokuStore } from '@/stores/sudoku-store';
import { AlertCircle, TimerIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};
export function HomePage() {
  const { newGame, gameStatus } = useSudokuStore(
    useShallow((state) => ({ newGame: state.newGame, gameStatus: state.gameStatus }))
  );
  const elapsedTime = useSudokuStore(state => state.elapsedTime);
  const errors = useSudokuStore(state => state.errors);
  useEffect(() => {
    // Initialize a new game on first load
    if (gameStatus === 'paused' && elapsedTime === 0) {
      newGame('Medium');
    }
  }, [newGame, gameStatus, elapsedTime]);
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6 md:space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Sudoku Zen
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A minimalist and relaxing Sudoku experience.
          </p>
        </header>
        <div className="w-full max-w-lg">
          <Controls />
        </div>
        <SudokuGrid />
        <div className="flex items-center justify-between w-full max-w-lg text-lg text-muted-foreground">
          <div className="flex items-center gap-2">
            <TimerIcon className="h-5 w-5" />
            <span className="font-mono tabular-nums">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Errors: {errors}</span>
          </div>
        </div>
        <Keypad />
      </div>
      <footer className="absolute bottom-4 text-center text-muted-foreground/80 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
      <Toaster richColors position="top-center" />
    </main>
  );
}