import { beforeAll, beforeEach, afterAll, describe, it, expect } from "vitest";
import { randomUUID } from "node:crypto";
import { rmSync } from "node:fs";
import { SMTPServer } from "smtp-server";
import { db, migrateStore, closeDatabase } from "../../src/lib/database";
import {
  receiveInquiry,
  createRecord,
  updateRecord,
  deleteRecord,
  convertLead,
} from "../../src/lib/store";
import { safeCsv, schemas } from "../../src/lib/validation";
import { jsonBody, sameOrigin, errorResponse } from "../../src/lib/http";
import { sendNotifications } from "../../src/lib/notifications";
process.env.SQLITE_PATH = ".data/unit-tests.db";
process.env.BETTER_AUTH_SECRET =
  "isolated-unit-test-secret-not-for-production-123456";
const inquiry = () => ({
  name: "Sam Patel",
  business: "Example cafe",
  email: "sam@example.test",
  phone: "",
  service: "websites",
  message: "We need a clear website with our menu and opening hours.",
  consent: true,
  website: "",
  requestId: randomUUID(),
});
const client = () => ({
  name: "Sam Patel",
  business: "Example cafe",
  email: "sam@example.test",
  status: "active",
});
beforeAll(async () => {
  if (!process.env.DATABASE_URL)
    rmSync(process.env.SQLITE_PATH!, { force: true });
  await migrateStore();
});
beforeEach(async () => {
  await db().deleteFrom("records").where("kind", "=", "tasks").execute();
  await db().deleteFrom("records").where("kind", "=", "leads").execute();
  await db().deleteFrom("records").where("kind", "=", "projects").execute();
  await db().deleteFrom("records").execute();
  await db().deleteFrom("events").execute();
  await db().deleteFrom("rate_limits").execute();
  await db().deleteFrom("inquiry_keys").execute();
});
afterAll(async () => {
  await closeDatabase();
});
describe("enquiry intake", () => {
  it("atomically saves a lead, task, notification and consent event", async () => {
    expect(await receiveInquiry(inquiry())).toEqual({ received: true });
    const rows = await db().selectFrom("records").selectAll().execute();
    expect(rows.map((r) => r.kind).sort()).toEqual([
      "leads",
      "notifications",
      "tasks",
    ]);
    expect(await db().selectFrom("events").selectAll().execute()).toHaveLength(
      1,
    );
  });
  it("does not duplicate a retried enquiry", async () => {
    const data = inquiry();
    await receiveInquiry(data);
    await receiveInquiry(data);
    expect(
      await db()
        .selectFrom("records")
        .selectAll()
        .where("kind", "=", "leads")
        .execute(),
    ).toHaveLength(1);
  });
  it("silently discards honeypot submissions", async () => {
    await receiveInquiry({ ...inquiry(), website: "spam" });
    expect(await db().selectFrom("records").selectAll().execute()).toHaveLength(
      0,
    );
  });
  it("requires consent and rejects unsupported fields", async () => {
    await expect(
      receiveInquiry({ ...inquiry(), consent: false }),
    ).rejects.toThrow();
    await expect(
      receiveInquiry({ ...inquiry(), role: "admin" }),
    ).rejects.toThrow();
  });
  it("rate limits repeated senders without partial records", async () => {
    for (let i = 0; i < 5; i++) await receiveInquiry(inquiry());
    await expect(receiveInquiry(inquiry())).rejects.toMatchObject({
      status: 429,
    });
    expect(
      await db()
        .selectFrom("records")
        .selectAll()
        .where("kind", "=", "leads")
        .execute(),
    ).toHaveLength(5);
  });
  it("increments active rate-limit windows and resets expired windows", async () => {
    await receiveInquiry(inquiry());
    await receiveInquiry(inquiry());
    const active = await db().selectFrom("rate_limits").selectAll().execute();
    expect(active).toHaveLength(2);
    expect(active.every((row) => row.hits === 2)).toBe(true);
    await db().updateTable("rate_limits").set({ expires_at: 0 }).execute();
    await receiveInquiry(inquiry());
    const renewed = await db().selectFrom("rate_limits").selectAll().execute();
    expect(renewed).toHaveLength(2);
    expect(renewed.every((row) => row.hits === 1)).toBe(true);
    expect(renewed.every((row) => Number(row.expires_at) > Date.now())).toBe(
      true,
    );
  });
});
describe("CRM integrity", () => {
  it("rejects stale edits and records a field-only audit trail", async () => {
    const row = await createRecord("clients", client(), "team");
    await updateRecord("clients", row.id, { notes: "Changed" }, 1, "team");
    await expect(
      updateRecord("clients", row.id, { notes: "Overwrite" }, 1, "team"),
    ).rejects.toMatchObject({ status: 409 });
    const events = await db()
      .selectFrom("events")
      .selectAll()
      .where("action", "=", "updated")
      .execute();
    expect(events[0].fields).toBe('["notes"]');
    expect(JSON.stringify(events)).not.toContain("Overwrite");
  });
  it("creates a client and project on approved conversion", async () => {
    await receiveInquiry(inquiry());
    const lead = await db()
      .selectFrom("records")
      .selectAll()
      .where("kind", "=", "leads")
      .executeTakeFirstOrThrow();
    const result = await convertLead(lead.id, 1, "team");
    expect(result.project.clientId).toBe(result.client.id);
    await expect(convertLead(lead.id, 2, "team")).rejects.toMatchObject({
      status: 409,
    });
  });
  it("rolls back client creation when a conversion is stale", async () => {
    const lead = await createRecord(
      "leads",
      { ...client(), service: "websites", status: "new" },
      "team",
    );
    await updateRecord(
      "leads",
      lead.id,
      { notes: "New information" },
      1,
      "team",
    );
    await expect(convertLead(lead.id, 1, "team")).rejects.toMatchObject({
      status: 409,
    });
    expect(
      await db()
        .selectFrom("records")
        .selectAll()
        .where("kind", "=", "clients")
        .execute(),
    ).toHaveLength(0);
  });
  it("rejects missing or mismatched relationships", async () => {
    const a = await createRecord("clients", client(), "team");
    const b = await createRecord(
      "clients",
      { ...client(), business: "Other cafe" },
      "team",
    );
    const p = await createRecord(
      "projects",
      { name: "Website", clientId: a.id, service: "websites" },
      "team",
    );
    await expect(
      createRecord(
        "tasks",
        { name: "Review", projectId: p.id, clientId: b.id },
        "team",
      ),
    ).rejects.toMatchObject({ status: 422 });
    await expect(
      createRecord(
        "projects",
        { name: "Invalid", clientId: randomUUID(), service: "websites" },
        "team",
      ),
    ).rejects.toMatchObject({ status: 422 });
    await expect(deleteRecord("clients", a.id, 1, "team")).rejects.toThrow();
  });
  it("allows one settings record and blocks its deletion", async () => {
    const values = {
      siteName: "Techcyme",
      heroTitle: "Make your business easier to find.",
      heroDescription:
        "Practical support for local businesses and everyday enquiries.",
      contactEmail: "team@example.test",
    };
    const row = await createRecord("settings", values, "team");
    await expect(
      createRecord("settings", values, "team"),
    ).rejects.toMatchObject({ status: 409 });
    await expect(
      deleteRecord("settings", row.id, 1, "team"),
    ).rejects.toMatchObject({ status: 422 });
  });
  it("blocks mass assignment and CSV formula injection", () => {
    expect(
      schemas.clients.safeParse({ ...client(), role: "admin" }).success,
    ).toBe(false);
    expect(safeCsv("=HYPERLINK(1)")).toBe('"\'=HYPERLINK(1)"');
    expect(safeCsv('A "quote"')).toBe('"A ""quote"""');
  });
});
describe("HTTP boundaries", () => {
  it("blocks foreign and absent origins", () => {
    expect(() =>
      sameOrigin(
        new Request("http://localhost:3000/api/inquiries", {
          headers: { origin: "https://elsewhere.test" },
        }),
      ),
    ).toThrow();
    expect(() =>
      sameOrigin(new Request("http://localhost:3000/api/inquiries")),
    ).toThrow();
  });
  it("rejects malformed, oversized and non-JSON bodies", async () => {
    await expect(
      jsonBody(
        new Request("http://localhost:3000", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{",
        }),
      ),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      jsonBody(
        new Request("http://localhost:3000", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: '"' + "x".repeat(66000) + '"',
        }),
      ),
    ).rejects.toMatchObject({ status: 413 });
    await expect(
      jsonBody(
        new Request("http://localhost:3000", { method: "POST", body: "text" }),
      ),
    ).rejects.toMatchObject({ status: 415 });
  });
  it("does not expose database details", async () => {
    const response = errorResponse({
      code: "SQLITE_CONSTRAINT_FOREIGNKEY",
      sql: "secret",
    });
    expect(response.status).toBe(409);
    expect(await response.text()).not.toContain("secret");
  });
});
describe("notification delivery", () => {
  it("records provider acceptance and never resends completed notifications", async () => {
    let deliveries = 0;
    const server = new SMTPServer({
      authOptional: true,
      disabledCommands: ["STARTTLS"],
      onData(stream, session, callback) {
        stream.on("data", () => {});
        stream.on("end", () => {
          deliveries++;
          callback();
        });
      },
    });
    await new Promise<void>((resolve) =>
      server.listen(25258, "127.0.0.1", resolve),
    );
    process.env.SMTP_HOST = "127.0.0.1";
    process.env.SMTP_PORT = "25258";
    process.env.SMTP_FROM = "website@example.test";
    process.env.SMTP_ALLOW_INSECURE_LOCAL = "true";
    try {
      await receiveInquiry(inquiry());
      expect((await sendNotifications()).sent).toBe(1);
      expect((await sendNotifications()).processed).toBe(0);
      expect(deliveries).toBe(1);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
  it("keeps a failed email visible without exposing provider secrets", async () => {
    process.env.SMTP_PORT = "25259";
    await receiveInquiry(inquiry());
    expect((await sendNotifications()).failed).toBe(1);
    const row = await db()
      .selectFrom("records")
      .selectAll()
      .where("kind", "=", "notifications")
      .executeTakeFirstOrThrow();
    const data = JSON.parse(row.data);
    expect(data.status).toBe("failed");
    expect(data.nextAttemptAt).toBeTruthy();
    expect(data.error).not.toContain("127.0.0.1");
  });
});
