// Sudoku move validation
export class SudokuValidator {
  // Validate if a move is allowed based on Sudoku rules
  static validateMove(board, row, col, value) {
    // Check if cell is locked
    if (board[row][col].isLocked) {
      return { valid: false, error: "Cannot modify a locked cell" };
    }

    // If value is 0 (clearing), it's always valid
    if (value === 0) {
      return { valid: true };
    }

    // Check if value is between 1-9
    if (value < 1 || value > 9) {
      return { valid: false, error: "Value must be between 1 and 9" };
    }

    // Temporarily set the value for validation
    const originalValue = board[row][col].value;
    board[row][col].value = value;

    // Check row for duplicates
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c].value === value) {
        board[row][col].value = originalValue;
        return { valid: false, error: "Number already exists in this row" };
      }
    }

    // Check column for duplicates
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col].value === value) {
        board[row][col].value = originalValue;
        return { valid: false, error: "Number already exists in this column" };
      }
    }

    // Check 3x3 box for duplicates
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c].value === value) {
          board[row][col].value = originalValue;
          return {
            valid: false,
            error: "Number already exists in this 3×3 box",
          };
        }
      }
    }

    // Restore original value after validation
    board[row][col].value = originalValue;
    return { valid: true };
  }

  // Check if the puzzle is completely solved
  static isPuzzleSolved(board) {
    let emptyCells = 0;
    let incorrectCells = 0;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = board[row][col];

        // Check if any cell is empty
        if (cell.value === 0) {
          emptyCells++;
        }

        // Check if value matches solution
        if (cell.value !== 0 && cell.value !== cell.solution) {
          incorrectCells++;
        }
      }
    }

    const isSolved = emptyCells === 0 && incorrectCells === 0;
    console.log(
      `Puzzle check: emptyCells=${emptyCells}, incorrectCells=${incorrectCells}, solved=${isSolved}`
    );

    return isSolved;
  }
}
