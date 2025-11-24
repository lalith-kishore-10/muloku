import SudokuBoard from "./SudokuBoard";
import Timer from "./Timer";

function GameScreen({
  board,
  players,
  currentTurn,
  playerIndex,
  timer,
  timerDuration,
  roomId,
  onMove,
  onSkipTurn,
  onStopGame,
}) {
  const isMyTurn = currentTurn === playerIndex;
  const currentPlayer = players[currentTurn];
  const otherPlayer = players[1 - playerIndex];

  return (
    <div className="game-screen">
      <div className="game-info">
        <div className="room-info">
          <span className="room-label">Room:</span>
          <span className="room-code">{roomId}</span>
        </div>

        <div className="players-info">
          <div
            className={`player-card ${
              currentTurn === playerIndex ? "active" : ""
            }`}
          >
            <span className="player-label">You</span>
            <span className="player-name">{players[playerIndex]?.name}</span>
            {currentTurn === playerIndex && (
              <span className="turn-indicator">Your Turn</span>
            )}
          </div>

          <div
            className={`player-card ${
              currentTurn !== playerIndex ? "active" : ""
            }`}
          >
            <span className="player-label">Opponent</span>
            <span className="player-name">
              {otherPlayer?.name || "Waiting..."}
            </span>
            {currentTurn !== playerIndex && (
              <span className="turn-indicator">Their Turn</span>
            )}
          </div>
        </div>

        <Timer timer={timer} isMyTurn={isMyTurn} maxTimer={timerDuration} />

        <div className="game-actions">
          {isMyTurn && (
            <button className="btn btn-skip" onClick={onSkipTurn}>
              Skip Turn
            </button>
          )}
          <button className="btn btn-stop" onClick={onStopGame}>
            Stop Game
          </button>
        </div>
      </div>

      <div className="game-board-container">
        <SudokuBoard board={board} isMyTurn={isMyTurn} onCellChange={onMove} />
      </div>

      <div className="game-instructions">
        <p>
          {isMyTurn
            ? "🎯 Your turn! Click a cell and enter a number (1-9)"
            : "⏳ Waiting for opponent..."}
        </p>
      </div>
    </div>
  );
}

export default GameScreen;
