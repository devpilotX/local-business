export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const launchApproved = process.env.LAUNCH_APPROVED === "true";
export const business = {
  name: "Techcyme",
  email: process.env.CONTACT_EMAIL || "techcyme@gmail.com",
  legalName: process.env.LEGAL_BUSINESS_NAME || "Techcyme Media",
  address: process.env.LEGAL_BUSINESS_ADDRESS || "",
};
export const adminEmails = () =>
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
