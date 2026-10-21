import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
export default function setup() {
  if (!process.env.DATABASE_URL) {
    for (const suffix of ["", "-wal", "-shm"])
      rmSync(`${process.env.SQLITE_PATH}${suffix}`, { force: true });
  }
  execFileSync("node", ["--import", "tsx", "scripts/migrate.ts"], {
    env: process.env,
    stdio: "pipe",
  });
  execFileSync("node", ["--import", "tsx", "scripts/create-admin.ts"], {
    env: {
      ...process.env,
      ADMIN_EMAIL: "qa-admin@example.test",
      ADMIN_PASSWORD: process.env.QA_PASSWORD,
    },
    stdio: "pipe",
  });
}
