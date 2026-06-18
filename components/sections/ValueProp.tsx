import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function ValueProp() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <p className="font-display text-3xl font-semibold leading-[1.18] tracking-tight text-navy sm:text-[2.6rem] sm:leading-[1.12]">
            Your backyard should be the reason
            <br className="hidden sm:block" /> you{" "}
            <span className="relative whitespace-nowrap text-blue">
              stay home
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gold/70"
              />
            </span>
            .
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-slate sm:text-lg">
            For families across {site.serviceArea}, we design pools and spas
            around how you actually want to live outside, then build them to last
            for decades.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
