import { create } from 'zustand';
import { generateSudoku, Board } from '@/lib/sudoku';
import { toast } from 'sonner';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type GameStatus = 'playing' | 'won' | 'paused';
export interface SudokuState {
  difficulty: Difficulty;
  puzzle: string;
  solution: string;
  board: Board;
  selectedCell: number | null;
  isNotesMode: boolean;
  gameStatus: GameStatus;
  startTime: number;
  elapsedTime: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  errors: number;
  // Actions
  newGame: (difficulty: Difficulty) => void;
  selectCell: (index: number | null) => void;
  setCellValue: (value: number) => void;
  eraseCell: () => void;
  toggleNotesMode: () => void;
  getHint: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}
const getInitialBoard = (puzzle: string, solution: string): Board => {
  const board: Board = [];
  for (let i = 0; i < 81; i++) {
    const value = puzzle[i] === '.' ? 0 : parseInt(puzzle[i], 10);
    const isGiven = value !== 0;
    board.push({
      value,
      isGiven,
      isCorrect: true,
      notes: new Set(),
      solution: parseInt(solution[i], 10),
    });
  }
  return board;
};
const checkWin = (board: Board): boolean => {
    return board.every(cell => cell.value !== 0 && cell.value === cell.solution);
};
export const useSudokuStore = create<SudokuState>((set, get) => ({
  difficulty: 'Medium',
  puzzle: '',
  solution: '',
  board: [],
  selectedCell: null,
  isNotesMode: false,
  gameStatus: 'paused',
  startTime: 0,
  elapsedTime: 0,
  timerInterval: null,
  errors: 0,
  startTimer: () => {
    if (get().timerInterval) clearInterval(get().timerInterval!);
    set({ startTime: Date.now() - get().elapsedTime * 1000 });
    const interval = setInterval(() => {
      set(state => ({ elapsedTime: Math.floor((Date.now() - state.startTime) / 1000) }));
    }, 1000);
    set({ timerInterval: interval, gameStatus: 'playing' });
  },
  stopTimer: () => {
    if (get().timerInterval) {
      clearInterval(get().timerInterval!);
      set({ timerInterval: null, gameStatus: 'paused' });
    }
  },
  newGame: (difficulty: Difficulty) => {
    get().stopTimer();
    const { puzzle, solution } = generateSudoku(difficulty);
    const board = getInitialBoard(puzzle, solution);
    set({
      difficulty,
      puzzle,
      solution,
      board,
      selectedCell: null,
      isNotesMode: false,
      gameStatus: 'playing',
      startTime: Date.now(),
      elapsedTime: 0,
      errors: 0,
    });
    get().startTimer();
  },
  selectCell: (index: number | null) => {
    set({ selectedCell: index });
  },
  setCellValue: (value: number) => {
    const { selectedCell, board, isNotesMode, solution } = get();
    if (selectedCell === null || board[selectedCell]?.isGiven) return;
    const newBoard = [...board];
    const cell = { ...newBoard[selectedCell] };
    if (isNotesMode) {
      if (cell.notes.has(value)) {
        cell.notes.delete(value);
      } else {
        cell.notes.add(value);
      }
      cell.value = 0; // Clear main value when adding notes
    } else {
      cell.value = value;
      cell.notes.clear(); // Clear notes when setting a value
      const isCorrect = value === parseInt(solution[selectedCell], 10);
      cell.isCorrect = isCorrect;
      if (!isCorrect) {
        set(state => ({ errors: state.errors + 1 }));
        toast.error("Incorrect number!", { duration: 1500 });
      }
    }
    newBoard[selectedCell] = cell;
    set({ board: newBoard });
    if (!isNotesMode && checkWin(newBoard)) {
        get().stopTimer();
        set({ gameStatus: 'won' });
        const finalTime = get().elapsedTime;
        const minutes = Math.floor(finalTime / 60);
        const seconds = finalTime % 60;
        toast.success(`Congratulations! You solved it in ${minutes}m ${seconds}s.`, {
            description: `Difficulty: ${get().difficulty}, Errors: ${get().errors}`,
            duration: 10000,
        });
    }
  },
  eraseCell: () => {
    const { selectedCell, board } = get();
    if (selectedCell === null || board[selectedCell]?.isGiven) return;
    const newBoard = [...board];
    const cell = { ...newBoard[selectedCell] };
    cell.value = 0;
    cell.notes.clear();
    cell.isCorrect = true; // Reset correctness
    newBoard[selectedCell] = cell;
    set({ board: newBoard });
  },
  toggleNotesMode: () => {
    set(state => ({ isNotesMode: !state.isNotesMode }));
  },
  getHint: () => {
    const { selectedCell, board, solution } = get();
    if (selectedCell === null || board[selectedCell]?.isGiven || board[selectedCell]?.value !== 0) return;
    const correctValue = parseInt(solution[selectedCell], 10);
    const newBoard = [...board];
    const cell = { ...newBoard[selectedCell] };
    cell.value = correctValue;
    cell.isCorrect = true;
    cell.notes.clear();
    newBoard[selectedCell] = cell;
    set({ board: newBoard });
    toast.info(`Hint: The correct number is ${correctValue}.`, { duration: 2000 });
    if (checkWin(newBoard)) {
        get().stopTimer();
        set({ gameStatus: 'won' });
        toast.success("Congratulations! You solved it!", { duration: 5000 });
    }
  },
}));