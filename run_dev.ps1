# NyayaAI Startup Script for PowerShell
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "      NyayaAI - Legal Awareness & Citizen Platform" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

Write-Host "Starting Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload --port 8000"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nNyayaAI Services launched successfully!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API & Interactive Swagger Docs: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
