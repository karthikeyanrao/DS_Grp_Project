@echo off
echo ================================================
echo   Starting RMI Room Information Server
echo ================================================
echo.

REM Check if compiled
if not exist "bin\com\hostel\rmi\RoomInfoServer.class" (
    echo [ERROR] Compiled classes not found!
    echo Please run 'compile.bat' first.
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting RMI Server...
echo [INFO] Server will run on port 1099
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the server
java -cp bin com.hostel.rmi.RoomInfoServer

pause
