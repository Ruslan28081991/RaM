import { useEffect, useRef } from 'react';

interface IInfinityScroll {
  loader: React.ReactNode;
  isLoadingMore: boolean;
  isHasMore: boolean;
  onLoadMore: () => void;
}

export const InfinityScroll = ({ loader, isLoadingMore: isLoadingMore, isHasMore, onLoadMore }: IInfinityScroll) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el || isLoadingMore || !isHasMore) return;

    const observer = new IntersectionObserver(
      (entry) => {
        const target = entry[0];

        if (target.isIntersecting) {
          if (isLoadingMore) return;
          onLoadMore();
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
      }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [isLoadingMore, isHasMore, onLoadMore]);

  return <div ref={loaderRef}>{isLoadingMore ? loader : null}</div>;
};
