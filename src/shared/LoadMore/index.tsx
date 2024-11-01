import React, { useEffect, useRef } from "react";

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore, loading }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [onLoadMore, loading]);

  return <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }} />;
};

export default LoadMore;
