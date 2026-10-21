import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import { AdminProvider } from "@/components/admin/provider";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await currentAdmin())) redirect("/admin/login");
  return <AdminProvider>{children}</AdminProvider>;
}
