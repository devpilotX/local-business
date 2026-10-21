import { currentAdmin } from "./auth";
import { allKinds, editableKinds, type EditableKind } from "./validation";
import { HttpError } from "./http";
export async function requireAdmin() {
  const session = await currentAdmin();
  if (!session)
    throw new HttpError(401, "Sign in with an administrator account.");
  return session;
}
export function validKind(kind: string) {
  if (!allKinds.includes(kind as EditableKind))
    throw new HttpError(404, "The resource was not found.");
}
export function editableKind(kind: string): EditableKind {
  if (!editableKinds.includes(kind as EditableKind))
    throw new HttpError(403, "This resource is read-only.");
  return kind as EditableKind;
}
