export {};
// Run as a maintenance command, never in a public request handler.
process.env.BOOTSTRAP_ADMIN = "true";
const { auth } = await import("../src/lib/auth");
const { adminEmails } = await import("../src/lib/config");
const { closeDatabase } = await import("../src/lib/database");
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
try {
  if (
    !email ||
    !adminEmails().includes(email.toLowerCase()) ||
    !password ||
    password.length < 14
  )
    throw new Error(
      "Set ADMIN_EMAIL to an allowed address and ADMIN_PASSWORD to a unique password of at least 14 characters.",
    );
  await auth().api.signUpEmail({
    body: { name: "Website administrator", email, password },
  });
  console.log(
    "Administrator created. Remove ADMIN_PASSWORD from the environment after provisioning.",
  );
} catch (error) {
  // Do not include password values or database details in provisioning output.
  console.error(
    error instanceof Error ? error.message : "Administrator creation failed.",
  );
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
