# 🎮 Muloku - Collaborative Sudoku Game

A real-time, two-player collaborative Sudoku game built with React, Node.js, Express, and Socket.io.

## 🌟 Features

- **Two-Player Collaborative Gameplay**: Work together with a friend to solve Sudoku puzzles
- **Turn-Based System**: Players alternate turns with a 15-second timer
- **Real-Time Synchronization**: All moves, turn changes, and timer updates sync instantly via Socket.io
- **Sudoku Validation**: Automatically validates moves against Sudoku rules (no duplicates in rows, columns, or 3×3 boxes)
- **Auto-Generated Puzzles**: Fresh Sudoku puzzle generated for each game room
- **Skip Turn Feature**: Players can voluntarily skip their turn
- **Game Completion Detection**: Automatically detects when the puzzle is solved
- **Responsive UI**: Clean, modern interface that works on desktop and mobile

## 🏗️ Tech Stack

### Backend

- Node.js
- Express.js
- Socket.io (WebSocket communication)

### Frontend

- React 18
- Vite (build tool)
- Socket.io Client
- CSS3

## 📁 Project Structure

```
Muloku/
├── server/
│   ├── index.js              # Main server file with Socket.io logic
│   ├── sudokuGenerator.js    # Sudoku puzzle generator
│   ├── validators.js         # Move validation logic
│   ├── roomManager.js        # Room and game state management
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Lobby.jsx         # Room creation/joining UI
    │   │   ├── GameScreen.jsx    # Main game interface
    │   │   ├── SudokuBoard.jsx   # 9×9 Sudoku grid
    │   │   ├── Cell.jsx          # Individual cell component
    │   │   └── Timer.jsx         # Countdown timer display
    │   ├── App.jsx               # Main app component
    │   ├── socket.js             # Socket.io client setup
    │   ├── main.jsx              # React entry point
    │   └── styles.css            # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone the repository

```bash
cd f:\Github\Muloku
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🎯 Running the Application

### Terminal 1: Start the Backend Server

```bash
cd f:\Github\Muloku\server
npm run dev
```

Server will start on `http://localhost:3000`

### Terminal 2: Start the Frontend

```bash
cd f:\Github\Muloku\client
npm run dev
```

Client will start on `http://localhost:5173`

### Access the Game

Open your browser and navigate to: **http://localhost:5173**

## 🎮 How to Play

### Creating a Game

1. Click **"Create Room"** on the lobby screen
2. Enter your name
3. Share the 5-character room code with your friend
4. Wait for them to join

### Joining a Game

1. Click **"Join Room"** on the lobby screen
2. Enter the room code
3. Enter your name
4. Game starts immediately!

### Gameplay Rules

- Players take turns filling in the Sudoku grid
- Each turn lasts **15 seconds**
- Only the active player can enter numbers
- Numbers must follow Sudoku rules:
  - No duplicates in any row
  - No duplicates in any column
  - No duplicates in any 3×3 box
- Click **"Skip Turn"** to pass your turn early
- Complete all 81 cells correctly to win together!

## 🔌 Socket.io Events

### Client → Server

- `create_room` - Create a new game room
- `join_room` - Join an existing room
- `player_move` - Submit a move (row, col, value)
- `skip_turn` - Skip current player's turn

### Server → Client

- `room_created` - Room successfully created
- `start_game` - Game begins (both players joined)
- `grid_update` - Board state updated
- `turn_changed` - Turn switched to other player
- `timer_update` - Timer countdown update
- `game_over` - Puzzle completed successfully
- `error` - Error message
- `player_left` - Other player disconnected

## 🛠️ Development

### Backend Development

The server uses Node.js watch mode for auto-reload:

```bash
cd server
npm run dev
```

### Frontend Development

Vite provides hot module replacement:

```bash
cd client
npm run dev
```

### Building for Production

#### Backend

```bash
cd server
npm start
```

#### Frontend

```bash
cd client
npm run build
npm run preview
```

## 📝 Environment Variables

### Server (optional)

Create `server/.env`:

```
PORT=3000
```

### Client (optional)

Update socket URL in `client/src/socket.js` if deploying:

```javascript
const SOCKET_URL = "http://your-server-url";
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 or 5173 is occupied:

- **Backend**: Change PORT in server/index.js
- **Frontend**: Change port in client/vite.config.js

### Connection Issues

- Ensure both server and client are running
- Check firewall settings
- Verify Socket.io URL in client/src/socket.js matches server

### Game Not Starting

- Both players must join the same room
- Room codes are case-insensitive
- Each room supports exactly 2 players

## 🎨 Customization

### Puzzle Difficulty

Edit `server/roomManager.js`, line 23:

```javascript
const { puzzle } = generator.generate(40); // 40 cells removed (medium)
// Change to: 30 (easy), 50 (hard), 60 (expert)
```

### Timer Duration

Edit `server/index.js` and `client/src/components/Timer.jsx`:

```javascript
timer: 15, // Change to desired seconds
```

### Styling

All styles are in `client/src/styles.css` with CSS custom properties for easy theming.

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 🙏 Credits

Built with ❤️ using React, Node.js, Express, and Socket.io

---

**Enjoy playing Muloku with your friends! 🎉**
