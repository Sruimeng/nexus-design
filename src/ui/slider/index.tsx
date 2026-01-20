import { cn } from '@/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { SnapInput } from '../snap-input';

interface Props {
  showValue?: boolean;
  showAuto?: boolean;
  inputClassName?: string;
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & Props
>(
  (
    {
      className,
      value,
      showValue,
      showAuto,
      disabled,
      inputClassName,
      min = 0,
      max = 100,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const displayValue = showAuto ? (value?.[0] ? value[0] : 'Auto') : value?.[0];
    return (
      <div className={cn('flex items-center gap-2', disabled && 'opacity-50')}>
        <SliderPrimitive.Root
          ref={ref}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          className={cn(
            'relative flex touch-none select-none items-center',
            showValue ? 'w-[calc(100%-4.625rem)]' : 'w-full',
            className,
          )}
          min={min}
          max={max}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-surface-dim">
            <SliderPrimitive.Range className="absolute h-full bg-core-blue" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block size-3.75 cursor-pointer border-2 border-white rounded-full bg-surface-primary transition-colors duration-fast ease-smooth focus-visible:outline-none" />
        </SliderPrimitive.Root>
        {showValue && (
          <SnapInput
            type="text"
            className={cn(
              'w-18.5 border border-white/8 rounded-2 bg-transparent py-2 text-center text-3',
              inputClassName,
            )}
            disabled={disabled}
            value={String(displayValue)}
            onChange={(stringValue) => {
              const value = Number(stringValue);
              if (isNaN(value)) return;
              onValueChange?.([Math.max(min, Math.min(max, value))]);
            }}
          />
        )}
      </div>
    );
  },
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
