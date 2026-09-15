import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven video section.
 *
 * The source clip ships as a pre-decoded WebP frame sequence rather than an
 * MP4: seeking `video.currentTime` sends the decoder back to the nearest
 * keyframe on every scroll tick, which stutters badly on long-GOP footage.
 * The source clip here holds a single keyframe across all 240 frames, so every
 * seek would decode the whole file. Frames are drawn to a canvas instead, so
 * any progress value costs one `drawImage` with no seek latency, and reverse
 * scrubbing is exactly as cheap as forward.
 *
 * Scroll position drives progress through a rAF loop that reads layout once
 * per frame and writes only to refs and the DOM. No React state is touched
 * while scrolling, so this subtree never re-renders during the animation.
 */

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/** Share of the remaining distance closed per 60Hz frame. */
const SMOOTHING = 0.18;
/** Below this delta the eased value snaps, letting the loop idle. */
const SETTLED = 0.0004;
/** Parallel image requests: enough to fill a link, few enough to stay ordered. */
const CONCURRENCY = 6;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function frameUrls({ path, dir, count, ext = "webp", pad = 3 }) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(pad, "0");
    return path + "/" + dir + "/" + n + "." + ext;
  });
}

/**
 * Loads frames in order with bounded concurrency. Each frame becomes drawable
 * as it arrives, so scrubbing works on a partial set and sharpens as the rest
 * land. A frame that fails is skipped rather than retried.
 */
function loadFrames(urls, onProgress) {
  const images = new Array(urls.length).fill(null);
  let cancelled = false;
  let cursor = 0;
  let active = 0;
  let settled = 0;

  const pump = () => {
    while (!cancelled && active < CONCURRENCY && cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      active += 1;

      const img = new Image();
      img.decoding = "async";

      const finish = (ok) => {
        if (cancelled) return;
        active -= 1;
        settled += 1;
        if (ok) images[index] = img;
        onProgress(settled / urls.length, index);
        pump();
      };

      const usable = () => img.naturalWidth > 0 && img.naturalHeight > 0;

      img.onload = () => {
        // decode() keeps each frame's first paint off the scroll frame. It can
        // reject on a response that is not really an image (an SPA HTML
        // fallback, say), so fall back to whether the bitmap has dimensions
        // rather than trusting the rejection either way.
        if (typeof img.decode === "function") {
          img.decode().then(
            () => finish(true),
            () => finish(usable()),
          );
        } else {
          finish(usable());
        }
      };
      img.onerror = () => finish(false);
      img.src = urls[index];
    }
  };

  pump();

  return {
    images,
    cancel() {
      cancelled = true;
    },
  };
}

/** Nearest already-loaded frame to `index`, searching outward from it. */
function nearestLoaded(images, index) {
  if (images[index]) return images[index];
  for (let offset = 1; offset < images.length; offset += 1) {
    const before = index - offset;
    const after = index + offset;
    if (before >= 0 && images[before]) return images[before];
    if (after < images.length && images[after]) return images[after];
  }
  return null;
}

