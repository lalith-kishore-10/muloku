import { SudokuGenerator } from "./sudokuGenerator.js";

export class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  // Generate a random 5-character room ID
  generateRoomId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roomId = "";
    for (let i = 0; i < 5; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Ensure unique
    if (this.rooms.has(roomId)) {
      return this.generateRoomId();
    }

    return roomId;
  }

  // Create a new room
  createRoom(playerId, playerName, timerDuration = 45) {
    const roomId = this.generateRoomId();
    const generator = new SudokuGenerator();
    const { puzzle } = generator.generate(40); // 40 cells removed for medium difficulty

    const room = {
      id: roomId,
      players: [{ id: playerId, name: playerName, socketId: playerId }],
      board: puzzle,
      currentTurn: 0, // Index of player whose turn it is
      timer: timerDuration,
      timerDuration: timerDuration,
      gameStarted: false,
      gameOver: false,
      startTime: null,
      timerInterval: null,
    };

    this.rooms.set(roomId, room);
    return { roomId, room };
  }

  // Join an existing room
  joinRoom(roomId, playerId, playerName) {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    if (room.players.length >= 2) {
      return { success: false, error: "Room is full" };
    }

    if (room.gameStarted) {
      return { success: false, error: "Game already in progress" };
    }

    room.players.push({
      id: playerId,
      name: playerName,
      socketId: playerId,
    });

    room.gameStarted = true;
    room.startTime = Date.now();

    return { success: true, room };
  }

  // Get room by ID
  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  // Remove a player from a room
  removePlayer(playerId) {
    for (const [roomId, room] of this.rooms.entries()) {
      const playerIndex = room.players.findIndex(
        (p) => p.socketId === playerId
      );

      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);

        // If room is empty, delete it
        if (room.players.length === 0) {
          if (room.timerInterval) {
            clearInterval(room.timerInterval);
          }
          this.rooms.delete(roomId);
        }

        return { roomId, room };
      }
    }
    return null;
  }

  // Switch turn to the next player
  switchTurn(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    room.currentTurn = (room.currentTurn + 1) % room.players.length;
    room.timer = room.timerDuration;

    return room;
  }

  // Update board with a move
  updateBoard(roomId, row, col, value) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    room.board[row][col].value = value;
    return room;
  }

  // Get all rooms (for debugging)
  getAllRooms() {
    return Array.from(this.rooms.values());
  }
}
