import { Icon } from '@/components';
import { cn } from '@/utils';
import * as TooltipPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

const AnimationBaseStyle =
  'duration-base ease-smooth data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0';

const AnimationInStyle =
  'data-[side=bottom]:slide-in-t-2 data-[side=left]:slide-in-r-2 data-[side=right]:slide-in-l-2 data-[side=top]:slide-in-b-2';

const AnimationOutStyle =
  'data-[side=bottom]:slide-out-t-2 data-[side=left]:slide-out-r-2 data-[side=right]:slide-out-l-2 data-[side=top]:slide-out-b-2';

const BaseStyle = 'z-50 rounded-full outline-none text-text-secondary paper-chip';

const Content = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  (
    { className, children, collisionPadding = 12, sideOffset = 12, side = 'top', ...props },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(BaseStyle, AnimationBaseStyle, AnimationInStyle, AnimationOutStyle, className)}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  ),
);
Content.displayName = TooltipPrimitive.Content.displayName;

interface TTooltip extends React.FC<TooltipPrimitive.HoverCardProps> {
  Trigger: typeof TooltipPrimitive.Trigger;
  Content: typeof Content;
  Portal: typeof TooltipPrimitive.Portal;
  Arrow: typeof TooltipPrimitive.Arrow;
  Tips: typeof Tips;
}

const Tooltip: TTooltip = ({ children, ...props }) => {
  return (
    <TooltipPrimitive.Root openDelay={0} closeDelay={200} {...props}>
      {children}
    </TooltipPrimitive.Root>
  );
};

interface TipsProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Tips: React.FC<TipsProps> = ({ children, side }) => {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Icon icon="i-nexus:tips-monotone" className="size-4 text-text-secondary" />
      </Tooltip.Trigger>
      <Tooltip.Content side={side} className="max-w-56 rounded-4 p-3 text-3 text-text-secondary">
        {children}
      </Tooltip.Content>
    </Tooltip>
  );
};

Tooltip.Trigger = TooltipPrimitive.Trigger;
Tooltip.Content = Content;
Tooltip.Portal = TooltipPrimitive.Portal;
Tooltip.Arrow = TooltipPrimitive.Arrow;
Tooltip.Tips = Tips;

export { Tooltip };
