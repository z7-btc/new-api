# SuperAI rebrand — visual verification

Screenshots were captured in a real Chromium browser (Playwright headless shell) against the
production build (`bun run build`, served statically with `/api` proxied to a local mock backend).

- Viewports: 1440 × 900 and 390 × 844, device pixel ratio 1.
- Pages: home, login (`/login` redirects to `/sign-in`), console home, pricing, about, docs.
- `measurements.json` records, per page: resolved URL, document `scrollWidth` vs `innerWidth`,
  rendered logo size, `<html lang>`, theme class, whether the visible text contains "new api",
  and console errors.
- Console errors: the only entry is the expected `401 Unauthorized` from the anonymous
  session probe (`/api/user/auth/refresh`), which is how the real backend answers a visitor
  without a session.
- No page overflows horizontally: `scrollWidth === innerWidth` on every capture.
- Logo rendered sizes: site header 28 × 28, auth page 36 × 36, console app bar 20 × 20.

`bun run build` output was grepped for `new api` (case-insensitive). The only remaining matches
are provider metadata inside `@lobehub/icons` (`fullTitle: "New API"`, the `NewAPI` icon module).
They are third-party icon-library strings, never rendered as copy; all product UI strings are clean.
