import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { designTokens } from "@/shared/lib/design-tokens";
import { Button } from "@/shared/ui/button";

// InputOTP variants for different styles
const inputOTPVariants = cva(
  "flex items-center has-[:disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "gap-2",
        compact: "gap-1",
        spaced: "gap-4",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const inputOTPSlotVariants = cva(
  "relative flex items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
  {
    variants: {
      variant: {
        default: "bg-background",
        filled: "bg-muted",
        outline: "bg-transparent border-2",
      },
      size: {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
      state: {
        default: "",
        error: "border-destructive text-destructive",
        success: "border-green-500 text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

// Theme hook for consistent InputOTP styling
const useInputOTPTheme = () => {
  const { theme } = useTheme();
  
  return React.useMemo(() => ({
    colors: {
      background: theme === 'dark' ? designTokens.colors.dark.background : designTokens.colors.light.background,
      foreground: theme === 'dark' ? designTokens.colors.dark.foreground : designTokens.colors.light.foreground,
      muted: theme === 'dark' ? designTokens.colors.dark.muted.DEFAULT : designTokens.colors.light.muted.DEFAULT,
      mutedForeground: theme === 'dark' ? designTokens.colors.dark.muted.foreground : designTokens.colors.light.muted.foreground,
      border: theme === 'dark' ? designTokens.colors.dark.border : designTokens.colors.light.border,
      input: theme === 'dark' ? designTokens.colors.dark.input : designTokens.colors.light.input,
      ring: theme === 'dark' ? designTokens.colors.dark.ring : designTokens.colors.light.ring,
      destructive: theme === 'dark' ? designTokens.colors.dark.destructive.DEFAULT : designTokens.colors.light.destructive.DEFAULT,
    },
    radius: designTokens.borderRadius,
    shadows: designTokens.shadows,
    spacing: designTokens.spacing,
    typography: designTokens.typography,
  }), [theme]);
};

interface InputOTPProps extends 
  React.ComponentPropsWithoutRef<typeof OTPInput>,
  VariantProps<typeof inputOTPVariants> {
  containerClassName?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, variant, size, error, success, disabled, ...props }, ref) => {
    const otpTheme = useInputOTPTheme();
    
    return (
      <OTPInput
        ref={ref}
        containerClassName={cn(
          inputOTPVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        disabled={disabled}
        style={{
          fontFamily: otpTheme.typography.fontFamily.mono,
        }}
        {...props}
      />
    );
  },
);
InputOTP.displayName = "InputOTP";

interface InputOTPGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "separated" | "connected";
}

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, InputOTPGroupProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const otpTheme = useInputOTPTheme();
    
    return (
      <div 
        ref={ref} 
        className={cn(
          "flex items-center",
          variant === "separated" && "gap-2",
          variant === "connected" && "gap-0",
          variant === "default" && "gap-1",
          className
        )} 
        style={{
          fontFamily: otpTheme.typography.fontFamily.mono,
        }}
        {...props} 
      />
    );
  },
);
InputOTPGroup.displayName = "InputOTPGroup";

interface InputOTPSlotProps extends 
  React.ComponentPropsWithoutRef<"div">,
  VariantProps<typeof inputOTPSlotVariants> {
  index: number;
  error?: boolean;
  success?: boolean;
}

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({ index, className, variant, size, state, error, success, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    const otpTheme = useInputOTPTheme();

    // Determine state based on props
    const currentState = error ? "error" : success ? "success" : state || "default";

    return (
      <div
        ref={ref}
        className={cn(
          inputOTPSlotVariants({ variant, size, state: currentState }),
          isActive && "z-10 ring-2 ring-ring ring-offset-background",
          className,
        )}
        style={{
          fontFamily: otpTheme.typography.fontFamily.mono,
          fontSize: size === "sm" ? otpTheme.typography.fontSize.xs : 
                   size === "lg" ? otpTheme.typography.fontSize.base : 
                   otpTheme.typography.fontSize.sm,
        }}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div 
              className="animate-caret-blink h-4 w-px duration-1000"
              style={{
                backgroundColor: otpTheme.colors.foreground,
              }}
            />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

interface InputOTPSeparatorProps extends React.ComponentPropsWithoutRef<"div"> {
  icon?: React.ReactNode;
  variant?: "dot" | "dash" | "custom";
}

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, InputOTPSeparatorProps>(
  ({ className, icon, variant = "dot", ...props }, ref) => {
    const otpTheme = useInputOTPTheme();
    
    const renderSeparator = () => {
      if (variant === "custom" && icon) return icon;
      if (variant === "dash") return <span className="text-muted-foreground">-</span>;
      return <Dot className="text-muted-foreground" />;
    };

    return (
      <div 
        ref={ref} 
        role="separator" 
        className={cn("flex items-center justify-center", className)}
        style={{
          color: otpTheme.colors.mutedForeground,
        }}
        {...props}
      >
        {renderSeparator()}
      </div>
    );
  },
);
InputOTPSeparator.displayName = "InputOTPSeparator";

// Enhanced InputOTP components
interface InputOTPWithLabelProps extends InputOTPProps {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
}

const InputOTPWithLabel = React.forwardRef<React.ElementRef<typeof InputOTP>, InputOTPWithLabelProps>(
  ({ label, description, error, success, required, className, ...props }, ref) => {
    const otpTheme = useInputOTPTheme();
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            style={{
              fontSize: otpTheme.typography.fontSize.sm,
              fontFamily: otpTheme.typography.fontFamily.sans,
            }}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <InputOTP
          ref={ref}
          className={className}
          error={!!error}
          success={!!success}
          {...props}
        />
        {description && !error && !success && (
          <p 
            className="text-sm text-muted-foreground"
            style={{
              fontSize: otpTheme.typography.fontSize.xs,
              color: otpTheme.colors.mutedForeground,
            }}
          >
            {description}
          </p>
        )}
        {error && (
          <p 
            className="text-sm text-destructive"
            style={{
              fontSize: otpTheme.typography.fontSize.xs,
              color: otpTheme.colors.destructive,
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p 
            className="text-sm text-green-600"
            style={{
              fontSize: otpTheme.typography.fontSize.xs,
            }}
          >
            {success}
          </p>
        )}
      </div>
    );
  },
);
InputOTPWithLabel.displayName = "InputOTPWithLabel";

// OTP Input with actions
interface InputOTPWithActionsProps extends InputOTPProps {
  showToggle?: boolean;
  showCopy?: boolean;
  onToggleVisibility?: () => void;
  onCopy?: () => void;
  isVisible?: boolean;
  value?: string;
}

const InputOTPWithActions = React.forwardRef<React.ElementRef<typeof InputOTP>, InputOTPWithActionsProps>(
  ({ 
    showToggle = false, 
    showCopy = false, 
    onToggleVisibility, 
    onCopy, 
    isVisible = true, 
    value = "",
    className,
    ...props 
  }, ref) => {
    const [copied, setCopied] = React.useState(false);
    
    const handleCopy = React.useCallback(async () => {
      if (value && onCopy) {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy();
        setTimeout(() => setCopied(false), 2000);
      }
    }, [value, onCopy]);

    return (
      <div className="relative">
        <InputOTP
          ref={ref}
          className={className}
          {...props}
        />
        {(showToggle || showCopy) && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {showToggle && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onToggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </Button>
            )}
            {showCopy && value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
InputOTPWithActions.displayName = "InputOTPWithActions";

// Complete OTP Form component
interface OTPFormProps {
  length?: number;
  onComplete?: (value: string) => void;
  onValueChange?: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: InputOTPProps['variant'];
  size?: InputOTPProps['size'];
  autoSubmit?: boolean;
  placeholder?: string;
}

const OTPForm = React.forwardRef<React.ElementRef<typeof InputOTP>, OTPFormProps>(
  ({ 
    length = 6, 
    onComplete, 
    onValueChange,
    label,
    description,
    error,
    success,
    required,
    disabled,
    variant,
    size,
    autoSubmit = false,
    placeholder,
    ...props 
  }, ref) => {
    const [value, setValue] = React.useState("");

    const handleValueChange = React.useCallback((newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
      
      if (newValue.length === length) {
        onComplete?.(newValue);
      }
    }, [length, onComplete, onValueChange]);

    return (
      <InputOTPWithLabel
        ref={ref}
        maxLength={length}
        value={value}
        onChange={handleValueChange}
        label={label}
        description={description}
        error={error}
        success={success}
        required={required}
        disabled={disabled}
        variant={variant}
        size={size}
        {...props}
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, i) => (
            <InputOTPSlot 
              key={i} 
              index={i} 
              error={!!error}
              success={!!success}
              size={size}
            />
          ))}
        </InputOTPGroup>
      </InputOTPWithLabel>
    );
  },
);
OTPForm.displayName = "OTPForm";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  InputOTPWithLabel,
  InputOTPWithActions,
  OTPForm,
  useInputOTPTheme,
  inputOTPVariants,
  inputOTPSlotVariants,
  type InputOTPProps,
  type InputOTPGroupProps,
  type InputOTPSlotProps,
  type InputOTPSeparatorProps,
  type InputOTPWithLabelProps,
  type InputOTPWithActionsProps,
  type OTPFormProps,
};
