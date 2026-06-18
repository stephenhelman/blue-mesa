import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Blue Mesa Pools & Spas — Building Backyard Luxury";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(120% 90% at 85% -10%, rgba(79,180,232,0.35), transparent 60%), linear-gradient(160deg, #1B3A5F 0%, #122A47 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark */}
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <circle cx="78" cy="29" r="16" fill="#F5A623" />
          <path
            d="M6 64 L30 31 L40 29 L44 22 L70 22 L73 29 L84 30 L88 36 L100 37 L114 64 Z"
            fill="#ffffff"
          />
          <path
            d="M8 75 Q28 67 48 75 T88 75 T128 75"
            stroke="#4FB4E8"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#4FB4E8",
              marginBottom: 18,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Custom pools &amp; spas,
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            built for your backyard.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ fontWeight: 700 }}>Blue Mesa Pools &amp; Spas</span>
          <span>{site.phoneDisplay}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
