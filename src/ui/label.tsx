import { cn } from '@/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

const BaseStyle =
  'text-3.5 text-text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-50';

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(BaseStyle, className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
