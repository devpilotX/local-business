import { betterAuth } from "better-auth";
import { nativeDatabase } from "./database";
import { siteUrl, adminEmails } from "./config";
import { headers } from "next/headers";

export function authOptions() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32)
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
  return {
    appName: "Techcyme",
    database: nativeDatabase(),
    secret,
    baseURL: process.env.BETTER_AUTH_URL || siteUrl,
    trustedOrigins: [siteUrl],
    emailAndPassword: {
      enabled: true,
      disableSignUp: process.env.BOOTSTRAP_ADMIN !== "true",
      minPasswordLength: 14,
    },
    session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 30 },
    rateLimit: {
      enabled: true,
      storage: "database" as const,
      window: 60,
      max: 10,
    },
    advanced: {
      useSecureCookies: (process.env.BETTER_AUTH_URL || siteUrl).startsWith(
        "https://",
      ),
    },
  };
}
const makeAuth = () => betterAuth(authOptions());
let instance: ReturnType<typeof makeAuth> | undefined;
export function auth() {
  return (instance ??= makeAuth());
}
export async function currentAdmin() {
  const session = await auth().api.getSession({ headers: await headers() });
  return session && adminEmails().includes(session.user.email.toLowerCase())
    ? session
    : null;
}
