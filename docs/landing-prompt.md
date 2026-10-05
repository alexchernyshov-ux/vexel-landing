# Prompt: Vexel landing page (content + structure, style from a new reference)

Paste everything below into a new Claude Code chat. Add your style reference where it says **STYLE REFERENCE**.

---

You are a senior front-end engineer and lead visual designer. Build a polished, responsive marketing landing page for **Vexel**, a native Mac app by MacPaw.

The content, structure and facts below are final. **The visual style is NOT set here** — take it entirely from the STYLE REFERENCE section. Do not reuse a previous design.

## STYLE REFERENCE
<!-- Paste your reference here: links, screenshots, or a short description.
     Say what to take from it: colors, fonts, layout feel, motion, card style. -->
[PASTE STYLE REFERENCE HERE]

Use one accent color only, chosen from the reference. Keep it calm and Apple-like: clean type, generous space. No generic purple AI gradients, no emoji icons, no stock photos.

## What Vexel is
- A Mac app that turns any text, document or topic into natural speech — including podcasts with several AI hosts.
- By MacPaw. Hi-Fi cloud voices are powered by **Respeecher**. Available on **Setapp**.
- Taglines: "Any text. Any voice." / "Turn reading into listening."

## Facts (use exactly)
- **Pricing:** free to install through Setapp. Every new user gets **6,000 bonus AI credits** when they first open Vexel. Cloud voices and AI scripts use AI credits; Mac voices never do. Do not mention membership, subscriptions or top-ups.
- **Voices:** 240+ in one picker. **69** Hi-Fi cloud voices in 5 languages: English 25 (American, British, Indian and other accents), German 19, Ukrainian 13, Arabic 6, Brazilian Portuguese 6. Plus **170+** free macOS voices in **38** languages (varies by Mac).
- **Input:** paste, dictate, or drop a file — PDF, EPUB, DOCX, Markdown, RTF, RTFD, TXT (7 formats). Language is detected automatically; words highlight as they're read.
- **Podcasts:** "Make with AI" writes a script from an article or topic in a style you describe, or paste your own `Name: line` script. Up to 20 speakers, 500 lines. Edit, reorder, reassign lines. Color timeline shows who speaks. Exports one audio file.
- **Tuning:** Stable / Natural / Expressive delivery, simple sliders, Advanced panel, seed for repeatable takes, trim editor, every take saved per project.
- **Agents:** optional local automation (off by default, this Mac only, private token). `vexel` CLI and `vexel-mcp` server. MCP tools: `list_voices`, `list_projects`, `create_project`, `generate_audio`. Single-voice batch generation only.
- **App UI:** 8 languages (EN, DE, ES, FR, PT, UK, JA, AR) with full right-to-left Arabic.
- **Privacy:** audio stays on your Mac until export; no separate Vexel account (Setapp account only); anonymous analytics, off with one switch.
- **Requirements:** macOS 15 Sequoia or later, Apple Silicon (M1+). Internet for Hi-Fi voices and AI scripts. Exports WAV. v1.5.0, 27 MB.
- **Shortcuts:** ⌘↩ Generate · ⌘N New project · ⌘⌥⇧V Paste clean text.

## Never say
- That Vexel is a voice changer or clones voices.
- Any export format except WAV.
- "Everything works offline" — only Mac voices do.
- That Mac voices sound as good as cloud voices.
- Made-up ratings, user counts, testimonials or competitor names.

## Links
- Every "Try free with Setapp" button → `https://account.setapp.com/get-free/apps/vexel`
- "Its Setapp page" / footer Setapp → `https://setapp.com/apps/vexel`
- MacPaw → `https://macpaw.com`

## Page sections (in this order, copy is final)

1. **Nav** — Vexel logo (scrolls to top), links: Features, Podcasts, Voices, Automation, FAQ. Button "Try free with Setapp". Full-screen menu on mobile.

