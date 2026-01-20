import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/utils';

const BaseStyle =
  'group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-white/10 bg-white/10 transition-colors duration-fast ease-smooth data-[state=checked]:bg-core-blue/50';

const ThumbStyle =
  'pointer-events-none block size-5 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.3)] transition-transform duration-fast ease-smooth data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5';

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
