import { Waves, Bath, Hammer, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    icon: Waves,
    title: "Custom Pools",
    body: "Geometric, freeform, or infinity edge. Designed to fit your yard, not a catalog.",
  },
  {
    icon: Bath,
    title: "Relaxing Spas",
    body: "In-ground spas and spillover designs that run hot year-round, steps from your door.",
  },
  {
    icon: Hammer,
    title: "Quality Craftsmanship",
    body: "Built by our own crews. No rotating subcontractors, no cut corners.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    body: "Durable materials and equipment chosen to handle desert heat for decades.",
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            What we build
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
            One crew, one standard. From the first sketch to the first swim, every
            detail is ours.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal as="div" key={pillar.title} index={i}>
              <article className="group border-t border-navy/10 pt-6">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-mist text-blue transition-colors duration-200 ease-[var(--ease-out-quint)] group-hover:bg-blue group-hover:text-white">
                  <pillar.icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">
                  {pillar.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