export default function ScrollVideoSection({
  sources,
  poster,
  // [{ at: 0..1, label }] - an empty label shows no caption, which is how a
  // section hands the frame back to burned-in footage such as an end card.
  stages = [],
  scrollHeight = "300vh",
  mobileScrollHeight = "220vh",
  label,
  onProgress,
  className = "",
}) {
  const outerRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRefs = useRef([]);
  const barRef = useRef(null);

  // `ready` swaps the poster for the canvas exactly once; `reduced` drops the
  // scroll mechanism entirely. Neither changes while scrolling.
  const [ready, setReady] = useState(false);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduced) return undefined;

    const outer = outerRef.current;
    const canvas = canvasRef.current;
    if (!outer || !canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    const narrow =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 768px)").matches;
    const source = narrow && sources.mobile ? sources.mobile : sources.desktop;
    const urls = frameUrls(source);
    const lastIndex = urls.length - 1;

    let loader = null;
    let rafId = 0;
    let running = false;
    let inView = false;
    let lastTime = 0;
    let lastDrawn = -1;
    let lastStage = -1;
    const eased = { current: 0, target: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR: a 3x phone canvas burns fill rate for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (!w || !h || (w === canvas.width && h === canvas.height)) return;
      canvas.width = w;
      canvas.height = h;
      lastDrawn = -1; // backing store was cleared, so force a repaint
    };

    const paint = (index) => {
      const img = loader && nearestLoaded(loader.images, index);
      if (!img || !canvas.width) return false;

      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;

      // object-fit: cover, centred.
      let dw;
      let dh;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    };

    // Overlay is written straight to the DOM so progress never re-renders React.
    const paintOverlay = (progress) => {
      if (barRef.current) {
        barRef.current.style.transform = "scaleX(" + progress + ")";
      }
      if (!stages.length) return;
      let next = 0;
      for (let i = 0; i < stages.length; i += 1) {
        if (progress >= stages[i].at) next = i;
      }
      if (next === lastStage) return;
      lastStage = next;
      stageRefs.current.forEach((el, i) => {
        if (el) el.classList.toggle("is-active", i === next);
      });
    };

    const tick = (now) => {
      const dt = lastTime ? Math.min(now - lastTime, 64) : 16.667;
      lastTime = now;

      const rect = outer.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      eased.target = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;

      // Frame-rate independent easing, so a 120Hz screen does not scrub twice
      // as fast as a 60Hz one.
      const t = 1 - Math.pow(1 - SMOOTHING, dt / 16.667);
      const delta = eased.target - eased.current;
      eased.current =
        Math.abs(delta) < SETTLED ? eased.target : eased.current + delta * t;

      const index = Math.round(eased.current * lastIndex);
      if (index !== lastDrawn && paint(index)) lastDrawn = index;

      paintOverlay(eased.current);
      if (onProgress) onProgress(eased.current);

      if (inView || Math.abs(eased.target - eased.current) >= SETTLED) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    };

    // The loop runs only while the section is near the viewport.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
      },
      { rootMargin: "120px 0px" },
    );
    visibility.observe(outer);

    // Frames begin downloading a screenful early, so they never compete with
    // the initial page render.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loader) return;
        preload.disconnect();
        loader = loadFrames(urls, (fraction, index) => {
          if (index === 0 || fraction === 1) {
            resize();
            if (paint(Math.round(eased.current * lastIndex))) setReady(true);
          }
        });
      },
      { rootMargin: "100% 0px" },
    );
    preload.observe(outer);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (lastDrawn === -1) {
        const index = Math.round(eased.current * lastIndex);
        if (paint(index)) lastDrawn = index;
      }
    });
    resizeObserver.observe(canvas);

    resize();

    return () => {
      visibility.disconnect();
      preload.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      if (loader) loader.cancel();
    };
  }, [sources, stages, reduced, onProgress]);

  // Reduced motion: a still frame, full height, no pinning and no downloads.
  if (reduced) {
    const staticClass = ["scroll-video", "scroll-video--static", className]
      .filter(Boolean)
      .join(" ");
    return (
      <section className={staticClass} aria-label={label}>
        <div className="scroll-video__frame">
          <img src={poster} alt={label} className="scroll-video__poster" />
          <div className="scroll-video__scrim" aria-hidden="true" />
          {stages.some((stage) => stage.label) ? (
            <ul className="scroll-video__legend">
              {stages
                .filter((stage) => stage.label)
                .map((stage) => (
                  <li key={stage.label}>{stage.label}</li>
                ))}
            </ul>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      className={["scroll-video", className].filter(Boolean).join(" ")}
      style={{
        "--scroll-video-height": scrollHeight,
        "--scroll-video-height-mobile": mobileScrollHeight,
      }}
      aria-label={label}
    >
      <div className="scroll-video__sticky">
        <div className="scroll-video__frame">
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className={
              "scroll-video__poster" + (ready ? " is-hidden" : "")
            }
          />
          <canvas
            ref={canvasRef}
            className={"scroll-video__canvas" + (ready ? " is-ready" : "")}
            role="img"
            aria-label={label}
          />
          <div className="scroll-video__scrim" aria-hidden="true" />

          {stages.length ? (
            <div className="scroll-video__stages" aria-hidden="true">
              {stages.map((stage, i) => (
                <span
                  key={stage.label || `stage-${i}`}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className={
                    "scroll-video__stage" + (i === 0 ? " is-active" : "")
                  }
                >
                  {stage.label}
                </span>
              ))}
            </div>
          ) : null}

          <div className="scroll-video__track" aria-hidden="true">
            <span ref={barRef} className="scroll-video__bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
