import { cn } from '@/utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicator?: string }
>(({ className, value, indicator, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative w-full mb-2 overflow-hidden rounded-full bg-white/8 h-1', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'size-full flex-1 bg-core-blue transition-all duration-base ease-smooth',
        indicator,
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
