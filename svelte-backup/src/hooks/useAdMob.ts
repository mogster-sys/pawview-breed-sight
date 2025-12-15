import { useEffect, useState } from 'react';
import { isNativeApp, getPlatform } from '@/utils/platform';

// AdMob test IDs - replace with real IDs before publishing
const AD_CONFIG = {
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716', // Test ID
    interstitial: 'ca-app-pub-3940256099942544/4411468910', // Test ID
  },
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111', // Test ID
    interstitial: 'ca-app-pub-3940256099942544/1033173712', // Test ID
  },
};

export function useAdMob() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAdMob = async () => {
      if (!isNativeApp()) {
        return; // Don't initialize on web
      }

      try {
        const { AdMob } = await import('@capacitor-community/admob');
        
        await AdMob.initialize({
          initializeForTesting: true, // Set to false in production
        });
        
        setIsInitialized(true);
      } catch (err) {
        console.error('AdMob initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize ads');
      }
    };

    initAdMob();
  }, []);

  const showBanner = async () => {
    if (!isNativeApp() || !isInitialized) return;

    try {
      const { AdMob, BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob');
      const platform = getPlatform();
      const adId = platform === 'ios' ? AD_CONFIG.ios.banner : AD_CONFIG.android.banner;

      await AdMob.showBanner({
        adId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      });
    } catch (err) {
      console.error('Banner ad error:', err);
    }
  };

  const hideBanner = async () => {
    if (!isNativeApp()) return;

    try {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.hideBanner();
    } catch (err) {
      console.error('Hide banner error:', err);
    }
  };

  const showInterstitial = async () => {
    if (!isNativeApp() || !isInitialized) return;

    try {
      const { AdMob } = await import('@capacitor-community/admob');
      const platform = getPlatform();
      const adId = platform === 'ios' ? AD_CONFIG.ios.interstitial : AD_CONFIG.android.interstitial;

      await AdMob.prepareInterstitial({ adId });
      await AdMob.showInterstitial();
    } catch (err) {
      console.error('Interstitial ad error:', err);
    }
  };

  return {
    isInitialized,
    error,
    showBanner,
    hideBanner,
    showInterstitial,
  };
}
