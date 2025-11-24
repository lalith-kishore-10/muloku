import Cell from "./Cell";

function SudokuBoard({ board, isMyTurn, onCellChange }) {
  if (!board || board.length === 0) {
    return <div>Loading board...</div>;
  }

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              isMyTurn={isMyTurn}
              onCellChange={onCellChange}
              isHighlighted={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SudokuBoard;
