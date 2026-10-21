"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import { BrandMark } from "@/components/site/header";

export type SiderItem = { key: string; label: string; icon: React.ReactNode };

// Replaces Refine's ThemedSider, which still renders Menu children (deprecated
// in Ant Design 5). Same layout, built on the `items` API.
export function AdminSider({ items }: { items: SiderItem[] }) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const selected =
    items.find((i) => i.key !== "/admin" && path.startsWith(i.key))?.key ??
    "/admin";

  return (
    <Layout.Sider
      width={232}
      collapsedWidth={64}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      theme="light"
      className="admin-sider"
      style={{ position: "sticky", top: 0, height: "100vh" }}
    >
      <div className="admin-sider-head">
        <Link href="/admin" className="admin-brand" aria-label="Techcyme CRM">
          <BrandMark />
          {collapsed ? null : (
            <>
              Techcyme <small>CRM</small>
            </>
          )}
        </Link>
      </div>
      <nav aria-label="Workspace">
        <Menu
          mode="inline"
          selectedKeys={[selected]}
          items={items.map((i) => ({
            key: i.key,
            icon: i.icon,
            label: <Link href={i.key}>{i.label}</Link>,
          }))}
        />
      </nav>
    </Layout.Sider>
  );
}
