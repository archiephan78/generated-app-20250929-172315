import { Difficulty } from '@/stores/sudoku-store';
const SIZE = 9;
const BOX_SIZE = 3;
export interface Cell {
  value: number;
  isGiven: boolean;
  isCorrect: boolean;
  notes: Set<number>;
  solution: number;
}
export type Board = Cell[];
// A simple, fast, but not perfectly random Sudoku generator.
// It creates a valid solved board and then removes cells.
// For a production app, a more robust generator with unique solution guarantee would be better.
function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}
function solve(grid: number[][]): boolean {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}
function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }
  const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}
export function generateSudoku(difficulty: Difficulty): { puzzle: string; solution: string } {
  const grid = createEmptyGrid();
  solve(grid);
  const solution = grid.flat().join('');
  let cellsToRemove: number;
  switch (difficulty) {
    case 'Easy':
      cellsToRemove = 40;
      break;
    case 'Medium':
      cellsToRemove = 50;
      break;
    case 'Hard':
      cellsToRemove = 55;
      break;
    case 'Expert':
      cellsToRemove = 60;
      break;
    default:
      cellsToRemove = 50;
  }
  const puzzleGrid = grid.map(row => [...row]);
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    if (puzzleGrid[row][col] !== 0) {
      puzzleGrid[row][col] = 0;
      removed++;
    }
  }
  const puzzle = puzzleGrid.flat().map(num => (num === 0 ? '.' : num)).join('');
  return { puzzle, solution };
}
export function solveSudoku(boardString: string): string | null {
    const grid: number[][] = [];
    for (let i = 0; i < SIZE; i++) {
        grid.push(boardString.substring(i * SIZE, (i + 1) * SIZE).split('').map(c => c === '.' ? 0 : parseInt(c)));
    }
    if (solve(grid)) {
        return grid.flat().join('');
    }
    return null;
}