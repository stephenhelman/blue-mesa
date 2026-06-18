import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function OfferBanner() {
  return (
    <section id="offer" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <div className="bg-water relative isolate overflow-hidden rounded-[32px] px-6 py-12 shadow-[0_40px_90px_-44px_rgba(18,42,71,0.7)] sm:px-12 sm:py-14 lg:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,166,35,0.55) 0%, transparent 70%)",
              }}
            />
            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-wave">
                  The offer
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.75rem]">
                  <span className="text-gold">$500 off</span> your new pool or spa.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
                  Mention this site when you book your free in-home consultation.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:flex-col lg:items-end lg:gap-4">
                <Button href="#consult" size="lg">
                  Claim the offer
                </Button>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors duration-150 hover:text-white"
                >
                  <Phone size={16} strokeWidth={2} className="text-wave" />
                  or call {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
