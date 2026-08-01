import { useIsFocused } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SWEEP_START = -150;
const SWEEP_END = 500;
const SWEEP_WIDTH = 90;

/**
 * An occasional diagonal light sweep across a glass surface — "light catching the glass."
 * Purely decorative; parent must clip it via `overflow-hidden` since it travels well
 * past a typical card's bounds to stay diagonal at any card width.
 */
export function GlassShimmer() {
  const sweep = useSharedValue(SWEEP_START);
  const isFocused = useIsFocused();

  // The host card (e.g. HomeHeroCard, QRStage3D) stays mounted on its tab even
  // when the tab is off-screen, since Expo Router's Tabs never unmount visited
  // screens. Without pausing here, this loop keeps issuing UI-thread commits
  // indefinitely in the background across every visited tab.
  useEffect(() => {
    if (!isFocused) {
      cancelAnimation(sweep);
      return;
    }

    sweep.value = withRepeat(
      withSequence(
        withTiming(SWEEP_START, { duration: 0 }),
        withDelay(2600, withTiming(SWEEP_END, { duration: 1300, easing: Easing.inOut(Easing.ease) }))
      ),
      -1,
      false
    );
    return () => cancelAnimation(sweep);
  }, [isFocused, sweep]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sweep.value }, { rotate: '20deg' }],
  }));

  return (
    <Animated.View style={[styles.sweep, animatedStyle]} pointerEvents="none">
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.28)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sweep: {
    position: 'absolute',
    top: -60,
    bottom: -60,
    left: 0,
    width: SWEEP_WIDTH,
  },
});
