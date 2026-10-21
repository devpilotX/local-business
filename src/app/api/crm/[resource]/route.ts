import { db } from "@/lib/database";
import { createRecord, unpack } from "@/lib/store";
import { requireAdmin, validKind, editableKind } from "@/lib/crm-api";
import { jsonBody, sameOrigin, errorResponse } from "@/lib/http";
export const runtime = "nodejs";
type Context = { params: Promise<{ resource: string }> };
export async function GET(request: Request, context: Context) {
  try {
    await requireAdmin();
    const { resource } = await context.params;
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const size = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get("size")) || 20),
    );
    const search = (url.searchParams.get("search") || "").trim().slice(0, 100);
    if (resource === "activity") {
      const rows = await db()
        .selectFrom("events")
        .selectAll()
        .orderBy("created_at", "desc")
        .limit(size)
        .offset((page - 1) * size)
        .execute();
      const total = await db()
        .selectFrom("events")
        .select((eb) => eb.fn.countAll().as("total"))
        .executeTakeFirstOrThrow();
      return Response.json(
        { data: rows, total: Number(total.total) },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    validKind(resource);
    let query = db().selectFrom("records").where("kind", "=", resource);
    if (search) query = query.where("data", "like", `%${search}%`);
    const rows = await query
      .selectAll()
      .orderBy("updated_at", "desc")
      .limit(size)
      .offset((page - 1) * size)
      .execute();
    const total = await query
      .select((eb) => eb.fn.countAll().as("total"))
      .executeTakeFirstOrThrow();
    const data = rows.map(unpack);
    if (resource === "projects" && rows.length) {
      const tasks = await db()
        .selectFrom("records")
        .select(["project_id", "data"])
        .where("kind", "=", "tasks")
        .where(
          "project_id",
          "in",
          rows.map((r) => r.id),
        )
        .execute();
      for (const project of data) {
        const linked = tasks.filter((t) => t.project_id === project.id);
        project.totalTasks = linked.length;
        project.completedTasks = linked.filter(
          (t) => JSON.parse(t.data).status === "done",
        ).length;
      }
    }
    return Response.json(
      { data, total: Number(total.total) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request, context: Context) {
  try {
    sameOrigin(request);
    const session = await requireAdmin();
    const { resource } = await context.params;
    const data = await createRecord(
      editableKind(resource),
      await jsonBody(request),
      session.user.id,
    );
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
