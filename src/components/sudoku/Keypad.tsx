import React from 'react';
import { Button } from '@/components/ui/button';
import { useSudokuStore } from '@/stores/sudoku-store';
import { Eraser, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
export const Keypad: React.FC = () => {
  const setCellValue = useSudokuStore(state => state.setCellValue);
  const eraseCell = useSudokuStore(state => state.eraseCell);
  const isNotesMode = useSudokuStore(state => state.isNotesMode);
  const toggleNotesMode = useSudokuStore(state => state.toggleNotesMode);
  const selectedCell = useSudokuStore(state => state.selectedCell);
  const board = useSudokuStore(state => state.board);
  const isCellSelected = selectedCell !== null;
  const isGiven = isCellSelected && board[selectedCell!]?.isGiven;
  const isActionDisabled = !isCellSelected || isGiven;
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <div className="grid grid-cols-5 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Button
            key={num}
            onClick={() => setCellValue(num)}
            variant="outline"
            className="text-2xl h-14 sm:h-16 transition-transform active:scale-95"
            disabled={isActionDisabled}
          >
            {num}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button onClick={eraseCell} variant="outline" className="h-14 sm:h-16" disabled={isActionDisabled}>
          <Eraser className="h-6 w-6" />
        </Button>
        <Button
          onClick={toggleNotesMode}
          variant="outline"
          className={cn(
            "h-14 sm:h-16 transition-colors",
            isNotesMode && 'bg-blue-100 dark:bg-blue-900/50 border-blue-400'
          )}
          disabled={isActionDisabled}
        >
          <Pencil className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};