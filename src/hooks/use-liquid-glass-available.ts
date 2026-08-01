import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform } from 'react-native';

// Availability can't change at runtime, so a module-level cache avoids re-checking
// (and re-risking the native-module lookup below) on every render.
let cachedAvailability: boolean | null = null;

/**
 * Whether the real native iOS 26 Liquid Glass material (`expo-glass-effect`) can be used.
 * `false` on every platform other than iOS, and `false` on iOS itself when the native module
 * isn't linked (Expo Go, or a JS bundle running before `expo prebuild`) — `isLiquidGlassAvailable()`
 * throws in that case rather than returning `false`, so the lookup must be guarded.
 */
export function useLiquidGlassAvailable(): boolean {
  if (cachedAvailability === null) {
    if (Platform.OS !== 'ios') {
      cachedAvailability = false;
    } else {
      try {
        cachedAvailability = !!isLiquidGlassAvailable();
      } catch {
        cachedAvailability = false;
      }
    }
  }
  return cachedAvailability ?? false;
}
