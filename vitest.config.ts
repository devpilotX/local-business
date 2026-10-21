import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    fileParallelism: false,
    coverage: {
      include: [
        "src/lib/store.ts",
        "src/lib/http.ts",
        "src/lib/validation.ts",
        "src/lib/notifications.ts",
      ],
      reporter: ["text", "json-summary"],
    },
  },
});
