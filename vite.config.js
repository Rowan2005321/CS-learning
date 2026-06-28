import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      input: {
        home: page("index.html"),
        account: page("account/index.html"),
        courses: page("courses/index.html"),
        projects: page("projects/index.html"),
        sources: page("sources/index.html"),
        studyLog: page("study-log/index.html"),
        tracks: page("tracks/index.html")
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          supabase: ["@supabase/supabase-js"],
          three: ["three"],
          ui: ["lucide-react"]
        }
      }
    }
  }
});
