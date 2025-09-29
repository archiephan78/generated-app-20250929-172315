import React from 'react';
import { SudokuCell } from './SudokuCell';
export const SudokuGrid: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto aspect-square grid grid-cols-9 grid-rows-9 shadow-lg rounded-lg overflow-hidden border-2 border-foreground">
      {[...Array(81)].map((_, i) => (
        <SudokuCell key={i} index={i} />
      ))}
    </div>
  );
};