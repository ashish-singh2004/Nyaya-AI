@echo off
echo ========================================================
echo       NyayaAI - Legal Awareness & Citizen Platform
echo ========================================================
echo Starting Backend and Frontend services...

start "NyayaAI Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"
timeout /t 3 /nobreak >nul
start "NyayaAI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo NyayaAI is starting!
echo Frontend: http://localhost:5173
echo Backend API & Docs: http://localhost:8000/docs
echo ========================================================
