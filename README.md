# Vexel landing page

A static marketing page for Vexel, built with plain HTML, CSS and vanilla JS. It needs no build step.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173

## Files
- `index.html` — the page. Sections run in this order: nav, hero, trust strip, why, story 01–05, demo, how it works, comparison, stories, get Vexel, FAQ, final CTA, footer.
- `assets/styles.css` — the design tokens (`:root`), dark and light themes, components and sections.
- `assets/main.js` — the theme toggle, mobile menu, scroll reveal, demo player, voice tabs, hero tilt, orb drift and chapter highlights.
- `assets/fonts/` — Bricolage Grotesque, subset to Latin as woff2 (taken from the app's DesignSystem).
- `assets/img/` — the app icon, favicons and the Open Graph image.
- `assets/shots/` — real app screenshots as WebP (several sizes each).
- `raw/` — the original full-size PNG captures (not committed).

## Versions
- `v1-mockups` (tag) — first version, with the app drawn in HTML/CSS.
- `iteration-2-real-screenshots` (branch) — real screenshots, gentle motion, no "Made for Mac" section.

To go back to v1: `git switch master`. To keep iteration 2: `git switch master && git merge iteration-2-real-screenshots`.

## Screenshots
Captured from a Debug build running with its own empty data folder (`CFFIXED_USER_HOME`), so real projects were not touched. Demo content: the podcast "Small Wonders — Ep. 12" (pasted script, 3 hosts) and "The Quiet Harbor — Ch. 1" (3 cloud takes). The takes used 15 AI+ credits.

## Before launch (TODOs)
Search the code for `TODO` to find each spot.
- **Domain:** set the canonical, `og:url` and `og:image` URLs (currently `https://vexel.app/`).
- **Pricing:** the page says Vexel is free on Setapp with 6,000 bonus AI credits. Membership and top-ups are not described yet.
- **Testimonials:** replace the 3 placeholder story cards with real, approved quotes and metrics.
- **Rating:** add a rating badge in the hero only once there is a real rating.
- **Demo voice names:** the interactive demo still uses made-up names (Noor, Sam, Jo). The screenshots use real catalog voices.
- **Demo audio:** it's visual only for now. Add real sample clips per voice.
- **Screenshot text:** the podcast in the screenshots says "Built in 1932" and "forty thousand cars a day" — this is invented demo content, not a claim.
- **Logos:** MacPaw, Respeecher and Setapp appear as text. Swap in the official logos once brand usage is approved.
- **Links:** fill in the support email, Help center, Contact, Privacy, Terms and social links.
- **CLI example:** check the `vexel generate` flags and ids in section 05 against the CLI docs.
- **Hosting:** turn on compression and long cache headers. Lighthouse flags these on the local server.
