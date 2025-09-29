import React from 'react';
import { cn } from '@/shared/lib/utils';

interface MachineryIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const MachineryIcon: React.FC<MachineryIconProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('w-6 h-6', className)}
      {...props}
    >
      {/* Main body/cabin */}
      <rect
        x='5'
        y='6'
        width='14'
        height='8'
        rx='1'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />

      {/* Windshield/front glass */}
      <path
        d='M7 6 L7 4 L17 4 L17 6'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Hydraulic arm */}
      <path
        d='M19 8 L22 6 L22 10 L19 8'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinejoin='round'
      />

      {/* Bucket/scoop */}
      <path
        d='M22 6 L24 4 L24 8 L22 10'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
        strokeLinejoin='round'
      />

      {/* Tracks/wheels */}
      <rect
        x='6'
        y='14'
        width='12'
        height='4'
        rx='2'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      />

      {/* Track wheels */}
      <circle cx='8' cy='16' r='1' fill='currentColor' />
      <circle cx='12' cy='16' r='1' fill='currentColor' />
      <circle cx='16' cy='16' r='1' fill='currentColor' />

      {/* Cabin details */}
      <rect
        x='8'
        y='8'
        width='3'
        height='2'
        rx='0.5'
        stroke='currentColor'
        strokeWidth='1'
        fill='none'
      />

      {/* Engine/exhaust */}
      <rect
        x='2'
        y='9'
        width='3'
        height='3'
        rx='0.5'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />

      {/* Exhaust pipe */}
      <line
        x1='2'
        y1='10'
        x2='0.5'
        y2='10'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />

      {/* Gear/mechanical detail */}
      <circle cx='14' cy='10' r='1.5' stroke='currentColor' strokeWidth='1' fill='none' />
      <path
        d='M14 8.5 L14 11.5 M12.5 10 L15.5 10'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
      />

      {/* Warning light */}
      <circle cx='16' cy='8' r='0.5' fill='currentColor' />
    </svg>
  );
};

MachineryIcon.displayName = 'MachineryIcon';
