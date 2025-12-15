import { Capacitor } from '@capacitor/core';

/**
 * Platform detection utilities for differentiating between web and native app versions.
 * 
 * Web version: Premium subscription available, no ads
 * Native version (app stores): Ad-supported, no premium option
 */

export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const isWebApp = (): boolean => {
  return !Capacitor.isNativePlatform();
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * Feature flags based on platform
 */
export const features = {
  // Premium subscription only available on web (uses Stripe)
  get showPremium(): boolean {
    return isWebApp();
  },
  
  // Ads only shown on native app store versions
  get showAds(): boolean {
    return isNativeApp();
  },
};
