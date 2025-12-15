# My Doggles - Deployment Guide

## Quick Status ✅

**Android:** Ready for signing & building
**iOS:** Platform added, needs macOS + Xcode
**Website:** Ready to deploy `dist/` folder to mydoggles.com

---

## 1. Android Release Build

### Step 1: Generate Release Keystore (One-time only)

```bash
# Generate a keystore for signing your app
keytool -genkey -v -keystore ~/my-doggles-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-doggles

# You'll be prompted for:
# - Keystore password (SAVE THIS!)
# - Key password (SAVE THIS!)
# - Your name
# - Organization details
# - Location info
```

**⚠️ CRITICAL:**
- Back up `my-doggles-release.keystore` somewhere SAFE
- Save passwords in password manager
- If you lose this, you can NEVER update your app on Google Play

### Step 2: Configure Signing

Create `android/key.properties`:
```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=my-doggles
storeFile=/home/mogie/my-doggles-release.keystore
```

Add to `android/app/build.gradle` (before `android {`):
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Update `signingConfigs` inside `android {}` block:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### Step 3: Build Release AAB

```bash
# Build the web app first
npm run build

# Sync to Capacitor
npx cap sync android

# Build signed Android App Bundle
cd android
./gradlew bundleRelease

# Output will be at:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Step 4: Test Before Upload

```bash
# Build debug APK for testing
./gradlew assembleDebug

# Install on device/emulator
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## 2. Google Play Store Submission

### Prerequisites
- [ ] Google Play Developer account ($25 one-time)
- [ ] Privacy Policy URL (REQUIRED)
- [ ] App screenshots (2-8 images)
- [ ] Feature graphic (1024x500)
- [ ] High-res icon (512x512) - **already have at static/favicon-512.png**

### Upload Process

1. **Go to:** https://play.google.com/console
2. **Create app:** "My Doggles"
3. **App details:**
   - Name: My Doggles
   - Default language: English
   - App/Game: App
   - Free/Paid: Free

4. **Store listing:**
   - Short description (80 chars):
     "See the world through your dog's eyes! Breed-specific vision simulator with camera filters."

   - Full description (4000 chars):
     ```
     🐕 My Doggles - See Through Your Dog's Eyes

     Ever wondered what your dog sees? My Doggles lets you experience the world exactly as your dog does!

     🔬 SCIENCE-BACKED VISION SIMULATION
     • Dichromatic color vision (blue-yellow spectrum)
     • Breed-specific retinal configurations
     • Area Centralis vs Visual Streak modes
     • Accurate field-of-view differences

     📸 REAL-TIME CAMERA FILTERS
     • Live camera with dog vision overlay
     • Split-screen comparison mode
     • Save and share photos
     • Gallery of your dog's perspective

     🐾 BREED-SPECIFIC MODES
     Choose from 25+ dog breeds including:
     • Labrador, Golden Retriever
     • Greyhound, Collie (wide field)
     • Pug, Bulldog (central focus)
     • Beagle, German Shepherd
     • And many more!

     📚 EDUCATIONAL CONTENT
     Learn about canine vision science, retinal configurations, and how different breeds see the world differently.

     Perfect for dog owners, veterinary students, and anyone curious about animal perception!
     ```

   - App icon: Upload `static/favicon-512.png`
   - Feature graphic: Create 1024x500 banner
   - Screenshots: Take 4-6 screenshots showing:
     * Home screen
     * Camera with split view
     * Gallery
     * Learn page
     * Different breed selections

5. **Content rating:**
   - Complete questionnaire
   - Should get "Everyone" rating

6. **App content:**
   - Privacy policy: REQUIRED (see below)
   - Ads: Yes (using AdMob)
   - Target audience: All ages
   - Data safety: Declare camera usage

7. **Release:**
   - Production track
   - Upload `app-release.aab`
   - Release name: "1.0.0"
   - Release notes: "Initial release"

8. **Submit for review** → Wait 3-7 days

