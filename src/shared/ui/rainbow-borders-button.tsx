import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          'rainbow-border relative w-[140px] h-10 flex items-center justify-center gap-2.5 px-4 bg-gray-900 rounded-xl border-none text-white cursor-pointer font-semibold transition-all duration-200 hover:bg-gray-800',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

RainbowButton.displayName = 'RainbowButton';
