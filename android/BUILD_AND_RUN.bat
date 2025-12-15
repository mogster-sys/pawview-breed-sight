@echo off
REM Quick build and install script for Windows
REM Run this from the android folder in Windows terminal

echo ====================================
echo My Doggles - Android Build Script
echo ====================================
echo.

echo Cleaning previous build...
call gradlew.bat clean

echo.
echo Building debug APK...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================
    echo Build SUCCESS!
    echo ====================================
    echo.
    echo APK location: app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Installing to connected device...
    call gradlew.bat installDebug

    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ====================================
        echo App installed successfully!
        echo ====================================
        echo Check your phone - "My Doggles" should be installed
    ) else (
        echo.
        echo Installation failed. Make sure:
        echo - Phone is connected via USB
        echo - USB debugging is enabled
        echo - You approved the connection on your phone
    )
) else (
    echo.
    echo ====================================
    echo Build FAILED!
    echo ====================================
    echo Check the error messages above
)

echo.
pause
