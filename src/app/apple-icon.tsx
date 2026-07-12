import { ImageResponse } from "next/og";

// Ikon för iOS "Lägg till på hemskärmen". 180×180 PNG enligt Apples krav.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d9488",
          color: "white",
          fontSize: 120,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        +
      </div>
    ),
    { ...size },
  );
}
