import { cn } from '@/utils';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../icon';

type ImgSource = string | File;

interface ImgViewerProps {
  className?: string;
  src: ImgSource | ImgSource[];
  children?: React.ReactNode;
}

const BaseStyle = 'group relative size-full overflow-hidden';
const BorderStyle = 'box-border border border-border-dim';

interface ImgViewerComponent extends React.FC<ImgViewerProps> {
  Delete: typeof Delete;
}

interface DeleteProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Delete = React.forwardRef<HTMLButtonElement, DeleteProps>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute bottom-3 right-3 opacity-0 rounded-1/2 transition-opacity duration-base ease-smooth group-hover:opacity-100 group-hover:bg-black/60',
      className,
    )}
    {...props}
  >
    <Icon className="m-2 size-5 text-white" icon="i-nexus:delete-monotone" />
  </button>
));

const ImgViewer: ImgViewerComponent = ({ src, className, children }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const array = Array.isArray(src) ? src : [src];
    const images = array.filter(Boolean).map((source) => {
      if (source instanceof File) return URL.createObjectURL(source);
      return source;
    });
    setImages(images);
  }, [src]);

  const Inner = useMemo(() => {
    if (images.length === 1) {
      return <img src={images[0]} alt="preview-img" className="size-full object-contain" />;
    }
    if (images.length > 1) {
      const rotation = [-15, 0, 15];
      return images
        .slice(-3) // 产品需求，展示后三张
        .map((url, index) => (
          <img
            key={`${url}${index}`}
            src={url}
            alt={`preview-img-${index}`}
            className="absolute left-1/2 top-1/2 size-4/5 rounded-3.5 object-contain shadow-2xl"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation[index]}deg)` }}
          />
        ));
    }
    return null;
  }, [images]);

  return (
    <div className={cn(BaseStyle, BorderStyle, className)}>
      {Inner}
      {children}
    </div>
  );
};

ImgViewer.Delete = Delete;

export { ImgViewer };
