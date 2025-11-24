# Muloku Pre-Deployment Checklist Script

Write-Host "🚀 Muloku Deployment Preparation" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check if Git is initialized
Write-Host "Checking Git repository..." -ForegroundColor Yellow
if (Test-Path "$scriptPath\.git") {
    Write-Host "✅ Git repository exists" -ForegroundColor Green
} else {
    Write-Host "❌ Git not initialized. Run: git init" -ForegroundColor Red
    $initGit = Read-Host "Initialize Git now? (y/n)"
    if ($initGit -eq 'y') {
        git init
        Write-Host "✅ Git initialized" -ForegroundColor Green
    }
}

# Check for .env files
Write-Host ""
Write-Host "Checking environment files..." -ForegroundColor Yellow

if (Test-Path "$scriptPath\server\.env") {
    Write-Host "⚠️  server/.env exists (should not be committed)" -ForegroundColor Yellow
} else {
    Write-Host "✅ No server/.env (good - use .env.example)" -ForegroundColor Green
}

if (Test-Path "$scriptPath\client\.env") {
    Write-Host "⚠️  client/.env exists (should not be committed)" -ForegroundColor Yellow
} else {
    Write-Host "✅ No client/.env (good - use .env.example)" -ForegroundColor Green
}

# Check package.json files
Write-Host ""
Write-Host "Checking package.json files..." -ForegroundColor Yellow

if (Test-Path "$scriptPath\server\package.json") {
    Write-Host "✅ server/package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ server/package.json missing" -ForegroundColor Red
}

if (Test-Path "$scriptPath\client\package.json") {
    Write-Host "✅ client/package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ client/package.json missing" -ForegroundColor Red
}

# Check for node_modules
Write-Host ""
Write-Host "Checking for node_modules..." -ForegroundColor Yellow

if (Test-Path "$scriptPath\server\node_modules") {
    Write-Host "✅ server/node_modules exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  server/node_modules missing - run: cd server; npm install" -ForegroundColor Yellow
}

if (Test-Path "$scriptPath\client\node_modules") {
    Write-Host "✅ client/node_modules exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  client/node_modules missing - run: cd client; npm install" -ForegroundColor Yellow
}

# Git status
Write-Host ""
Write-Host "Git Status:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create GitHub repository" -ForegroundColor White
Write-Host "2. Run: git add ." -ForegroundColor White
Write-Host "3. Run: git commit -m 'Initial commit'" -ForegroundColor White
Write-Host "4. Run: git remote add origin YOUR-REPO-URL" -ForegroundColor White
Write-Host "5. Run: git push -u origin main" -ForegroundColor White
Write-Host "6. Follow DEPLOYMENT.md for hosting setup" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read DEPLOYMENT.md for detailed instructions!" -ForegroundColor Green
Write-Host ""
