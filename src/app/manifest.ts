import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Techcyme",
    short_name: "Techcyme",
    description:
      "Google Business Profile support, business websites and workflows for local businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#0d1512",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
