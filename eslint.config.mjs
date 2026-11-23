import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Existing TMDB image URLs remain as plain img elements during this routing migration.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "dist/**", "next-env.d.ts"]),
]);
