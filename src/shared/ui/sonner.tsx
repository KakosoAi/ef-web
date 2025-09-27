'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';
import { cn } from '@/shared/lib/utils';
import designTokens from '@/shared/lib/design-tokens';

// Toast theme configuration
const getToastTheme = (isDark: boolean) => ({
  background: isDark ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)',
  foreground: isDark ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)',
  border: isDark ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(214.3 31.8% 91.4%)',
  muted: isDark ? 'hsl(215 20.2% 65.1%)' : 'hsl(215.4 16.3% 46.9%)',
  success: isDark ? 'hsl(142.1 70.6% 45.3%)' : 'hsl(142.1 76.2% 36.3%)',
  warning: isDark ? 'hsl(35.5 91.7% 32.9%)' : 'hsl(32.5 94.6% 43.7%)',
  error: isDark ? 'hsl(0 62.8% 30.6%)' : 'hsl(0 84.2% 60.2%)',
  info: isDark ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)',
});

interface ToasterProps extends React.ComponentProps<typeof Sonner> {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;
  visibleToasts?: number;
  gap?: number;
  offset?: string | number;
  dir?: 'ltr' | 'rtl' | 'auto';
}

const Toaster = ({
  className,
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
  duration = 4000,
  visibleToasts = 5,
  gap = 12,
  offset = '16px',
  dir = 'auto',
  ...props
}: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  const isDark = theme === 'dark';
  const toastTheme = getToastTheme(isDark);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group', className)}
      position={position}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      duration={duration}
      visibleToasts={visibleToasts}
      gap={gap}
      offset={offset}
      dir={dir}
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground',
            'group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            'group-[.toaster]:rounded-lg group-[.toaster]:border',
            'group-[.toaster]:backdrop-blur-sm',
            // Use design tokens for consistent styling
            'group-[.toaster]:font-sans group-[.toaster]:text-sm',
            'group-[.toaster]:leading-normal'
          ),
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: cn(
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            'group-[.toast]:hover:bg-primary/90',
            'group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2',
            'group-[.toast]:text-sm group-[.toast]:font-medium',
            'group-[.toast]:transition-colors'
          ),
          cancelButton: cn(
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            'group-[.toast]:hover:bg-muted/80',
            'group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2',
            'group-[.toast]:text-sm group-[.toast]:font-medium',
            'group-[.toast]:transition-colors'
          ),
          closeButton: cn(
            'group-[.toast]:bg-background group-[.toast]:text-foreground',
            'group-[.toast]:hover:bg-muted',
            'group-[.toast]:rounded-md group-[.toast]:p-1',
            'group-[.toast]:transition-colors'
          ),
          success:
            'group-[.toast]:bg-success/10 group-[.toast]:text-success group-[.toast]:border-success/20',
          error:
            'group-[.toast]:bg-destructive/10 group-[.toast]:text-destructive group-[.toast]:border-destructive/20',
          warning:
            'group-[.toast]:bg-warning/10 group-[.toast]:text-warning group-[.toast]:border-warning/20',
          info: 'group-[.toast]:bg-primary/10 group-[.toast]:text-primary group-[.toast]:border-primary/20',
        },
        style: {
          backgroundColor: toastTheme.background,
          color: toastTheme.foreground,
          borderColor: toastTheme.border,
          borderRadius: designTokens.borderRadius.lg,
          fontSize: designTokens.typography.fontSize.sm,
          fontFamily: designTokens.typography.fontFamily.sans.join(', '),
          boxShadow: designTokens.shadows.lg,
        },
      }}
      {...props}
    />
  );
};

// Enhanced toast functions with consistent styling
interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  cancel?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  duration?: number;
  important?: boolean;
  id?: string | number;
  dismissible?: boolean;
  onDismiss?: (toast: string | number | object) => void;
  onAutoClose?: (toast: string | number | object) => void;
}

// Success toast with unified styling
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...options,
    className: cn('border-success/20 bg-success/10 text-success', '[&>svg]:text-success'),
  });
};

// Error toast with unified styling
export const showErrorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...options,
    className: cn(
      'border-destructive/20 bg-destructive/10 text-destructive',
      '[&>svg]:text-destructive'
    ),
  });
};

// Warning toast with unified styling
export const showWarningToast = (message: string, options?: ToastOptions) => {
  return toast.warning(message, {
    ...options,
    className: cn('border-warning/20 bg-warning/10 text-warning', '[&>svg]:text-warning'),
  });
};

// Info toast with unified styling
export const showInfoToast = (message: string, options?: ToastOptions) => {
  return toast.info(message, {
    ...options,
    className: cn('border-primary/20 bg-primary/10 text-primary', '[&>svg]:text-primary'),
  });
};

// Default toast with unified styling
export const showToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    ...options,
    className: cn('border-border bg-background text-foreground', 'backdrop-blur-sm'),
  });
};

// Loading toast with unified styling
export const showLoadingToast = (message: string, options?: Omit<ToastOptions, 'duration'>) => {
  return toast.loading(message, {
    ...options,
    className: cn('border-primary/20 bg-primary/10 text-primary', '[&>svg]:text-primary'),
  });
};

// Promise toast with unified styling
export const showPromiseToast = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error) => string);
  },
  options?: ToastOptions
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    ...options,
    classNames: {
      loading: cn('border-primary/20 bg-primary/10 text-primary', '[&>svg]:text-primary'),
      success: cn('border-success/20 bg-success/10 text-success', '[&>svg]:text-success'),
      error: cn(
        'border-destructive/20 bg-destructive/10 text-destructive',
        '[&>svg]:text-destructive'
      ),
    },
  });
};

// Custom toast with full control
export const showCustomToast = (
  content: React.ReactNode,
  options?: ToastOptions & {
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  }
) => {
  const { variant = 'default', ...restOptions } = options || {};

  const variantClasses = {
    default: 'border-border bg-background text-foreground',
    success: 'border-success/20 bg-success/10 text-success [&>svg]:text-success',
    error: 'border-destructive/20 bg-destructive/10 text-destructive [&>svg]:text-destructive',
    warning: 'border-warning/20 bg-warning/10 text-warning [&>svg]:text-warning',
    info: 'border-primary/20 bg-primary/10 text-primary [&>svg]:text-primary',
  };

  return toast.custom((_t) => (
    <div className={cn(variantClasses[variant], 'backdrop-blur-sm')}>
      {content}
    </div>
  ), {
    ...restOptions,
  });
};

// Utility to dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Utility to dismiss specific toast
export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};

// Export enhanced components and utilities
export { Toaster, toast, type ToasterProps, type ToastOptions };
