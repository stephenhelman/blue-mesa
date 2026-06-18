import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Mobile-only persistent conversion bar. Tap-to-call is the priority action;
 * consultation sits beside it. Hidden on lg+ where the header carries both.
 */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/90 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(26,143,209,0.8)] transition-transform duration-150 active:scale-[0.98]"
          aria-label={`Call ${site.phoneDisplay}`}
        >
          <Phone size={17} strokeWidth={2.25} />
          Call now
        </a>
        <Link
          href="/#consult"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-3 text-sm font-semibold text-navy transition-transform duration-150 active:scale-[0.98]"
        >
          <CalendarCheck size={17} strokeWidth={2} className="text-blue" />
          Free quote
        </Link>
      </div>
    </div>
  );
}
