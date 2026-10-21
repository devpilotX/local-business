"use client";
import { useState } from "react";
import { useList, useOne } from "@refinedev/core";
import { List } from "@refinedev/antd";
import {
  Alert,
  App,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { label, request, type AdminRecord } from "@/lib/admin-client";
import { serviceIds } from "@/lib/validation";
type Field = {
  name: string;
  type?:
    "textarea" | "email" | "select" | "boolean" | "date" | "client" | "project";
  options?: readonly string[];
  required?: boolean;
};
const person: Field[] = [
  { name: "name", required: true },
  { name: "business", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone" },
];
const service: Field = {
  name: "service",
  type: "select",
  options: serviceIds,
  required: true,
};
const notes: Field = { name: "notes", type: "textarea" };
const fields: Record<string, Field[]> = {
  leads: [
    ...person,
    service,
    {
      name: "status",
      type: "select",
      options: ["new", "contacted", "qualified", "won", "lost"],
      required: true,
    },
    { name: "message", type: "textarea" },
    notes,
  ],
  clients: [
    ...person,
    {
      name: "status",
      type: "select",
      options: ["active", "paused", "archived"],
      required: true,
    },
    notes,
  ],
  projects: [
    { name: "name", required: true },
    { name: "clientId", type: "client", required: true },
    service,
    {
      name: "status",
      type: "select",
      options: ["planned", "in-progress", "review", "completed", "paused"],
      required: true,
    },
    { name: "dueDate", type: "date" },
    notes,
  ],
  tasks: [
    { name: "name", required: true },
    { name: "clientId", type: "client" },
    { name: "projectId", type: "project" },
    {
      name: "status",
      type: "select",
      options: ["open", "in-progress", "done"],
      required: true,
    },
    { name: "dueDate", type: "date" },
    notes,
  ],
  content: [
    { name: "slug", required: true },
    { name: "title", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "published", type: "boolean" },
  ],
  settings: [
    { name: "siteName", required: true },
    { name: "heroTitle", required: true },
    { name: "heroDescription", type: "textarea", required: true },
    { name: "contactEmail", type: "email", required: true },
    { name: "phone" },
    { name: "businessHours" },
  ],
};
const friendly = (name: string) =>
  label(name.replace(/([A-Z])/g, " $1").replace(" Id", ""));
function RelationSelect({
  resource,
  value,
  onChange,
}: {
  resource: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [search, setSearch] = useState("");
  const { result, query } = useList<AdminRecord>({
    resource,
    pagination: { pageSize: 50 },
    filters: [{ field: "search", operator: "contains", value: search }],
  });
  const selected = useOne<AdminRecord>({
    resource,
    id: value,
    queryOptions: { enabled: !!value },
  });
  const rows = [...result.data];
  if (selected.result && !rows.some((r) => r.id === selected.result?.id))
    rows.unshift(selected.result);
  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      onSearch={setSearch}
      value={value || undefined}
      onChange={(v) => onChange?.(v || "")}
      loading={query.isLoading}
      options={rows.map((r) => ({
        value: r.id,
        label: String(r.business || r.name),
      }))}
      placeholder={`Search ${resource}`}
      notFoundContent={
        query.isError ? "Could not load records" : "No matching records"
      }
    />
  );
}
export function ResourceScreen({ resource }: { resource: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminRecord | null | undefined>(
    undefined,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { query, result } = useList<AdminRecord>({
    resource,
    pagination: { currentPage: page, pageSize: 20 },
    filters: [{ field: "search", operator: "contains", value: search }],
  });
  const editable = !!fields[resource];
  function open(record: AdminRecord | null) {
    setError("");
    setEditing(record);
    form.resetFields();
    form.setFieldsValue(
      record ||
        Object.fromEntries(
          (fields[resource] || []).map((f) => [
            f.name,
            f.type === "boolean" ? false : f.options?.[0] || "",
          ]),
        ),
    );
  }
  async function action(run: () => Promise<unknown>, success: string) {
    setBusy(true);
    setError("");
    try {
      await run();
      message.success(success);
      await query.refetch();
      return true;
    } catch (e) {
      const text =
        e && typeof e === "object" && "message" in e
          ? String(e.message)
          : "The action could not be completed.";
      setError(text);
      message.error(text);
      return false;
    } finally {
      setBusy(false);
    }
  }
  const columns =
    resource === "activity"
      ? [
          { title: "Action", dataIndex: "action" },
          { title: "Resource", dataIndex: "kind" },
          { title: "Actor", dataIndex: "actor" },
          { title: "Record", dataIndex: "record_id" },
          { title: "When", dataIndex: "created_at" },
        ]
      : resource === "notifications"
        ? [
            { title: "Recipient", dataIndex: "recipient" },
            {
              title: "Status",
              dataIndex: "status",
              render: (v: unknown) => <Tag>{String(v)}</Tag>,
            },
            { title: "Attempts", dataIndex: "attempts" },
            { title: "Last error", dataIndex: "error" },
            { title: "Updated", dataIndex: "updatedAt" },
          ]
        : [
            {
              title:
                resource === "content"
                  ? "Title"
                  : resource === "settings"
                    ? "Site"
                    : "Name",
              dataIndex:
                resource === "content"
                  ? "title"
                  : resource === "settings"
                    ? "siteName"
                    : "name",
            },
            {
              title:
                resource === "content"
                  ? "Path"
                  : resource === "settings"
                    ? "Contact email"
                    : "Business / service",
              render: (_: unknown, r: AdminRecord) =>
                String(
                  r.slug || r.contactEmail || r.business || r.service || "",
                ),
            },
            {
              title: "Status",
              render: (_: unknown, r: AdminRecord) => (
                <Tag>
                  {resource === "content"
                    ? r.published
                      ? "Published"
                      : "Draft"
                    : String(r.status || "Active")}
                </Tag>
              ),
            },
            {
              title: "Actions",
              render: (_: unknown, r: AdminRecord) => (
                <Space wrap>
                  <Button size="small" onClick={() => open(r)}>
                    Edit
                  </Button>
                  {resource === "leads" &&
                  !["won", "lost"].includes(String(r.status)) ? (
                    <Popconfirm
                      title="Create a client and project?"
                      description="This marks the lead as won and creates linked records."
                      onConfirm={() =>
                        action(
                          () =>
                            request(`/api/crm/leads/${r.id}/convert`, {
                              method: "POST",
                              body: JSON.stringify({ version: r.version }),
                            }),
                          "Client and project created",
                        )
                      }
                    >
                      <Button size="small" disabled={busy}>
                        Convert
                      </Button>
                    </Popconfirm>
                  ) : null}
                  {resource !== "settings" ? (
                    <Popconfirm
                      title="Delete this record?"
                      description="Linked records must be removed first. This cannot be undone."
                      onConfirm={() =>
                        action(
                          () =>
                            request(`/api/crm/${resource}/${r.id}`, {
                              method: "DELETE",
                              body: JSON.stringify({ version: r.version }),
                            }),
                          "Record deleted",
                        )
                      }
                    >
                      <Button danger size="small" disabled={busy}>
                        Delete
                      </Button>
                    </Popconfirm>
                  ) : null}
                </Space>
              ),
            },
          ];
  if (resource === "projects")
    columns.splice(2, 0, {
      title: "Task progress",
      render: (_: unknown, r: AdminRecord) =>
        Number(r.totalTasks) > 0 ? (
          <div style={{ minWidth: 140 }}>
            <Progress
              percent={Math.round(
                (Number(r.completedTasks) / Number(r.totalTasks)) * 100,
              )}
              size="small"
            />
            <span>
              {String(r.completedTasks)} of {String(r.totalTasks)} tasks done
            </span>
          </div>
        ) : (
          <span>No linked tasks</span>
        ),
    });
  return (
    <section id="main" className="admin-content">
      <List
        title={
          <Typography.Title level={1} style={{ margin: 0, fontSize: 28 }}>
            {label(resource)}
          </Typography.Title>
        }
        canCreate={false}
        headerButtons={
          <Space wrap>
            {resource !== "activity" ? (
              <a href={`/api/crm/export?resource=${resource}`} download>
                Export CSV
              </a>
            ) : null}
            {editable && resource !== "settings" ? (
              <Button type="primary" onClick={() => open(null)}>
                Add{" "}
                {resource === "content" ? "page" : resource.replace(/s$/, "")}
              </Button>
            ) : null}
          </Space>
        }
      >
        {resource === "content" ? (
          <Alert
            type="info"
            showIcon
            message="Page content uses Markdown"
            description="Published pages appear on the website immediately. Home, services, contact and guide index layouts are maintained in code. Legal changes require operator review."
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {resource === "notifications" ? (
          <Alert
            type="info"
            message="Pending emails require the scheduled worker. Sent means accepted by the SMTP provider, not confirmed inbox delivery."
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {error && editing === undefined ? (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {resource !== "activity" ? (
          <Input.Search
            aria-label={`Search ${resource}`}
            placeholder={`Search ${resource}`}
            allowClear
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            enterButton
            style={{ maxWidth: 420, marginBottom: 20 }}
          />
        ) : null}
        {query.isError ? (
          <Alert
            type="error"
            message="Records could not be loaded"
            action={<Button onClick={() => query.refetch()}>Try again</Button>}
          />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={result.data}
            loading={query.isLoading}
            scroll={{ x: 850 }}
            pagination={{
              current: page,
              total: result.total,
              pageSize: 20,
              showSizeChanger: false,
              onChange: setPage,
            }}
          />
        )}
        <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
          Exports include at most 10,000 matching resource records. Store
          downloaded personal data securely.
        </Typography.Paragraph>
      </List>
      <Modal
        title={editing ? `Edit ${label(resource)}` : `Add ${label(resource)}`}
        open={editing !== undefined}
        onCancel={() => {
          if (!busy) setEditing(undefined);
        }}
        onOk={() => form.submit()}
        confirmLoading={busy}
        destroyOnHidden
        width={resource === "content" ? 900 : 640}
      >
        {error ? (
          <Alert type="error" message={error} style={{ marginBottom: 16 }} />
        ) : null}
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const ok = await action(
              () =>
                request(
                  `/api/crm/${resource}${editing ? `/${editing.id}` : ""}`,
                  {
                    method: editing ? "PATCH" : "POST",
                    body: JSON.stringify(
                      editing ? { values, version: editing.version } : values,
                    ),
                  },
                ),
              "Changes saved",
            );
            if (ok) setEditing(undefined);
          }}
        >
          {fields[resource]?.map((f) => (
            <Form.Item
              key={f.name}
              name={f.name}
              label={friendly(f.name)}
              valuePropName={f.type === "boolean" ? "checked" : "value"}
              rules={[
                {
                  required: f.required,
                  message: `Enter ${friendly(f.name).toLowerCase()}.`,
                },
                ...(f.type === "email"
                  ? [
                      {
                        type: "email" as const,
                        message: "Enter a valid email address.",
                      },
                    ]
                  : []),
              ]}
            >
              {f.type === "textarea" ? (
                <Input.TextArea
                  rows={f.name === "body" ? 18 : 4}
                  maxLength={
                    f.name === "body"
                      ? 60000
                      : f.name === "summary"
                        ? 180
                        : 5000
                  }
                />
              ) : f.type === "boolean" ? (
                <Switch />
              ) : f.type === "select" ? (
                <Select
                  options={f.options?.map((v) => ({
                    value: v,
                    label: label(v),
                  }))}
                />
              ) : f.type === "client" || f.type === "project" ? (
                <RelationSelect
                  resource={f.type === "client" ? "clients" : "projects"}
                />
              ) : (
                <Input
                  type={
                    f.type === "date"
                      ? "date"
                      : f.type === "email"
                        ? "email"
                        : "text"
                  }
                />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </section>
  );
}
