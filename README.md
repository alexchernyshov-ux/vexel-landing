# Vexel landing page

A static marketing page for Vexel, built with plain HTML, CSS and vanilla JS. It needs no build step.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173

## Files
- `index.html` — the page. Sections run in this order: nav, hero, trust strip, why, story 01–05, demo, how it works, comparison, stories, get Vexel, made for Mac, FAQ, final CTA, footer.
- `assets/styles.css` — the design tokens (`:root`), dark and light themes, components and sections.
- `assets/main.js` — the theme toggle, mobile menu, scroll reveal, demo player, voice tabs and EN/AR preview.
- `assets/fonts/` — Bricolage Grotesque, subset to Latin as woff2 (taken from the app's DesignSystem).
- `assets/img/` — the app icon, favicons and the Open Graph image.

## Before launch (TODOs)
Search the code for `TODO` to find each spot.
- **Domain:** set the canonical, `og:url` and `og:image` URLs (currently `https://vexel.app/`).
- **Price:** add it to the Get Vexel card.
- **Testimonials:** replace the 3 placeholder story cards with real, approved quotes and metrics.
- **Rating:** add a rating badge in the hero only once there is a real rating.
- **Voice names:** the demo and mockup use made-up names (Noor, Sam, Jo, Arlo). Swap in names from the real catalog.
- **Demo audio:** it's visual only for now. Add real sample clips per voice.
- **Screenshots:** the app windows are HTML mockups. Replace them with real screenshots if wanted.
- **Logos:** MacPaw, Respeecher and Setapp appear as text. Swap in the official logos once brand usage is approved.
- **Links:** fill in the support email, Help center, Contact, Privacy, Terms and social links.
- **CLI example:** check the `vexel generate` flags and ids in section 05 against the CLI docs.
- **Hosting:** turn on compression and long cache headers. Lighthouse flags these on the local server.
