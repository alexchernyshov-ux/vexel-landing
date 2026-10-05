# General prompt: build a marketing landing page for a Mac app

> **What this is:** a reusable prompt for any of our apps. Paste it into a Claude Code chat opened in that app's repo, fill in the **INPUTS** block, and Claude will research the app, plan the page from its real features, take real screenshots and build the site.
>
> **Where it comes from:** the Vexel landing page (`~/Git/vexel-landing`). Its section structure is the default here. The filled-in Vexel version is in `docs/vexel-content-example.md` — use it as a quality bar, not as content.

---

## INPUTS (fill these in)

```
APP NAME:            [e.g. Vexel]
REPO / APP FOLDER:   [path to the app's source, or "this repo"]
BUILT APP (.app):    [path to a Debug build, or "build it yourself"]
DISTRIBUTION:        [e.g. Setapp only / Setapp + direct / App Store]
PRICING MODEL:       [e.g. free on Setapp with 6,000 bonus AI credits / included in Setapp membership]
TRY / GET LINK:      [e.g. https://account.setapp.com/get-free/apps/<app>]
STORE PAGE LINK:     [e.g. https://setapp.com/apps/<app>]
PARTNER / ENGINE:    [e.g. "Voices powered by Respeecher" — or none]
STYLE REFERENCE:     [links / screenshots / words — colors, fonts, layout feel, motion]
OUTPUT FOLDER:       [e.g. ~/Git/<app>-landing — a separate folder, never inside the app repo]
EXTRA NOTES:         [anything else: things to avoid, must-have messages]
```

If an input is missing, decide it from the codebase or use a clearly marked `TODO(copy)`. Ask me only about product intent or anything that costs money or goes public.

---

## Role

You are a senior front-end engineer and lead visual designer. You build calm, Apple-like product pages: clean type, generous space, one accent color, real screenshots, honest copy.

---

## Step 1 — Research the app (read-only)

Before designing anything, learn the product **from the code, not from guesses**:
1. Read README, docs, design/plan docs, release notes, localization strings (`en.lproj`), Info.plist, xcconfig (version, min macOS, architectures), entitlements.
2. List every user-facing feature, grouped by area. For each: what it does, the benefit, and one concrete detail (a shortcut, a limit, a count).
3. Get **real numbers** from the code or the running app (voice counts, formats, languages, limits). Never round up or invent.
4. Check the store page (`STORE PAGE LINK`) for the tagline, version, size and positioning.
5. Write a **"Never say"** list: things the app does not do, features that are hidden, unshipped or behind flags, unverified claims.
6. Show me a short report: one-line pitch, audience, top 5 features, numbers, never-say list, open questions. **Wait for my OK.**

## Step 2 — Plan the page

Use this **default structure** (from the Vexel page). Keep the required blocks; include optional ones only if the app has real content for them. Rename, merge or reorder when the product calls for it — explain why.

| # | Block | Required? | What goes in it |
|---|---|---|---|
| 1 | **Header / nav** | Required | Logo (scrolls to top), 4–5 anchor links, primary CTA. Full-screen menu on mobile. |
| 2 | **Hero** | Required | "New" badge (optional), headline ≤ 8 words, one-sentence sub, primary CTA + secondary CTA, trust line (OS, chip, price), **real app screenshot** with 3–4 callouts pointing at key UI. |
| 3 | **Trust strip** | Required | "By MacPaw · Powered by [partner] · Available on [store]" with real logos. |
| 4 | **Why [App]** | Required | 3 benefit cards (e.g. quality, privacy, native Mac). Each with a small factual footer. |
| 5 | **Feature story 01–0N** | Required | 3–5 numbered chapters, alternating text/screenshot. Each: kicker, headline, paragraph, 3 bullets, one concrete detail (shortcut, limit). Real screenshots per chapter. |
| 6 | **Partner / engine block** | Optional | Only if a partner powers a key feature. Their real credentials, in a framed card using their brand color as an accent. |
| 7 | **Interactive demo** | Optional | Something visitors can try without cost (e.g. pre-recorded clips, before/after). Never a live paid API. |
| 8 | **How it works** | Required | 3 steps from install to result, with mini visuals, tags and a CTA. |
| 9 | **Comparison** | Optional | Real stats row + honest "usual way vs [App]" table. No competitor names. |
| 10 | **Get [App] / pricing** | Required | What it costs, per `PRICING MODEL`. Requirements line. If the app uses credits: a small "how credits work" card. |
| 11 | **Distribution steps** | Required if not a direct download | E.g. "The free trial goes through Setapp": 3 cards (create account → install Setapp → open app) with real screenshots of each step. |
| 12 | **FAQ** | Required | 7–9 real questions: price, what it is/isn't, offline, formats, languages, account & privacy, requirements. |
| 13 | **Final CTA** | Required | Short question-style headline, CTAs, feature tags, app screenshot in a framed glow. |
| 14 | **Footer** | Required | Logo + one-liner, Product and Company link columns, copyright, Privacy, Terms. |

