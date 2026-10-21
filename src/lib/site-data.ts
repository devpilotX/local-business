import { db } from "./database";
import type { ContentPage } from "./content";
import { schemas } from "./validation";
export async function getSettings() {
  const row = await db()
    .selectFrom("records")
    .select("data")
    .where("kind", "=", "settings")
    .executeTakeFirstOrThrow();
  return schemas.settings.parse(JSON.parse(row.data));
}
export async function getContent(slug: string): Promise<ContentPage | null> {
  const row = await db()
    .selectFrom("records")
    .select("data")
    .where("kind", "=", "content")
    .where("slug", "=", slug)
    .executeTakeFirst();
  if (!row) return null;
  const page = schemas.content.parse(JSON.parse(row.data));
  return page.published ? page : null;
}
export async function publishedContent() {
  const rows = await db()
    .selectFrom("records")
    .select("data")
    .where("kind", "=", "content")
    .orderBy("slug")
    .execute();
  return rows
    .map((row) => schemas.content.parse(JSON.parse(row.data)))
    .filter((row) => row.published);
}
