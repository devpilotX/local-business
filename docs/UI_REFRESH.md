# Techcyme interface notes

## Design system

- Type: Geist and Geist Mono, self-hosted through the `geist` package (no external font requests, compatible with the CSP in `src/proxy.ts`).
- Colour: warm neutral paper, near-black ink and one green accent (`--accent`). Gold is reserved for pending states. Tokens live at the top of `src/app/globals.css`, with a matching dark theme for both the toggle and the system preference.
- Components: Radix navigation menu, dialog and accordion; Ant Design and Refine in the CRM; Lucide icons. The button follows the shadcn/ui Slot and CVA pattern.

## Motion

- Section reveals use CSS scroll timelines (`.reveal`). Content is always rendered visible, so nothing depends on JavaScript or hydration, and reveals animate position only so text keeps full contrast.
- Service illustrations live in `src/components/site/service-art.tsx`. Each one shows the outcome of a service: a Maps listing, a page building itself, a workflow beam, a search result, an appointment request, a social profile, a message thread and a bar chart. Animations pause off screen and are disabled under reduced motion, where the final frame is shown.
- The homepage figure is drawn with the vendored Anatomy kit in `src/components/iso/` (MIT).

## Content rules

- No fabricated clients, reviews, ratings, results or traffic claims. Photography and chart data are labelled illustrative or sample.
- No em or en dashes in public copy. The e2e suite checks every public page for the em dash.

## Before launch

Follow `docs/LAUNCH.md`, `docs/OPERATIONS.md` and `docs/SECURITY.md`. In particular: confirm the operator identity and contact details, review the draft policies, provision production administrators and SMTP, schedule the notification worker, and test a backup restore. Review the site on real iOS and Android devices, at 200% zoom and with a screen reader.
