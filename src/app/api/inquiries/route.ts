import { receiveInquiry } from "@/lib/store";
import { sameOrigin, jsonBody, errorResponse } from "@/lib/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    return Response.json(await receiveInquiry(await jsonBody(request)), {
      status: 201,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
