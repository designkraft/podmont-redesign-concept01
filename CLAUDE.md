# CLAUDE.md

Persistent project context for Claude Code. Read this first.

## What this is

A **static HTML/CSS/JS prototype** of a redesigned homepage for
[PodMont](https://podmont.com) — a $15 AirPods phone mount sold in 5 colors.
The live site is WordPress/Elementor; this repo is a **reference prototype only**,
not the production site. It is meant to guide implementation, not to be deployed
as-is.

## Stack & constraints

- Three files, no framework, no build step, no package manager:
  - `index.html` — all markup, single page
  - `styles.css` — vanilla CSS, mobile-first, fully responsive
  - `main.js` — vanilla JS interactions, wrapped in an IIFE
- **Do not** introduce React/Vue/Tailwind/bundlers/npm. Keep it dependency-free.
- The only external dependency is Inter loaded from Google Fonts.
- To preview: open `index.html` directly, or `python3 -m http.server` then visit
  the page. There are no tests, linters, or CI.

## Assets & copy

- All product/lifestyle images load from the **live podmont.com CDN**
  (`https://podmont.com/wp-content/uploads/...`). Use real URLs from the live
  site — never lorem ipsum or placeholder images.
- Copy is real, taken from the live site. Reviews are from 7 named customers:
  Sarah, Marcus, Priya, Devon, Jenna, Tom, Aaliyah.
- All shop CTAs link to `https://podmont.com/shop/`.

## Product facts (keep consistent)

- Price: **$15**. Free shipping over $60. Ships from USA. Launch: **July 1, 2026**.
- 5 colors, by name: **Black Berry, Cool Grey, Orange Glow, Red Flag, Pink Pony**.
- Selling points: secure grip, no adhesive residue, pocket-friendly profile.

## Design system

- **Visual direction: Ridge (ridge.com)** — monochrome and high-contrast,
  uppercase condensed type, squared buttons, flat surfaces with crisp borders
  (not soft shadows), a dark premium hero, and the orange accent used sparingly.
- Tokens live in `:root` in `styles.css`. Reuse them; avoid hard-coded values.
  - Primary dark: `--ink: #0b0b0b` (near-black; `--dark: #111` still defined)
  - Accent (sparing — CTAs hover / stars / eyebrows): `--accent: #E8560A`
    (Orange Glow); secondary `--accent-2: #C0201E` (Red Flag)
  - Backgrounds: white / `--bg-soft` for alternating bands; dark sections use `--ink`
  - Squared corners: `--radius: 6px`, buttons `--radius-btn: 3px`
- Typography: headings/labels are UPPERCASE with letter-spacing. Use the
  `.eyebrow` (and `.eyebrow--accent`) kicker label above section titles.
- Buttons: `.btn` + a modifier (`--primary` = solid near-black with orange
  hover, `--ghost` = outlined, `--dark` = white-on-dark for dark sections,
  `--lg`). Uppercase, letter-spaced, squared.
- Section rhythm: dark hero → white trust bar → soft pull quote → white
  features → soft video → white lifestyle → soft reviews → dark final CTA →
  orange email band → dark footer.
- Mobile-first; breakpoints at 900 / 760 / 520px. Generous whitespace —
  this is a premium impulse buy, not a dense catalog page.
- Honor `prefers-reduced-motion` (already wired for the marquee & auto-scroll).

## Page sections (order matters)

1. Announcement marquee → 2. Sticky nav (mobile hamburger) → 3. Hero (color
picker + live countdown) → 4. Trust bar → 5. Pull quote → 6. Features →
7. Video → 8. Lifestyle grid → 9. Reviews carousel → 10. Final CTA →
11. Email capture → 12. Footer.

## Interactions (`main.js`)

- Color swatch click → preloads + swaps hero image, updates color label.
- Live countdown to **July 1, 2026 00:00:00 UTC** (`Date.UTC(2026, 6, 1, …)` —
  month is 0-indexed, so 6 = July). Don't change the timezone basis.
- Sticky-nav shadow on scroll; hamburger toggle; smooth in-page anchor scroll.
- Video: custom brand play overlay reveals native controls on play.
- Reviews carousel: drag-to-scroll + prev/next + slow auto-scroll, pauses on
  hover/focus.
- Email form: client-side validation → inline success message, no backend,
  no page reload.

## Conventions

- BEM-ish class names (`.block__element--modifier`).
- Vanilla JS only, guard DOM lookups (`if (el) …`) since it's one shared script.
- Match existing comment density and formatting when editing.

## Git

- Active branch: `claude/podmont-homepage-redesign-ufx2tt`. Develop here.
- Commit with clear messages; push with `git push -u origin <branch>`.
- Do **not** open a pull request unless explicitly asked.

## Known gaps / open items

- The embedded video URL is actually a **music track**, not product footage —
  swap in a real demo clip when available.
- Footer Help/Company links are best-guess pointers to podmont.com pages;
  replace with exact URLs once known.
