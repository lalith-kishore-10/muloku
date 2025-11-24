# Muloku - Run Script
# Run this script to start both server and client

Write-Host "🎮 Starting Muloku - Collaborative Sudoku Game" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start server in background
Write-Host "🚀 Starting server on http://localhost:3000" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\server'; npm run dev"

# Wait a moment for server to start
Start-Sleep -Seconds 2

# Start client
Write-Host "🚀 Starting client on http://localhost:5173" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\client'; npm run dev"

# Wait a moment
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ Both server and client are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Open http://localhost:5173 in your browser to play!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
