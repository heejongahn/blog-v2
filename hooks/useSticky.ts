import { useState, useEffect, useRef } from "react";

export function useSticky<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSticky(entry.intersectionRatio === 0);
      },
      { threshold: [0], ...options }
    );

    const refValue = sentinelRef.current;

    if (refValue) {
      observer.observe(refValue);
    }

    return () => {
      if (refValue) {
        observer.unobserve(refValue);
      }
    };
  }, []);

  return [isSticky, sentinelRef] as const;
}
