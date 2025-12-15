@echo off
REM Just build the APK - don't install
REM Faster if you want to manually transfer to phone

echo Building debug APK...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================
    echo Build SUCCESS!
    echo ====================================
    echo.
    echo APK: app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo You can now:
    echo 1. Copy APK to your phone and tap to install
    echo 2. Or run: gradlew.bat installDebug
    echo.
) else (
    echo Build failed - check errors above
)

pause
