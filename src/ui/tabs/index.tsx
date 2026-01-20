import { cn } from '@/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

interface TTabs
  extends React.ForwardRefExoticComponent<
    TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof List;
  Trigger: typeof Trigger;
  Content: typeof Content;
}

const List = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex items-center justify-center', className)}
    {...props}
  />
));
List.displayName = TabsPrimitive.List.displayName;

const Trigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn('focus-visible:outline-none', className)}
    {...props}
  />
));
Trigger.displayName = TabsPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('focus-visible:outline-none', className)}
    {...props}
  />
));
Content.displayName = TabsPrimitive.Content.displayName;

const Tabs = TabsPrimitive.Root as TTabs;

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export { Tabs };
