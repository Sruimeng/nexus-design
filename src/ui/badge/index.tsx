import { cn } from '@/utils';
import type * as React from 'react';

export const Badge: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'absolute right-0 top-0 box-border min-w-3 min-h-2.5 rounded-full bg-status-error px-1.25 py-0.25 text-2.5',
      children && 'translate-x-1/2',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
