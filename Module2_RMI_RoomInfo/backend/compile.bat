@echo off
echo ================================================
echo   Compiling Java RMI Room Information Service
echo ================================================
echo.

REM Create bin directory if it doesn't exist
if not exist "bin" mkdir bin

REM Compile all Java files
echo [1/2] Compiling Java source files...
javac -d bin src\com\hostel\rmi\*.java

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Compilation completed successfully!
    echo.
    echo Compiled files are in the 'bin' directory.
    echo.
    echo Next steps:
    echo   1. Run 'start-server.bat' to start the RMI server
    echo   2. Run 'start-client.bat' to test with command-line client
    echo   3. Open 'frontend\index.html' in a browser for the web UI
    echo.
) else (
    echo [ERROR] Compilation failed!
    echo Please check the error messages above.
    echo.
)

pause
