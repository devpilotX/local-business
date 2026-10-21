"use client";
import { useSyncExternalStore } from "react";
import { Refine } from "@refinedev/core";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router/app";
import { App, ConfigProvider, Button, Space, Typography } from "antd";
import Link from "next/link";
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
          colorPrimary: "#294fc9",
          borderRadius: 8,
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          colorText: "#17243b",
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
                Techcyme workspace
              </Link>
            )}
            Header={() => (
              <div className="admin-topbar">
                <Typography.Text>Business workspace</Typography.Text>
                <Space>
                  <Link href="/">View website</Link>
                  <Button
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
