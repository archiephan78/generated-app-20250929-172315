import React from 'react';
import { cn } from '@/lib/utils';
import { useSudokuStore } from '@/stores/sudoku-store';
interface SudokuCellProps {
  index: number;
}
const SudokuCellComponent: React.FC<SudokuCellProps> = ({ index }) => {
  const cell = useSudokuStore(state => state.board[index]);
  const selectedCell = useSudokuStore(state => state.selectedCell);
  const selectCell = useSudokuStore(state => state.selectCell);
  const board = useSudokuStore(state => state.board);
  if (!cell) return null;
  const isSelected = index === selectedCell;
  const selectedValue = selectedCell !== null ? board[selectedCell]?.value : 0;
  const row = Math.floor(index / 9);
  const col = index % 9;
  const selectedRow = selectedCell !== null ? Math.floor(selectedCell / 9) : -1;
  const selectedCol = selectedCell !== null ? selectedCell % 9 : -1;
  const selectedBoxRow = selectedCell !== null ? Math.floor(selectedRow / 3) : -1;
  const selectedBoxCol = selectedCell !== null ? Math.floor(selectedCol / 3) : -1;
  const isInPeerRow = row === selectedRow;
  const isInPeerCol = col === selectedCol;
  const isInPeerBox = Math.floor(row / 3) === selectedBoxRow && Math.floor(col / 3) === selectedBoxCol;
  const isPeer = !isSelected && selectedCell !== null && (isInPeerRow || isInPeerCol || isInPeerBox);
  const isSameValue = !cell.isGiven && selectedValue !== 0 && cell.value === selectedValue;
  const baseClasses = "flex items-center justify-center text-2xl md:text-3xl font-medium select-none transition-colors duration-200";
  const borderClasses = `
    ${row % 3 === 2 && row !== 8 ? 'border-b-2' : 'border-b'}
    ${col % 3 === 2 && col !== 8 ? 'border-r-2' : 'border-r'}
    ${row === 0 ? 'border-t-2' : 'border-t'}
    ${col === 0 ? 'border-l-2' : 'border-l'}
    border-border
  `;
  const stateClasses = cn({
    'bg-blue-100 dark:bg-blue-900/50': isSelected,
    'bg-gray-100 dark:bg-gray-800/50': isPeer && !isSelected,
    'bg-blue-200/70 dark:bg-blue-800/70': isSameValue && !isSelected,
    'text-foreground font-bold': cell.isGiven,
    'text-blue-600 dark:text-blue-400': !cell.isGiven && cell.value !== 0,
    'text-red-500 dark:text-red-500': !cell.isCorrect,
    'cursor-pointer': !cell.isGiven,
  });
  const handleClick = () => {
    if (!cell.isGiven) {
      selectCell(index);
    }
  };
  return (
    <div
      className={cn(baseClasses, borderClasses, stateClasses)}
      onClick={handleClick}
      role="button"
      tabIndex={cell.isGiven ? -1 : 0}
      aria-label={`Cell ${row + 1}, ${col + 1}`}
    >
      {cell.value !== 0 && <span>{cell.value}</span>}
      {cell.value === 0 && cell.notes.size > 0 && (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 text-xs text-muted-foreground">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              {cell.notes.has(i + 1) ? i + 1 : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export const SudokuCell = React.memo(SudokuCellComponent);