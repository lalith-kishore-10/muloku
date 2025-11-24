// Sudoku puzzle generator
export class SudokuGenerator {
  constructor() {
    this.board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }

  // Check if number is valid in the given position
  isValid(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  }

  // Fill the board with a valid Sudoku solution
  fillBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
            () => Math.random() - 0.5
          );

          for (let num of numbers) {
            if (this.isValid(board, row, col, num)) {
              board[row][col] = num;

              if (this.fillBoard(board)) {
                return true;
              }

              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  // Remove cells to create puzzle
  removeCells(board, difficulty = 40) {
    let cellsToRemove = difficulty;

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsToRemove--;
      }
    }
  }

  // Generate a complete Sudoku puzzle
  generate(difficulty = 40) {
    const board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
    this.fillBoard(board);

    // Create a copy for the puzzle
    const puzzle = board.map((row) => [...row]);
    this.removeCells(puzzle, difficulty);

    // Create initial board with locked cells
    const initialBoard = puzzle.map((row, i) =>
      row.map((cell, j) => ({
        value: cell,
        isLocked: cell !== 0,
        solution: board[i][j],
      }))
    );

    return {
      puzzle: initialBoard,
      solution: board,
    };
  }
}
