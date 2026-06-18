import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "outline" | "ghostLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight " +
  "transition-[background-color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)] " +
  "active:scale-[0.98] focus-visible:outline-none select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  // The one accent: pool blue. Used for every primary action on the page.
  primary:
    "bg-blue text-white shadow-[0_8px_24px_-10px_rgba(26,143,209,0.7)] hover:bg-blue-deep hover:shadow-[0_10px_28px_-8px_rgba(26,143,209,0.65)]",
  outline:
    "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-mist",
  // For use over the dark water hero/footer.
  ghostLight:
    "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = clsx(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props;
    const isAnchorLink = href.startsWith("#") || href.startsWith("tel:") || href.startsWith("sms:");
    if (isAnchorLink) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
