import { Icon } from '@/components';
import { FrostGlass } from '@/tokens/materials';
import { cn } from '@/utils';
import * as SelectPrimitive from '@radix-ui/react-select';

import * as React from 'react';

interface TSelect extends React.FC<SelectPrimitive.SelectProps> {
  Trigger: typeof SelectPrimitive.Trigger;
  Value: typeof SelectPrimitive.Value;
  Separator: typeof SelectPrimitive.Separator;
  Label: typeof SelectPrimitive.Label;
  Group: typeof SelectPrimitive.Group;
  Portal: typeof SelectPrimitive.Portal;
  Arrow: typeof SelectPrimitive.Arrow;
  ScrollUpButton: typeof ScrollUpButton;
  ScrollDownButton: typeof ScrollDownButton;
  Content: typeof Content;
  Item: typeof Item;
}

const Trigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'group w-full flex items-center justify-center gap-1 rounded-3 py-3 paper-input paper-focus text-text-primary transition-colors duration-fast ease-smooth [&>span]:line-clamp-1 cursor-pointer',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon
        icon="i-nexus:arrow-monotone"
        className="transition duration-base ease-smooth group-data-[state=open]:rotate-180"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const ScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <Icon icon="i-nexus:arrow-monotone" className="rotate-180" />
  </SelectPrimitive.ScrollUpButton>
));
ScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const ScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <Icon icon="i-nexus:arrow-monotone" />
  </SelectPrimitive.ScrollDownButton>
));
ScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const AnimationInBaseStyle =
  'duration-base ease-smooth data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95';
const AnimationOutBaseStyle =
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95';
const AnimationSlideStyle =
  'data-[side=bottom]:slide-in-t-2 data-[side=left]:slide-in-r-2 data-[side=right]:slide-in-l-2 data-[side=top]:slide-in-b-2';

const Content = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 mt-3 max-h-[--radix-select-content-available-height] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-3',
        FrostGlass,
        AnimationInBaseStyle,
        AnimationOutBaseStyle,
        AnimationSlideStyle,
        className,
      )}
      position={position}
      {...props}
    >
      <ScrollUpButton />
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      <ScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const Item = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative w-full flex cursor-pointer select-none items-center justify-center py-3 text-3.5 text-text-secondary outline-none transition-colors duration-fast ease-smooth data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-core-blue/10 data-[state=checked]:text-core-blue hover:bg-surface-hover',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

const Select = SelectPrimitive.Root as TSelect;

Select.Separator = SelectPrimitive.Separator;
Select.Label = SelectPrimitive.Label;
Select.Group = SelectPrimitive.Group;
Select.Value = SelectPrimitive.Value;
Select.Arrow = SelectPrimitive.Arrow;
Select.Portal = SelectPrimitive.Portal;
Select.Trigger = Trigger;
Select.ScrollUpButton = ScrollUpButton;
Select.ScrollDownButton = ScrollDownButton;
Select.Content = Content;
Select.Item = Item;

export { Select };
