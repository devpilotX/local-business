import { z } from "zod";
const checks: [string, boolean][] = [
  [
    "HTTPS canonical URL",
    /^https:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL || ""),
  ],
  [
    "Authentication URL matches canonical URL",
    process.env.BETTER_AUTH_URL === process.env.NEXT_PUBLIC_SITE_URL,
  ],
  [
    "Strong authentication secret configured",
    (process.env.BETTER_AUTH_SECRET?.length || 0) >= 48,
  ],
  [
    "Admin allowlist configured",
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .some((e) => z.email().safeParse(e.trim()).success),
  ],
  ["Public registration disabled", process.env.BOOTSTRAP_ADMIN !== "true"],
  ["Legal business name confirmed", !!process.env.LEGAL_BUSINESS_NAME],
  ["Business contact address confirmed", !!process.env.LEGAL_BUSINESS_ADDRESS],
  [
    "Policies reviewed for this deployment",
    process.env.LEGAL_REVIEWED === "true",
  ],
  ["SMTP configured", !!process.env.SMTP_HOST && !!process.env.SMTP_FROM],
  [
    "Notification schedule confirmed",
    process.env.NOTIFICATION_WORKER_CONFIRMED === "true",
  ],
  [
    "Backup and restore checked",
    process.env.BACKUP_RESTORE_CONFIRMED === "true",
  ],
  ["Monitoring configured", process.env.MONITORING_CONFIRMED === "true"],
  ["Public indexing approved", process.env.LAUNCH_APPROVED === "true"],
];
for (const [name, ok] of checks)
  console.log(`${ok ? "PASS" : "BLOCKED"}: ${name}`);
if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
console.log(
  "Configuration checks do not certify legal compliance, security or AdSense approval. Complete the manual launch review in docs/LAUNCH.md.",
);
