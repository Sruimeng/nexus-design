import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import * as React from 'react';
import { Icon } from '../../components/icon';

import { cn } from '@/utils';

const BaseStyle =
  'size-5 shrink-0 box-border rounded border border-border-dim bg-surface-primary shadow-[0_2px_4px_rgba(60,40,20,0.08)] transition-colors duration-fast ease-smooth paper-focus';

const CheckedStyle =
  'data-[state=checked]:bg-core-blue data-[state=checked]:border-core-blue data-[state=checked]:shadow-[0_6px_14px_rgb(var(--color-accent-rgb)_/_0.25)]';

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(BaseStyle, CheckedStyle, className)} {...props}>
    <CheckboxPrimitive.Indicator className="size-full flex items-center justify-center text-current">
      <Icon icon="i-nexus:check-monotone" className="size-full text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
