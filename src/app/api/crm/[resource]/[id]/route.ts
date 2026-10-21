import { z } from "zod";
import { db } from "@/lib/database";
import { unpack, updateRecord, deleteRecord } from "@/lib/store";
import { requireAdmin, validKind, editableKind } from "@/lib/crm-api";
import { jsonBody, sameOrigin, errorResponse, HttpError } from "@/lib/http";
export const runtime = "nodejs";
type Context = { params: Promise<{ resource: string; id: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    await requireAdmin();
    const { resource, id } = await context.params;
    validKind(resource);
    const row = await db()
      .selectFrom("records")
      .selectAll()
      .where("kind", "=", resource)
      .where("id", "=", id)
      .executeTakeFirst();
    if (!row) throw new HttpError(404, "The record was not found.");
    return Response.json(
      { data: unpack(row) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
export async function PATCH(request: Request, context: Context) {
  try {
    sameOrigin(request);
    const session = await requireAdmin();
    const { resource, id } = await context.params;
    const body = z
      .object({
        values: z.record(z.string(), z.unknown()),
        version: z.number().int().positive(),
      })
      .strict()
      .parse(await jsonBody(request));
    return Response.json({
      data: await updateRecord(
        editableKind(resource),
        id,
        body.values,
        body.version,
        session.user.id,
      ),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function DELETE(request: Request, context: Context) {
  try {
    sameOrigin(request);
    const session = await requireAdmin();
    const { resource, id } = await context.params;
    const body = z
      .object({ version: z.number().int().positive() })
      .strict()
      .parse(await jsonBody(request));
    return Response.json({
      data: await deleteRecord(
        editableKind(resource),
        id,
        body.version,
        session.user.id,
      ),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
