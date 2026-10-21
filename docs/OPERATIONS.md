# Operations

## Database

Run `npm run db:migrate` once per release before starting the new application. Back up first. The seed only creates missing paths/settings and intentionally leaves editor changes intact. SQLite requires persistent storage and one app instance. For multiple app instances use PostgreSQL. Do not share a SQLite file over network storage.

Use managed PostgreSQL backups and point-in-time recovery where available. For SQLite, use the SQLite online backup API or stop writers before copying the database; copying only the `.db` file while WAL writes are active is not a valid backup process. Encrypt backups, restrict access and test a restore into a separate environment. The repository does not include a cloud backup account or retention job.

## Accounts

Set `ADMIN_EMAILS` before provisioning. Run `admin:create` in an operator shell with `ADMIN_EMAIL` and `ADMIN_PASSWORD` supplied securely for that process. Restart the web app after allowlist changes. Removing an address from the allowlist denies workspace access even if a session exists.

There is no public reset-email flow. For an administrator who has lost access, remove their address from the allowlist, provision a replacement approved account using a different controlled email, and review/revoke the old account/session records using a backed-up maintenance procedure. Do not edit password hashes by hand. A hosted identity provider with MFA and managed recovery is recommended before a larger team rollout.

The Better Auth schema stores credential hashes and sessions. Do not expose database access to the public network. Separate application and migration database privileges where the deployment permits it.

## Email queue

Configure a real SMTP provider, authenticated sender, SPF, DKIM and DMARC. The worker uses TLS for non-local providers. Run `npm run notifications:send` every minute using your host's scheduler. Keep it on the same release and database as the app. Avoid writing credentials directly into a crontab; use the host's secret facility.

Each invocation handles up to 25 due notifications. Updates use a version-checked lease, with a 15-minute recovery window. Failures retry with exponential delay, up to five attempts. An exhausted item stays visible. To retry after fixing the cause, use an operator-reviewed database maintenance transaction to return the item to pending with attempts zero and a bumped version; there is deliberately no public email retry endpoint.

Use a process supervisor for the web app and scheduler. Alert on worker nonzero exits and repeated failed/exhausted items. The outbox is at-least-once, not exactly-once: SMTP acceptance and database commit cannot be atomic. A stable message ID helps diagnosis but does not guarantee recipient deduplication. `sent` means provider acceptance, not delivery or open tracking.

Public enquiry intake saves the lead, follow-up task, notification and audit event in one transaction. An email provider failure does not lose the enquiry. It stays visible to the team.

## Monitoring

`GET /api/health` verifies a database query and returns no credentials. Configure availability monitoring and alerts for 5xx responses, disk space, database backup age and worker failures. Never log form bodies, auth cookies, passwords or complete database rows. Proxy access logs and retention are deployment responsibilities.

## Data handling

Define and document a retention schedule before launch. This repository does not silently delete client data on a guessed schedule. An operator must handle correction/export/deletion requests, remove linked records in dependency order, consider backups and maintain any required records. CSV exports contain personal information and are limited to 10,000 records per resource.

No customer identity verification, invoicing, tax calculation, health-record processing, payment-card handling or appointment-calendar integration is included. Enquiries explicitly ask people not to send sensitive information. Expanding those purposes needs a separate privacy and security review.

## Content and release rollback

Content and settings changes go live from the database; they do not require a code deployment. System layouts remain in source control. For a bad content edit, use the saved backup or operator-approved previous value. The audit trail stores field names rather than historical content, so it is not an editor version-history feature.

Release rollback means running the previous known-good image against a schema-compatible database. Do not restore an old database over newly received enquiries without a reconciliation plan.