2. **Hero**
   - Badge: "New — Podcasts with several AI hosts — See how" (links to Podcasts).
   - H1: "Any text. Any voice." (accent on "voice.")
   - Sub: "Vexel turns articles, documents and ideas into natural speech — or a full podcast with several hosts. A calm, native workspace, right on your Mac."
   - Buttons: "Try free with Setapp", "Hear the voices" (→ demo).
   - Trust line: macOS 15+ · Apple Silicon native · Free · 6,000 bonus AI credits.
   - Visual: app screenshot of the podcast project, with 4 callouts pointing at it: "Voiceovers & podcasts — All in one sidebar", "Cast, auto-assigned — A voice for every host", "Stable · Natural · Expressive — Pick the delivery, fine-tune in Advanced", "One episode, many voices — The color timeline shows who speaks".
   - Background motion: the Vexel icon's pulsing rings behind the screenshot (calm, slow).

3. **Trust strip** — "By [MacPaw logo] · Voices powered by [Respeecher logo] · Available on [Setapp logo]".

4. **Why Vexel** — H2 "A calmer way to turn words into sound." Three cards:
   - Sounds human — Hi-Fi cloud voices with real emotion, tone and character. Pick Stable, Natural or Expressive — or fine-tune every take. *(foot: English, Ukrainian, German, Portuguese, Arabic)*
   - Private by choice — No extra sign-up — your Setapp account covers it. The audio you make stays on your Mac until you export it. Need to go fully offline? Use the voices built into macOS. *(foot: Anonymous analytics · off with one switch)*
   - Made for Mac — A native app, not a browser tab. Keyboard-first, glassy and quiet, with the interface in eight languages — including full right-to-left Arabic. *(foot: ⌘↩ generates, from anywhere)*

5. **Feature story 01–05** — H2 "From a blank page to a finished episode, in five moves." Alternating text / screenshot rows, big outlined numbers that draw in on scroll.
   - **01 Podcasts — "A whole show from one topic."** Give Vexel an article or just an idea. Make with AI writes a natural conversation between several hosts, casts a voice for each, and lets you edit every line before you hit play. Bullets: Describe the style — "curious newcomer and expert", "light and funny" · Click to edit, drag to reorder, reassign any line to another host · A color timeline shows who speaks when; export one audio file. Note: Up to 20 speakers and 500 lines per episode · AI scripts use AI credits. Visual: "Make a podcast" + "Import script" screenshots, pills "Make with AI" / "…or paste your own script".
   - **02 Voices — "Two kinds of voices. One list."** 69 Hi-Fi cloud voices give you the most natural sound, in five languages and many accents. The voices already on your Mac are free and work offline. Search, filter by language, and preview any voice with one click. Bullets: Hi-Fi badge marks the most natural voices · Hear a sample line in the voice's own language · Save a voice you've tuned as your own preset. Note: Offline? Switch to Mac voices — no internet needed. Visual: voice picker with language counts, pill "69 cloud voices · 5 languages".
   - **03 Add text — "Paste it, say it, or drop the file."** Bring a chapter, a report or an email. Vexel opens seven document formats, notices the language on its own, and highlights each word as it's read. Bullets: Reads seven formats — drop any of them in *(show 7 small file icons with the extension inside)* · Dictate straight into the input · A gentle hint flags hashtags and symbols that would sound odd. Note: ⌘⌥⇧V pastes clean text, without formatting. Visual: start screen with a .docx attached.
   - **04 Tune, trim, compare — "Get the take you hear in your head."** Start with Stable, Natural or Expressive. Nudge simple sliders, or open Advanced for full control. Trim the edges, then compare takes — every one is saved in the project. Bullets: Plain-language sliders, with Advanced for power users · Set a seed to get the same take again · Trim is baked into the exported file. Note: ⌘↩ makes a new take — the old one stays in history. Visual: takes + voice settings + trim editor.
   - **05 AI agents & automation — "Let your agent do the reading."** Turn on automation and Claude — or any agent that speaks MCP — can list voices, create projects and batch-generate audio from your scripts and files. There's a command-line tool too. Bullets: Off by default; reachable only from your own Mac · Protected by a private token · Agents never see your keys or account. MCP tool chips. Visual: terminal with `vexel generate --project morning-briefing --voice noor --text-file lines.txt --out ./audio` → "12 lines queued / Done · 12 files", and `vexel health` → "Vexel is running · automation on".

