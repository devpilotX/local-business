import { sql } from "kysely";
import { db } from "@/lib/database";
export async function GET() {
  try {
    await sql`select 1`.execute(db());
    return Response.json(
      { status: "ok" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
