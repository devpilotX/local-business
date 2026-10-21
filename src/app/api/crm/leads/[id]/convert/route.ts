import { z } from "zod";
import { requireAdmin } from "@/lib/crm-api";
import { convertLead } from "@/lib/store";
import { jsonBody, sameOrigin, errorResponse } from "@/lib/http";
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    sameOrigin(request);
    const session = await requireAdmin();
    const { version } = z
      .object({ version: z.number().int().positive() })
      .strict()
      .parse(await jsonBody(request));
    const { id } = await context.params;
    return Response.json(await convertLead(id, version, session.user.id));
  } catch (error) {
    return errorResponse(error);
  }
}
