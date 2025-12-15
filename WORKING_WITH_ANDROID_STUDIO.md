# Working with Claude Code While Using Android Studio

## Setup: Keep Both Open

Since Claude Code runs in **Windsurf/VS Code** and you're building in **Android Studio**, here's how to work with both:

### **Dual-Window Setup:**

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│   Windsurf (Claude Code)    │  │   Android Studio            │
│   - File tree               │  │   - Android project open     │
│   - Terminal/chat with me   │  │   - Build/run/debug         │
│   - Edit files if needed    │  │   - Device testing          │
└─────────────────────────────┘  └─────────────────────────────┘
```

**Benefits:**
- Android Studio for building/running Android app
- Claude Code (me!) for help, troubleshooting, file editing
- Instant file sync (same WSL2 project)

---

## How to Keep Me Available While in Android Studio

### **Option 1: Keep Windsurf Open in Background** (Recommended)

1. **Open Android Studio** with the android folder
2. **Keep Windsurf open** with the project root open
3. **Alt+Tab between them**:
   - Android Studio: Build, run, debug
   - Windsurf: Ask me questions, get help, edit files

**When you need help:**
- Switch to Windsurf
- Ask me about errors you see in Android Studio
- I can read Android Studio logs, edit files, run commands
- Switch back to Android Studio to test

---

### **Option 2: Use Windsurf Terminal Alongside Android Studio**

1. **In Windsurf:** Open terminal (Ctrl+`)
2. Keep Windsurf terminal visible
3. Work in Android Studio
4. Ask me questions in Windsurf chat while you work

**I can help you with:**
- ✅ Gradle build errors
- ✅ Manifest/config issues
- ✅ File editing (I'll edit in WSL, Android Studio auto-reloads)
- ✅ Debugging suggestions
- ✅ Code generation
- ✅ Running terminal commands

---

### **Option 3: Split Screen Windows**

**Windows 11:**
- Drag Windsurf to left half (Win + Left Arrow)
- Drag Android Studio to right half (Win + Right Arrow)

**View both at once:**
```
┌────────────────┬────────────────┐
│   Windsurf     │ Android Studio │
│                │                │
│  Chat with me  │  Build & Run   │
│  here          │  your app      │
└────────────────┴────────────────┘
```

---

## Typical Workflow

### **Starting a Build Session:**

1. **Open project in Android Studio** (Windows)
   - Navigate to: `\\wsl$\Ubuntu\home\mogie\projects\pawview-breed-sight\android`
   - File → Open

2. **Keep this Windsurf window open** (WSL2)
   - Already at: `/home/mogie/projects/pawview-breed-sight`
   - I'm already here and ready!

3. **Connect your Samsung phone**

4. **In Android Studio:** Click Run ▶️

5. **If errors occur:**
   - Copy error message
   - Switch to Windsurf
   - Paste error and ask me: "I got this error in Android Studio, can you help?"
   - I'll diagnose and fix files
   - Switch back to Android Studio (it auto-reloads files)
   - Try build again

---

## What I Can Do While You're in Android Studio

### ✅ **I Can Help With:**

- **Read build errors** - Paste Gradle errors, I'll explain and fix
- **Edit any project file** - Manifest, Gradle files, Java/Kotlin code
- **Run terminal commands** - Gradle commands, file operations
- **Check configurations** - Verify settings, permissions, dependencies
- **Generate code** - Create new components, utilities
- **Debug issues** - Analyze logs, suggest fixes
- **Search codebase** - Find files, search for code patterns
- **Sync Capacitor** - Run `npx cap sync` after web changes
- **Git operations** - Commit, branch, check status

### ❌ **I Cannot Do:**

- Click buttons in Android Studio UI
- See your Android Studio screen (you need to describe/paste errors)
- Run the Android emulator directly
- Install Android Studio plugins

---

## Common Scenarios

### **Scenario 1: Build Error in Android Studio**

1. **Android Studio shows:** Red error in Build panel
2. **You do:** Copy the error text (Ctrl+C)
3. **Switch to Windsurf, ask me:**
   ```
   I got this Gradle error:
   [paste error here]
   Can you help?
   ```
4. **I'll:** Analyze, edit the problematic file
5. **Android Studio:** Auto-detects file change, you can rebuild

---

### **Scenario 2: Need to Change Manifest**

**You:** "I need to add WRITE_EXTERNAL_STORAGE permission"

**Me:**
```
I'll add that to AndroidManifest.xml
[I edit the file via Edit tool]
Done! Android Studio should reload it automatically.
```

**You:** Build again in Android Studio ✓

---

### **Scenario 3: Web App Changes**

**You:** "I changed the camera page in Svelte"

**Me:**
```bash
# I'll rebuild and sync
npm run build
npx cap sync android
```

**You:** Rebuild in Android Studio to see changes

---

### **Scenario 4: Need Gradle Clean**

**You:** "Build is acting weird"

**Me:**
```bash
cd android
./gradlew clean
```

**You:** Try building again in Android Studio

---

## File Sync Behavior

**Important:** Both Windsurf and Android Studio are looking at the **same files** in WSL2.

**When I edit a file:**
- File changes instantly in WSL2
- Android Studio detects change (usually within 1-2 seconds)
- Android Studio shows "File changed externally" notification
- Usually auto-reloads (sometimes asks to reload)

**When you edit in Android Studio:**
- File changes in WSL2
- Windsurf/I can see the changes immediately
- No conflicts!

---

## Tips for Best Experience

1. **Keep project root open in Windsurf**
   - `/home/mogie/projects/pawview-breed-sight`
   - I can access all files from here

2. **Use Android Studio for:**
   - Building Android app
   - Running on device
   - Debugging Java/Kotlin
   - Using Android-specific tools

3. **Use Me (Windsurf) for:**
   - File editing (faster than navigating Android Studio)
   - Web app changes (Svelte code)
   - Terminal commands
   - Troubleshooting
   - Config changes

4. **Don't close Windsurf** while working in Android Studio
   - Keep it running in background
   - I stay available for help

5. **Share errors with me**
   - Copy/paste Gradle errors
   - Describe what you see
   - I'll help fix it

---

## Quick Reference: What to Use When

| Task | Use This | Why |
|------|----------|-----|
| Build Android app | Android Studio | Integrated Android tools |
| Run on Samsung | Android Studio | Device management built-in |
| Edit Svelte files | Windsurf (or AS) | Syntax highlighting in both |
| Edit AndroidManifest | Ask me in Windsurf | I can edit it quickly |
| Gradle errors | Copy to Windsurf, ask me | I can diagnose and fix |
| Add dependencies | Ask me in Windsurf | I'll edit build.gradle |
| Run Capacitor sync | Ask me in Windsurf | I'll run terminal command |
| Debug on device | Android Studio | Logcat and debugger built-in |
| Git commits | Ask me in Windsurf | I handle git operations |

---

## Current State

Right now:
- ✅ I'm running in Windsurf at project root
- ✅ Project is ready to open in Android Studio
- ✅ All files are synced and ready
- ✅ You can switch to Android Studio and I'll stay here

**Just keep this Windsurf window open while you work in Android Studio!**

---

## If You Need Me

**Just switch back to this Windsurf window and ask:**
- "Got this error in Android Studio: [error]"
- "Can you add X permission to the manifest?"
- "I need to change the app name"
- "Build is failing with [error]"
- "Can you sync Capacitor?"

**I'm here and ready to help! 🤖**