Send me: the section list (with which optional blocks you kept and why), the style direction from `STYLE REFERENCE` (palette, fonts, one-line mood), and the screenshot shot list. **Wait for my OK.**

## Step 3 — Take real screenshots

Use the real app, filled with believable demo content:
1. Run a **separate, isolated copy** of the app so my real data is never touched, e.g.
   `open -n --env CFFIXED_USER_HOME=<scratch folder> <App>.app`
2. Fill it with demo content that shows each feature (projects, documents, settings). Use invented but realistic text, and mark it in the README as demo content, not a claim.
3. Prefer actions that cost nothing. If something spends credits or money, keep it minimal and tell me how much.
4. Capture each window with `screencapture -l <windowID>`, crop to the relevant UI, export WebP at 2–3 sizes. Keep full-size originals out of git.
5. Quit the isolated copy when done.

## Step 4 — Build

- **Tech:** plain HTML/CSS/vanilla JS in `OUTPUT FOLDER` (no build step), unless a framework is clearly leaner. No heavy UI kits.
- **Tokens:** colors, type, spacing, radius, shadow, motion as CSS variables. Fluid sizes with `clamp()`.
- **Style:** only from `STYLE REFERENCE`. One accent color. No generic purple AI gradients, emoji icons or stock photos.
- **Copy:** product-specific, plain and short. Mark anything I must supply with `TODO(copy)` / `TODO(asset)`.
- **Links:** every primary CTA → `TRY / GET LINK`; store page links → `STORE PAGE LINK`. Strip tracking parameters.
- **Motion:** gentle only — fade/lift on scroll, screenshots fade in once loaded and on screen. Use transform/opacity only (no animated blur or shadows); pause off-screen animations. Everything off under `prefers-reduced-motion`.
- **Theme:** one theme unless asked; if both, keep a toggle.
- **Cache-busting:** version CSS/JS links (`styles.css?v=<timestamp>`) on every publish.

## Step 5 — Verify (show evidence)

- Screenshot full page at 360, 768, 1024, 1280, 1536 — in **Chromium and WebKit (Safari)**. Fix overflow, clipping, alignment.
- Known Safari traps: absolutely positioned labels must use `width: max-content`; avoid `text-shadow` + `clip-path` on outlined text; test SVG/text strokes.
- No horizontal scroll from 320 to 2560. Tap targets ≥ 44px.
- Click through every interactive part (menu, tabs, demo, FAQ) with no console errors.
- Lighthouse mobile: Performance ≥ 95, Accessibility / Best Practices / SEO = 100.
- SEO: title, description, Open Graph image, favicons, `SoftwareApplication` JSON-LD (no fake ratings).

## Step 6 — Hand-off

- `git init` in `OUTPUT FOLDER`, commit each round, tag milestones so I can roll back.
- README: how to run locally, file map, versions, demo-content notes, and the full TODO list.
- Short summary: what you built, what's unverified (label it `[UNVERIFIED]`), what I need to provide.
- Publishing anything publicly (GitHub Pages, public repos) is my call — prepare it, then give me the exact commands.

## Rules throughout

- Facts come from the code or the running app. If unsure, say so.
- Never mention features that are hidden, unshipped or behind flags.
- No invented prices, ratings, user counts, testimonials or competitor names.
- Keep replies short and simple; show screenshots of what changed.
