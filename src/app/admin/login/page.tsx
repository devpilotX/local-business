import { Login } from "@/components/admin/login";
import { currentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  if (await currentAdmin()) redirect("/admin");
  return <Login />;
}
