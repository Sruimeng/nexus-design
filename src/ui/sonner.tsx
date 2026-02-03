import { FrostGlass } from '@/tokens/materials';
import { cn } from '@/utils';
import type React from 'react';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const toastStyle = cn(
  'text-base text-text-primary px-5 py-3 rounded-10 w-fit flex gap-2 items-center',
  FrostGlass,
);

const warningStyle = 'bg-status-error';

const Toaster: React.FC<ToasterProps> = (props) => (
  <Sonner
    offset={72}
    toastOptions={{
      unstyled: true,
      className: toastStyle,
      classNames: {
        warning: warningStyle,
      },
    }}
    {...props}
  />
);

export { toast, Toaster };
