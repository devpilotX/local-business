"use client";

import { useSyncExternalStore } from "react";
import { Refine } from "@refinedev/core";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router/app";
import { App, ConfigProvider, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  FileText,
  Inbox,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings2,
  Users,
} from "lucide-react";
import { dataProvider, resources, label } from "@/lib/admin-client";
import { BrandMark } from "@/components/site/header";

const icons: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={16} aria-hidden="true" />,
  leads: <Inbox size={16} aria-hidden="true" />,
  clients: <Users size={16} aria-hidden="true" />,
  projects: <BriefcaseBusiness size={16} aria-hidden="true" />,
  tasks: <ListChecks size={16} aria-hidden="true" />,
  content: <FileText size={16} aria-hidden="true" />,
  settings: <Settings2 size={16} aria-hidden="true" />,
  notifications: <Bell size={16} aria-hidden="true" />,
  activity: <Activity size={16} aria-hidden="true" />,
};

function TopBar() {
  const path = usePathname();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const section = path.split("/")[2];
  return (
    <div className="admin-topbar">
      <div className="admin-crumb">
        <span>Workspace</span>
        <span aria-hidden="true">/</span>
        <strong>{section ? label(section) : "Overview"}</strong>
      </div>
      <div className="admin-top-actions">
        <Link className="admin-site-link" href="/">
          View website <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <Button
          icon={<LogOut size={14} aria-hidden="true" />}
          disabled={!hydrated}
          onClick={async () => {
            const response = await fetch("/api/auth/sign-out", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: "{}",
            });
            if (response.ok) location.assign("/admin/login");
            else window.alert("Sign-out failed. Please try again.");
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0b6e4f",
          colorInfo: "#0b6e4f",
          colorInfoBg: "#eef5f1",
          colorInfoBorder: "#b9d9c9",
          colorSuccessBg: "#eef5f1",
          colorSuccessBorder: "#b9d9c9",
          colorSuccess: "#0b6e4f",
          colorLink: "#0b6e4f",
          colorBgLayout: "#f6f7f5",
          colorBgContainer: "#ffffff",
          colorBorder: "#cfd3cb",
          colorBorderSecondary: "#e3e5df",
          colorText: "#0d1512",
          colorTextSecondary: "#5b6762",
          borderRadius: 8,
          borderRadiusLG: 12,
          controlHeight: 36,
          fontFamily:
            'var(--font-geist-sans), ui-sans-serif, system-ui, "Segoe UI", sans-serif',
          fontSize: 14,
          boxShadowTertiary: "0 1px 2px rgb(13 21 18 / 5%)",
        },
        components: {
          Layout: { siderBg: "#ffffff", headerBg: "#ffffff" },
          Menu: {
            itemBg: "#ffffff",
            itemSelectedBg: "#e5f1eb",
            itemSelectedColor: "#0b6e4f",
            itemHoverBg: "#f1f2ef",
            itemBorderRadius: 7,
            itemHeight: 36,
            itemMarginInline: 8,
          },
          Table: {
            headerBg: "#f6f7f5",
            headerColor: "#5b6762",
            rowHoverBg: "#f6f7f5",
            borderColor: "#e3e5df",
          },
          Card: { headerFontSize: 15 },
          Button: { fontWeight: 550, primaryShadow: "none" },
        },
      }}
    >
      <App>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "dashboard",
              list: "/admin",
              meta: { label: "Overview", icon: icons.dashboard },
            },
            ...resources.map((name) => ({
              name,
              list: `/admin/${name}`,
              meta: { label: label(name), icon: icons[name] },
            })),
          ]}
          options={{ syncWithLocation: false, disableTelemetry: true }}
        >
          <ThemedLayout
            Title={({ collapsed }) => (
              <Link href="/admin" className="admin-brand">
                <BrandMark />
                {collapsed ? null : (
                  <>
                    Techcyme <small>CRM</small>
                  </>
                )}
              </Link>
            )}
            Header={TopBar}
          >
            {children}
          </ThemedLayout>
        </Refine>
      </App>
    </ConfigProvider>
  );
}
