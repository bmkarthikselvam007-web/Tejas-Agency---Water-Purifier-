import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Content is never left hidden longer than this if the observer stays silent. */
const FAILSAFE_MS = 1500;

/** True when the visitor has asked the OS to limit animation. */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION).matches
  );
}

/**
 * Reveals an element once it scrolls into view.
 *
 * Uses IntersectionObserver rather than a scroll listener so nothing runs on
 * the scroll frame. Returns `[ref, visible]` — put the ref on the element and
 * use `visible` to switch the reveal class on.
 *
 * Content is shown immediately (never hidden) when reduced motion is requested
 * or when IntersectionObserver is unavailable.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -12% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  // Reduced motion and missing IntersectionObserver both mean "never hide it",
  // so that is settled at init rather than after a first hidden render.
  const [visible, setVisible] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Already shown at init because motion is off, so there is nothing to watch.
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      return undefined;
    }

    // A one-shot reveal that has fired needs no further observation.
    if (once && visible) return undefined;

    // An observer always reports its first observation, intersecting or not.
    // If that never arrives the callbacks are not being delivered at all, so
    // the failsafe below shows the content rather than leaving it invisible.
    let delivered = false;
    let failsafe;

    const observer = new IntersectionObserver(
      (entries) => {
        delivered = true;
        clearTimeout(failsafe);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    failsafe = setTimeout(() => {
      if (!delivered) setVisible(true);
    }, FAILSAFE_MS);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, visible]);

  return [ref, visible];
}

export default useScrollReveal;
