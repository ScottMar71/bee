"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/types";

type Frame = { top: number; left: number; width: number; height: number };

const IMAGE_DRIFT = [2, 5, 3];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function stageFrame(): Frame {
  const maxW = Math.min(window.innerWidth - 48, 1040);
  const maxH = window.innerHeight - 140;
  let width = maxW;
  let height = width * 0.75;
  if (height > maxH) {
    height = maxH;
    width = height / 0.75;
  }
  return {
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
    width,
    height,
  };
}

function thumbFrame(el: HTMLElement): Frame {
  const rect = el.getBoundingClientRect();
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const captions = useRef<(HTMLSpanElement | null)[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const phase = useRef<"closed" | "opening" | "open" | "closing">("closed");
  const reduced = useRef(false);
  const touchX = useRef<number | null>(null);

  const [active, setActive] = useState<number | null>(null);
  const [session, setSession] = useState(0);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [animate, setAnimate] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [chrome, setChrome] = useState(false);
  const [navFade, setNavFade] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduced.current = media.matches;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const viewH = window.innerHeight;
      tiles.current.forEach((tile, index) => {
        if (!tile) return;
        const rect = tile.getBoundingClientRect();
        const delta = Math.max(
          -1,
          Math.min(1, (rect.top + rect.height / 2 - viewH / 2) / viewH),
        );
        const drift = IMAGE_DRIFT[index % IMAGE_DRIFT.length];
        tile.style.transform = `translate3d(0, ${(delta * drift).toFixed(2)}px, 0)`;
        const caption = captions.current[index];
        if (caption) {
          caption.style.transform = `translate3d(0, ${(delta * (3 - drift)).toFixed(2)}px, 0)`;
        }
      });
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [items.length]);

  const close = useCallback(() => {
    if (active === null) return;
    const tile = buttons.current[active];
    setChrome(false);
    setBackdrop(false);
    if (!tile || reduced.current || phase.current === "opening") {
      phase.current = "closed";
      setActive(null);
      setFrame(null);
      setAnimate(false);
      opener.current?.focus();
      return;
    }
    phase.current = "closing";
    setAnimate(true);
    setFrame(thumbFrame(tile));
  }, [active]);

  const step = useCallback(
    (direction: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + direction + items.length) % items.length;
      });
      setNavFade(true);
    },
    [items.length],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (phase.current === "closed") return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, step]);

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  useLayoutEffect(() => {
    if (session === 0) return;
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => {
        if (phase.current !== "opening") return;
        phase.current = "open";
        setBackdrop(true);
        setFrame(stageFrame());
        if (reduced.current) {
          setAnimate(false);
          setChrome(true);
          return;
        }
        setAnimate(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [session]);

  useEffect(() => {
    if (active !== null) dialog.current?.focus();
  }, [session, active]);

  useEffect(() => {
    if (chrome) closeButton.current?.focus();
  }, [chrome]);

  function openAt(index: number) {
    const button = buttons.current[index];
    if (!button) return;
    opener.current = button;
    phase.current = "opening";
    setNavFade(false);
    setChrome(false);
    setBackdrop(false);
    setAnimate(false);
    setFrame(thumbFrame(button));
    setActive(index);
    setSession((value) => value + 1);
  }

  function onFrameEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "width") return;
    if (phase.current === "open") setChrome(true);
    if (phase.current === "closing") {
      phase.current = "closed";
      setActive(null);
      setFrame(null);
      setAnimate(false);
      opener.current?.focus();
    }
  }

  const current = active === null ? null : items[active];

  const lightbox =
    mounted && current && frame
      ? createPortal(
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            tabIndex={-1}
            className="fixed inset-0 z-[60] outline-none"
            onTouchStart={(event) => {
              touchX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const next = event.changedTouches[0]?.clientX;
              if (next === undefined) return;
              const delta = next - touchX.current;
              if (delta > 48) step(-1);
              if (delta < -48) step(1);
              touchX.current = null;
            }}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className={`absolute inset-0 bg-ink/80 transition-opacity duration-500 ${backdrop ? "opacity-100" : "opacity-0"}`}
              onClick={close}
            />
            <div
              className="absolute overflow-hidden bg-ink shadow-2xl"
              style={{
                top: frame.top,
                left: frame.left,
                width: frame.width,
                height: frame.height,
                borderRadius: chrome ? 12 : 16,
                transition: animate
                  ? "top 0.55s cubic-bezier(0.22, 1, 0.36, 1), left 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.55s ease"
                  : "none",
              }}
              onTransitionEnd={onFrameEnd}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className={`object-cover ${navFade ? "gallery-fade" : ""}`}
              />
            </div>
            <div
              className={`transition-opacity duration-300 ${chrome ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-cream/50 text-2xl leading-none text-cream"
              >
                <span aria-hidden="true">×</span>
              </button>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/50 text-2xl text-cream sm:left-5"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/50 text-2xl text-cream sm:right-5"
              >
                <span aria-hidden="true">›</span>
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-cream">
                {pad(active! + 1)} / {pad(items.length)}
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={item.src}
            ref={(node) => {
              tiles.current[index] = node;
            }}
            className="gallery-float"
          >
            <button
              type="button"
              ref={(node) => {
                buttons.current[index] = node;
              }}
              onClick={() => openAt(index)}
              aria-label={`View ${item.alt}`}
              className="group block w-full cursor-pointer rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="gallery-zoom object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/40 group-focus-visible:bg-ink/40" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-cream opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/80 text-lg leading-none">
                    +
                  </span>
                  <span className="text-sm tracking-wide">View</span>
                </span>
                <span
                  ref={(node) => {
                    captions.current[index] = node;
                  }}
                  aria-hidden="true"
                  className="gallery-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent px-4 pt-12 pb-4 text-sm text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {item.alt}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {lightbox}
    </>
  );
}
