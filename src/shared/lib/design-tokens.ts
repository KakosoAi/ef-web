/**
 * Central Design Tokens
 * Single source of truth for all design system values
 * Extracted from shadcn/ui + Tailwind configuration
 */

// Color tokens (HSL values without hsl() wrapper for flexibility)
export const colors = {
  // Base colors
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',

  // Primary colors
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
    hover: 'var(--primary-hover)',
  },

  // Secondary colors
  secondary: {
    DEFAULT: 'var(--secondary)',
    foreground: 'var(--secondary-foreground)',
    hover: 'var(--secondary-hover)',
  },

  // Semantic colors
  destructive: {
    DEFAULT: 'var(--destructive)',
    foreground: 'var(--destructive-foreground)',
  },
  success: {
    DEFAULT: 'var(--success)',
    foreground: 'var(--success-foreground)',
  },
  warning: {
    DEFAULT: 'var(--warning)',
    foreground: 'var(--warning-foreground)',
  },

  // Surface colors
  card: {
    DEFAULT: 'var(--card)',
    foreground: 'var(--card-foreground)',
    hover: 'var(--card-hover)',
  },
  popover: {
    DEFAULT: 'var(--popover)',
    foreground: 'var(--popover-foreground)',
  },
  muted: {
    DEFAULT: 'var(--muted)',
    foreground: 'var(--muted-foreground)',
  },
  accent: {
    DEFAULT: 'var(--accent)',
    foreground: 'var(--accent-foreground)',
    hover: 'var(--accent-hover)',
  },

  // Sidebar colors
  sidebar: {
    DEFAULT: 'var(--sidebar-background)',
    foreground: 'var(--sidebar-foreground)',
    primary: 'var(--sidebar-primary)',
    primaryForeground: 'var(--sidebar-primary-foreground)',
    accent: 'var(--sidebar-accent)',
    accentForeground: 'var(--sidebar-accent-foreground)',
    border: 'var(--sidebar-border)',
    ring: 'var(--sidebar-ring)',
  },
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Poppins', 'system-ui', 'sans-serif'],
    inter: ['Inter', 'system-ui', 'sans-serif'],
    poppins: ['Poppins', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

// Spacing tokens
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

// Border radius tokens
export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  '2xl': 'calc(var(--radius) + 8px)',
  full: '9999px',
} as const;

// Shadow tokens
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: 'var(--shadow-md)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: 'var(--shadow-glow)',
  none: 'none',
} as const;

// Gradient tokens
export const gradients = {
  primary: 'var(--gradient-primary)',
  secondary: 'var(--gradient-secondary)',
  hero: 'var(--gradient-hero)',
  card: 'var(--gradient-card)',
} as const;

// Animation tokens
export const animations = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Z-index tokens
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;

// Breakpoint tokens
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const;

// Helper functions for consistent styling
export const getColorValue = (colorPath: string) => `hsl(${colorPath})`;

export const getSpacing = (size: keyof typeof spacing) => spacing[size];

export const getBorderRadius = (size: keyof typeof borderRadius) => borderRadius[size];

export const getShadow = (size: keyof typeof shadows) => shadows[size];

// Common style combinations
export const commonStyles = {
  // Card styles
  card: {
    backgroundColor: getColorValue(colors.card.DEFAULT),
    color: getColorValue(colors.card.foreground),
    borderRadius: getBorderRadius('lg'),
    boxShadow: getShadow('md'),
    border: `1px solid hsl(${colors.border})`,
  },

  // Button styles
  button: {
    primary: {
      backgroundColor: getColorValue(colors.primary.DEFAULT),
      color: getColorValue(colors.primary.foreground),
      borderRadius: getBorderRadius('md'),
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animations.duration.normal} ${animations.easing.easeInOut}`,
    },
    secondary: {
      backgroundColor: getColorValue(colors.secondary.DEFAULT),
      color: getColorValue(colors.secondary.foreground),
      borderRadius: getBorderRadius('md'),
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animations.duration.normal} ${animations.easing.easeInOut}`,
    },
  },

  // Input styles
  input: {
    backgroundColor: getColorValue(colors.background),
    color: getColorValue(colors.foreground),
    border: `1px solid hsl(${colors.border})`,
    borderRadius: getBorderRadius('md'),
    fontSize: typography.fontSize.sm,
    transition: `all ${animations.duration.normal} ${animations.easing.easeInOut}`,
  },

  // Focus styles
  focus: {
    outline: 'none',
    boxShadow: `0 0 0 2px hsl(${colors.ring})`,
  },
} as const;

const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  animations,
  zIndex,
  breakpoints,
  getColorValue,
  getSpacing,
  getBorderRadius,
  getShadow,
  commonStyles,
};

export default designTokens;
