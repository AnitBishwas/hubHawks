import react from "@vitejs/plugin-react";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";


console.log(dirname(fileURLToPath(import.meta.url)))
export default defineConfig({
    define: {
    appOrigin: JSON.stringify(
      process.env.APP_ORIGIN.replace(/https:\/\//, "")
    ),
  },
  plugins: [react()],
  build: {
    outDir: "../dist/client/",
  },
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    allowedHosts: [`${process.env.APP_ORIGIN.replace(/https:\/\//, "")}`],
    cors: false,
  },
});
