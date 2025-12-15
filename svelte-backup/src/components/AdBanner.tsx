import { useEffect } from 'react';
import { useAdMob } from '@/hooks/useAdMob';
import { features } from '@/utils/platform';

/**
 * AdBanner component - only renders on native app store versions.
 * On web, this component renders nothing.
 */
export function AdBanner() {
  const { showBanner, hideBanner } = useAdMob();

  useEffect(() => {
    if (!features.showAds) return;

    showBanner();

    return () => {
      hideBanner();
    };
  }, [showBanner, hideBanner]);

  // Don't render anything visible - AdMob handles the native banner overlay
  if (!features.showAds) return null;

  return null;
}
