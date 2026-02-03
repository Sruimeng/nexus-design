import { cn } from '@/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';

export type Variant = {
  variant?: 'button' | 'navigation' | 'icon';
};

type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & Variant;

const BaseStyle =
  'box-border flex items-center justify-center transition-colors duration-fast ease-smooth paper-focus';

const NavigationStyle =
  'text-text-secondary text-5 px-3 py-2 rounded-3 hover:bg-surface-hover data-[state=on]:paper-chip data-[state=on]:text-text-primary';

const ButtonStyle =
  'paper-input rounded-6 text-3 px-3.75 py-1.75 text-text-secondary hover:bg-surface-hover data-[state=on]:bg-core-blue/20 data-[state=on]:border-core-blue data-[state=on]:text-text-primary';

const iconClassName =
  'w-10 h-10 rounded-3 p-2 hover:bg-surface-hover data-[state=on]:text-core-blue';

const VariantStyle = {
  button: ButtonStyle,
  navigation: NavigationStyle,
  icon: iconClassName,
} as const;

const Toggle = React.forwardRef<React.ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, ...props }, ref) => {
    const style = variant ? VariantStyle[variant] : '';
    return (
      <TogglePrimitive.Root ref={ref} className={cn(BaseStyle, style, className)} {...props} />
    );
  },
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { BaseStyle, ButtonStyle, iconClassName, NavigationStyle, Toggle };
