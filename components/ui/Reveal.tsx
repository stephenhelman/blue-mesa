import { clsx } from "@/lib/clsx";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "section";
  /** Accepted for call-site ergonomics; intra-row stagger comes free from the
   *  scroll timeline, so these are no-ops now. */
  index?: number;
  delay?: number;
  y?: number;
};

/**
 * Scroll reveal. Content is visible by default; where the browser supports
 * scroll-driven animations (and motion is allowed), it rises in as it enters
 * the viewport. No JS, no blank-without-JS failure mode.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as;
  return (
    <Tag data-reveal className={clsx(className)}>
      {children}
    </Tag>
  );
}
