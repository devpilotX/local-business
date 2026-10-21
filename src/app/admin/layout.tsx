import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Workspace | Techcyme",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell" data-theme="light">
      <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
