import { defineConfig } from "vite";

export default defineConfig({
  build: {
    modulePreload: {
      // injecting modulePreload polyfill creates the final JS which cannot be executed using Node.js.
      // Let's disable it. This should not affect anything we want to verify in this repro.
      polyfill: false
    },
    outDir: "./dist-vite",
    rollupOptions: {
      input: ["./src/html/a.html", "./src/html/b.html"],
    },
  },
});
