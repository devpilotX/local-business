"use client";

import { useList } from "@refinedev/core";
import { Alert, Button, Col, Empty, Row, Skeleton, Table, Tag } from "antd";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Inbox,
  ListChecks,
  Settings2,
  Users,
} from "lucide-react";
import type { AdminRecord } from "@/lib/admin-client";

const summaryResources = [
  {
    resource: "leads",
    title: "Enquiries",
    note: "All saved enquiries",
    icon: Inbox,
  },
  {
    resource: "clients",
    title: "Clients",
    note: "Businesses you work with",
    icon: Users,
  },
  {
    resource: "projects",
    title: "Projects",
    note: "Planned and in delivery",
    icon: BriefcaseBusiness,
  },
  {
    resource: "tasks",
    title: "Tasks",
    note: "Recorded next actions",
    icon: ListChecks,
  },
] as const;

const statusColor: Record<string, string> = {
  new: "blue",
  contacted: "gold",
  qualified: "purple",
  won: "green",
  lost: "default",
};

function Stat({
  resource,
  title,
  note,
  icon: Icon,
}: (typeof summaryResources)[number]) {
  const { query, result } = useList({ resource, pagination: { pageSize: 1 } });
  return (
    <Link className="admin-stat" href={`/admin/${resource}`}>
      <span className="admin-stat-top">
        {title}
        <span className="admin-stat-icon">
          <Icon size={16} aria-hidden="true" />
        </span>
      </span>
      {query.isLoading ? (
        <Skeleton.Input active size="small" style={{ marginTop: 12 }} />
      ) : query.isError ? (
        <span className="admin-stat-foot">Count unavailable</span>
      ) : (
        <span className="admin-stat-value">{result.total ?? 0}</span>
      )}
      <span className="admin-stat-foot">
        {note}
        <ArrowUpRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}

const shortcuts = [
  {
    href: "/admin/leads",
    title: "Review enquiries",
    detail: "Check new requests and record the next follow-up.",
    icon: Inbox,
  },
  {
    href: "/admin/projects",
    title: "Track project work",
    detail: "Delivery stages and linked task progress.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/admin/content",
    title: "Edit website content",
    detail: "Pages, summaries and publication state.",
    icon: FileText,
  },
  {
    href: "/admin/settings",
    title: "Site details",
    detail: "Public contact details and homepage text.",
    icon: Settings2,
  },
] as const;

export function Dashboard() {
  const { query, result } = useList<AdminRecord>({
    resource: "leads",
    pagination: { pageSize: 5 },
  });

  return (
    <section id="main" className="admin-content">
      <div className="admin-page-head">
        <div>
          <h1>Business overview</h1>
          <p>
            Enquiries, client work and website content in one place. Counts
            reflect saved records.
          </p>
        </div>
        <div className="admin-page-actions">
          <Button href="/admin/projects">View projects</Button>
          <Button type="primary" href="/admin/leads">
            Review enquiries <ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]} align="stretch">
        {summaryResources.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.resource}>
            <Stat {...item} />
          </Col>
        ))}
      </Row>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Recent enquiries</h2>
          <Link className="admin-link" href="/admin/leads">
            View all <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="admin-panel-body">
          {query.isError ? (
            <Alert
              type="error"
              showIcon
              message="Enquiries could not be loaded"
              description="Check your connection and try again from the enquiries page."
              style={{ margin: 12 }}
            />
          ) : (
            <Table
              rowKey="id"
              size="middle"
              loading={query.isLoading}
              dataSource={result.data}
              pagination={false}
              scroll={{ x: 620 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No enquiries yet. New website enquiries appear here."
                  />
                ),
              }}
              columns={[
                {
                  title: "Business",
                  dataIndex: "business",
                  render: (value: unknown) => (
                    <span className="admin-table-primary">
                      {String(value || "Not provided")}
                    </span>
                  ),
                },
                { title: "Contact", dataIndex: "name" },
                {
                  title: "Service",
                  dataIndex: "service",
                  render: (value: unknown) =>
                    String(value || "Not specified").replaceAll("-", " "),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (value: unknown) => {
                    const status = String(value || "new");
                    return (
                      <Tag color={statusColor[status] || "default"}>
                        {status.replaceAll("-", " ")}
                      </Tag>
                    );
                  },
                },
              ]}
            />
          )}
        </div>
      </div>

      <h2 className="admin-section-title">Quick access</h2>
      <Row gutter={[12, 12]} align="stretch">
        {shortcuts.map(({ href, title, detail, icon: Icon }) => (
          <Col xs={24} sm={12} xl={6} key={href}>
            <Link href={href} className="admin-quick">
              <span className="admin-stat-icon">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
            </Link>
          </Col>
        ))}
      </Row>

      <Alert
        style={{ marginTop: 24 }}
        type="info"
        showIcon
        message="Email delivery has its own status"
        description={
          <>
            Saving an enquiry queues an email. Check{" "}
            <Link href="/admin/notifications">notifications</Link> for provider
            acceptance or errors. The scheduled notification worker must be
            running.
          </>
        }
      />
    </section>
  );
}
