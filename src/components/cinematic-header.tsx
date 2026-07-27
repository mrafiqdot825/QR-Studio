import React from 'react';
import { GlassHeader } from '@/components/ui/glass-header';

interface CinematicHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  onOpenScanner?: () => void;
  onOpenSettings?: () => void;
  className?: string;
}

export function CinematicHeader(props: CinematicHeaderProps) {
  return <GlassHeader {...props} />;
}
