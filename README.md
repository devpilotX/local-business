# Techcyme

A Next.js business website and authenticated Refine workspace for local visibility services, websites and workflow projects.

## Included

- Responsive website with light and dark themes, accessible Radix navigation and FAQ, Motion transitions with reduced-motion support, and locally served imagery.
- Eight service pages, four industry pages, three practical guides, an about page, a pricing approach page and six policy/security pages.
- Real enquiry intake with validation, consent, idempotency, sender/global rate limits, database persistence and a queued team notification.
- Authenticated CRM for leads, clients, projects, tasks, website pages and site settings. Approved lead conversion creates a client and project atomically.
- Task-based project progress, version-checked updates, relationship checks, audit events and CSV exports with formula-injection protection.
- SMTP notification worker with leases, retries and visible provider-acceptance status.
- Page metadata, canonical URLs, social cards, sitemap, robots and an informational llms.txt file.

This is an implementation, not a certification of security, legal compliance, SEO performance or AdSense eligibility. Read [the launch checklist](docs/LAUNCH.md). Indexing is disabled until approval. No ad scripts or analytics trackers are installed.

## Stack

Node.js 24, npm, Next.js App Router, React, TypeScript, Refine, Ant Design, Radix UI, Better Auth, Kysely, SQLite or PostgreSQL, Nodemailer, Motion and Lucide. Exact versions are in `package-lock.json`.

The interface composes maintained open-source primitives rather than creating a new UI, authentication or animation framework. See [third-party notices](docs/THIRD_PARTY.md).

## Local setup

```sh
npm ci
cp .env.example .env.local
```

Generate `BETTER_AUTH_SECRET`, add your approved administrator email to `ADMIN_EMAILS`, then:

```sh
npm run db:migrate
# Supply ADMIN_EMAIL and ADMIN_PASSWORD securely for this command only.
npm run admin:create
npm run dev
```

Open `http://localhost:3000`. The workspace is at `/admin`. Admin passwords must be at least 14 characters. Do not put credentials into a README, issue, committed file or terminal command that will be shared. `admin:create` is an operator-only provisioning command. Public registration remains disabled in the web process.

The example does not invent an administrator password, company address or phone number. `techcyme@gmail.com` is the existing published contact address. Confirm that you control it. No new mailboxes or aliases are created.

The migration seeds missing pages and settings. It does not overwrite saved content. Do not run concurrent schema migrations. Future schema changes require an additive, reviewed migration and a backup.

## Production setup

See [operations](docs/OPERATIONS.md), [security](docs/SECURITY.md) and [launch review](docs/LAUNCH.md).

```sh
npm ci
npm run db:migrate
npm run check
npm run test:e2e
npm run check:launch
npm run start
```

`NEXT_PUBLIC_SITE_URL` is a build-time setting. Rebuild when the canonical domain changes. Production requires HTTPS, a persistent database, separately provisioned administrators, SMTP, a scheduled worker, backups, monitoring and approved policies.

SQLite is supported only for one application instance with persistent local storage. Do not use it on an ephemeral or horizontally scaled host. Use a managed PostgreSQL database for that environment, with the provider's verified TLS configuration. Never disable certificate checks to make a connection work.

`npm run notifications:send` processes a bounded batch. Schedule it every minute with the same database and environment as the web process. An email marked `sent` was accepted by SMTP. That does not prove inbox delivery. Crashes between SMTP acceptance and recording the result can cause a retry. See the delivery limitations in operations.

## Workspace use

- **Leads:** review enquiries and notes. Convert an approved lead to create linked client and project records.
- **Clients:** keep business/contact details and service status. Linked records prevent accidental deletion.
- **Projects:** assign a client, service, stage and due date. Progress comes from linked completed tasks, not an invented estimate.
- **Tasks:** record work, due dates, project/client links and completion.
- **Content:** edit Markdown, summaries, page titles and publication state. New valid published paths become available without a code deployment. Reserved application routes cannot be used.
- **Settings:** edit the brand label, homepage text, public contact email, phone and hours. Verify any phone or email before publishing it.
- **Notifications:** inspect queued, processing, accepted, failed or exhausted notification attempts. Provider logs remain the source for delivery diagnosis.
- **Activity:** inspect actor, action, record reference and changed field names. Full personal values and passwords are not copied into the audit trail.

The current permissions model is a single allowlisted administrator role. It is not a multi-tenant customer portal. There is no billing, file-upload, appointment-calendar engine, social publishing or n8n execution engine. Those integrations need their own scoped configuration and credentials. The public service descriptions do not imply those third-party systems are already connected.

## Verification

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
# Installs the browser for a new workstation or CI runner:
npx playwright install --with-deps chromium
npm run test:e2e
npm audit --audit-level=moderate
```

For an existing system Chromium, set `CHROMIUM_PATH` to its executable. The browser suite uses a separate `.data/e2e.db`, generates ephemeral credentials and must not target a production database. The unit suite uses `.data/unit-tests.db`, or the isolated PostgreSQL database supplied by CI. Never run destructive test suites against live data.

GitHub Actions checks formatting, lint, types, unit/integration tests, dependency audit, a production build and browser/accessibility tests. A separate isolated PostgreSQL job checks the storage operations. Test reports are retained as workflow artifacts on failure.

## Important boundaries

- Policy pages are drafts pending operator/legal review. Setting an environment flag is not legal approval.
- There are no fabricated clients, ratings, results or traffic claims. Photos are illustrative.
- Search visibility depends on content, relevance, authority and search engines. No ranking, traffic or AdSense approval guarantee is made.
- Publishing code does not deploy the website, create mailboxes, configure DNS, connect payment services or make an existing domain change.
- CI is not a penetration test, exhaustive accessibility certification or a replacement for a real-browser/manual launch review.

## Repository workflow

Use an implementation branch and a pull request. Review the changes, wait for the checks and then merge deliberately. Deployment is not wired to a hosting account because no hosting connection or deployment credentials have been supplied. Avoid enabling automatic deployment until the production environment and launch review are complete.
