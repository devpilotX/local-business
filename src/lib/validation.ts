import { z } from "zod";
export const serviceIds = [
  "google-business-profile",
  "websites",
  "automation",
  "local-seo",
  "booking",
  "social-media",
  "messaging",
  "reporting",
] as const;
const text = (max = 200) => z.string().trim().max(max);
const email = z
  .email()
  .max(254)
  .transform((v) => v.toLowerCase());
const commonPerson = {
  name: text(100).min(2),
  email,
  phone: text(32).optional().default(""),
  business: text(160).min(2),
};
export const inquirySchema = z
  .object({
    ...commonPerson,
    service: z.enum(serviceIds),
    message: text(3000).min(20),
    consent: z.literal(true),
    website: text(200).optional().default(""),
    requestId: z.uuid(),
  })
  .strict();
export const schemas = {
  leads: z
    .object({
      ...commonPerson,
      service: z.enum(serviceIds),
      message: text(3000).default(""),
      status: z
        .enum(["new", "contacted", "qualified", "won", "lost"])
        .default("new"),
      notes: text(5000).default(""),
    })
    .strict(),
  clients: z
    .object({
      ...commonPerson,
      status: z.enum(["active", "paused", "archived"]).default("active"),
      notes: text(5000).default(""),
    })
    .strict(),
  projects: z
    .object({
      name: text(160).min(2),
      clientId: z.uuid(),
      service: z.enum(serviceIds),
      status: z
        .enum(["planned", "in-progress", "review", "completed", "paused"])
        .default("planned"),
      dueDate: z.iso.date().or(z.literal("")).default(""),
      notes: text(5000).default(""),
    })
    .strict(),
  tasks: z
    .object({
      name: text(160).min(2),
      projectId: z.uuid().or(z.literal("")).default(""),
      clientId: z.uuid().or(z.literal("")).default(""),
      status: z.enum(["open", "in-progress", "done"]).default("open"),
      dueDate: z.iso.date().or(z.literal("")).default(""),
      notes: text(5000).default(""),
    })
    .strict(),
  content: z
    .object({
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/)
        .max(160)
        .refine(
          (v) =>
            !["contact", "services", "guides", "admin", "api"].includes(v) &&
            !v.startsWith("admin/") &&
            !v.startsWith("api/"),
          "This path is reserved by the application.",
        ),
      title: text(100).min(5),
      summary: text(180).min(30),
      body: text(60000).min(100),
      published: z.boolean().default(false),
    })
    .strict(),
  settings: z
    .object({
      siteName: text(50).min(2),
      heroTitle: text(100).min(10),
      heroDescription: text(250).min(30),
      contactEmail: email,
      phone: text(32).default(""),
      businessHours: text(100).default(""),
      whatsapp: z
        .string()
        .trim()
        .regex(
          /^(\+?[0-9 ]{10,18})?$/,
          "Enter a full WhatsApp number with country code.",
        )
        .default(""),
    })
    .strict(),
};
export type EditableKind = keyof typeof schemas;
export const editableKinds = Object.keys(schemas) as EditableKind[];
export const allKinds = [...editableKinds, "notifications"];
export function safeCsv(value: unknown) {
  let v = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(v)) v = "'" + v;
  return '"' + v.replaceAll('"', '""') + '"';
}
