import { ImageResponse } from "next/og";
import { site } from "./site";

// Delad mall för dynamiska delningsbilder (Open Graph). Varje sidtyp anropar
// ogImage() med sin egen rubrik så att varje sida får ett unikt, varumärkt kort.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogImage({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #14b8a6 100%)",
          padding: "72px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "white",
              color: "#0d9488",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            +
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div style={{ fontSize: 26, opacity: 0.85, marginBottom: 14 }}>{eyebrow}</div>
          ) : null}
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.12, maxWidth: 1000 }}>
            {title}
          </div>
        </div>

        <div style={{ fontSize: 26, opacity: 0.9 }}>
          Kostnadsfri förmedling till rätt specialistläkare
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
