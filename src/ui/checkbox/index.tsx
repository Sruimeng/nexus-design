import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import * as React from 'react';
import { Icon } from '../../components/icon';

import { cn } from '@/utils';

const BaseStyle =
  'size-5 shrink-0 box-border rounded border border-white/10 transition-colors duration-fast ease-smooth';

const CheckedStyle =
  'data-[state=checked]:bg-core-blue data-[state=checked]:border-core-blue data-[state=checked]:shadow-[0_0_8px_rgba(59,130,246,0.4)]';

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
