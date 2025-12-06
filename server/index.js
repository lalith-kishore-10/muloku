import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { RoomManager } from "./roomManager.js";
import { SudokuValidator } from "./validators.js";

const app = express();
const httpServer = createServer(app);

// Configure CORS for production
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

const roomManager = new RoomManager();
const timerIntervals = new Map();

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", rooms: roomManager.getAllRooms().length });
});

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Create a new room
  socket.on("create_room", ({ playerName }) => {
    try {
      const { roomId, room } = roomManager.createRoom(
        socket.id,
        playerName || "Player 1"
      );
      socket.join(roomId);

      socket.emit("room_created", {
        roomId,
        players: room.players,
        board: room.board,
        timerDuration: room.timerDuration,
      });

      console.log(`Room created: ${roomId} by ${playerName}`);
    } catch (error) {
      socket.emit("error", { message: "Failed to create room" });
    }
  });

  // Join an existing room
  socket.on("join_room", ({ roomId, playerName }) => {
    try {
      const result = roomManager.joinRoom(
        roomId,
        socket.id,
        playerName || "Player 2"
      );

      if (!result.success) {
        socket.emit("error", { message: result.error });
        return;
      }

      socket.join(roomId);

      // Start the game
      const room = result.room;

      io.to(roomId).emit("start_game", {
        roomId,
        players: room.players,
        board: room.board,
        currentTurn: room.currentTurn,
        timer: room.timer,
        timerDuration: room.timerDuration,
      });

      // Start the timer
      startRoomTimer(roomId);

      console.log(`Player ${playerName} joined room: ${roomId}`);
    } catch (error) {
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  // Handle player move
  socket.on("player_move", ({ roomId, row, col, value }) => {
    try {
      const room = roomManager.getRoom(roomId);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Check if it's this player's turn
      const currentPlayer = room.players[room.currentTurn];
      if (currentPlayer.socketId !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      // Validate the move
      const validation = SudokuValidator.validateMove(
        room.board,
        row,
        col,
        value
      );

      if (!validation.valid) {
        socket.emit("error", { message: validation.error, row, col });
        return;
      }

      // Update the board
      roomManager.updateBoard(roomId, row, col, value);

      // Broadcast the updated grid
      io.to(roomId).emit("grid_update", {
        board: room.board,
        row,
        col,
        value,
      });

      // Check if puzzle is solved
      if (SudokuValidator.isPuzzleSolved(room.board)) {
        room.gameOver = true;
        const timeSpent = Math.floor((Date.now() - room.startTime) / 1000);

        // Stop timer
        if (timerIntervals.has(roomId)) {
          clearInterval(timerIntervals.get(roomId));
          timerIntervals.delete(roomId);
        }

        io.to(roomId).emit("game_over", {
          message: "Puzzle Completed Together!",
          timeSpent,
        });

        console.log(`Game completed in room: ${roomId}`);
        return;
      }

      // Switch turn
      roomManager.switchTurn(roomId);

      io.to(roomId).emit("turn_changed", {
        currentTurn: room.currentTurn,
        currentPlayer: room.players[room.currentTurn],
        timer: room.timer,
      });

      console.log(`Move in room ${roomId}: [${row}, ${col}] = ${value}`);
    } catch (error) {
      console.error("Error handling move:", error);
      socket.emit("error", { message: "Failed to process move" });
    }
  });

  // Handle skip turn
  socket.on("skip_turn", ({ roomId }) => {
    try {
      const room = roomManager.getRoom(roomId);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Check if it's this player's turn
      const currentPlayer = room.players[room.currentTurn];
      if (currentPlayer.socketId !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      // Switch turn
      roomManager.switchTurn(roomId);

      io.to(roomId).emit("turn_changed", {
        currentTurn: room.currentTurn,
        currentPlayer: room.players[room.currentTurn],
        timer: room.timer,
      });

      console.log(`Turn skipped in room: ${roomId}`);
    } catch (error) {
      socket.emit("error", { message: "Failed to skip turn" });
    }
  });

  // Handle stop game
  socket.on("stop_game", ({ roomId }) => {
    try {
      const room = roomManager.getRoom(roomId);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Find the player who stopped the game
      const stoppingPlayer = room.players.find(p => p.socketId === socket.id);
      const playerName = stoppingPlayer ? stoppingPlayer.name : "A player";

      // Stop the timer
      if (timerIntervals.has(roomId)) {
        clearInterval(timerIntervals.get(roomId));
        timerIntervals.delete(roomId);
      }

      room.gameOver = true;

      // Notify both players
      io.to(roomId).emit("game_stopped", {
        message: `Game stopped by ${playerName}`,
        stoppedBy: playerName,
      });

      console.log(`Game stopped in room: ${roomId} by ${playerName}`);
    } catch (error) {
      socket.emit("error", { message: "Failed to stop game" });
    }
  });

  // Cancel matchmaking (creator leaves before game starts)
  socket.on("cancel_room", ({ roomId }) => {
    try {
      const room = roomManager.getRoom(roomId);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      const isCreator = room.players.length === 1 && room.players[0].socketId === socket.id;
      const notStarted = !room.gameStarted;

      if (isCreator && notStarted) {
        // Clear any running timer
        if (timerIntervals.has(roomId)) {
          clearInterval(timerIntervals.get(roomId));
          timerIntervals.delete(roomId);
        }

        // Remove creator player and delete room if empty
        roomManager.removePlayer(socket.id);
        socket.leave(roomId);
        socket.emit("matchmaking_canceled", { message: "Matchmaking canceled" });
        console.log(`Matchmaking canceled for room: ${roomId}`);
      } else {
        socket.emit("error", { message: "Cannot cancel after game starts" });
      }
    } catch (error) {
      socket.emit("error", { message: "Failed to cancel matchmaking" });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);

    const result = roomManager.removePlayer(socket.id);

    if (result) {
      const { roomId, room } = result;

      // Stop timer if room is empty
      if (room.players.length === 0 && timerIntervals.has(roomId)) {
        clearInterval(timerIntervals.get(roomId));
        timerIntervals.delete(roomId);
      } else if (room.players.length > 0) {
        // Notify remaining player
        io.to(roomId).emit("player_left", {
          message: "Other player left the game",
        });
      }
    }
  });
});

// Timer function for each room
function startRoomTimer(roomId) {
  // Clear existing interval if any
  if (timerIntervals.has(roomId)) {
    clearInterval(timerIntervals.get(roomId));
  }

  const interval = setInterval(() => {
    const room = roomManager.getRoom(roomId);

    if (!room || room.gameOver) {
      clearInterval(interval);
      timerIntervals.delete(roomId);
      return;
    }

    room.timer--;

    // Broadcast timer update
    io.to(roomId).emit("timer_update", { timer: room.timer });

    // If timer hits 0, switch turn
    if (room.timer <= 0) {
      roomManager.switchTurn(roomId);

      io.to(roomId).emit("turn_changed", {
        currentTurn: room.currentTurn,
        currentPlayer: room.players[room.currentTurn],
        timer: room.timer,
      });
    }
  }, 1000);

  timerIntervals.set(roomId, interval);
}

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🎮 Muloku server running on http://localhost:${PORT}`);
});
