import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSudokuStore, Difficulty } from '@/stores/sudoku-store';
import { Lightbulb, RotateCw } from 'lucide-react';
export const Controls: React.FC = () => {
  const newGame = useSudokuStore(state => state.newGame);
  const getHint = useSudokuStore(state => state.getHint);
  const difficulty = useSudokuStore(state => state.difficulty);
  const selectedCell = useSudokuStore(state => state.selectedCell);
  const board = useSudokuStore(state => state.board);
  const handleNewGame = (value: string) => {
    newGame(value as Difficulty);
  };
  const isHintDisabled = selectedCell === null || board[selectedCell]?.isGiven || board[selectedCell]?.value !== 0;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
      <div className="flex gap-4 w-full sm:w-auto">
        <Select onValueChange={handleNewGame} defaultValue={difficulty}>
          <SelectTrigger className="w-full sm:w-[140px] text-base py-2">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => newGame(difficulty)} className="flex-1 sm:flex-none py-2">
          <RotateCw className="mr-2 h-4 w-4" /> New Game
        </Button>
      </div>
      <Button onClick={getHint} variant="outline" disabled={isHintDisabled} className="w-full sm:w-auto py-2">
        <Lightbulb className="mr-2 h-4 w-4" /> Hint
      </Button>
    </div>
  );
};