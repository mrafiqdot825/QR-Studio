import React from 'react';
import Svg, { Rect, Path, G, SvgProps } from 'react-native-svg';

export interface AppLogoSvgProps extends SvgProps {
  size?: number;
  showBackground?: boolean;
  backgroundColor?: string;
  navyColor?: string;
  blueColor?: string;
}

export const AppLogoSvg: React.FC<AppLogoSvgProps> = ({
  size = 100,
  showBackground = true,
  backgroundColor = '#EBF5FE',
  navyColor = '#1E2D3E',
  blueColor = '#396B9E',
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
      {showBackground && (
        <Rect width="100" height="100" rx="22" fill={backgroundColor} />
      )}

      {/* Outer Navy Frame / Bars */}
      <G fill={navyColor}>
        {/* Top bar */}
        <Rect x="44" y="16" width="12" height="6" rx="3" />

        {/* Left bar */}
        <Rect x="16" y="44" width="6" height="12" rx="3" />

        {/* L-shaped border on Bottom & Right */}
        <Path
          d="M 68 44 V 78 H 34"
          stroke={navyColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Finder Pattern Top-Left */}
        <Rect x="16" y="16" width="24" height="24" rx="7" />
        <Rect
          x="20"
          y="20"
          width="16"
          height="16"
          rx="4"
          fill={showBackground ? backgroundColor : '#FFFFFF'}
        />
        <Rect x="24" y="24" width="8" height="8" rx="2.5" fill={navyColor} />

        {/* Finder Pattern Top-Right */}
        <Rect x="60" y="16" width="24" height="24" rx="7" />
        <Rect
          x="64"
          y="20"
          width="16"
          height="16"
          rx="4"
          fill={showBackground ? backgroundColor : '#FFFFFF'}
        />
        <Rect x="68" y="24" width="8" height="8" rx="2.5" fill={navyColor} />

        {/* Finder Pattern Bottom-Left */}
        <Rect x="16" y="60" width="24" height="24" rx="7" />
        <Rect
          x="20"
          y="64"
          width="16"
          height="16"
          rx="4"
          fill={showBackground ? backgroundColor : '#FFFFFF'}
        />
        <Rect x="24" y="68" width="8" height="8" rx="2.5" fill={navyColor} />
      </G>

      {/* Center 2x2 Grid of Rotated Diamonds */}
      <G transform="translate(50 50) rotate(45)">
        <Rect x="-12" y="-12" width="10" height="10" rx="2.5" fill={blueColor} />
        <Rect x="2" y="-12" width="10" height="10" rx="2.5" fill={blueColor} />
        <Rect x="-12" y="2" width="10" height="10" rx="2.5" fill={blueColor} />
        <Rect x="2" y="2" width="10" height="10" rx="2.5" fill={blueColor} />
      </G>
    </Svg>
  );
};
