import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
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
  const blob1Offset = useSharedValue(0);
  const blob2Offset = useSharedValue(0);

  useEffect(() => {
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
  }, [blob1Offset, blob2Offset]);

  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [{ translateY: blob1Offset.value }, { translateX: blob1Offset.value * 0.5 }],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [{ translateY: blob2Offset.value }, { translateX: blob2Offset.value * -0.5 }],
  }));

  return (
    <View className={`flex-1 bg-background relative ${className}`} style={style} {...props}>
      {/* SOFT AMBIENT FLOATING RADIAL LIGHT BLOBS */}
      <Animated.View
        style={[animatedBlob1]}
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/10 -z-10 blur-3xl"
        pointerEvents="none"
      />
      <Animated.View
        style={[animatedBlob2]}
        className="absolute top-96 -right-24 w-96 h-96 rounded-full bg-violet-400/10 -z-10 blur-3xl"
        pointerEvents="none"
      />
      <View
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-400/10 -z-10 blur-3xl"
        pointerEvents="none"
      />

      {children}
    </View>
  );
}
