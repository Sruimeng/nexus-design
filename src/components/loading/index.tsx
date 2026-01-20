import { DeepGlass } from '@/tokens/materials';
import { cn } from '@/utils';
import { Portal } from '@radix-ui/react-portal';
import React from 'react';
import { createRoot } from 'react-dom/client';
import loading from './assets/loading.webp?url';

const Root = React.forwardRef<HTMLDivElement, React.HtmlHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center z-60 pointer-events-auto',
        className,
      )}
      {...props}
    />
  ),
);
Root.displayName = 'LoadingRoot';

const Overlay = React.forwardRef<HTMLDivElement, React.HtmlHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('absolute inset-0', DeepGlass, className)} {...props} />
  ),
);
Overlay.displayName = 'LoadingOverlay';

const Icon = React.forwardRef<HTMLImageElement, React.HtmlHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn('w-15% max-w-16 animate-spin aspect-square', className)}
      src={loading}
      alt="loading..."
      {...props}
    />
  ),
);
Icon.displayName = 'LoadingIcon';

interface LoadingProps {
  className?: string;
  children?: React.ReactNode;
}

interface Loading extends React.FC<LoadingProps> {
  Root: typeof Root;
  Overlay: typeof Overlay;
  // Context: typeof Context;
  Icon: typeof Icon;
  show: (loading?: React.ReactNode) => () => Promise<void>;
}

const Loading: Loading = ({ children, className }) => (
  <Root>
    <Overlay className={className} />
    {children}
  </Root>
);

interface PortalLoadingProps {
  children?: React.ReactNode;
}

const PortalLoading: React.FC<PortalLoadingProps> = ({ children }) => (
  <Portal asChild>
    {children ? (
      children
    ) : (
      <Loading>
        <Icon />
      </Loading>
    )}
  </Portal>
);

Loading.Icon = Icon;
Loading.Overlay = Overlay;
Loading.Root = Root;
Loading.show = (loading) => {
  if (window === undefined) {
    console.warn('Dialog.show is not supported in Server Side');
    return () => Promise.resolve();
  }

  let container = document.createDocumentFragment();
  let root = createRoot(container);
  root.render(<PortalLoading>{loading}</PortalLoading>);

  return () =>
    Promise.resolve().then(() => {
      root?.unmount();
      // @ts-expect-error clear container
      container = null;
      // @ts-expect-error clear root
      root = null;
    });
};

export { Loading };
