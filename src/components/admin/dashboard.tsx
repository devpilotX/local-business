"use client";
import { useList } from "@refinedev/core";
import { Card, Row, Col, Statistic, Alert, Typography, Table, Tag } from "antd";
import Link from "next/link";
import type { AdminRecord } from "@/lib/admin-client";
function Count({ resource }: { resource: string }) {
  const { query, result } = useList({ resource, pagination: { pageSize: 1 } });
  return (
    <Card>
      <Statistic
        title={resource.charAt(0).toUpperCase() + resource.slice(1)}
        value={result.total ?? 0}
        loading={query.isLoading}
      />
      {query.isError ? (
        <Alert type="error" message="Count unavailable" />
      ) : (
        <Link href={`/admin/${resource}`}>Manage {resource}</Link>
      )}
    </Card>
  );
}
export function Dashboard() {
  const { query, result } = useList<AdminRecord>({
    resource: "leads",
    pagination: { pageSize: 5 },
  });
  return (
    <section id="main" className="admin-content">
      <Typography.Title level={1}>Business overview</Typography.Title>
      <Typography.Paragraph>
        New enquiries, client work and website content in one workspace. Counts
        reflect saved records, not analytics estimates.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {["leads", "clients", "projects", "tasks"].map((resource) => (
          <Col xs={24} sm={12} xl={6} key={resource}>
            <Count resource={resource} />
          </Col>
        ))}
      </Row>
      <Card title="Recent enquiries" style={{ marginTop: 24 }}>
        {query.isError ? (
          <Alert type="error" message="Enquiries could not be loaded" />
        ) : (
          <Table
            rowKey="id"
            loading={query.isLoading}
            dataSource={result.data}
            pagination={false}
            scroll={{ x: 500 }}
            columns={[
              { title: "Business", dataIndex: "business" },
              { title: "Contact", dataIndex: "name" },
              {
                title: "Status",
                dataIndex: "status",
                render: (value) => <Tag>{String(value)}</Tag>,
              },
              {
                title: "Action",
                render: () => <Link href="/admin/leads">Open leads</Link>,
              },
            ]}
          />
        )}
      </Card>
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
