import { MesaMark } from "@/components/brand/MesaMark";
import { clsx } from "@/lib/clsx";

/**
 * White knockout brand lockup for dark backgrounds (footer) where the
 * full-color serif logo can't sit. Mark + sans wordmark, kept restrained.
 */
export function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center gap-3 text-white", className)}>
      <MesaMark mono className="h-10 w-auto" />
      <span className="leading-none">
        <span className="block font-display text-lg font-bold uppercase tracking-[0.12em]">
          Blue Mesa
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.34em] text-white/70">
          Pools &amp; Spas
        </span>
      </span>
    </div>
  );
}
