"use client";
import type { DataProvider, BaseRecord } from "@refinedev/core";
export async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const body = await response.json();
  if (!response.ok)
    throw {
      message: body.error || "The request could not be completed.",
      statusCode: response.status,
    };
  return body;
}
export const dataProvider: DataProvider = {
  getApiUrl: () => "/api/crm",
  getList: async ({ resource, pagination, filters }) => {
    const search = filters?.find((f) => "field" in f && f.field === "search");
    return request(
      `/api/crm/${resource}?page=${pagination?.currentPage || 1}&size=${pagination?.pageSize || 20}&search=${encodeURIComponent(search && "value" in search ? String(search.value) : "")}`,
    );
  },
  getOne: async ({ resource, id }) => request(`/api/crm/${resource}/${id}`),
  create: async ({ resource, variables }) =>
    request(`/api/crm/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
    }),
  update: async ({ resource, id, variables }) =>
    request(`/api/crm/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
    }),
  deleteOne: async ({ resource, id, variables }) =>
    request(`/api/crm/${resource}/${id}`, {
      method: "DELETE",
      body: JSON.stringify(variables),
    }),
};
export interface AdminRecord extends BaseRecord {
  id: string;
  version: number;
  [key: string]: unknown;
}
export const resources = [
  "leads",
  "clients",
  "projects",
  "tasks",
  "content",
  "settings",
  "notifications",
  "activity",
];
export const label = (value: string) =>
  value.replaceAll("-", " ").replace(/^./, (c) => c.toUpperCase());
