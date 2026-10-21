import { notFound } from "next/navigation";
import { ResourceScreen } from "@/components/admin/resource-screen";
const allowed = [
  "leads",
  "clients",
  "projects",
  "tasks",
  "content",
  "settings",
  "notifications",
  "activity",
];
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  if (!allowed.includes(resource)) notFound();
  return <ResourceScreen key={resource} resource={resource} />;
}
