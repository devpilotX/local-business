import Database from "better-sqlite3";
import { Pool } from "pg";
import { Kysely, PostgresDialect, SqliteDialect, type Generated } from "kysely";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export interface RecordRow {
  id: string;
  kind: string;
  data: string;
  client_id: string | null;
  project_id: string | null;
  slug: string | null;
  version: number;
  created_at: string;
  updated_at: string;
}
interface EventRow {
  id: string;
  actor: string;
  action: string;
  kind: string;
  record_id: string;
  fields: string;
  created_at: string;
}
interface LimitRow {
  key: string;
  hits: Generated<number>;
  expires_at: number;
}
interface RequestRow {
  id: string;
  record_id: string;
  created_at: string;
}
export interface Store {
  records: RecordRow;
  events: EventRow;
  rate_limits: LimitRow;
  inquiry_keys: RequestRow;
}
let native: Database.Database | Pool | undefined;
let store: Kysely<Store> | undefined;
export function nativeDatabase() {
  if (!native) {
    if (process.env.DATABASE_URL?.startsWith("postgres"))
      native = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
      });
    else {
      const path = process.env.SQLITE_PATH || ".data/techcyme.db";
      mkdirSync(dirname(path), { recursive: true });
      const sqlite = new Database(path);
      sqlite.pragma("journal_mode = WAL");
      sqlite.pragma("foreign_keys = ON");
      sqlite.pragma("busy_timeout = 5000");
      native = sqlite;
    }
  }
  return native;
}
export function db() {
  if (!store) {
    const connection = nativeDatabase();
    store = new Kysely<Store>({
      dialect:
        connection instanceof Pool
          ? new PostgresDialect({ pool: connection })
          : new SqliteDialect({ database: connection }),
    });
  }
  return store;
}
export async function closeDatabase() {
  if (store) await store.destroy();
  store = undefined;
  native = undefined;
}
export async function migrateStore() {
  const k = db();
  await k.schema
    .createTable("records")
    .ifNotExists()
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("kind", "text", (c) => c.notNull())
    .addColumn("data", "text", (c) => c.notNull())
    .addColumn("client_id", "text", (c) =>
      c.references("records.id").onDelete("restrict"),
    )
    .addColumn("project_id", "text", (c) =>
      c.references("records.id").onDelete("restrict"),
    )
    .addColumn("slug", "text", (c) => c.unique())
    .addColumn("version", "integer", (c) => c.notNull().defaultTo(1))
    .addColumn("created_at", "text", (c) => c.notNull())
    .addColumn("updated_at", "text", (c) => c.notNull())
    .execute();
  await k.schema
    .createIndex("records_kind_updated")
    .ifNotExists()
    .on("records")
    .columns(["kind", "updated_at"])
    .execute();
  await k.schema
    .createTable("events")
    .ifNotExists()
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("actor", "text", (c) => c.notNull())
    .addColumn("action", "text", (c) => c.notNull())
    .addColumn("kind", "text", (c) => c.notNull())
    .addColumn("record_id", "text", (c) => c.notNull())
    .addColumn("fields", "text", (c) => c.notNull())
    .addColumn("created_at", "text", (c) => c.notNull())
    .execute();
  await k.schema
    .createTable("rate_limits")
    .ifNotExists()
    .addColumn("key", "text", (c) => c.primaryKey())
    .addColumn("hits", "integer", (c) => c.notNull().defaultTo(0))
    .addColumn("expires_at", "bigint", (c) => c.notNull())
    .execute();
  await k.schema
    .createTable("inquiry_keys")
    .ifNotExists()
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("record_id", "text", (c) => c.notNull())
    .addColumn("created_at", "text", (c) => c.notNull())
    .execute();
}
