import Link from "next/link";
import { Phone, MessageSquareText } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { site, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-water text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <BrandLockup />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Custom pools and spas, designed and built for the way you live
              outside. Proudly serving {site.serviceArea}.
            </p>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Explore
            </h2>
            <ul className="mt-3 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-white/80 transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Call or text today
            </h2>
            <a
              href={site.phoneHref}
              className="mt-5 inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-white transition-colors duration-150 hover:text-wave"
            >
              <Phone size={20} strokeWidth={2} className="text-wave" />
              {site.phoneDisplay}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/12"
              >
                <Phone size={15} strokeWidth={2} /> Call
              </a>
              <a
                href={site.smsHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/12"
              >
                <MessageSquareText size={15} strokeWidth={2} /> Text
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {/* Domain per brief; flyer footer says bluemesapools.com — confirm registration. */}
          <p className="text-white/55">{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
