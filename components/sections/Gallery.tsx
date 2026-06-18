import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { galleryImages } from "@/components/sections/images";

// Landing teaser. The full filterable experience lives at /gallery.
const completed = galleryImages.filter((img) => img.category === "completed");
const teaser = [completed[0], completed[3], completed[2]].filter(Boolean);

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Recent work
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
                A look at finished Blue Mesa backyards, with the full build
                process and more in the gallery.
              </p>
            </div>
            <Link
              href="/gallery"
              className="hidden items-center gap-1.5 text-sm font-semibold text-blue transition-colors duration-150 hover:text-blue-deep sm:inline-flex"
            >
              View the full gallery
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.map((img, i) => (
            <Reveal as="div" key={img.src} index={i}>
              <Link
                href="/gallery"
                className="group block overflow-hidden rounded-2xl ring-1 ring-navy/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-quint)] motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button href="/gallery" variant="outline" size="md">
            View the full gallery
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </section>
  );
}
