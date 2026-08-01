import { useTheme } from '@/hooks/use-theme';
import { useIsFocused } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface GlassContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className = '', style, ...props }: GlassContainerProps) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const blob1Offset = useSharedValue(0);
  const blob2Offset = useSharedValue(0);

  // GlassContainer wraps every tab screen, and Expo Router's Tabs keep every
  // visited screen mounted (never unmounted) for fast tab switching. Without
  // gating on focus, these infinite withRepeat loops keep committing UI-thread
  // style/layout updates forever for tabs the user isn't even looking at —
  // across all 5 tabs this was the primary source of runaway Reanimated/Yoga
  // commits that exhausted the Hermes heap over a session.
  useEffect(() => {
    if (!isFocused) {
      cancelAnimation(blob1Offset);
      cancelAnimation(blob2Offset);
      return;
    }

    blob1Offset.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 6000 }),
        withTiming(-15, { duration: 6000 })
      ),
      -1,
      true
    );
    blob2Offset.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 7000 }),
        withTiming(20, { duration: 7000 })
      ),
      -1,
      true
    );

    return () => {
      cancelAnimation(blob1Offset);
      cancelAnimation(blob2Offset);
    };
  }, [isFocused, blob1Offset, blob2Offset]);

  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [{ translateY: blob1Offset.value }, { translateX: blob1Offset.value * 0.5 }],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [{ translateY: blob2Offset.value }, { translateX: blob2Offset.value * -0.5 }],
  }));

  return (
    <View className={`flex-1 bg-background relative ${className}`} style={style} {...props}>
      <Animated.View style={[styles.blob1, animatedBlob1]} pointerEvents="none">
        <LinearGradient
          colors={[colors.glowPrimary, 'transparent']}
          style={styles.blobFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <Animated.View style={[styles.blob2, animatedBlob2]} pointerEvents="none">
        <LinearGradient
          colors={[colors.glowTertiary, 'transparent']}
          style={styles.blobFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <View style={styles.blob3} pointerEvents="none">
        <LinearGradient
          colors={[colors.glowSecondary, 'transparent']}
          style={styles.blobFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  blob1: {
    position: 'absolute',
    top: -96,
    left: -96,
    width: 384,
    height: 384,
    borderRadius: 192,
    zIndex: -10,
    overflow: 'hidden',
  },
  blob2: {
    position: 'absolute',
    top: 384,
    right: -96,
    width: 384,
    height: 384,
    borderRadius: 192,
    zIndex: -10,
    overflow: 'hidden',
  },
  blob3: {
    position: 'absolute',
    bottom: 80,
    left: 40,
    width: 320,
    height: 320,
    borderRadius: 160,
    zIndex: -10,
    overflow: 'hidden',
  },
  blobFill: {
    width: '100%',
    height: '100%',
  },
});
