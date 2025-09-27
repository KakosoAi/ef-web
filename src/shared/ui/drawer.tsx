import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { useTheme } from 'next-themes';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import designTokens from '@/shared/lib/design-tokens';

// Enhanced drawer variants
const drawerContentVariants = cva(
  'fixed z-50 flex h-auto flex-col border bg-background text-foreground transition-all duration-300 ease-in-out',
  {
    variants: {
      side: {
        bottom: 'inset-x-0 bottom-0 mt-24 rounded-t-lg',
        top: 'inset-x-0 top-0 mb-24 rounded-b-lg',
        left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-lg',
        right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-lg',
      },
      size: {
        sm: 'max-h-[40vh]',
        md: 'max-h-[60vh]',
        lg: 'max-h-[80vh]',
        full: 'h-full',
      },
    },
    defaultVariants: {
      side: 'bottom',
      size: 'md',
    },
  }
);

const drawerOverlayVariants = cva('fixed inset-0 z-40 transition-all duration-300', {
  variants: {
    blur: {
      none: 'bg-black/80',
      sm: 'bg-black/60 backdrop-blur-sm',
      md: 'bg-black/40 backdrop-blur-md',
      lg: 'bg-black/20 backdrop-blur-lg',
    },
  },
  defaultVariants: {
    blur: 'sm',
  },
});

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  shouldScaleBackground?: boolean;
};

type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> &
  VariantProps<typeof drawerContentVariants> & {
    showHandle?: boolean;
  };

type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> &
  VariantProps<typeof drawerOverlayVariants>;

const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, blur, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(drawerOverlayVariants({ blur }), className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side, size, showHandle = true, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          drawerContentVariants({ side, size }),
          'shadow-lg',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          className
        )}
        {...props}
      >
        {showHandle && side === 'bottom' && (
          <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted transition-colors hover:bg-muted-foreground/20' />
        )}
        {showHandle && side === 'top' && (
          <div className='mx-auto mb-4 h-2 w-[100px] rounded-full bg-muted transition-colors hover:bg-muted-foreground/20' />
        )}
        {showHandle && (side === 'left' || side === 'right') && (
          <div className='my-auto h-[100px] w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground/20' />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-1.5 p-4 text-center sm:text-left',
        'border-b border-border',
        'bg-muted/30',
        className
      )}
      {...props}
    />
  )
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mt-auto flex flex-col gap-2 p-4',
        'border-t border-border',
        'bg-muted/30',
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      'text-foreground',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', 'leading-relaxed', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// Enhanced drawer body component
const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-y-auto p-4',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20',
        className
      )}
      {...props}
    />
  )
);
DrawerBody.displayName = 'DrawerBody';

// Enhanced drawer card variant
const DrawerCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-card text-card-foreground',
        'border border-border rounded-lg',
        'shadow-sm',
        'p-4 m-2',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerCard.displayName = 'DrawerCard';

// Hook for consistent drawer theming
export function useDrawerTheme() {
  const { theme } = useTheme();

  return React.useMemo(
    () => ({
      colors: {
        primary: designTokens.colors.primary,
        accent: designTokens.colors.accent,
        muted: designTokens.colors.muted,
        background: designTokens.colors.background,
        foreground: designTokens.colors.foreground,
        border: designTokens.colors.border,
        card: designTokens.colors.card,
      },
      spacing: designTokens.spacing,
      borderRadius: designTokens.borderRadius,
      typography: designTokens.typography,
      shadows: designTokens.shadows,
      animations: designTokens.animations,
      isDark: theme === 'dark',
    }),
    [theme]
  );
}

// Utility function for drawer positioning
export function getDrawerPosition(side: 'top' | 'bottom' | 'left' | 'right') {
  const positions = {
    top: { transform: 'translateY(-100%)' },
    bottom: { transform: 'translateY(100%)' },
    left: { transform: 'translateX(-100%)' },
    right: { transform: 'translateX(100%)' },
  };

  return positions[side];
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerCard,
  drawerContentVariants,
  drawerOverlayVariants,
};
