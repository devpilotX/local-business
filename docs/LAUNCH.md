# Launch review

The repository is not ready to represent a verified legal entity until the operator completes this checklist. `check:launch` checks configuration declarations, not their truth.

## Business and policies

- Confirm the legal business name, country/jurisdiction and business contact address.
- Confirm the correct phone number. The earlier live website showed inconsistent visible numbers and telephone links, so no default was copied.
- Confirm ownership of `techcyme@gmail.com`, or replace it with a working address you control. A website cannot create a mailbox by naming one.
- Review all six policy/security pages with the actual operator, hosting/SMTP providers, retention schedule and applicable law. Draft text is not legal advice.
- Agree service scope, cancellation/refund terms, support commitments, domain/account ownership and third-party costs.
- Confirm the site does not claim Google affiliation, guaranteed verification/rankings, nonexistent clients or unverified results.

## Technical deployment

- Choose hosting compatible with Node.js 24 and Next.js Node routes. This is not a static-only export.
- Configure HTTPS and DNS for the intended canonical domain. Set both site/auth URLs consistently before building.
- Choose persistent single-instance SQLite or managed PostgreSQL with trusted TLS and restricted credentials.
- Back up, migrate, create the approved administrator and test login/logout on the actual HTTPS domain.
- Set up SMTP, sender authentication, a one-minute notification schedule and provider failure alerts.
- Test a real enquiry from the deployed site, inspect the saved lead/task and verify the email in a controlled recipient inbox.
- Test backup restore, availability alerts, log redaction and incident access.
- Review administrator access. Add a managed MFA/identity provider if the threat model or team size requires it.
- Review security headers with the actual proxy/host. Style CSP currently allows inline styles because of Ant Design; scripts use per-request nonces.

## Content, usability and search

- Review every public page for business accuracy and the actual services offered.
- Check current Chrome, Firefox and Safari, iOS/Android, keyboard navigation, screen reader basics, 200% zoom and reduced motion.
- Check all contact options and policy links. Do not add a booking, social or messaging link until its destination exists and is owned.
- Confirm there are no eyebrow headings or em dashes in edited website copy.
- Verify titles, descriptions, canonical URLs, sitemap and structured data on the deployed domain.
- Once policies and operations are approved, set `LEGAL_REVIEWED=true`, the required operations confirmations and `LAUNCH_APPROVED=true`, then rebuild and run `check:launch`.
- Submit the sitemap in your verified Google Search Console property. Search visibility and indexing remain search-engine decisions.
- AdSense is not installed. Review current Google publisher policies and content eligibility separately before applying. No automated test can guarantee approval.

## Release approval

- Review the pull request and all GitHub Actions jobs.
- Record the approved commit and image digest.
- Deploy to staging first, complete the above checks and approve production deliberately.
- Keep rollback instructions and operator contacts available outside the website.
