import { useState, useEffect, useRef } from 'react';

/**
 * Lightweight IntersectionObserver hook for scroll-triggered entrance animations.
 * Automatically checks prefers-reduced-motion to ensure instantaneous appearance
 * when requested by user system settings.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = {}) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isInView];
}

