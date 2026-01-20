import { DeepGlass } from '@/tokens/materials';
import { cn, sleep } from '@/utils';
import * as D from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import * as React from 'react';

const AnimationBaseStyle =
  'duration-slow ease-smooth data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0';

const AnimationInStyle =
  'data-[state=open]:zoom-in-95 data-[state=open]:slide-in-l-1/2 data-[state=open]:slide-in-t-2';

const AnimationOutStyle =
  'data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-l-1/2 data-[state=closed]:slide-out-t-2';

const Overlay = React.forwardRef<React.ComponentRef<typeof D.Overlay>, D.DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <D.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-50', DeepGlass, AnimationBaseStyle, className)}
      {...props}
    />
  ),
);
Overlay.displayName = D.Overlay.displayName;

const BaseStyle =
  'outline-none z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full flex flex-col justify-center';

const Content = React.forwardRef<React.ComponentRef<typeof D.Content>, D.DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <D.Content
      aria-describedby={undefined}
      ref={ref}
      className={cn(BaseStyle, AnimationBaseStyle, AnimationInStyle, AnimationOutStyle, className)}
      {...props}
    >
      {children}
    </D.Content>
  ),
);
Content.displayName = D.Content.displayName;

interface Props {
  overlayClassName?: string;
}

interface TDialog extends React.FC<D.DialogContentProps & D.DialogProps & Props> {
  Root: typeof D.Root;
  Portal: typeof D.Portal;
  Trigger: typeof D.Trigger;
  Overlay: typeof Overlay;
  Content: typeof Content;
  show: (
    dialog: React.ReactNode,
    params?: Omit<D.DialogContentProps & D.DialogProps, 'open' | 'defaultOpen'> & Props,
  ) => () => void;
}

const Dialog: TDialog = ({
  open = true,
  defaultOpen,
  onOpenChange,
  modal,
  overlayClassName,
  ...props
}) => {
  return (
    <D.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
      <D.Portal>
        <Overlay className={overlayClassName} />
        <VisuallyHidden>
          <D.Title />
        </VisuallyHidden>
        <Content {...props} />
      </D.Portal>
    </D.Root>
  );
};

Dialog.Root = D.Root;
Dialog.Portal = D.Portal;
Dialog.Overlay = Overlay;
Dialog.Content = Content;
Dialog.Trigger = D.Trigger;

const open = Symbol.for('open');
const close = Symbol.for('close');

declare global {
  interface Window {
    [open]: (key: number, dialog: React.ReactNode) => void;
    [close]: (key: number) => void;
  }
}

export const Dialoger: React.FC = () => {
  const [data, setData] = React.useState<Record<number, React.ReactNode>>({});

  const openDialog = (key: number, dialog: React.ReactNode) => {
    if (!dialog) return;
    setData({ ...data, [key]: dialog });
  };

  const closeDialog = (key: number) => {
    if (data[key]) {
      delete data[key];
      setData({ ...data });
    }
  };

  if (globalThis.window) {
    globalThis.window[open] = openDialog;
    globalThis.window[close] = closeDialog;
  }

  return <>{Object.values(data)}</>;
};

Dialog.show = (dialog, params) => {
  if (window === undefined) {
    console.warn('Dialog.show is not supported in Server Side');
    return () => Promise.resolve();
  }
  const key = Date.now();
  window[open](
    key,
    <Dialog key={key} {...params} open={true}>
      {dialog}
    </Dialog>,
  );

  return () => {
    window[open](
      key,
      <Dialog key={key} {...params} open={false}>
        {dialog}
      </Dialog>,
    );
    sleep(150).then(() => {
      window[close](key);
    });
  };
};

export { Dialog };
