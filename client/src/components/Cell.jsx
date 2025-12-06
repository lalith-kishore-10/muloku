import { useState, useEffect } from "react";

function Cell({ cell, row, col, isMyTurn, onCellChange, isHighlighted }) {
  const [inputValue, setInputValue] = useState("");

  // Sync inputValue when cell value changes from server
  useEffect(() => {
    if (!cell.isLocked && cell.value === 0) {
      setInputValue("");
    }
  }, [cell.value, cell.isLocked]);

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
      const numValue = value === "" ? 0 : parseInt(value);
      setInputValue(value);
      onCellChange(row, col, numValue);
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
