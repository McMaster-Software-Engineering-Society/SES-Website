import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { DomeGalleryProps, ImageItem } from "./types";

// Lightweight swipe/scroll-snap gallery. No external deps. Native momentum scrolling.
// Keeps original props signature but ignores advanced 3D options.

type Slide = { src: string; alt: string };

function normalizeImages(images?: ImageItem[]): Slide[] {
  if (!images || images.length === 0) return [];
  return images.map((img) =>
    typeof img === "string"
      ? { src: img, alt: "" }
      : { src: img.src, alt: img.alt ?? "" },
  );
}

export default function DomeGallery({
  images = [],
  className,
  ariaLabel,
  imageBorderRadius = "16px",
  grayscale = false,
}: DomeGalleryProps) {
  const slides = useMemo(() => normalizeImages(images), [images]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Update index on scroll (throttled by rAF)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        setIndex((prev) => (prev !== i ? i : prev));
        raf = 0;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll as any);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, top: 0, behavior: "smooth" });
  }, []);

  const prev = () => scrollToIndex(Math.max(0, index - 1));
  const next = () => scrollToIndex(Math.min(slides.length - 1, index + 1));

  // Keyboard arrows for accessibility when focused
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey as any);
    return () => el.removeEventListener("keydown", onKey as any);
  }, [prev, next]);

  const showNav = slides.length > 1;

  const css = `
    .dg-viewport { -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; }
    .dg-viewport::-webkit-scrollbar { display: none; height: 0; width: 0; }
    .dg-viewport { scrollbar-width: none; }
  `;

  if (slides.length === 0) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className ?? ""}`}>
        <p className="text-slate-400">No images</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full ${className ?? ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? "Image gallery"}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={viewportRef}
        className="dg-viewport w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex focus:outline-none"
        tabIndex={0}>
        {slides.map((s, i) => (
          <figure
            key={`${s.src}-${i}`}
            className="snap-start shrink-0 w-full h-full relative m-0 p-0 flex"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}>
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-full object-cover select-none"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              style={{
                borderRadius: imageBorderRadius,
                filter: grayscale ? "grayscale(1)" : "none",
              }}
            />
          </figure>
        ))}
      </div>

      {showNav && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 text-white w-9 h-9 grid place-items-center backdrop-blur-sm">
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 text-white w-9 h-9 grid place-items-center backdrop-blur-sm">
            ›
          </button>
        </>
      )}

      {showNav && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white/90" : "w-2 bg-white/50"}`}
              style={{ border: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export {};
