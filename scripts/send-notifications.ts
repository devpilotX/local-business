import { sendNotifications } from "../src/lib/notifications";
import { closeDatabase } from "../src/lib/database";
try {
  const result = await sendNotifications();
  console.log(JSON.stringify(result));
  if (result.failed) process.exitCode = 1;
} finally {
  await closeDatabase();
}