---

## 3. iOS Build (Requires macOS)

### Prerequisites
- macOS computer
- Xcode 15+ (from App Store)
- Apple Developer account ($99/year)
- CocoaPods: `sudo gem install cocoapods`

### Setup

```bash
# Install pods (on macOS only)
cd ios/App
pod install

# Open in Xcode
open App.xcworkspace
```

### In Xcode:

1. **Select target:** App
2. **Signing & Capabilities:**
   - Team: Select your Apple Developer account
   - Bundle ID: com.pawview.mydoggles
   - Automatically manage signing: ✓

3. **General tab:**
   - Display Name: My Doggles
   - Version: 1.0
   - Build: 1

4. **Add app icon:**
   - Click Assets.xcassets
   - AppIcon
   - Drag `static/app-icon.png` (1024x1024)

5. **Add camera permission:**
   - Info.plist
   - Add: "Privacy - Camera Usage Description"
   - Value: "Take photos to see how your dog sees the world"

6. **Build & Archive:**
   - Product → Archive
   - Distribute App
   - App Store Connect
   - Upload

### App Store Connect

1. **Go to:** https://appstoreconnect.apple.com
2. **My Apps → + → New App**
3. **App Information:**
   - Name: My Doggles
   - Primary language: English
   - Bundle ID: com.pawview.mydoggles
   - SKU: mydoggles-001

4. **Screenshots:** (Required sizes)
   - iPhone 6.7" (1290x2796) - 3-10 images
   - iPhone 6.5" (1242x2688) - 3-10 images
   - iPad Pro 12.9" (2048x2732) - 3-10 images

5. **Description:** (Same as Google Play)

6. **Keywords:** (100 chars max)
   "dog,vision,camera,pet,breed,simulator,animal,science,educational,puppy"

7. **Support URL:** https://mydoggles.com

8. **Submit for review** → Wait 7-14 days (first app takes longer)

---

## 4. Privacy Policy (REQUIRED)

You MUST have a privacy policy because you:
- Use camera
- Store photos locally
- Use AdMob (if enabled)

### Quick Option: Use a generator
- https://app-privacy-policy-generator.nisrulz.com/
- https://www.privacypolicies.com/

### Must include:
- What data collected: Photos, camera access
- How it's stored: Locally on device
- Third-party services: AdMob, Supabase
- User rights: Delete data anytime
- Contact info

### Host it at:
- https://mydoggles.com/privacy-policy
- Or GitHub Pages
- Or any public URL

---

## 5. Website Deployment (mydoggles.com)

Your `dist/` folder is ready to deploy!

### Option A: Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel --prod
# Follow prompts, point mydoggles.com DNS
```

### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option C: Cloudflare Pages
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

### DNS Setup
Point `mydoggles.com` to hosting provider:
- A record or CNAME as instructed by host
- Wait for DNS propagation (1-24 hours)

---

## 6. Post-Launch Checklist

- [ ] Test app on real devices (Android + iOS)
- [ ] Set up App Store Optimization (ASO)
- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Plan v1.1 features
- [ ] Set up analytics (optional)
- [ ] Marketing/social media launch

---

## Current App Status

✅ **Version:** 1.0.0 (versionCode 1)
✅ **Package:** com.pawview.mydoggles
✅ **Platforms:** Android ✓, iOS ✓
✅ **Icon:** 1024x1024 PNG ready
✅ **Camera permission:** Added
✅ **Build:** Successful
✅ **Website:** Ready to deploy

---

## Support Contacts

- **Technical:** Your contact info
- **Support URL:** https://mydoggles.com/support
- **Email:** support@mydoggles.com (set this up)

---

## Notes

- Keep keystore backed up in 3+ locations
- Never commit keystore or passwords to git
- Test on multiple Android versions (8+)
- Test on iPhone (physical device required for camera)
- Budget 2-3 weeks for first approval cycle
- Have $124 ready ($25 Play + $99 Apple)
