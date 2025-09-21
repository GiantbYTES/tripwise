import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "../", // Look for .env files in the parent directory
  // base: "/tripwise/",
});
