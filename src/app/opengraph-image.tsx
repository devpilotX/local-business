import { ImageResponse } from "next/og";

export const alt =
  "Techcyme: Google Business Profile support, business websites and workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d1512",
        color: "#eef2ef",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#eef2ef",
            color: "#0d1512",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          T
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          Techcyme
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          lineHeight: 1.04,
          letterSpacing: -3.5,
          fontWeight: 600,
        }}
      >
        <span>Make your business</span>
        <span style={{ color: "#5cc898" }}>easier to find.</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 36,
          fontSize: 26,
          color: "#a9b5af",
        }}
      >
        <span>Google Business Profile</span>
        <span>Business websites</span>
        <span>n8n workflows</span>
      </div>
    </div>,
    size,
  );
}
