import { cn } from '@/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

interface IAvatar
  extends React.ForwardRefExoticComponent<
    AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLDivElement>
  > {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Root: typeof Avatar;
}

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex items-center justify-center overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
)) as IAvatar;
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square size-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('bg-surface-dim text-text-secondary', className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

Avatar.Root = Avatar;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar };
