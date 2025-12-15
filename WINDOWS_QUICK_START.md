# Windows Quick Start - Testing on Samsung

## Your Project Paths (from Windows)

**From Windows File Explorer, navigate to:**
```
\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight
```

**Or if using newer Windows:**
```
\\wsl.localhost\Ubuntu\home\mogie\projects\pawview-breed-sight
```

**Quick test:** Open Windows File Explorer and paste either path above in the address bar. You should see your project files.

---

## Method 1: Android Studio (Recommended)

### Open Project
1. **Launch Android Studio**
2. **File → Open**
3. Navigate to: `\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight\android`
4. Click **OK**

### First Time Setup
- Gradle will auto-download Java 21 (via foojay-resolver)
- Downloads Android SDK components
- Syncs dependencies
- **Takes 5-10 minutes** - watch bottom status bar

### Build & Run
1. Connect Samsung via USB
2. Enable USB Debugging on phone
3. Select your Samsung in device dropdown (top toolbar)
4. Click green **Run** button ▶️

**Done!** App builds and installs automatically.

---

## Method 2: Command Line (Windows PowerShell/CMD)

### Open Terminal in Android Folder

**Option A: From File Explorer**
1. Navigate to: `\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight\android`
2. Right-click in folder → "Open in Terminal" (Windows 11)
3. Or type `cmd` in address bar

**Option B: Navigate in PowerShell**
```powershell
cd "\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight\android"
```

### Run Helper Script
```batch
BUILD_AND_RUN.bat
```

This will:
- Clean previous build
- Build debug APK
- Install to connected Samsung
- Show you where APK is located

**Or build only (no install):**
```batch
QUICK_BUILD.bat
```

### Manual Gradle Commands
```batch
REM Build APK
gradlew.bat assembleDebug

REM Install on phone
gradlew.bat installDebug

REM Build and install in one go
gradlew.bat assembleDebug installDebug

REM Clean build
gradlew.bat clean assembleDebug
```

**APK Location:**
```
app\build\outputs\apk\debug\app-debug.apk
```

---

## Method 3: WSL2 Direct (If You Install Java 21)

**Only if you want to build from WSL terminal:**

```bash
# Install Java 21 first (requires sudo)
sudo apt update && sudo apt install -y openjdk-21-jdk

# Then build
cd /home/mogie/projects/pawview-breed-sight/android
./gradlew assembleDebug

# Output: app/build/outputs/apk/debug/app-debug.apk
```

**Not recommended** - easier to use Windows side with Android Studio's bundled JDK.

---

## Troubleshooting

### "Cannot find project path"
- Make sure WSL2 is running: `wsl --list --running`
- Try the alternate path: `\\wsl.localhost\...`
- Enable WSL integration in Windows: Settings → Apps → WSL

### "Gradle build failed: Java not found"
**If using Android Studio:**
- It should auto-download Java 21
- Check: Tools → SDK Manager → SDK Tools
- Verify JDK location: File → Project Structure → SDK Location

**If using command line:**
- Android Studio's JDK is at: `C:\Program Files\Android\Android Studio\jbr\`
- You can set JAVA_HOME to that

### "Device not detected"
1. Phone: Settings → Developer Options → Revoke USB debugging authorizations
2. Disconnect and reconnect phone
3. Approve debugging when prompted
4. Windows: Install Samsung USB drivers

### "Build takes forever"
- First build downloads ~500MB of dependencies
- Gradle also downloads Java 21 first time
- Subsequent builds: ~30 seconds

### "Windsurf/WSL2 issues"
If Windsurf is locking files or causing conflicts:
1. Close Windsurf
2. Build in Windows Terminal instead
3. Or use Android Studio which handles file locking better

---

## Pre-Build Checklist

✅ **Already done from WSL:**
- Web assets built (`dist/` folder)
- Assets synced to Android (`android/app/src/main/assets/public/`)
- Capacitor config updated
- Gradle configured for Java 21 auto-download
- Camera permissions added to manifest
- App icons copied

✅ **You need to do:**
- Open in Android Studio or run build script
- Connect Samsung phone
- Enable USB debugging
- Click Run!

---

## Expected Build Output

```
BUILD SUCCESSFUL in 2m 35s
157 actionable tasks: 157 executed
```

**APK Size:** ~8-12 MB

**First install on phone:**
1. Grant camera permission → Allow
2. Home screen with "My Doggles"
3. Tap "Live Dog Vision Camera"
4. Camera opens with filters
5. Works!

---

## Quick Commands Reference

```batch
REM From android folder in Windows:

BUILD_AND_RUN.bat           # Build + Install (auto)
QUICK_BUILD.bat             # Build only
gradlew.bat assembleDebug   # Build APK
gradlew.bat installDebug    # Install on phone
gradlew.bat clean           # Clean build cache
```

---

## Next Steps After Successful Build

1. Test camera functionality
2. Try different breeds and filters
3. Save photos to gallery
4. Check if everything works offline
5. Share feedback on what works/doesn't!

**All set!** The hard WSL2 prep work is done. Windows side should "just work" now. 🚀
