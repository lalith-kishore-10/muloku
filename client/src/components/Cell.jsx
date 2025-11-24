import { useState } from "react";

function Cell({ cell, row, col, isMyTurn, onCellChange, isHighlighted }) {
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (!cell.isLocked && isMyTurn) {
      // Focus on input when cell is clicked
      const input = document.getElementById(`cell-${row}-${col}`);
      if (input) input.focus();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Only allow numbers 1-9 or empty
    if (value === "" || /^[1-9]$/.test(value)) {
      setInputValue(value);
      onCellChange(row, col, value === "" ? 0 : parseInt(value));
    }
  };

  const handleKeyDown = (e) => {
    // Allow backspace, delete to clear
    if (e.key === "Backspace" || e.key === "Delete") {
      setInputValue("");
      onCellChange(row, col, 0);
    }
  };

  return (
    <div
      className={`cell ${cell.isLocked ? "locked" : ""} ${
        isHighlighted ? "highlighted" : ""
      } ${!cell.isLocked && isMyTurn ? "editable" : ""}`}
      onClick={handleClick}
    >
      {cell.isLocked ? (
        <span className="cell-value">{cell.value}</span>
      ) : (
        <input
          id={`cell-${row}-${col}`}
          type="text"
          className="cell-input"
          value={cell.value !== 0 ? cell.value : inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!isMyTurn}
          maxLength={1}
        />
      )}
    </div>
  );
}

export default Cell;
