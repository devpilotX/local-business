export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const launchApproved = process.env.LAUNCH_APPROVED === "true";
export const business = {
  name: "Techcyme",
  email: process.env.CONTACT_EMAIL || "connect@techcyme.com",
  legalName: process.env.LEGAL_BUSINESS_NAME || "Techcyme Media",
  address: process.env.LEGAL_BUSINESS_ADDRESS || "",
};
export const adminEmails = () =>
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);

// Role mailboxes shown on the website. Each can be overridden per environment.
export const mailboxes = {
  connect: process.env.EMAIL_CONNECT || "connect@techcyme.com",
  contact: process.env.EMAIL_CONTACT || "contact@techcyme.com",
  support: process.env.EMAIL_SUPPORT || "support@techcyme.com",
  delivery: process.env.EMAIL_DELIVERY || "delivery@techcyme.com",
  team: process.env.EMAIL_TEAM || "team@techcyme.com",
};
