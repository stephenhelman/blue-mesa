/** Tiny classname joiner — no dependency needed for this site's scope. */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
