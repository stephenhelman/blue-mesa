import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { WhyBlueMesa } from "@/components/sections/WhyBlueMesa";
import { Gallery } from "@/components/sections/Gallery";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { ConsultSection } from "@/components/sections/ConsultSection";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <ServicePillars />
        <WhyBlueMesa />
        <Gallery />
        <OfferBanner />
        <ConsultSection />
      </main>
      <Footer />
      {/* Keeps footer content clear of the fixed mobile call bar. */}
      <div aria-hidden className="h-20 lg:hidden" />
      <StickyCallBar />
    </>
  );
}
