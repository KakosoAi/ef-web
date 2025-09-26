import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useTheme } from "next-themes";

import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import designTokens from "@/shared/lib/design-tokens";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const { theme } = useTheme();
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3",
        "font-sans",
        "text-foreground",
        "bg-background",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: cn(
          "text-sm font-medium",
          "text-foreground",
          "font-sans"
        ),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "border-border",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          "transition-all duration-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          "font-sans"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-accent/50",
          "[&:has([aria-selected])]:bg-accent",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "font-sans",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground",
          "transition-all duration-200",
          "rounded-md"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary hover:text-primary-foreground",
          "focus:bg-primary focus:text-primary-foreground",
          "font-medium"
        ),
        day_today: cn(
          "bg-accent text-accent-foreground",
          "font-medium",
          "ring-1 ring-ring ring-offset-1 ring-offset-background"
        ),
        day_outside: cn(
          "day-outside text-muted-foreground opacity-50",
          "aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30"
        ),
        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

// Enhanced DatePicker wrapper with additional functionality
export interface DatePickerProps extends CalendarProps {
  placeholder?: string;
  disabled?: boolean;
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
  format?: string;
}

function DatePicker({
  placeholder = "Pick a date",
  disabled = false,
  value,
  onSelect,
  format = "PPP",
  className,
  ...props
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleSelect = React.useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    onSelect?.(date);
    setIsOpen(false);
  }, [onSelect]);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input",
          "bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-accent hover:text-accent-foreground",
          "transition-all duration-200",
          "font-sans",
          className
        )}
      >
        <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
          {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
        </span>
        <ChevronLeft className={cn(
          "h-4 w-4 opacity-50 transition-transform duration-200",
          isOpen && "rotate-90"
        )} />
      </button>
      
      {isOpen && (
        <div className={cn(
          "absolute top-full left-0 z-50 mt-1",
          "rounded-md border bg-popover p-0 text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
            {...props}
          />
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
DatePicker.displayName = "DatePicker";

// Hook for consistent date picker theming
export function useDatePickerTheme() {
  const { theme } = useTheme();
  
  return React.useMemo(() => ({
    colors: {
      primary: designTokens.colors.primary,
      accent: designTokens.colors.accent,
      muted: designTokens.colors.muted,
      background: designTokens.colors.background,
      foreground: designTokens.colors.foreground,
      border: designTokens.colors.border,
    },
    spacing: designTokens.spacing,
    borderRadius: designTokens.borderRadius,
    typography: designTokens.typography,
    shadows: designTokens.shadows,
    isDark: theme === 'dark'
  }), [theme]);
}

export { Calendar, DatePicker };
