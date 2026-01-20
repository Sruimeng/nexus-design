import { cn } from '@/utils';
import type React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Loading } from '../loading';

interface Props {
  className?: string;
  onLoadMore: () => Promise<void> | void;
  children: React.ReactNode;
}

export const Loadable: React.FC<Props> = ({ children, onLoadMore, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(onLoadMore);
  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  loadMoreRef.current = onLoadMore;
  loadingRef.current = loading;

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.intersectionRatio <= 0) return;
      if (loadingRef.current) return;
      try {
        setLoading(true);
        loadingRef.current = true;
        await loadMoreRef.current();
      } catch (error) {
        console.error('加载更多数据时发生错误:', error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {children}
      <div ref={ref} className="min-h-10 w-full">
        {loading && (
          <div
            className={cn('w-full flex flex-col items-center justify-center gap-2 mt-5', className)}
          >
            <Loading.Icon className="max-w-10" />
          </div>
        )}
      </div>
    </>
  );
};
