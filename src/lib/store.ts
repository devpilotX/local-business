import { randomUUID, createHmac } from "node:crypto";
import { sql, type Transaction } from "kysely";
import { db, type Store, type RecordRow } from "./database";
import { schemas, type EditableKind, inquirySchema } from "./validation";
import { HttpError } from "./http";
import { business } from "./config";

export interface CrmRecord extends Record<string, unknown> {
  id: string;
  kind: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}
export const unpack = (r: RecordRow): CrmRecord => ({
  ...JSON.parse(r.data),
  id: r.id,
  kind: r.kind,
  version: r.version,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});
export async function event(
  tx: Transaction<Store>,
  actor: string,
  action: string,
  kind: string,
  id: string,
  fields: string[],
) {
  await tx
    .insertInto("events")
    .values({
      id: randomUUID(),
      actor,
      action,
      kind,
      record_id: id,
      fields: JSON.stringify(fields),
      created_at: new Date().toISOString(),
    })
    .execute();
}
export async function insertRecord(
  tx: Transaction<Store>,
  kind: string,
  data: Record<string, unknown>,
) {
  const now = new Date().toISOString();
  const row: RecordRow = {
    id: randomUUID(),
    kind,
    data: JSON.stringify(data),
    slug: kind === "content" ? String(data.slug) : null,
    client_id: data.clientId ? String(data.clientId) : null,
    project_id: data.projectId ? String(data.projectId) : null,
    created_at: now,
    updated_at: now,
    version: 1,
  };
  await tx.insertInto("records").values(row).execute();
  return unpack(row);
}
async function checkLinks(
  tx: Transaction<Store>,
  data: Record<string, unknown>,
) {
  for (const [field, kind] of [
    ["clientId", "clients"],
    ["projectId", "projects"],
  ] as const) {
    if (data[field]) {
      const linked = await tx
        .selectFrom("records")
        .selectAll()
        .where("id", "=", String(data[field]))
        .where("kind", "=", kind)
        .executeTakeFirst();
      if (!linked)
        throw new HttpError(
          422,
          `Choose an existing ${kind === "clients" ? "client" : "project"}.`,
        );
      if (
        field === "projectId" &&
        data.clientId &&
        linked.client_id !== data.clientId
      )
        throw new HttpError(422, "The project does not belong to this client.");
    }
  }
}
export async function createRecord(
  kind: EditableKind,
  input: unknown,
  actor: string,
) {
  const data = schemas[kind].parse(input) as Record<string, unknown>;
  return db()
    .transaction()
    .execute(async (tx) => {
      if (
        kind === "settings" &&
        (await tx
          .selectFrom("records")
          .select("id")
          .where("kind", "=", "settings")
          .executeTakeFirst())
      )
        throw new HttpError(409, "Update the existing website settings.");
      await checkLinks(tx, data);
      const record = await insertRecord(tx, kind, data);
      await event(tx, actor, "created", kind, record.id, Object.keys(data));
      return record;
    });
}
export async function updateRecord(
  kind: EditableKind,
  id: string,
  input: unknown,
  version: number,
  actor: string,
) {
  return db()
    .transaction()
    .execute(async (tx) => {
      const previous = await tx
        .selectFrom("records")
        .selectAll()
        .where("id", "=", id)
        .where("kind", "=", kind)
        .executeTakeFirst();
      if (!previous) throw new HttpError(404, "The record was not found.");
      const parsedPatch = schemas[kind].partial().parse(input);
      const patch = Object.fromEntries(
        Object.keys(input as Record<string, unknown>).map((key) => [
          key,
          (parsedPatch as Record<string, unknown>)[key],
        ]),
      );
      const data = schemas[kind].parse({
        ...JSON.parse(previous.data),
        ...patch,
      }) as Record<string, unknown>;
      await checkLinks(tx, data);
      const changed = await tx
        .updateTable("records")
        .set({
          data: JSON.stringify(data),
          client_id: data.clientId ? String(data.clientId) : null,
          project_id: data.projectId ? String(data.projectId) : null,
          slug: kind === "content" ? String(data.slug) : null,
          updated_at: new Date().toISOString(),
          version: version + 1,
        })
        .where("id", "=", id)
        .where("version", "=", version)
        .returningAll()
        .executeTakeFirst();
      if (!changed)
        throw new HttpError(
          409,
          "Someone changed this record. Reload it before saving again.",
        );
      await event(tx, actor, "updated", kind, id, Object.keys(patch));
      return unpack(changed);
    });
}
export async function deleteRecord(
  kind: EditableKind,
  id: string,
  version: number,
  actor: string,
) {
  if (kind === "settings")
    throw new HttpError(422, "Website settings cannot be deleted.");
  return db()
    .transaction()
    .execute(async (tx) => {
      const row = await tx
        .deleteFrom("records")
        .where("kind", "=", kind)
        .where("id", "=", id)
        .where("version", "=", version)
        .returningAll()
        .executeTakeFirst();
      if (!row)
        throw new HttpError(
          409,
          "The record changed or was already removed. Reload and try again.",
        );
      await event(tx, actor, "deleted", kind, id, []);
      return { id };
    });
}
export async function convertLead(id: string, version: number, actor: string) {
  return db()
    .transaction()
    .execute(async (tx) => {
      const row = await tx
        .selectFrom("records")
        .selectAll()
        .where("id", "=", id)
        .where("kind", "=", "leads")
        .executeTakeFirst();
      if (!row) throw new HttpError(404, "The lead was not found.");
      const lead = JSON.parse(row.data);
      if (["won", "lost"].includes(lead.status))
        throw new HttpError(409, "This lead is already closed.");
      const client = await insertRecord(
        tx,
        "clients",
        schemas.clients.parse({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          business: lead.business,
          status: "active",
          notes: "",
        }),
      );
      const project = await insertRecord(
        tx,
        "projects",
        schemas.projects.parse({
          name: `${lead.business}: ${lead.service}`,
          clientId: client.id,
          service: lead.service,
          notes: "Created from an approved lead conversion.",
        }),
      );
      const changed = await tx
        .updateTable("records")
        .set({
          data: JSON.stringify({ ...lead, status: "won" }),
          client_id: client.id,
          version: version + 1,
          updated_at: new Date().toISOString(),
        })
        .where("id", "=", id)
        .where("version", "=", version)
        .executeTakeFirst();
      if (changed.numUpdatedRows !== 1n)
        throw new HttpError(
          409,
          "The lead changed. Reload before converting it.",
        );
      await event(tx, actor, "converted", "leads", id, ["status", "clientId"]);
      await event(tx, actor, "created", "clients", client.id, ["leadId"]);
      await event(tx, actor, "created", "projects", project.id, ["clientId"]);
      return { client, project };
    });
}
async function limit(tx: Transaction<Store>, key: string, max: number) {
  const now = Date.now();
  const expires = now + 3600000;
  const row = await tx
    .insertInto("rate_limits")
    .values({ key, hits: 1, expires_at: expires })
    .onConflict((oc) =>
      oc.column("key").doUpdateSet({
        hits: sql`case when expires_at < ${now} then 1 else hits + 1 end`,
        expires_at: sql`case when expires_at < ${now} then ${expires} else expires_at end`,
      }),
    )
    .returningAll()
    .executeTakeFirstOrThrow();
  if (row.hits > max)
    throw new HttpError(
      429,
      "Too many enquiries. Please wait before trying again, or email us directly.",
    );
}
export async function receiveInquiry(input: unknown) {
  const data = inquirySchema.parse(input);
  if (data.website) return { received: true };
  return db()
    .transaction()
    .execute(async (tx) => {
      if (
        await tx
          .selectFrom("inquiry_keys")
          .select("id")
          .where("id", "=", data.requestId)
          .executeTakeFirst()
      )
        return { received: true };
      const hash = createHmac(
        "sha256",
        process.env.BETTER_AUTH_SECRET || "test-only",
      )
        .update(data.email)
        .digest("hex");
      await limit(tx, `email:${hash}`, 5);
      await limit(tx, "public-inquiries", 120);
      const lead = await insertRecord(
        tx,
        "leads",
        schemas.leads.parse({
          name: data.name,
          email: data.email,
          phone: data.phone,
          business: data.business,
          service: data.service,
          message: data.message,
        }),
      );
      await tx
        .insertInto("inquiry_keys")
        .values({
          id: data.requestId,
          record_id: lead.id,
          created_at: new Date().toISOString(),
        })
        .execute();
      await insertRecord(
        tx,
        "tasks",
        schemas.tasks.parse({
          name: `Review enquiry: ${data.business}`,
          notes: `Lead reference: ${lead.id}`,
        }),
      );
      await insertRecord(tx, "notifications", {
        leadId: lead.id,
        recipient: business.email,
        status: "pending",
        attempts: 0,
        error: "",
      });
      await event(tx, "website", "received", "leads", lead.id, ["consent"]);
      return { received: true };
    });
}
