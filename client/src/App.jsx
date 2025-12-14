import { useState, useEffect } from "react";
import { socket, connectSocket } from "./socket";
import Lobby from "./components/Lobby";
import GameScreen from "./components/GameScreen";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [gameState, setGameState] = useState("lobby"); // 'lobby', 'waiting', 'playing', 'finished'
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [timer, setTimer] = useState(45);
  const [timerDuration, setTimerDuration] = useState(45);
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [error, setError] = useState("");
  const [gameResult, setGameResult] = useState(null);
  const [lastInvalidCell, setLastInvalidCell] = useState(null);
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  useEffect(() => {
    connectSocket();

    // Room created
    socket.on("room_created", ({ roomId, players, board, timerDuration }) => {
      setRoomId(roomId);
      setPlayers(players);
      setBoard(board);
      setPlayerIndex(0);
      setTimerDuration(timerDuration || 45);
      setGameState("waiting");
    });

    // Game started
    socket.on(
      "start_game",
      ({ roomId, players, board, currentTurn, timer, timerDuration }) => {
        setRoomId(roomId);
        setPlayers(players);
        setBoard(board);
        setCurrentTurn(currentTurn);
        setTimer(timer);
        setTimerDuration(timerDuration || 45);

        // Find player index
        const index = players.findIndex((p) => p.socketId === socket.id);
        setPlayerIndex(index);

        setGameState("playing");
      }
    );

    // Grid update
    socket.on("grid_update", ({ board }) => {
      setBoard(board);
    });

    // Turn changed
    socket.on("turn_changed", ({ currentTurn, timer }) => {
      // Clear invalid cell from previous turn if marked
      if (lastInvalidCell) {
        setBoard((prevBoard) => {
          const newBoard = prevBoard.map((row) => [...row]);
          newBoard[lastInvalidCell.row][lastInvalidCell.col] = 0;
          return newBoard;
        });
        setLastInvalidCell(null);
      }
      setCurrentTurn(currentTurn);
      setTimer(timer);
    });

    // Timer update
    socket.on("timer_update", ({ timer }) => {
      setTimer(timer);
    });

    // Game over
    socket.on("game_over", ({ message, timeSpent }) => {
      console.log("🎉 Received game_over event:", { message, timeSpent });
      setGameResult({ message, timeSpent });
      setGameState("finished");
      console.log("Game state set to finished");
    });

    // Error handling
    socket.on("error", ({ message, row, col }) => {
      setError(message);
      // Track invalid cell if coordinates provided
      if (row !== undefined && col !== undefined) {
        setLastInvalidCell({ row, col });
      }
      // Auto-hide after 5 seconds
      setTimeout(() => setError(""), 5000);
    });

    // Player left
    socket.on("player_left", ({ message }) => {
      setError(message);
      setTimeout(() => {
        setGameState("lobby");
        setRoomId("");
        setPlayers([]);
        setBoard([]);
      }, 2000);
    });

    // Matchmaking canceled by creator
    socket.on("matchmaking_canceled", ({ message }) => {
      if (message) setError(message);
      setGameState("lobby");
      setRoomId("");
      setPlayers([]);
      setBoard([]);
      setCurrentTurn(0);
      setTimer(45);
      setTimerDuration(45);
      setPlayerIndex(-1);
    });

    // Game stopped
    socket.on("game_stopped", ({ message, stoppedBy }) => {
      setError(message);
      setTimeout(() => {
        setGameState("lobby");
        setRoomId("");
        setPlayers([]);
        setBoard([]);
        setCurrentTurn(0);
        setTimer(45);
        setTimerDuration(45);
        setPlayerIndex(-1);
      }, 2000);
    });

    return () => {
      socket.off("room_created");
      socket.off("start_game");
      socket.off("grid_update");
      socket.off("turn_changed");
      socket.off("timer_update");
      socket.off("game_over");
      socket.off("error");
      socket.off("player_left");
      socket.off("matchmaking_canceled");
      socket.off("game_stopped");
    };
  }, []);

  const handleCreateRoom = (playerName, timerDuration) => {
    socket.emit("create_room", { playerName, timerDuration });
  };

  const handleJoinRoom = (roomId, playerName) => {
    socket.emit("join_room", { roomId, playerName });
  };

  const handleCancelMatchmaking = () => {
    socket.emit("cancel_room", { roomId });
  };

  const handleMove = (row, col, value) => {
    socket.emit("player_move", { roomId, row, col, value });
  };

  const handleSkipTurn = () => {
    socket.emit("skip_turn", { roomId });
  };

  const handleStopGame = () => {
    setShowStopConfirm(true);
  };

  const confirmStopGame = () => {
    socket.emit("stop_game", { roomId });
    setShowStopConfirm(false);
  };

  const cancelStopGame = () => {
    setShowStopConfirm(false);
  };

  const handlePlayAgain = () => {
    setGameState("lobby");
    setRoomId("");
    setPlayers([]);
    setBoard([]);
    setCurrentTurn(0);
    setTimer(45);
    setTimerDuration(45);
    setPlayerIndex(-1);
    setGameResult(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Muloku</h1>
        <p className="subtitle">Collaborative Sudoku</p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button
            className="error-close"
            onClick={() => setError("")}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showStopConfirm}
        title="Stop Game?"
        message="Are you sure you want to stop the game? This will end the game for both players."
        onConfirm={confirmStopGame}
        onCancel={cancelStopGame}
      />

      {gameState === "lobby" && (
        <Lobby onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      )}

      {gameState === "waiting" && (
        <div className="waiting-screen">
          <h2>Room Created!</h2>
          <div className="room-code">
            <span>Room Code:</span>
            <strong>{roomId}</strong>
          </div>
          <p>Waiting for another player to join...</p>
          <div className="spinner"></div>
          <div className="waiting-actions">
            <button
              className="btn btn-secondary"
              onClick={handleCancelMatchmaking}
            >
              Cancel Matchmaking
            </button>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <GameScreen
          board={board}
          players={players}
          currentTurn={currentTurn}
          playerIndex={playerIndex}
          timer={timer}
          timerDuration={timerDuration}
          roomId={roomId}
          onMove={handleMove}
          onSkipTurn={handleSkipTurn}
          onStopGame={handleStopGame}
        />
      )}

      {gameState === "finished" && gameResult && (
        <div className="end-screen">
          <h2>🎉 {gameResult.message}</h2>
          <div className="game-stats">
            <p>
              Time Spent:{" "}
              <strong>
                {Math.floor(gameResult.timeSpent / 60)}:
                {String(gameResult.timeSpent % 60).padStart(2, "0")}
              </strong>
            </p>
            <p>
              Players: <strong>{players.map((p) => p.name).join(" & ")}</strong>
            </p>
          </div>
          <button className="btn btn-primary" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}
      {console.log("Debug - gameState:", gameState, "gameResult:", gameResult)}
    </div>
  );
}

export default App;
