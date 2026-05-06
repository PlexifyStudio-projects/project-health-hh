import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Repo name on GitHub Pages — drives `base` and the SPA basename.
const REPO_BASE = "/project-health-hh/";

export default defineConfig(({ mode }) => ({
  // Build for GH Pages under the repo path; dev keeps `/` for localhost.
  base: mode === "production" ? REPO_BASE : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@sections": path.resolve(__dirname, "./src/sections"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 5173,
    open: false,
    host: true,
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          // Order matters — more specific patterns first.
          // Bundle leaflet + react-leaflet together so the lazy CoverageMap
          // chunk pulls a single map vendor file.
          if (id.includes("leaflet")) return "leaflet";
          // Swiper is only used by the lazy testimonials carousel.
          if (id.includes("swiper")) return "swiper";
          // gsap + @gsap/react share the same animation runtime.
          if (id.includes("gsap")) return "gsap";
          // Lenis is small and tied to the scroll runtime; keep it grouped
          // with gsap to reduce request count without bloating the chunk.
          if (id.includes("lenis")) return "gsap";
          if (id.includes("lucide-react")) return "icons";
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/")
          )
            return "forms";
          if (
            id.includes("react-router") ||
            id.includes("react-dom") ||
            id.includes("/react/") ||
            id.includes("scheduler")
          )
            return "react";
          return undefined;
        },
      },
    },
  },
}));
