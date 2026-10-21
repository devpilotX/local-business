import nodemailer from "nodemailer";
import { db } from "./database";
import { unpack } from "./store";
import { siteUrl } from "./config";

export function mailTransport() {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (!host || !from)
    throw new Error("SMTP_HOST and SMTP_FROM must be configured.");
  const port = Number(process.env.SMTP_PORT || 587);
  const localTest =
    process.env.SMTP_ALLOW_INSECURE_LOCAL === "true" &&
    ["localhost", "127.0.0.1"].includes(host) &&
    process.env.NODE_ENV !== "production";
  return {
    from,
    transport: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: !localTest && port !== 465,
      ignoreTLS: localTest,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
      connectionTimeout: 10000,
      socketTimeout: 20000,
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    }),
  };
}
// Version-checked leases allow more than one worker without sending the same queued item concurrently.
// SMTP has no transaction with our database. A worker crash after provider acceptance can cause a retry.
export async function sendNotifications(batchSize = 25) {
  const { from, transport } = mailTransport();
  let sent = 0;
  let failed = 0;
  const candidates = await db()
    .selectFrom("records")
    .selectAll()
    .where("kind", "=", "notifications")
    .where((eb) =>
      eb.or([
        eb("data", "like", '%"status":"pending"%'),
        eb("data", "like", '%"status":"failed"%'),
        eb("data", "like", '%"status":"processing"%'),
      ]),
    )
    .orderBy("updated_at", "asc")
    .limit(1000)
    .execute();
  let processed = 0;
  try {
    for (const row of candidates) {
      if (processed >= batchSize) break;
      const item = unpack(row);
      if (item.status === "sent" || Number(item.attempts) >= 5) continue;
      if (
        item.status === "processing" &&
        Date.parse(String(item.leaseUntil)) > Date.now()
      )
        continue;
      if (
        item.nextAttemptAt &&
        Date.parse(String(item.nextAttemptAt)) > Date.now()
      )
        continue;
      const attempt = Number(item.attempts || 0) + 1;
      const payload = JSON.parse(row.data);
      const lease = {
        ...payload,
        status: "processing",
        attempts: attempt,
        leaseUntil: new Date(Date.now() + 900000).toISOString(),
        error: "",
      };
      const claimed = await db()
        .updateTable("records")
        .set({
          data: JSON.stringify(lease),
          version: row.version + 1,
          updated_at: new Date().toISOString(),
        })
        .where("id", "=", row.id)
        .where("version", "=", row.version)
        .returningAll()
        .executeTakeFirst();
      if (!claimed) continue;
      processed++;
      let result;
      try {
        const leadRow = await db()
          .selectFrom("records")
          .selectAll()
          .where("id", "=", String(item.leadId))
          .where("kind", "=", "leads")
          .executeTakeFirst();
        if (!leadRow) throw new Error("LEAD_UNAVAILABLE");
        const lead = unpack(leadRow);
        const response = await transport.sendMail({
          from,
          to: String(item.recipient),
          replyTo: String(lead.email),
          subject: "New Techcyme project enquiry",
          messageId: `<enquiry-${row.id}@${new URL(siteUrl).hostname}>`,
          text: `Business: ${lead.business}\nContact: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || "Not supplied"}\nService: ${lead.service}\n\n${lead.message}\n\nReview in your workspace: ${siteUrl}/admin/leads\nLead reference: ${lead.id}`,
        });
        if (!response.accepted?.length) throw new Error("PROVIDER_REJECTED");
        result = {
          ...lease,
          status: "sent",
          leaseUntil: "",
          acceptedAt: new Date().toISOString(),
          error: "",
        };
        sent++;
      } catch {
        result = {
          ...lease,
          status: attempt >= 5 ? "exhausted" : "failed",
          leaseUntil: "",
          error:
            "Delivery attempt failed. Check SMTP configuration and provider logs.",
          nextAttemptAt: new Date(
            Date.now() + Math.min(3600000, 60000 * 2 ** attempt),
          ).toISOString(),
        };
        failed++;
      }
      await db()
        .updateTable("records")
        .set({
          data: JSON.stringify(result),
          version: claimed.version + 1,
          updated_at: new Date().toISOString(),
        })
        .where("id", "=", row.id)
        .where("version", "=", claimed.version)
        .execute();
    }
  } finally {
    transport.close();
  }
  return { sent, failed, processed };
}
