# Build on Windows with Android Studio

Since Gradle needs Java 21 and it's easier to manage on Windows, here's how to build the app using Android Studio on your Windows machine:

## Step 1: Access the Android Project

The Android project is located at:
```
\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight\android
```

Or use the Windows path if you have WSL synced:
```
\\wsl.localhost\Ubuntu\home\mogie\projects\pawview-breed-sight\android
```

## Step 2: Open in Android Studio

1. **Launch Android Studio** on Windows
2. **File → Open**
3. Navigate to the `android` folder path above
4. Click **OK**

Android Studio will:
- Auto-detect it's a Capacitor/Ionic project
- Download required SDKs and Java if needed
- Sync Gradle automatically

## Step 3: Wait for Gradle Sync

First time opening:
- Android Studio will download dependencies (~5-10 minutes)
- Let it complete all Gradle syncs
- Check bottom status bar for progress

## Step 4: Connect Your Samsung Phone

1. **Enable Developer Options** on your Samsung:
   - Settings → About Phone
   - Tap "Build Number" 7 times
   - Developer Options will appear

2. **Enable USB Debugging:**
   - Settings → Developer Options
   - Turn ON "USB Debugging"

3. **Connect via USB cable**

4. **Allow debugging** when prompted on phone

## Step 5: Build & Run

### Option A: Run Directly (Fastest)
1. In Android Studio toolbar, select your Samsung device
2. Click green **Run** button (▶️)
3. App will build and install automatically

### Option B: Build APK Manually
1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for build to complete
3. Click "locate" in notification
4. APK will be at: `app/build/outputs/apk/debug/app-debug.apk`

## Step 6: Install APK on Phone

If using Option B:
1. Copy `app-debug.apk` to your phone (USB, email, cloud)
2. On phone, tap the APK file
3. Allow "Install from Unknown Sources" if prompted
4. Tap **Install**

## Troubleshooting

### "Gradle sync failed"
- **Tools → SDK Manager** → Install latest Android SDK
- Install SDK Platform 34 (Android 14)
- Install Build Tools 34.0.0

### "Java version not found"
- Android Studio should bundle Java 21
- If not: **File → Project Structure → SDK Location**
- Set JDK location to bundled Java (usually in Android Studio folder)

### "Device not detected"
- Install Samsung USB drivers for Windows
- Try different USB cable/port
- Unplug and replug phone
- Revoke USB debugging authorizations on phone, reconnect

### "Camera permission denied"
- Uninstall old version if any
- Fresh install from APK
- Grant camera permission when prompted

## Quick Commands (if you prefer terminal)

In Android Studio terminal or Windows PowerShell (in project directory):

```bash
# Build debug APK
gradlew.bat assembleDebug

# Install on connected device
gradlew.bat installDebug

# Build and run
gradlew.bat assembleDebug installDebug
```

APK output: `app\build\outputs\apk\debug\app-debug.apk`

## Expected First Run

When you launch the app:
1. Grant camera permission ✓
2. You should see the home screen with dog icon
3. Tap "Live Dog Vision Camera"
4. Camera should open with split-screen view
5. Choose a breed and see the filter applied

## Alternative: WSL Build (Advanced)

If you want to build in WSL, you need Java 21:

```bash
# Install Java 21 (requires sudo)
sudo apt update
sudo apt install -y openjdk-21-jdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# Build
cd /home/mogie/projects/pawview-breed-sight
npx cap sync android
cd android
./gradlew assembleDebug
```

APK will be at: `app/build/outputs/apk/debug/app-debug.apk`

---

**Note:** The Windows path makes this MUCH easier. Android Studio handles all Java/SDK requirements automatically.
