import { Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultForm } from "@/components/sections/ConsultForm";
import { site } from "@/lib/site";

export function ConsultSection() {
  return (
    <section id="consult" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-blue">
            Free in-home consultation
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Let&apos;s design your backyard.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
            Tell us a little about your project and we&apos;ll reach out to
            schedule your free in-home consultation. Prefer to talk now?
          </p>
          <a
            href={site.phoneHref}
            className="mt-6 inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-navy transition-colors hover:text-blue"
          >
            <Phone size={18} strokeWidth={2} className="text-blue" />
            {site.phoneDisplay}
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ConsultForm />
        </Reveal>
      </div>
    </section>
  );
}
