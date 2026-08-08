import React, { useMemo } from 'react';
import Svg, { Rect, Circle, G, Image, SvgProps } from 'react-native-svg';
import QRCodeGenerator from 'qrcode';
import { EyeStyle, ModuleShape } from '@/types/qr';

export interface CustomStyledQRCodeProps extends SvgProps {
  value: string;
  size: number;
  color?: string;
  backgroundColor?: string;
  moduleShape?: ModuleShape;
  eyeStyle?: EyeStyle;
  logo?: any;
  logoSize?: number;
  logoBackgroundColor?: string;
  logoMargin?: number;
  logoRadius?: number;
  quietZone?: number;
  ecl?: 'L' | 'M' | 'Q' | 'H';
  getRef?: (ref: any) => void;
}

export const CustomStyledQRCode: React.FC<CustomStyledQRCodeProps> = ({
  value = '',
  size = 200,
  color = '#1E2D3E',
  backgroundColor = '#FFFFFF',
  moduleShape = 'square',
  eyeStyle = 'square',
  logo,
  logoSize = size * 0.2,
  logoBackgroundColor = '#FFFFFF',
  logoMargin = 2,
  logoRadius = 0,
  quietZone = 0,
  ecl = 'H',
  getRef,
  ...svgProps
}) => {
  const qrData = useMemo(() => {
    try {
      const qr = QRCodeGenerator.create(value || 'https://qrstudio.me', {
        errorCorrectionLevel: ecl,
      });
      return qr.modules;
    } catch {
      return null;
    }
  }, [value, ecl]);

  if (!qrData) return null;

  const numModules = qrData.size;
  const cellSize = size / numModules;

  // Determine logo bounds in matrix grid if logo exists
  const showLogo = !!logo;
  const logoTotalSize = logoSize + logoMargin * 2;
  const logoModules = showLogo ? Math.ceil(logoTotalSize / cellSize) : 0;
  const centerModule = Math.floor(numModules / 2);
  const logoStart = centerModule - Math.floor(logoModules / 2);
  const logoEnd = logoStart + logoModules - 1;

  const isEyeCell = (row: number, col: number) => {
    if (row < 7 && col < 7) return true;
    if (row < 7 && col >= numModules - 7) return true;
    if (row >= numModules - 7 && col < 7) return true;
    return false;
  };

  const isLogoCell = (row: number, col: number) => {
    if (!showLogo) return false;
    return (
      row >= logoStart &&
      row <= logoEnd &&
      col >= logoStart &&
      col <= logoEnd
    );
  };

  // Render a single Eye (Finder Pattern) at position (r0, c0)
  const renderEye = (r0: number, c0: number, key: string) => {
    const x = c0 * cellSize;
    const y = r0 * cellSize;
    const eyeSize = 7 * cellSize;

    if (eyeStyle === 'circle') {
      return (
        <G key={key}>
          {/* Outer Circle Frame */}
          <Circle
            cx={x + eyeSize / 2}
            cy={y + eyeSize / 2}
            r={eyeSize / 2}
            fill={color}
          />
          {/* Inner Circle Cutout */}
          <Circle
            cx={x + eyeSize / 2}
            cy={y + eyeSize / 2}
            r={(5 * cellSize) / 2}
            fill={backgroundColor === 'transparent' ? '#FFFFFF' : backgroundColor}
          />
          {/* Center Core Circle */}
          <Circle
            cx={x + eyeSize / 2}
            cy={y + eyeSize / 2}
            r={(3 * cellSize) / 2}
            fill={color}
          />
        </G>
      );
    }

    if (eyeStyle === 'rounded') {
      return (
        <G key={key}>
          {/* Outer Rounded Frame */}
          <Rect
            x={x}
            y={y}
            width={eyeSize}
            height={eyeSize}
            rx={cellSize * 2.2}
            ry={cellSize * 2.2}
            fill={color}
          />
          {/* Inner Cutout */}
          <Rect
            x={x + cellSize}
            y={y + cellSize}
            width={5 * cellSize}
            height={5 * cellSize}
            rx={cellSize * 1.5}
            ry={cellSize * 1.5}
            fill={backgroundColor === 'transparent' ? '#FFFFFF' : backgroundColor}
          />
          {/* Center Core */}
          <Rect
            x={x + 2 * cellSize}
            y={y + 2 * cellSize}
            width={3 * cellSize}
            height={3 * cellSize}
            rx={cellSize * 1.0}
            ry={cellSize * 1.0}
            fill={color}
          />
        </G>
      );
    }

    // Square Eye
    return (
      <G key={key}>
        {/* Outer Square Frame */}
        <Rect x={x} y={y} width={eyeSize} height={eyeSize} fill={color} />
        {/* Inner Cutout */}
        <Rect
          x={x + cellSize}
          y={y + cellSize}
          width={5 * cellSize}
          height={5 * cellSize}
          fill={backgroundColor === 'transparent' ? '#FFFFFF' : backgroundColor}
        />
        {/* Center Core */}
        <Rect
          x={x + 2 * cellSize}
          y={y + 2 * cellSize}
          width={3 * cellSize}
          height={3 * cellSize}
          fill={color}
        />
      </G>
    );
  };

  // Render Data Modules
  const dataModules: React.ReactNode[] = [];
  for (let row = 0; row < numModules; row++) {
    for (let col = 0; col < numModules; col++) {
      if (isEyeCell(row, col) || isLogoCell(row, col)) continue;

      const isDark = qrData.data[row * numModules + col] === 1;
      if (!isDark) continue;

      const x = col * cellSize;
      const y = row * cellSize;
      const key = `mod-${row}-${col}`;

      if (moduleShape === 'dots') {
        dataModules.push(
          <Circle
            key={key}
            cx={x + cellSize / 2}
            cy={y + cellSize / 2}
            r={cellSize * 0.44}
            fill={color}
          />
        );
      } else if (moduleShape === 'rounded') {
        dataModules.push(
          <Rect
            key={key}
            x={x + cellSize * 0.05}
            y={y + cellSize * 0.05}
            width={cellSize * 0.9}
            height={cellSize * 0.9}
            rx={cellSize * 0.35}
            ry={cellSize * 0.35}
            fill={color}
          />
        );
      } else {
        dataModules.push(
          <Rect
            key={key}
            x={x}
            y={y}
            width={cellSize + 0.1}
            height={cellSize + 0.1}
            fill={color}
          />
        );
      }
    }
  }

  // Render Logo if present
  const renderLogo = () => {
    if (!showLogo) return null;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    const bgX = logoX - logoMargin;
    const bgY = logoY - logoMargin;
    const bgSize = logoSize + logoMargin * 2;

    return (
      <G key="logo-group">
        <Rect
          x={bgX}
          y={bgY}
          width={bgSize}
          height={bgSize}
          rx={logoRadius}
          ry={logoRadius}
          fill={logoBackgroundColor}
        />
        <Image
          x={logoX}
          y={logoY}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid slice"
          href={logo}
        />
      </G>
    );
  };

  const svgTotalSize = size + quietZone * 2;

  return (
    <Svg
      ref={getRef}
      width={size}
      height={size}
      viewBox={`${-quietZone} ${-quietZone} ${svgTotalSize} ${svgTotalSize}`}
      {...svgProps}
    >
      {/* Background */}
      {backgroundColor && backgroundColor !== 'transparent' && (
        <Rect
          x={-quietZone}
          y={-quietZone}
          width={svgTotalSize}
          height={svgTotalSize}
          fill={backgroundColor}
        />
      )}

      {/* 3 Eyes */}
      {renderEye(0, 0, 'eye-tl')}
      {renderEye(0, numModules - 7, 'eye-tr')}
      {renderEye(numModules - 7, 0, 'eye-bl')}

      {/* Data Modules */}
      {dataModules}

      {/* Center Logo */}
      {renderLogo()}
    </Svg>
  );
};
