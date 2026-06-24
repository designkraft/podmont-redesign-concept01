# podmont-redesign-concept01

A static HTML/CSS/JS prototype of a redesigned [PodMont](https://podmont.com)
homepage — a reference for implementation on the live WordPress/Elementor site.

## Stack
- `index.html` — single-page markup
- `styles.css` — vanilla CSS, mobile-first and fully responsive
- `main.js` — vanilla JS interactions (no framework, no build step)

Open `index.html` in a browser. Images load from the live podmont.com CDN.

## Sections
Announcement marquee · sticky nav (mobile hamburger) · hero with interactive
color picker and live launch countdown · trust bar · pull quote · features ·
video · lifestyle grid · drag/auto-scroll reviews carousel · final CTA ·
email capture · footer.

## Interactions (`main.js`)
- Color swatch → swaps hero image + updates active color label
- Live countdown to July 1, 2026 00:00:00 UTC
- Sticky nav shadow on scroll
- Email form → inline success message, no reload
- Hamburger toggle, smooth in-page scrolling, custom video play overlay

All shop CTAs point to https://podmont.com/shop/.
