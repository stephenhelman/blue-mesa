"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "@/components/ui/Button";
import { site, nav } from "@/lib/site";
import { clsx } from "@/lib/clsx";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-[var(--ease-out-quint)]",
        scrolled
          ? "border-b border-navy/5 bg-white/85 shadow-[0_8px_30px_-18px_rgba(18,42,71,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" className="flex items-center" aria-label={`${site.name} — home`}>
          <Image
            src="/logo.png"
            alt={site.name}
            width={150}
            height={100}
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy/75 transition-colors duration-150 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-navy transition-colors duration-150 hover:text-blue sm:inline-flex"
          >
            <Phone size={16} strokeWidth={2} className="text-blue" />
            {site.phoneDisplay}
          </a>
          <Button href="/#consult" size="md">
            Free Consultation
          </Button>
        </div>
      </div>
    </header>
  );
}
