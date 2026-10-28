import { useState, useEffect } from 'react';

/**
 * Hook to observe sections and determine which section is currently in view.
 * Uses IntersectionObserver for efficient, event-driven scroll tracking.
 */
export function useScrollSpy(sectionIds = [], offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds.length) return;

    const observerCallback = (entries) => {
      // Find intersecting entries
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the entry closest to the top of the viewport
        const bestEntry = visibleEntries.reduce((prev, curr) => {
          return curr.intersectionRatio > prev.intersectionRatio ? curr : prev;
        });
        setActiveId(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeId;
}
