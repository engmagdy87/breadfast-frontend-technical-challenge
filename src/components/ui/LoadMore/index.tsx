import React from "react";
import useIntersectionObserver from "hooks/useIntersectionObserver";

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  onLoadMore,
  loading,
  className,
  style,
}) => {
  const loadMoreRef = useIntersectionObserver({
    onIntersect: onLoadMore,
    enabled: !loading,
  });

  return (
    <div
      ref={loadMoreRef}
      className={className}
      style={{
        height: "20px",
        margin: "20px 0",
        ...style,
      }}
    />
  );
};

export default LoadMore;
