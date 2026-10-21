"use client";

import { useList } from "@refinedev/core";
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  Inbox,
  Settings2,
  Users,
} from "lucide-react";
import type { AdminRecord } from "@/lib/admin-client";

const summaryResources = [
  {
    resource: "leads",
    title: "Enquiries",
    description: "Incoming business enquiries",
    icon: Inbox,
  },
  {
    resource: "clients",
    title: "Clients",
    description: "Businesses you work with",
    icon: Users,
  },
  {
    resource: "projects",
    title: "Projects",
    description: "Work in progress",
    icon: BriefcaseBusiness,
  },
  {
    resource: "tasks",
    title: "Tasks",
    description: "Next actions to complete",
    icon: ClipboardList,
  },
] as const;

function Count({
  resource,
  title,
  description,
  icon: Icon,
}: {
  resource: string;
  title: string;
  description: string;
  icon: typeof Inbox;
}) {
  const { query, result } = useList({
    resource,
    pagination: { pageSize: 1 },
  });

  return (
    <Card className="admin-stat-card" bordered>
      <div className="admin-stat-top">
        <span className="admin-stat-icon">
          <Icon size={19} aria-hidden="true" />
        </span>
        {!query.isError ? (
          <span className="admin-live-indicator">Saved records</span>
        ) : null}
      </div>
      <Statistic
        title={title}
        value={result.total ?? 0}
        loading={query.isLoading}
      />
      <Typography.Paragraph
        type="secondary"
        style={{ margin: "5px 0 0", fontSize: 12 }}
      >
        {description}
      </Typography.Paragraph>
      {query.isError ? (
        <Alert type="error" showIcon message="Count unavailable" />
      ) : (
        <Link
          className="admin-stat-link"
          href={resource === "leads" ? "/admin/leads" : `/admin/${resource}`}
        >
          Open {title.toLowerCase()}{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      )}
    </Card>
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
    detail: "Review delivery stages and linked task progress.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/admin/content",
    title: "Update website content",
    detail: "Manage supported pages, summaries and publication state.",
    icon: FileText,
  },
  {
    href: "/admin/settings",
    title: "Manage site details",
    detail: "Review your public contact information and homepage copy.",
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
      <div className="admin-welcome">
        <div className="admin-welcome-copy">
          <Typography.Title level={1}>Business overview</Typography.Title>
          <Typography.Paragraph>
            Review enquiries, keep client work moving and update your website
            from one workspace. Counts reflect saved records, not estimates.
          </Typography.Paragraph>
        </div>
        <div className="admin-page-actions">
          <Button type="primary" href="/admin/leads">
            View enquiries <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Link className="button button-outline" href="/admin/projects">
            View projects <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Row gutter={[16, 16]} align="stretch">
        {summaryResources.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.resource}>
            <Count
              resource={item.resource}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>

      <Card
        className="admin-data-card"
        title="Recent enquiries"
        extra={
          <Link
            className="admin-stat-link"
            style={{ marginTop: 0 }}
            href="/admin/leads"
          >
            View all <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        }
        style={{ marginTop: 24 }}
      >
        {query.isError ? (
          <Alert
            type="error"
            showIcon
            message="Enquiries could not be loaded"
            description="Check your connection and try again from the enquiries page."
          />
        ) : (
          <Table
            rowKey="id"
            loading={query.isLoading}
            dataSource={result.data}
            pagination={false}
            scroll={{ x: 620 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enquiries yet"
                />
              ),
            }}
            columns={[
              {
                title: "Business",
                dataIndex: "business",
                render: (value: unknown) => (
                  <span className="admin-table-primary">
                    {String(value || "Business not provided")}
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
                  const colors: Record<string, string> = {
                    new: "blue",
                    contacted: "gold",
                    qualified: "purple",
                    won: "green",
                    lost: "default",
                  };
                  return (
                    <Tag color={colors[status] || "default"}>
                      {status.replaceAll("-", " ")}
                    </Tag>
                  );
                },
              },
              {
                title: "Action",
                render: () => <Link href="/admin/leads">Open enquiry</Link>,
              },
            ]}
          />
        )}
      </Card>

      <section
        className="admin-shortcuts"
        aria-labelledby="workspace-shortcuts-title"
      >
        <Typography.Title
          id="workspace-shortcuts-title"
          level={2}
          style={{ fontSize: 20, marginBottom: 14 }}
        >
          Quick access
        </Typography.Title>
        <Row gutter={[12, 12]} align="stretch">
          {shortcuts.map(({ href, title, detail, icon: Icon }) => (
            <Col xs={24} sm={12} xl={6} key={href}>
              <Link href={href} className="admin-quick-link">
                <span className="admin-quick-icon">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      <Alert
        style={{ marginTop: 24 }}
        type="info"
        showIcon
        message="Email delivery has its own status"
        description={
          <>
            Saving an enquiry queues an email. Check{" "}
            <Link href="/admin/notifications">notifications</Link> for provider
            acceptance or delivery errors. A scheduled notification worker must
            be running.
          </>
        }
      />
    </section>
  );
}
