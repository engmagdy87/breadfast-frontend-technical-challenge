import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 1.0,
  rootMargin = "0px",
}: UseIntersectionObserverProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [onIntersect, enabled, threshold, rootMargin]);

  return elementRef;
};

export default useIntersectionObserver;
