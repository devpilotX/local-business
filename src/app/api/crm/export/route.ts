import { db } from "@/lib/database";
import { requireAdmin, validKind } from "@/lib/crm-api";
import { unpack } from "@/lib/store";
import { safeCsv } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const kind = new URL(request.url).searchParams.get("resource") || "leads";
    validKind(kind);
    const rows = await db()
      .selectFrom("records")
      .selectAll()
      .where("kind", "=", kind)
      .orderBy("created_at", "desc")
      .limit(10000)
      .execute();
    const data = rows.map(unpack);
    const keys = [...new Set(data.flatMap(Object.keys))];
    const csv = [
      keys.map(safeCsv).join(","),
      ...data.map((r) => keys.map((k) => safeCsv(r[k])).join(",")),
    ].join("\r\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="techcyme-${kind}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
