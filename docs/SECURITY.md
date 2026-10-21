# Security notes

The public interface accepts project enquiries only. CRM data requires a Better Auth session and an email in the server allowlist. Every CRM route checks this server-side. A protected React layout is not the sole access-control boundary.

State-changing application APIs require a same-origin request and JSON content. Zod schemas reject unknown fields and bound inputs. Request bodies are bounded while streaming. Queries use Kysely bindings. Markdown is rendered without raw HTML. Enquiry throttles and the honeypot reduce basic abuse, but an edge rate limit/WAF and monitoring remain recommended for a public deployment.

Better Auth handles credential hashing, session cookies, sign-in throttling and origin checks. Web registration is disabled. A maintenance-only process temporarily enables account creation for provisioned administrators. Never set `BOOTSTRAP_ADMIN=true` on the deployed web process.

Record changes use optimistic version checks. Transactions protect enquiry intake and lead conversion. Linked records are protected by foreign keys and application-level kind checks. Audit events contain references and changed field names, not full copies of personal data.

Responses set a script nonce CSP, frame protection, MIME protection, restricted browser permissions and a referrer policy. HTTPS deployments use secure auth cookies. Inline styles are permitted for Ant Design. Security headers do not replace patching, correct proxy configuration or XSS testing.

This release has no public uploads, card processing, tracking pixels or analytics cookies. Adding integrations changes the security/privacy scope. SMTP secrets belong in the deployment secret store, never in the browser or Git history.

## Reporting

Report a suspected issue privately to the configured business contact. Do not send passwords, complete customer exports or exploit other people's records. The public security page does not promise an unstaffed response SLA or bug-bounty payment.

## Supported checks

CI covers static checks, package audit, application integrity, authenticated workflows, basic API access controls and automated accessibility rules. It is not a penetration test or a full WCAG conformance audit. Review authorization, dependency advisories, session configuration and backup access again before launch.
