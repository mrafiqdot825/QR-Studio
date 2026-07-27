import { WithSpringConfig } from 'react-native-reanimated';

export const SpringConfigs: Record<string, WithSpringConfig> = {
  gentle: {
    damping: 18,
    stiffness: 180,
    mass: 0.8,
  },
  bouncy: {
    damping: 12,
    stiffness: 220,
    mass: 0.6,
  },
  tight: {
    damping: 24,
    stiffness: 300,
    mass: 0.5,
  },
  modal: {
    damping: 20,
    stiffness: 200,
    mass: 1,
  },
  flip: {
    damping: 14,
    stiffness: 90,
    mass: 1,
  },
};
