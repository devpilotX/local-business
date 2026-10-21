import { defineConfig, devices } from "@playwright/test";
import { randomBytes } from "node:crypto";
process.env.QA_PASSWORD ||= randomBytes(24).toString("base64url");
process.env.BETTER_AUTH_SECRET ||= randomBytes(48).toString("base64url");
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
process.env.BETTER_AUTH_URL = "http://localhost:3000";
process.env.ADMIN_EMAILS = "qa-admin@example.test";
process.env.SQLITE_PATH = ".data/e2e.db";
// Browser QA must never migrate or seed an inherited production database.
process.env.DATABASE_URL = "";
process.env.LAUNCH_APPROVED = "false";
const chromiumPath = process.env.CHROMIUM_PATH;
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          ...(chromiumPath ? { executablePath: chromiumPath } : {}),
          args: ["--no-sandbox"],
        },
      },
    },
  ],
  webServer: {
    command: "node --import tsx tests/e2e/prepare-server.ts && npm run start",
    url: "http://localhost:3000/api/health",
    reuseExistingServer: false,
    timeout: 120000,
    env: { ...(process.env as Record<string, string>), NODE_ENV: "production" },
  },
});
