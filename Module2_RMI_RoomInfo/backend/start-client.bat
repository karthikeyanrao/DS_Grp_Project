@echo off
echo ================================================
echo   Starting RMI Room Information Client
echo ================================================
echo.

REM Check if compiled
if not exist "bin\com\hostel\rmi\RoomInfoClient.class" (
    echo [ERROR] Compiled classes not found!
    echo Please run 'compile.bat' first.
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting RMI Client...
echo [INFO] Make sure the server is running!
echo.

REM Start the client
java -cp bin com.hostel.rmi.RoomInfoClient

pause
