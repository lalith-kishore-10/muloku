# Muloku - Quick Setup Script
# Run this script to install all dependencies

Write-Host "🎮 Setting up Muloku - Collaborative Sudoku Game" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
Set-Location "$scriptPath\server"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Server dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install server dependencies" -ForegroundColor Red
    Set-Location $scriptPath
    exit 1
}

# Install client dependencies
Write-Host ""
Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
Set-Location "$scriptPath\client"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install client dependencies" -ForegroundColor Red
    Set-Location $scriptPath
    exit 1
}

Set-Location $scriptPath

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "  1. Open a terminal and run: cd server; npm run dev" -ForegroundColor White
Write-Host "  2. Open another terminal and run: cd client; npm run dev" -ForegroundColor White
Write-Host "  3. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""
