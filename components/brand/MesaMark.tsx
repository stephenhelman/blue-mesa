type MesaMarkProps = {
  className?: string;
  /** When true, renders a single-color (currentColor) knockout for dark backgrounds. */
  mono?: boolean;
};

/**
 * The Blue Mesa brand mark: flat-topped mesa, rising sun, two water lines.
 * Recreated as vector so it stays crisp at any size (favicon through hero).
 * Full-color by default; `mono` renders a white/currentColor knockout for the navy footer.
 */
export function MesaMark({ className, mono = false }: MesaMarkProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mesaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2C5C8F" />
          <stop offset="1" stopColor="#1B3A5F" />
        </linearGradient>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1A8FD1" />
          <stop offset="1" stopColor="#4FB4E8" />
        </linearGradient>
      </defs>
      <circle cx="78" cy="29" r="16" fill={mono ? "currentColor" : "#F5A623"} opacity={mono ? 0.9 : 1} />
      <path
        d="M6 64 L30 31 L40 29 L44 22 L70 22 L73 29 L84 30 L88 36 L100 37 L114 64 Z"
        fill={mono ? "currentColor" : "url(#mesaGrad)"}
      />
      <path
        d="M8 75 Q28 67 48 75 T88 75 T128 75"
        stroke={mono ? "currentColor" : "url(#waveGrad)"}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 86 Q40 79 58 86 T94 86"
        stroke={mono ? "currentColor" : "#4FB4E8"}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