6. **Respeecher** — eyebrow "Voices powered by" + Respeecher logo. H2 "Hollywood-grade voices, on your Mac." Sub: Vexel's Hi-Fi cloud voices come from Respeecher — the voice team behind major film, TV and game projects. Fact tiles: Emmy recognized · Webby & Clio awards · SOC certified security. Interactive project tabs (fixed height, no layout jump): The Mandalorian (Lucasfilm · Disney+ — Recreated the voice of young Luke Skywalker) · Cyberpunk 2077: Phantom Liberty (CD PROJEKT RED — Voice work for the game's expansion) · Endurance (National Geographic — Recreated a historical voice for the documentary) · The Brutalist (Feature film — Polished Hungarian-language pronunciation). Pills: Built by sound professionals · Consent for every voice · Natural timing, tone & emotion. Use Respeecher's purple as a secondary color inside this block only.

7. **Listen and compare (demo)** — H2 "Listen and compare." Sub: Real clips from Vexel's voice library. Tap a voice to hear it — then pick the one that fits your story. Language tabs: English, Українська, Deutsch, العربية. Voice cards (name, gender · accent, style tag, HI-FI badge, duration, play button, waveform that fills while playing; one clip at a time). Note: 69 cloud voices · 5 languages · 170+ Mac voices. Use pre-recorded clips only — no live text-to-speech.

8. **How it works** — H2 "Three steps, right inside Setapp." Sub: Vexel is free on Setapp and starts you off with 6,000 bonus AI credits. No separate Vexel account. Steps: 1 Install from Setapp — Open Setapp, find Vexel and click Install. It's free — no membership needed to start. · 2 Add text, pick a voice — Paste, dictate or drop a document — or give it a topic. Choose from 240+ voices. · 3 Listen and export — Preview, trim and compare takes, then export a WAV. Cloud voices use AI credits — the first 6,000 are on us. Tags: Free on Setapp · 6,000 bonus AI credits · Free Mac voices, unlimited · Updates arrive automatically. Button: Try free with Setapp.

9. **Comparison** — eyebrow "The usual way vs Vexel". H2 "Less tab-juggling. More listening." Sub: Most text-to-speech lives in a browser tab behind a sign-up. Vexel lives on your Mac — with 240+ voices to choose from. Stats (count up): 240+ voices in one picker · 69 Hi-Fi cloud voices in 5 languages · 170+ free voices built into macOS · 38 languages with Mac voices. Table (Typical web tool vs Vexel): Voices to choose from — Varies by plan / 240+ in one list · Sign-ups needed — A new account per tool / Your Setapp one · Work offline — No / With Mac voices · Open PDF, EPUB, DOCX — Often limited / 7 formats · Keep every take — Varies / Per project · Podcast with several hosts — Rare / Built in · Access for AI agents — Cloud API keys / Local CLI + MCP.

