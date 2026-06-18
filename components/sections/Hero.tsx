import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="bg-water relative isolate overflow-hidden text-white">
      {/* Rising-sun glow — the single gold brand accent, kept soft and behind content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,166,35,0.5) 0%, rgba(245,166,35,0.12) 38%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-6">
          <div className="hero-rise mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-wave">
              {site.tagline}
            </span>
          </div>

          <h1
            className="hero-rise text-balance font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]"
            style={{ "--rise-delay": "90ms" } as React.CSSProperties}
          >
            Love your backyard.
            <br />
            <span className="text-wave">We can help.</span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            We design and build custom pools and spas that turn your backyard
            into the place you never want to leave.
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--rise-delay": "270ms" } as React.CSSProperties}
          >
            <Button href="#consult" size="lg">
              Book your free consultation
            </Button>
            <Button href={site.phoneHref} variant="ghostLight" size="lg">
              <Phone size={18} strokeWidth={2} />
              {site.phoneDisplay}
            </Button>
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual-rise lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:aspect-[5/5] lg:aspect-[4/5]">
              {/* TODO(photography): swap for a real Blue Mesa project photo (see sprints.md "Known gap"). */}
              <Image
                src="https://picsum.photos/seed/blue-mesa-backyard-pool/1000/1250"
                alt="A custom backyard pool at dusk"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              {/* Navy duotone wash so any photo reads on-brand and melds into the hero. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(18,42,71,0.25) 0%, rgba(18,42,71,0.1) 40%, rgba(18,42,71,0.78) 100%)",
                }}
              />
              {/* Recolor toward brand blue so any placeholder photo unifies with the navy hero. */}
              <div aria-hidden className="absolute inset-0 bg-blue/30 mix-blend-color" />
              <div aria-hidden className="absolute inset-0 mix-blend-soft-light bg-blue/20" />
              <div aria-hidden className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider into the next (light) section. */}
      <WaveDivider />
    </section>
  );
}

function WaveDivider() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0]">
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="h-[60px] w-full sm:h-[90px]"
        fill="none"
      >
        <path
          d="M0 70 C 240 20, 480 20, 720 60 C 960 100, 1200 100, 1440 50 L1440 110 L0 110 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}
