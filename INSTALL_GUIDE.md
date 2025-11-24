# 🎮 MULOKU - COMPLETE INSTALLATION GUIDE

## 🚀 Get Started in 3 Steps

### ⚡ FASTEST METHOD (Recommended for Windows)

#### Step 1: Open PowerShell

Navigate to the project folder:

```powershell
cd f:\Github\Muloku
```

#### Step 2: Run Setup

```powershell
.\setup.ps1
```

This installs all dependencies automatically for both server and client.

#### Step 3: Run the Game

```powershell
.\run.ps1
```

This starts both server and client in separate windows.

#### Step 4: Play!

Open your browser to: **http://localhost:5173**

---

## 📝 MANUAL METHOD (Alternative)

### Step 1: Install Server Dependencies

```powershell
cd f:\Github\Muloku\server
npm install
```

Expected output:

```
✓ express@4.18.2
✓ socket.io@4.6.1
✓ cors@2.8.5
```

### Step 2: Install Client Dependencies

```powershell
cd f:\Github\Muloku\client
npm install
```

Expected output:

```
✓ react@18.2.0
✓ react-dom@18.2.0
✓ socket.io-client@4.6.1
✓ vite@5.0.8
```

### Step 3: Start Server (Terminal 1)

```powershell
cd f:\Github\Muloku\server
npm run dev
```

Expected output:

```
🎮 Muloku server running on http://localhost:3000
```

### Step 4: Start Client (Terminal 2)

Open a NEW terminal window:

```powershell
cd f:\Github\Muloku\client
npm run dev
```

Expected output:

```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Open Browser

Navigate to: **http://localhost:5173**

---

## 🎯 QUICK TEST

### Test with 2 Browser Windows

1. **Window 1** (Chrome): http://localhost:5173

   - Click "Create Room"
   - Enter name: "Player 1"
   - Note the room code (e.g., "ABC12")

2. **Window 2** (Incognito/Firefox): http://localhost:5173

   - Click "Join Room"
   - Enter code: "ABC12"
   - Enter name: "Player 2"
   - Game should start!

3. **Play the Game**
   - Player 1 has first turn (15 seconds)
   - Click any empty cell
   - Type a number (1-9)
   - Turn switches to Player 2
   - Continue until puzzle is complete!

---

## ✅ VERIFICATION CHECKLIST

After installation, verify:

### Server Verification

```powershell
# In server directory
npm run dev
```

You should see:

- [ ] ✅ `🎮 Muloku server running on http://localhost:3000`
- [ ] ✅ No error messages

Test health endpoint:

```powershell
curl http://localhost:3000/health
```

Expected:

```json
{ "status": "ok", "rooms": 0 }
```

### Client Verification

```powershell
# In client directory
npm run dev
```

You should see:

- [ ] ✅ `VITE v5.0.8 ready in XXX ms`
- [ ] ✅ `Local: http://localhost:5173/`
- [ ] ✅ No compilation errors

Open browser:

- [ ] ✅ Page loads with "Muloku" header
- [ ] ✅ "Create Room" and "Join Room" buttons visible
- [ ] ✅ No console errors

---

## 🐛 TROUBLESHOOTING

### ❌ "npm: command not found"

**Problem**: Node.js/npm not installed

**Solution**:

1. Download Node.js from: https://nodejs.org/
2. Install LTS version (v18 or v20)
3. Restart PowerShell
4. Verify: `npm --version`

---

### ❌ "Port 3000 already in use"

**Problem**: Another service is using port 3000

**Solution 1** - Kill the process:

```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution 2** - Change port:
Edit `server/index.js` line 214:

```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

Then update `client/src/socket.js`:

```javascript
const SOCKET_URL = "http://localhost:3001";
```

---

### ❌ "Port 5173 already in use"

**Problem**: Another Vite app is running

**Solution 1** - Kill the process:

```powershell
# Find and kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Solution 2** - Change port:
Edit `client/vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Change to 5174
  },
});
```

---

### ❌ "Cannot connect to server"

**Problem**: Socket.io connection failed

**Check**:

1. Is server running? Look for `🎮 Muloku server running...`
2. Is URL correct in `client/src/socket.js`?
3. Check browser console for errors

**Solution**:
Verify `client/src/socket.js`:

```javascript
const SOCKET_URL = "http://localhost:3000"; // Must match server port
```

---

### ❌ "Module not found" errors

**Problem**: Dependencies not installed

**Solution**:

```powershell
# Delete node_modules and reinstall
cd server
Remove-Item -Recurse -Force node_modules
npm install

cd ../client
Remove-Item -Recurse -Force node_modules
npm install
```

---

### ❌ "Room not found" when joining

**Problem**: Room expired or invalid code

**Solution**:

- Rooms expire when both players leave
- Room codes are case-insensitive (ABC12 = abc12)
- Create a new room and try again
- Make sure server is running

---

### ❌ "CORS error" in browser

**Problem**: CORS policy blocking requests

**Solution**:
Server already has CORS configured. If issue persists:

Edit `server/index.js`:

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches client URL
    methods: ["GET", "POST"],
  },
});
```

---

### ❌ Blank screen / React errors

**Problem**: Build or runtime error

**Solution**:

1. Check browser console (F12)
2. Look for specific error message
3. Verify all files in `client/src/` exist
4. Try rebuilding:

```powershell
cd client
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

## 📂 FILE VERIFICATION

Ensure these files exist:

### Server Files (5)

```
✓ server/package.json
✓ server/index.js
✓ server/sudokuGenerator.js
✓ server/validators.js
✓ server/roomManager.js
```

### Client Files (12)

```
✓ client/package.json
✓ client/index.html
✓ client/vite.config.js
✓ client/src/main.jsx
✓ client/src/App.jsx
✓ client/src/socket.js
✓ client/src/styles.css
✓ client/src/components/Lobby.jsx
✓ client/src/components/GameScreen.jsx
✓ client/src/components/SudokuBoard.jsx
✓ client/src/components/Cell.jsx
✓ client/src/components/Timer.jsx
```

---

## 🎓 LEARNING RESOURCES

### Documentation

- `README.md` - Full project documentation
- `QUICKSTART.md` - Quick start guide
- `DEVELOPMENT.md` - Testing & debugging
- `PROJECT_SUMMARY.md` - Feature overview
- `PROJECT_STRUCTURE.md` - Code structure

### Key Concepts

- **Socket.io**: Real-time bidirectional communication
- **React Hooks**: useState, useEffect for state management
- **Express**: RESTful server setup
- **Vite**: Fast frontend build tool

---

## 🎮 READY TO PLAY!

Once everything is running:

1. ✅ Server on port 3000
2. ✅ Client on port 5173
3. ✅ Browser open to localhost:5173
4. ✅ Two browser windows for testing

**Have fun solving Sudoku together! 🎉**

---

## 📞 NEED HELP?

Check documentation:

- Installation issues → This file
- Gameplay questions → `README.md`
- Development help → `DEVELOPMENT.md`
- Feature overview → `PROJECT_SUMMARY.md`

---

**Last Updated**: November 24, 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
