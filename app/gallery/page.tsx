import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { GalleryBrowser } from "@/components/sections/GalleryBrowser";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Custom pools and spas by Blue Mesa, from excavation to the finished waterline. Completed projects, commercial builds, renovations, and the build process across El Paso and the 915 area.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Project Gallery | ${site.name}`,
    description:
      "Custom pools and spas by Blue Mesa, from excavation to the finished waterline.",
    url: `${site.url}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Our work
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Real Blue Mesa projects across {site.serviceArea}, from the first
              dig to the finished waterline.
            </p>
          </div>
        </section>

        <GalleryBrowser />
      </main>
      <Footer />
      {/* Keeps footer content clear of the fixed mobile call bar. */}
      <div aria-hidden className="h-20 lg:hidden" />
      <StickyCallBar />
    </>
  );
}
