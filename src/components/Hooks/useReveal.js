// src/components/Hooks/useReveal.js
import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible].
 * Once visible, stays visible (animates in once on scroll).
 */
export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px", ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};
