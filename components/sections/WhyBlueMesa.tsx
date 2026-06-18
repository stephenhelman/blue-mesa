import Image from "next/image";
import { MapPin, ClipboardCheck, BadgeCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Reason = { icon: LucideIcon; title: string; body: string };

const reasons: Reason[] = [
  {
    icon: MapPin,
    title: "Owner-led and local",
    body: "Blue Mesa is El Paso born. You deal with the people who actually build it.",
  },
  {
    icon: ClipboardCheck,
    title: "A clear plan and price",
    body: "A detailed design and a fixed scope before any ground is broken.",
  },
  {
    icon: BadgeCheck,
    title: "Backed after the build",
    body: "Warranty-supported workmanship and equipment you can rely on.",
  },
];

export function WhyBlueMesa() {
  return (
    <section id="why" className="scroll-mt-24 bg-mist">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image */}
        <Reveal className="order-last lg:order-first">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] ring-1 ring-navy/10 shadow-[0_30px_60px_-32px_rgba(18,42,71,0.4)]">
            {/* TODO(photography): replace with a real Blue Mesa build / finished project photo. */}
            <Image
              src="https://picsum.photos/seed/blue-mesa-craftsmanship/1100/880"
              alt="A finished custom pool and patio"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover grayscale-[0.4]"
            />
            {/* Cool the placeholder toward the brand palette. */}
            <div aria-hidden className="absolute inset-0 bg-blue/40 mix-blend-color" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(18,42,71,0) 55%, rgba(18,42,71,0.28) 100%)",
              }}
            />
            <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:pl-4">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Why Blue Mesa
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
              Building a pool is a big decision. We make it feel like the easiest
              part of owning your home.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-8">
            {reasons.map((reason, i) => (
              <Reveal as="li" key={reason.title} index={i}>
                <div className="flex gap-4">
                  <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue ring-1 ring-navy/5">
                    <reason.icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">
                      {reason.title}
                    </h3>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-slate">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
