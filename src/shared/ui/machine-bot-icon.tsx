import React from 'react';
import { cn } from '@/shared/lib/utils';

interface MachineBotIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const MachineBotIcon: React.FC<MachineBotIconProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('w-6 h-6', className)}
      {...props}
    >
      {/* Robot head/body */}
      <rect
        x='6'
        y='4'
        width='12'
        height='10'
        rx='2'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />

      {/* Robot eyes */}
      <circle cx='9' cy='8' r='1' fill='currentColor' />
      <circle cx='15' cy='8' r='1' fill='currentColor' />

      {/* Robot mouth/speaker grille */}
      <rect
        x='8'
        y='10'
        width='8'
        height='2'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />

      {/* Antenna */}
      <line
        x1='12'
        y1='4'
        x2='12'
        y2='2'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle cx='12' cy='2' r='1' fill='currentColor' />

      {/* Arms/mechanical parts */}
      <rect
        x='4'
        y='7'
        width='2'
        height='4'
        rx='1'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />
      <rect
        x='18'
        y='7'
        width='2'
        height='4'
        rx='1'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />

      {/* Base/tracks */}
      <rect
        x='7'
        y='14'
        width='10'
        height='3'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />

      {/* Track details */}
      <circle cx='9' cy='15.5' r='0.5' fill='currentColor' />
      <circle cx='12' cy='15.5' r='0.5' fill='currentColor' />
      <circle cx='15' cy='15.5' r='0.5' fill='currentColor' />

      {/* Mechanical details */}
      <rect
        x='10'
        y='18'
        width='4'
        height='2'
        rx='1'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
    </svg>
  );
};

MachineBotIcon.displayName = 'MachineBotIcon';
