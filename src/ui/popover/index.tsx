import { Icon } from '@/components';
import { FrostGlass } from '@/tokens/materials';
import { cn } from '@/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

const AnimationBaseStyle =
  'duration-base ease-smooth data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0';

const AnimationInStyle =
  'data-[side=bottom]:slide-in-t-2 data-[side=left]:slide-in-r-2 data-[side=right]:slide-in-l-2 data-[side=top]:slide-in-b-2';

const AnimationOutStyle =
  'data-[side=bottom]:slide-out-t-2 data-[side=left]:slide-out-r-2 data-[side=right]:slide-out-l-2 data-[side=top]:slide-out-b-2';

const Title = React.forwardRef<HTMLDivElement, React.HtmlHTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative mb-2 flex items-center justify-between', className)}
      {...props}
    >
      <div className="leading-5">{children}</div>
      <PopoverPrimitive.Close>
        <Icon icon="i-nexus:close-monotone" className="size-4 cursor-pointer text-text-secondary" />
      </PopoverPrimitive.Close>
    </div>
  ),
);
Title.displayName = 'PopoverTitle';

const BaseStyle = cn('z-50 rounded-4 shadow-md outline-none', FrostGlass);

const Content = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, sideOffset = 12, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(BaseStyle, AnimationBaseStyle, AnimationInStyle, AnimationOutStyle, className)}
    onOpenAutoFocus={(event) => {
      event.preventDefault();
    }}
    {...props}
  >
    {children}
  </PopoverPrimitive.Content>
));
Content.displayName = PopoverPrimitive.Content.displayName;

interface TPopover extends React.FC<PopoverPrimitive.PopoverProps> {
  Trigger: typeof PopoverPrimitive.Trigger;
  Content: typeof Content;
  Portal: typeof PopoverPrimitive.Portal;
  Anchor: typeof PopoverPrimitive.Anchor;
  Arrow: typeof PopoverPrimitive.Arrow;
  Close: typeof PopoverPrimitive.Close;
  Title: typeof Title;
}

const Popover: TPopover = ({ children, ...props }) => {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
};

Popover.Trigger = PopoverPrimitive.Trigger;
Popover.Content = Content;
Popover.Portal = PopoverPrimitive.Portal;
Popover.Anchor = PopoverPrimitive.Anchor;
Popover.Arrow = PopoverPrimitive.Arrow;
Popover.Close = PopoverPrimitive.Close;
Popover.Title = Title;

export { Popover };
