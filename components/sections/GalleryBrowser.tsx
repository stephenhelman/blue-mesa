"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";
import {
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from "@/components/sections/images";

type TabKey = "all" | GalleryCategory;

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "commercial", label: "Commercial" },
  { key: "process", label: "Process" },
  { key: "renovation", label: "Renovations" },
  { key: "plan", label: "Design & Planning" },
];

type LightboxState = { list: GalleryImage[]; index: number } | null;

export function GalleryBrowser() {
  const [active, setActive] = useState<TabKey>("all");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const featured = useMemo(
    () => galleryImages.find((img) => img.featured) ?? galleryImages[0],
    []
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: galleryImages.length };
    for (const img of galleryImages) c[img.category] = (c[img.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(
    () =>
      active === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active]
  );

  const open = useCallback((list: GalleryImage[], index: number) => {
    setLightbox({ list, index });
  }, []);

  return (
    <>
      {/* ---------- Featured showcase ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <FeaturedFrame
                image={featured}
                onOpen={() => open(galleryImages, galleryImages.indexOf(featured))}
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-blue">
                Featured project
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
                A finished backyard, start to swim.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
                {featured.alt}.
              </p>
              <div className="mt-7">
                <Button href="/#consult" size="lg">
                  Book your free consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Filterable collection ---------- */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Browse the work
              </h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate">
                From the first dig to the finished waterline. Filter by stage.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(tab.key)}
                  className={clsx(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-navy text-white"
                      : "border border-navy/15 bg-white text-navy/75 hover:border-navy/30 hover:text-navy"
                  )}
                >
                  {tab.label}
                  <span
                    className={clsx(
                      "text-xs tabular-nums",
                      isActive ? "text-white/60" : "text-slate/50"
                    )}
                  >
                    {counts[tab.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry grid — true aspect ratios, no cropping */}
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {filtered.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => open(filtered, i)}
                aria-label={`View larger: ${img.alt}`}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white ring-1 ring-navy/10 transition-shadow duration-200 hover:shadow-[0_20px_40px_-24px_rgba(18,42,71,0.45)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 ease-[var(--ease-out-quint)] motion-safe:group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-navy/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                >
                  <Maximize2 size={16} strokeWidth={2} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox((s) => (s ? { ...s, index } : s))}
        />
      )}
    </>
  );
}

function FeaturedFrame({
  image,
  onOpen,
}: {
  image: GalleryImage;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${image.alt}`}
      className="group relative block w-full overflow-hidden rounded-[24px] bg-white p-2 shadow-[0_40px_80px_-40px_rgba(18,42,71,0.5)] ring-1 ring-navy/10 sm:p-3"
    >
      <div className="relative overflow-hidden rounded-[16px]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          sizes="(max-width: 1024px) 92vw, 56vw"
          className="h-auto w-full object-cover transition-transform duration-500 ease-[var(--ease-out-quint)] motion-safe:group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-navy/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          <Maximize2 size={18} strokeWidth={2} />
        </span>
      </div>
    </button>
  );
}

function Lightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: NonNullable<LightboxState>;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { list, index } = state;
  const current = list[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => onNavigate((index + delta + list.length) % list.length),
    [index, list.length, onNavigate]
  );

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        go(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        go(-1);
        return;
      }
      // Trap focus within the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeEl = document.activeElement;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [go, onClose]);

  const multiple = list.length > 1;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-navy-deep/92 p-4 backdrop-blur-sm motion-safe:animate-[lightbox-in_180ms_ease-out] sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20"
      >
        <X size={22} strokeWidth={2} />
      </button>

      {multiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="92vw"
          className="h-auto max-h-[78vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="max-w-2xl text-center text-sm leading-relaxed text-white/75">
          {current.alt}
          {multiple && (
            <span className="ml-2 text-white/45 tabular-nums">
              {index + 1} / {list.length}
            </span>
          )}
        </figcaption>
      </figure>

      {multiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 sm:right-6"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
