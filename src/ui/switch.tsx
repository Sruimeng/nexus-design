import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/utils';

const BaseStyle =
  'group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border-dim bg-surface-dim shadow-[0_2px_4px_rgba(60,40,20,0.08)] transition-colors duration-fast ease-smooth paper-focus data-[state=checked]:bg-core-blue/30';

const ThumbStyle =
  'pointer-events-none block size-5 rounded-full bg-surface-primary shadow-[0_3px_8px_rgba(60,40,20,0.12)] transition-transform duration-fast ease-smooth data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5';

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root className={cn(BaseStyle, className)} {...props} ref={ref}>
    <SwitchPrimitives.Thumb className={ThumbStyle} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
