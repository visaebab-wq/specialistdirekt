import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Genererar en delningsbild (1200×630) som visas när sajten delas i sociala medier.
export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "white",
              color: "#0d9488",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 800,
            }}
          >
            +
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Hitta rätt specialistläkare – snabbt och tryggt
          </div>
          <div style={{ marginTop: 28, fontSize: 32, opacity: 0.9 }}>
            Kostnadsfri förfrågan i hela Sverige
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
