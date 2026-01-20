import { cn } from '@/utils';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as React from 'react';
import { BaseStyle, ButtonStyle, iconClassName, NavigationStyle, type Variant } from './toggle';

interface IToggleGroup
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>> &
      React.RefAttributes<React.ComponentRef<typeof ToggleGroupPrimitive.Root>>
  > {
  Item: typeof Item;
}

// @ts-expect-error IToggleGroup
const ToggleGroup: IToggleGroup = React.forwardRef(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const Item = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & Variant
>(({ className, children, variant, ...props }, ref) => {
  let style = '';
  if (variant === 'button') {
    style = ButtonStyle;
  }
  if (variant === 'navigation') {
    style = NavigationStyle;
  }
  if (variant === 'icon') {
    style = iconClassName;
  }
  return (
    <ToggleGroupPrimitive.Item ref={ref} className={cn(BaseStyle, style, className)} {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

Item.displayName = ToggleGroupPrimitive.Item.displayName;
ToggleGroup.Item = Item;

export { ToggleGroup };
