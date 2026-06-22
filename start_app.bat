@echo off
echo Starting Plant Disease Detection System...

:: Start Backend
start cmd /k "cd backend && "d:\PLANT DISEASE\backend\tf_env\Scripts\python.exe" app.py"

:: Start Frontend
start cmd /k "npm start"

echo Servers started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
