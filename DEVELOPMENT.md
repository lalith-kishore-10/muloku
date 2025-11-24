# 🧪 Development & Testing Guide

## Testing Locally

### Testing with Two Browser Windows

1. **Start the application**

   ```powershell
   # Terminal 1
   cd server
   npm run dev

   # Terminal 2
   cd client
   npm run dev
   ```

2. **Open two browser windows**

   - Window 1: http://localhost:5173
   - Window 2: http://localhost:5173 (incognito/private mode recommended)

3. **Test the full flow**
   - Window 1: Create Room → Get room code
   - Window 2: Join Room → Enter the code
   - Both windows should now be in the game

### Testing Checklist

#### Room Creation & Joining

- [ ] Create room generates a 5-character code
- [ ] Room code is displayed to creator
- [ ] Joining with valid code works
- [ ] Joining with invalid code shows error
- [ ] Joining full room (2 players) shows error

#### Gameplay

- [ ] Board renders correctly (9×9 grid)
- [ ] Locked cells are displayed and cannot be edited
- [ ] Empty cells are editable
- [ ] Timer starts at 15 seconds
- [ ] Timer counts down every second
- [ ] Timer switches turn when it hits 0
- [ ] Only active player can enter numbers
- [ ] Other player sees board updates in real-time

#### Move Validation

- [ ] Valid moves are accepted
- [ ] Duplicate in row is rejected
- [ ] Duplicate in column is rejected
- [ ] Duplicate in 3×3 box is rejected
- [ ] Error messages are shown for invalid moves
- [ ] Turn switches after valid move

#### Skip Turn

- [ ] Skip button is visible to active player
- [ ] Skip button switches turn immediately
- [ ] Timer resets to 15 after skip

#### Game Completion

- [ ] Game detects when all cells are filled
- [ ] Game only completes if all values are correct
- [ ] Both players see completion message
- [ ] Time spent is displayed
- [ ] Play Again button returns to lobby

#### Disconnection

- [ ] Player disconnect is handled gracefully
- [ ] Other player is notified
- [ ] Room is cleaned up when empty

## Socket.io Events Testing

### Monitor Events in Browser Console

Add this to `client/src/App.jsx` useEffect for debugging:

```javascript
// Debug: Log all socket events
socket.onAny((event, ...args) => {
  console.log(`[Socket Event] ${event}:`, args);
});
```

### Expected Event Flow

#### Room Creation

```
Client → Server: create_room
Server → Client: room_created
```

#### Room Joining

```
Client → Server: join_room
Server → Both: start_game
Server → Both: timer_update (every second)
```

#### Player Move

```
Client → Server: player_move
Server → Both: grid_update
Server → Both: turn_changed
```

#### Skip Turn

```
Client → Server: skip_turn
Server → Both: turn_changed
```

#### Game Over

```
Server → Both: game_over
```

## Common Development Issues

### Issue: Socket not connecting

**Solution:** Check that server is running and `client/src/socket.js` has correct URL

### Issue: Timer not updating

**Solution:** Check browser console for socket events. Verify server is sending `timer_update`

### Issue: Moves not syncing

**Solution:** Verify both clients are in same room. Check Network tab for socket messages

### Issue: Board not rendering

**Solution:** Check React DevTools. Verify board data structure in state

## Backend API Testing

### Health Check

```powershell
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "rooms": 0
}
```

## Performance Testing

### Load Test (Optional)

Install socket.io-client for Node:

```bash
npm install socket.io-client
```

Create `test-client.js`:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("create_room", { playerName: "Test Player" });
});

socket.on("room_created", ({ roomId }) => {
  console.log("Room created:", roomId);
});
```

Run:

```bash
node test-client.js
```

## Debugging Tips

### Backend Debugging

- Check server console for logs
- Room creation: `Room created: XXXXX by PlayerName`
- Player move: `Move in room XXXXX: [row, col] = value`
- Game complete: `Game completed in room: XXXXX`

### Frontend Debugging

- Open React DevTools
- Check state in App component
- Verify socket connection in Network tab (WS/Socket)
- Look for error messages in Console

### Common Logs

```javascript
// Add to components for debugging
console.log("Current state:", { gameState, roomId, currentTurn });
```

## Code Quality

### Linting (Optional)

Add to `package.json`:

```json
"scripts": {
  "lint": "eslint src/**/*.{js,jsx}"
}
```

### Format Code (Optional)

```bash
npm install -D prettier
```

Add `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Deployment Notes

### Environment Variables

- Server: Set `PORT` if not using 3000
- Client: Update `SOCKET_URL` in `socket.js` to production URL

### Build for Production

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

Built files will be in `client/dist/`

## Contributing

When adding features:

1. Test locally with two browser windows
2. Verify socket events are working
3. Check console for errors
4. Test edge cases (disconnection, invalid moves, etc.)
5. Update README if needed

---

**Happy coding! 🚀**
