# Techcyme UI refresh and product review

## What changed in this branch

- Introduced a cohesive indigo-to-cyan accent system, softer neutral surfaces, refined spacing and typography, stronger contrast hierarchy, and larger, consistent corner radii.
- Refreshed the authenticated CRM overview using the repository's existing Ant Design, Refine and Lucide stack: clearer saved-record KPI cards, recent enquiry details, service/status context, quick-access shortcuts and explicit email-delivery status guidance.
- Polished the CRM workspace shell with clearer branding, a business-workspace context header, a public-site shortcut and a visible sign-out action.
- Added a sticky translucent site header, layered hero background, subtle dot texture, richer image treatment, card depth and hover states, and a more intentional call-to-action section.
- Updated reveal motion to use a restrained entrance, easing and blur reduction, while respecting the user's reduced-motion preference.
- Improved theme-toggle labels and state, guarded local-storage writes, and added active styling for nested routes.
- Changed homepage service cards to reference stable service IDs instead of assuming the first three services never change.
- Kept the existing Next.js, Radix, Motion, Lucide and CSS architecture; did not replace the app or add a new UI framework.

## Product review: what is already present

The public experience already includes service pages, industry pages, guides, pricing approach, contact intake, accessibility and policy content, and page metadata. The authenticated CRM/workspace supports leads, clients, projects, tasks, content, settings, notifications and activity. This pass improves the public design system and the CRM overview/shell without replacing the existing app architecture. The repository includes validation, tests, CI and operational/security/launch documentation.

## Important next steps before calling this production-ready

1. **Automated checks have passed in GitHub Actions** on the current UI-upgrade revision: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm audit --audit-level=moderate`, `npm run build`, and `npm run test:e2e`, including Playwright checks for public routes, keyboard/mobile navigation, accessibility, reduced motion, and CRM workflows. A local interactive visual review was not available during this pass; still review representative screenshots and real-device behavior before deployment.
2. **Review every route at mobile widths.** Check 320, 375, 768, 1024 and desktop widths, 200% zoom, keyboard-only navigation, a screen reader smoke test and reduced motion.
3. **Validate real business details.** Confirm domain, operator/legal identity, phone, mailbox ownership, service availability, pricing and service commitments. Keep illustrative photography clearly disclosed; do not add invented customer logos, reviews, metrics or claims.
4. **Finish operational launch tasks.** Use `docs/LAUNCH.md`, `docs/OPERATIONS.md` and `docs/SECURITY.md` for production database, SMTP, backup restore, monitoring, policy and deployment checks.
5. **Choose the next customer-value features by demand.** Interview a few target local businesses before adding booking, payment, WhatsApp API, social publishing, analytics or multi-user access. These features need actual provider integrations, permissions, retention rules, error paths and pricing; a decorative UI alone is not sufficient.
6. **Strengthen conversion measurement responsibly.** After privacy review, measure enquiries and completed contact journeys using a consent-aware analytics choice if needed. Avoid installing advertising/analytics scripts before approval.
7. **Set service-card selection explicitly.** The homepage currently highlights profile support, websites and automation. If business priorities change, update the stable IDs deliberately rather than changing card behavior accidentally.

## Design intent

Aim for calm, confident digital services rather than visual noise: one clear primary action, one secondary route, readable body copy, one consistent accent palette, restrained movement, high-quality imagery, and honest explanations of what the service does or depends on.
