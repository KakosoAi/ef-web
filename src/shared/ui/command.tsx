import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search, Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
// import designTokens from "@/shared/lib/design-tokens";
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { Badge } from '@/shared/ui/badge';

// Command variants for different styles
const commandVariants = cva('flex h-full w-full flex-col overflow-hidden text-popover-foreground', {
  variants: {
    variant: {
      default: 'bg-popover',
      card: 'bg-card border border-border',
      ghost: 'bg-transparent',
    },
    size: {
      default: 'rounded-md',
      sm: 'rounded-sm',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const commandItemVariants = cva(
  'relative flex cursor-default select-none items-center text-sm outline-none transition-colors data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  {
    variants: {
      variant: {
        default:
          "rounded-sm px-2 py-1.5 data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground",
        ghost:
          "rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground",
        destructive:
          "rounded-sm px-2 py-1.5 text-destructive data-[selected='true']:bg-destructive data-[selected=true]:text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Theme hook for consistent command styling
const useCommandTheme = () => {
  // const { theme } = useTheme(); // theme variable not currently used

  return React.useMemo(
    () => ({
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        mutedForeground: 'var(--muted-foreground)',
        accent: 'var(--accent)',
        accentForeground: 'var(--accent-foreground)',
        border: 'var(--border)',
      },
      radius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Fira Code', 'monospace'],
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
        },
      },
    }),
    []
  );
};

interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive>,
    VariantProps<typeof commandVariants> {}

const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, CommandProps>(
  ({ className, variant, size, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(commandVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {
  commandProps?: CommandProps;
}

const CommandDialog = ({ children, commandProps, ...props }: CommandDialogProps) => {
  const commandTheme = useCommandTheme();

  return (
    <Dialog {...props}>
      <DialogContent
        className='overflow-hidden p-0'
        style={{
          boxShadow: commandTheme.shadows.lg,
        }}
      >
        <Command
          className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'
          {...commandProps}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, icon, showIcon = true, ...props }, ref) => {
  const commandTheme = useCommandTheme();

  return (
    <div
      className='flex items-center border-b px-3'
      cmdk-input-wrapper=''
      style={{
        borderColor: commandTheme.colors.border,
      }}
    >
      {showIcon && (icon || <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />)}
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{
          fontSize: commandTheme.typography.fontSize.sm,
          fontFamily: commandTheme.typography.fontFamily.sans.join(', '),
        }}
        {...props}
      />
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  maxHeight?: string;
}

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, maxHeight = '300px', ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('overflow-y-auto overflow-x-hidden', className)}
    style={{ maxHeight }}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

interface CommandEmptyProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ className, icon, title, description, children, ...props }, ref) => {
  const commandTheme = useCommandTheme();

  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn('py-6 text-center text-sm', className)}
      {...props}
    >
      {children || (
        <div className='flex flex-col items-center gap-2'>
          {icon && <div className='text-muted-foreground'>{icon}</div>}
          {title && (
            <p
              className='font-medium text-foreground'
              style={{ fontSize: commandTheme.typography.fontSize.sm }}
            >
              {title}
            </p>
          )}
          {description && (
            <p
              className='text-muted-foreground'
              style={{ fontSize: commandTheme.typography.fontSize.xs }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </CommandPrimitive.Empty>
  );
});

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

interface CommandGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  heading?: string;
}

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, heading, children, ...props }, ref) => {
  const commandTheme = useCommandTheme();

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        className
      )}
      {...props}
    >
      {heading && (
        <div
          className='px-2 py-1.5 text-xs font-medium text-muted-foreground'
          style={{
            fontSize: commandTheme.typography.fontSize.xs,
            fontFamily: commandTheme.typography.fontFamily.sans.join(', '),
          }}
        >
          {heading}
        </div>
      )}
      {children}
    </CommandPrimitive.Group>
  );
});

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const commandTheme = useCommandTheme();

  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 h-px', className)}
      style={{
        backgroundColor: commandTheme.colors.border,
      }}
      {...props}
    />
  );
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    VariantProps<typeof commandItemVariants> {
  icon?: React.ReactNode;
  shortcut?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, variant, icon, shortcut, badge, selected, disabled, children, ...props }, ref) => {
  const commandTheme = useCommandTheme();

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(commandItemVariants({ variant }), className)}
      data-selected={selected}
      data-disabled={disabled}
      style={{
        fontSize: commandTheme.typography.fontSize.sm,
        fontFamily: commandTheme.typography.fontFamily.sans.join(', '),
      }}
      {...props}
    >
      {icon && <span className='mr-2 flex h-4 w-4 items-center justify-center'>{icon}</span>}
      <span className='flex-1'>{children}</span>
      {badge && (
        <Badge variant='secondary' className='ml-2 text-xs'>
          {badge}
        </Badge>
      )}
      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
      {selected && <Check className='ml-2 h-4 w-4' />}
    </CommandPrimitive.Item>
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const commandTheme = useCommandTheme();

  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      style={{
        fontSize: commandTheme.typography.fontSize.xs,
        fontFamily: 'monospace',
      }}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

// Enhanced Command components
interface CommandMenuProps extends CommandProps {
  trigger?: React.ReactNode;
  placeholder?: string;
  emptyMessage?: string;
  groups?: Array<{
    heading?: string;
    items: Array<{
      value: string;
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      badge?: string;
      disabled?: boolean;
      onSelect?: () => void;
    }>;
  }>;
}

const CommandMenu = React.forwardRef<React.ElementRef<typeof Command>, CommandMenuProps>(
  ({ placeholder, emptyMessage, groups = [], ...props }, ref) => {
    return (
      <Command ref={ref} {...props}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyMessage || 'No results found.'}</CommandEmpty>
          {groups.map((group, groupIndex) => (
            <CommandGroup key={groupIndex} heading={group.heading}>
              {group.items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  icon={item.icon}
                  shortcut={item.shortcut}
                  badge={item.badge}
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    );
  }
);
CommandMenu.displayName = 'CommandMenu';

// Command Palette component
interface CommandPaletteProps extends Omit<CommandDialogProps, 'children'> {
  placeholder?: string;
  emptyMessage?: string;
  groups?: CommandMenuProps['groups'];
}

const CommandPalette = ({ placeholder, emptyMessage, groups, ...props }: CommandPaletteProps) => {
  return (
    <CommandDialog {...props}>
      <CommandMenu placeholder={placeholder} emptyMessage={emptyMessage} groups={groups} />
    </CommandDialog>
  );
};

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandMenu,
  CommandPalette,
  useCommandTheme,
  commandVariants,
  commandItemVariants,
  type CommandProps,
  type CommandDialogProps,
  type CommandInputProps,
  type CommandListProps,
  type CommandEmptyProps,
  type CommandGroupProps,
  type CommandItemProps,
  type CommandMenuProps,
  type CommandPaletteProps,
};
