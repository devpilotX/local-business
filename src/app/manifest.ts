import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Techcyme",
    short_name: "Techcyme",
    description: "Local visibility, websites and workflows",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faff",
    theme_color: "#0d1830",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
