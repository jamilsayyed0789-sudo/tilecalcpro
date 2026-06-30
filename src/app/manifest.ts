import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TileCalc Pro",
    short_name: "TileCalc",
    description: "Free Tile Calculators & Design Tools – Calculate tile quantities, estimate project costs and design your rooms instantly.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#2563EB",
    background_color: "#0f1115",
    categories: ["utilities", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