10. **Get Vexel** — H2 "Free on Setapp." Requirements line under it. Card: Vexel icon (with pulse) "by MacPaw · on Setapp", "Free to install, with 6,000 AI credits on us." Bullets: Mac voices are free — use them as much as you like, offline · 6,000 bonus AI credits for Hi-Fi voices and AI scripts — yours when you open Vexel · Your balance is always visible in the app. Button + note "Free to install. Runs through Setapp. 6,000 AI credits included." Side card "Runs on Setapp AI credits" — They power the servers behind Hi-Fi voices and AI scripts — so results come fast and sound great. Tiles: One balance (for every Setapp app) · Mac voices (never use credits) · Always visible (in Vexel's sidebar) · 6,000 free (to get you started).

11. **Free trial** — H2 "The **free trial** goes through Setapp" (accent on "free trial"). Sub: Vexel runs through Setapp, MacPaw's home for Mac apps. It's free to get, and it takes three steps. Cards with screenshots: 1 Create a Setapp account — That's where the Try free button takes you. It takes about a minute. · 2 Install Setapp on your Mac — Setapp is the place you get handpicked Mac, iOS and web apps, including MacPaw's products. · 3 Open Vexel — It's in your Setapp library — and your 6,000 bonus AI credits are waiting. Footer line: Already on Setapp? Search for Vexel in the Setapp app, or open its Setapp page. More about Setapp.

12. **FAQ** — H2 "Good questions." Items: Is Vexel free? (Yes — free through Setapp with 6,000 bonus AI credits; Mac voices never use credits) · Is Vexel a voice changer? (No, text-to-speech) · Can it clone my voice? (Not today) · Does it work offline? (Yes with Mac voices; cloud voices and Make with AI need internet) · What can I import? (7 formats, paste or dictate) · What can I export? (WAV) · Which languages are supported? (cloud 5 + Mac voices; app UI in 8) · Which account do I need? What happens to my text? (Setapp account only; audio stays on your Mac; cloud text sent securely; anonymous analytics, can be turned off) · Which Macs are supported? (Apple Silicon, macOS 15+).

13. **Final CTA** — H2 "What are we making?" Sub (one line on desktop): Turn reading into listening — a chapter, a briefing, a whole show. Buttons: Try free with Setapp, Hear the voices. Tags (no background): 240+ voices · 5 cloud languages · Podcasts with several hosts · Free Mac voices · Audio stays on your Mac. App start-screen screenshot in a glowing frame, fading out at the bottom.

14. **Footer** — Vexel logo + "A calmer voice for everyday writing. Built by people who like quiet rooms." Columns on the right, 48px apart: Product (Features, Podcasts, Automation, FAQ), Company (MacPaw, Setapp, Help center, Contact). Bottom: "© 2026 MacPaw Way Ltd. Voices powered by Respeecher." + Privacy Policy, Terms of Service.

## Assets
Reuse files from `~/Git/vexel-landing/assets/` if this chat can reach that folder (or copy them in):
- `shots/` — real app screenshots (WebP, several sizes) for hero, 01–04, Setapp steps, final CTA.
- `audio/` — 19 voice clips (.m4a) for the demo.
- `img/logos/` — MacPaw, Respeecher, Setapp (white SVG). `img/` — app icon, favicons.
- `fonts/` — only if the new style keeps Bricolage Grotesque.

## Tech and quality
- Plain HTML/CSS/vanilla JS (or Astro + Tailwind if you argue it's leaner). No heavy UI kits.
- Design tokens as CSS variables; fluid sizes with `clamp()`.
- Responsive: 360 / 430 / 768 / 1024 / 1280 / 1536+. No sideways scroll from 320 to 2560. Tap targets ≥ 44px.
- Motion: gentle only (fade/lift on scroll, screenshots fade in once loaded); everything off with `prefers-reduced-motion`. Keep animations GPU-friendly (transform/opacity, no animated blur or shadows).
- Accessibility: WCAG AA, visible focus, keyboard-operable tabs/menu/FAQ, skip link.
- SEO: title, description, Open Graph, favicons, `SoftwareApplication` JSON-LD (no fake ratings).
- Test in **Chromium and WebKit (Safari)** — callout labels must size to their text, outlined numbers must render cleanly.
- Lighthouse mobile ≥ 95.

## How to work
1. First send me: the style direction you took from the reference (palette, fonts, one-line mood) and the component list. Wait for my OK.
2. Build, then screenshot every breakpoint in Chromium and WebKit, fix issues, run Lighthouse.
3. Finish with a short summary and a list of anything you couldn't verify.
