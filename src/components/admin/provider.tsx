"use client";

import { useSyncExternalStore } from "react";
import { Refine } from "@refinedev/core";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router/app";
import { App, ConfigProvider, Button, Space, Typography } from "antd";
import Link from "next/link";
import { ArrowUpRight, LogOut, PanelsTopLeft } from "lucide-react";
import { dataProvider, resources, label } from "@/lib/admin-client";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4f46e5",
          colorInfo: "#4f46e5",
          colorBgLayout: "#f4f6fb",
          colorBgContainer: "#ffffff",
          colorBorderSecondary: "#e0e6f0",
          borderRadius: 10,
          borderRadiusLG: 14,
          controlHeight: 40,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 14,
          colorText: "#15233e",
          colorTextSecondary: "#58677f",
        },
      }}
    >
      <App>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          resources={[
            { name: "dashboard", list: "/admin", meta: { label: "Overview" } },
            ...resources.map((name) => ({
              name,
              list: `/admin/${name}`,
              meta: { label: label(name) },
            })),
          ]}
          options={{ syncWithLocation: false, disableTelemetry: true }}
        >
          <ThemedLayout
            Title={() => (
              <Link href="/admin" className="admin-brand">
                <span className="admin-brand-mark">
                  <PanelsTopLeft size={18} aria-hidden="true" />
                </span>
                Techcyme workspace
              </Link>
            )}
            Header={() => (
              <div className="admin-topbar">
                <div className="admin-topbar-context">
                  <Typography.Text strong>Business workspace</Typography.Text>
                  <Typography.Text type="secondary">
                    Manage enquiries, delivery and site content
                  </Typography.Text>
                </div>
                <Space size={10}>
                  <Link className="admin-site-link" href="/">
                    View website <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  <Button
                    icon={<LogOut size={15} aria-hidden="true" />}
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
                </Space>
              </div>
            )}
          >
            {children}
          </ThemedLayout>
        </Refine>
      </App>
    </ConfigProvider>
  );
}
