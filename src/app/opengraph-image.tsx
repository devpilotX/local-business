import { ImageResponse } from "next/og";
export const alt = "Techcyme: make your business easier to find";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d1830",
        color: "#f5f7ff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 38 }}>Techcyme</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          lineHeight: 1.1,
          letterSpacing: -3,
        }}
      >
        <span>Make your business</span>
        <span style={{ color: "#a9c3ff" }}>easier to find.</span>
      </div>
      <div style={{ fontSize: 25, color: "#bec9df" }}>
        Local visibility. Business websites. Connected workflows.
      </div>
    </div>,
    size,
  );
}
