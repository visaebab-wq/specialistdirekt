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
          background: "#17324d",
          borderRadius: 36,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="7" fill="#ffffff" />
          <circle cx="32" cy="13" r="6" fill="#2dd4bf" />
          <circle cx="32" cy="51" r="6" fill="#2dd4bf" />
          <circle cx="13" cy="32" r="6" fill="#2dd4bf" />
          <circle cx="51" cy="32" r="6" fill="#2dd4bf" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
