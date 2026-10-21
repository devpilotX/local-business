# Third-party notices and provenance

The application assembles maintained UI, auth, data and animation libraries. Custom integration code connects them to the Techcyme workflow; no new animation engine, authentication system or CRM framework is invented.

- Refine and its Ant Design integration: MIT, https://github.com/refinedev/refine. Used for resource routing, the authenticated workspace layout, data-provider integration and list/query primitives. License copy: `licenses/refine.txt`.
- shadcn/ui patterns: MIT, https://github.com/shadcn-ui/ui. The button uses the Slot/CVA composition pattern. Dependency licenses are also retained by npm.
- shadcn landing page by leoMirandaa: MIT, https://github.com/leoMirandaa/shadcn-landing-page. Hero composition and FAQ structure informed the adapted sections. License copy: `licenses/shadcn-landing-page.txt`.
- Radix Primitives: MIT, https://github.com/radix-ui/primitives. Dialog/focus management, navigation menu and accordion behavior.
- Anatomy by wheresryan22: MIT, https://github.com/wheresryan22/anatomy. The isometric drawing kit in `src/components/iso/` is vendored unchanged apart from import paths and theme tokens; the homepage enquiry figure is drawn with it. License copy: `licenses/anatomy-LICENSE.txt`.
- Geist and Geist Mono: SIL Open Font License, https://github.com/vercel/geist-font. Self-hosted through the `geist` package.
- Ant Design: MIT, https://github.com/ant-design/ant-design. Workspace forms, tables, modal confirmations and progress indicators.
- Animations are CSS only (scroll timelines and keyframes) and are disabled under the reduced-motion preference. No animation library is bundled.
- Lucide: ISC, https://github.com/lucide-icons/lucide. Interface icons and adapted MapPinned favicon geometry. See `licenses/lucide.txt`.
- Better Auth: MIT, https://github.com/better-auth/better-auth. Credential and session handling.
- Next.js: MIT, https://github.com/vercel/next.js. React application framework.

Photography is illustrative and does not imply a customer relationship. Local copies originate from Unsplash under https://unsplash.com/license:

- Cafe: https://images.unsplash.com/photo-1554118811-1e0d58224f24
- Dental room: https://images.unsplash.com/photo-1629909613654-28e377c37b09
- Learning room: https://images.unsplash.com/photo-1524178232363-1fb2b075b655

Images are bundled rather than fetched by a visitor from a third-party host. Encoded source assets are decoded by `scripts/prepare-assets.mjs` during install/build so text-based repository publishing preserves the binary files exactly.

A full dependency inventory and exact versions are in `package-lock.json`. Package license notices remain in their distributions. The Techcyme brand is provisional; trademark and domain clearance are operator responsibilities. No copied commercial template, customer logo or competitor copy is included.
