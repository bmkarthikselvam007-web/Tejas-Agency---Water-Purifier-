import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * Implemented with an IntersectionObserver watching a zero-width sentinel
 * pinned to the top of the document, so nothing runs on the scroll frame and
 * React re-renders only on the single crossing rather than continuously.
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = `position:absolute;top:0;left:0;width:1px;height:${
      threshold + 1
    }px;pointer-events:none;visibility:hidden;`;
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [threshold]);

  return scrolled;
}

export default useScrolled;
