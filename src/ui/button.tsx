import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/utils';

const BaseStyle =
  'flex items-center justify-center rounded-25 box-border cursor-pointer transition-all duration-fast ease-smooth truncate font-bold active:scale-98';

const SolidStyle =
  'bg-core-blue/20 hover:bg-core-blue/30 border border-core-blue/50 text-white shadow-none hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-fast ease-smooth';

const HollowStyle =
  'bg-transparent border border-white/20 text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-fast ease-smooth';

const PlainStyle =
  'bg-transparent text-slate-200 hover:text-white hover:underline transition-colors duration-fast ease-smooth';

const DisabledStyle = 'opacity-50 cursor-not-allowed pointer-events-none';

const VariantStyle = {
  solid: SolidStyle,
  hollow: HollowStyle,
  plain: PlainStyle,
} as const;

const SizeMap = {
  small: 'h-6 text-2.5',
  middle: 'h-8 text-3',
  large: 'w-56 h-10 text-3.5',
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'hollow' | 'solid' | 'plain';
  size?: 'small' | 'middle' | 'large';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', size = 'large', ...props }, ref) => {
    const Comp = props.asChild ? Slot : 'button';
    const style = props.disabled ? DisabledStyle : VariantStyle[variant];
    const sizeClass = SizeMap[size];

    return (
      <Comp
        className={cn(BaseStyle, style, sizeClass, className)}
        ref={ref}
        type="button"
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
