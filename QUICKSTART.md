# 🚀 Quick Start Guide - Muloku

## Option 1: Automated Setup (Recommended)

### Step 1: Run Setup Script

Open PowerShell in the `f:\Github\Muloku` directory and run:

```powershell
.\setup.ps1
```

This will automatically install all dependencies for both server and client.

### Step 2: Start the Application

Run:

```powershell
.\run.ps1
```

This will start both the server and client in separate terminal windows.

### Step 3: Play!

Open your browser to: **http://localhost:5173**

---

## Option 2: Manual Setup

### Terminal 1 - Start Backend

```powershell
cd f:\Github\Muloku\server
npm install
npm run dev
```

Server runs on **http://localhost:3000**

### Terminal 2 - Start Frontend

```powershell
cd f:\Github\Muloku\client
npm install
npm run dev
```

Client runs on **http://localhost:5173**

### Open Browser

Navigate to: **http://localhost:5173**

---

## 🎮 How to Play

### For Player 1 (Host):

1. Click **"Create Room"**
2. Enter your name
3. Share the **5-character room code** with Player 2

### For Player 2 (Guest):

1. Click **"Join Room"**
2. Enter the **room code** from Player 1
3. Enter your name
4. Game starts immediately!

### During Gameplay:

- ⏱️ You have **15 seconds** per turn
- 🎯 Click a cell and type a number (1-9)
- ⏭️ Press **"Skip Turn"** to pass early
- ✅ Invalid moves are automatically rejected
- 🎉 Win together by completing the puzzle!

---

## 🔧 Troubleshooting

### "Port already in use"

Change the port in:

- Server: `server/index.js` (line 214)
- Client: `client/vite.config.js` (line 6)

### "Cannot connect to server"

1. Ensure server is running on port 3000
2. Check `client/src/socket.js` - should be `http://localhost:3000`

### "Room not found"

- Room codes are case-insensitive
- Rooms expire when both players leave
- Create a new room if the old one expired

---

## 📂 Project Structure

```
Muloku/
├── server/           # Backend (Node.js + Socket.io)
├── client/           # Frontend (React + Vite)
├── README.md         # Full documentation
├── setup.ps1         # Automated setup script
└── run.ps1           # Automated run script
```

---

## 🎯 Key Features

✅ Real-time multiplayer with Socket.io
✅ Turn-based gameplay with 15-second timer
✅ Automatic Sudoku validation
✅ Dynamic puzzle generation
✅ Skip turn functionality
✅ Game completion detection
✅ Responsive design

---

**Need help? Check the full README.md for detailed documentation!**
