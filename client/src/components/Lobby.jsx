import { useState } from "react";

function Lobby({ onCreateRoom, onJoinRoom }) {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [timerDuration, setTimerDuration] = useState(45);
  const [mode, setMode] = useState(null); // null, 'create', 'join'

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (playerName.trim() && timerDuration >= 10 && timerDuration <= 300) {
      onCreateRoom(playerName.trim(), timerDuration);
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (playerName.trim() && roomCode.trim()) {
      onJoinRoom(roomCode.trim().toUpperCase(), playerName.trim());
    }
  };

  if (!mode) {
    return (
      <div className="lobby">
        <div className="lobby-container">
          <h2>Welcome to Muloku!</h2>
          <p className="lobby-description">
            Collaborate with a friend to solve a Sudoku puzzle together. Take
            turns, think fast, and complete the puzzle!
          </p>

          <div className="lobby-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setMode("create")}
            >
              Create Room
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setMode("join")}
            >
              Join Room
            </button>
          </div>
          <footer className="lobby-footer">
            <small>Made by Lalith Kishore.N.S</small>
          </footer>
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="lobby">
        <div className="lobby-container">
          <h2>Create a Room</h2>
          <form onSubmit={handleCreateRoom}>
            <div className="form-group">
              <label htmlFor="playerName">Your Name</label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Create Room
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMode(null)}
              >
                Back
              </button>
            </div>
          </form>
          <footer className="lobby-footer">
            <small>Made by Lalith Kishore.N.S</small>
          </footer>
        </div>
      </div>
    );
  }

  if (mode === "join") {
    return (
      <div className="lobby">
        <div className="lobby-container">
          <h2>Join a Room</h2>
          <form onSubmit={handleJoinRoom}>
            <div className="form-group">
              <label htmlFor="roomCode">Room Code</label>
              <input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter 5-character code"
                maxLength={5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="playerName">Your Name</label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Join Room
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMode(null)}
              >
                Back
              </button>
            </div>
          </form>
          <footer className="lobby-footer">
            <small>Made by Lalith Kishore.N.S</small>
          </footer>
        </div>
      </div>
    );
  }
}

export default Lobby;
