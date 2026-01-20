import type { CollapsibleProps } from '@radix-ui/react-collapsible';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import type React from 'react';

interface TCollapsible
  extends React.ForwardRefExoticComponent<CollapsibleProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: typeof CollapsiblePrimitive.Trigger;
  Content: typeof CollapsiblePrimitive.Content;
}

const Collapsible = CollapsiblePrimitive.Root as TCollapsible;
Collapsible.Trigger = CollapsiblePrimitive.Trigger;
Collapsible.Content = CollapsiblePrimitive.Content;

export { Collapsible };
