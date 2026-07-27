import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Card3DProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxRotateDeg?: number;
  glowColor?: string;
  enableGesture?: boolean;
}

export function Card3D({
  children,
  style,
  maxRotateDeg = 15,
  glowColor = 'rgba(6, 182, 212, 0.4)',
  enableGesture = true,
}: Card3DProps) {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const touchX = useSharedValue(0.5);
  const touchY = useSharedValue(0.5);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!enableGesture) return;
      const cardWidth = 320;
      const cardHeight = 360;

      // Normalize touch coordinates from -1 to 1
      const normX = (event.x - cardWidth / 2) / (cardWidth / 2);
      const normY = (event.y - cardHeight / 2) / (cardHeight / 2);

      rotateY.value = normX * maxRotateDeg;
      rotateX.value = -normY * maxRotateDeg;

      touchX.value = event.x / cardWidth;
      touchY.value = event.y / cardHeight;
    })
    .onEnd(() => {
      rotateX.value = withSpring(0, { damping: 15, stiffness: 120 });
      rotateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      touchX.value = withSpring(0.5);
      touchY.value = withSpring(0.5);
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  const animatedShineStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(rotateX.value) + Math.abs(rotateY.value),
      [0, maxRotateDeg * 2],
      [0.08, 0.35]
    );

    return {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      transform: [{ translateX: -100 }, { translateY: -100 }],
      opacity,
      left: `${touchX.value * 100}%`,
      top: `${touchY.value * 100}%`,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedCardStyle}>
        <View style={[styles.cardContainer, style]}>
          {/* Glow ambient backplate */}
          <View
            style={[
              styles.glowPlate,
              {
                shadowColor: glowColor,
              },
            ]}
          />
          {children}
          {/* Specular shine light layer */}
          <Animated.View
            pointerEvents="none"
            style={animatedShineStyle}
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowPlate: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 20,
  },
  shineOverlay: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
});
