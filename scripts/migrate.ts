import { migrateStore, closeDatabase, db } from "../src/lib/database";
import { authOptions } from "../src/lib/auth";
import { getMigrations } from "better-auth/db/migration";
import { insertRecord } from "../src/lib/store";
import { business } from "../src/lib/config";
import { pages } from "../src/lib/content";
try {
  await migrateStore();
  const migration = await getMigrations(authOptions());
  await migration.runMigrations();
  await db()
    .transaction()
    .execute(async (tx) => {
      if (
        !(await tx
          .selectFrom("records")
          .select("id")
          .where("kind", "=", "settings")
          .executeTakeFirst())
      )
        await insertRecord(tx, "settings", {
          siteName: "Techcyme",
          heroTitle: "Make your business easier to find.",
          heroDescription:
            "Google Maps visibility, useful websites and connected workflows for the businesses in your neighbourhood.",
          contactEmail: business.email,
          phone: "",
          businessHours: "",
        });
      for (const page of pages) {
        if (
          !(await tx
            .selectFrom("records")
            .select("id")
            .where("slug", "=", page.slug)
            .executeTakeFirst())
        )
          await insertRecord(tx, "content", { ...page, published: true });
      }
    });
  console.log(
    "Database and content migrations completed. Existing content was preserved.",
  );
} finally {
  await closeDatabase();
}
