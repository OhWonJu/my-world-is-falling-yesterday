import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "pio-ts",
      project: "javascript-react",
      sourcemaps: { // 빌드 후 생성된 sourcemap 이 외부로 노출되지 않도록F
        assets: "./dist/**",
        filesToDeleteAfterUpload: "./dist/**/*.map", // 추가된 옵션
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
  },
});
