# naijausedcar.com — Coming Soon / Waitlist Page

## Build Spec for Claude Code

---

## Overview

**What:** A coming soon / waitlist page for naijausedcar.com — a Jiji-style marketplace focused exclusively on Nigerian used cars. Buy, sell, and import — all in one place.

**Who:** Everyday Nigerians buying their first/next car, dealers & car lot owners listing inventory, and diaspora Nigerians buying cars back home.

**Relationship:** naijausedcar.com is a **partner site** of directokunbo.com (a China-to-Nigeria car import service). They are not the same company — they are partners.

**Goal:** Build anticipation, establish credibility, and drive social follows before the full marketplace launches.

---

## Style Direction

Combination of three approaches:

1. **Trust Machine** — Clean, modern, startup-credible. Professional enough for dealers, approachable for first-time buyers.
2. **Marketplace Preview** — Tease what's coming. Show a blurred/faded mockup of the actual marketplace UI so visitors can see this is a real product being built.
3. **Naija Billboard** — High-impact editorial typography that fills the viewport. Massive confident headline. The kind of page that makes you screenshot and share.

Plus a **Trust Shield** layer — three clean value-prop cards that establish authority immediately.

---

## Page Structure

Single page. Minimal or no scroll on desktop (slight scroll on mobile is fine).

### 1. Logo (top center)

- **Text:** "naijausedcar" — NOT "directokunbo"
- **Style:** Same logo structure/styling as the DirecTokunbo logo, but with a green-to-black gradient treatment instead of gold
- **Format:** SVG (recreate from DirecTokunbo's logo pattern — same font/weight, just different text and color)
- **Size:** Small, tasteful. ~36-40px height.

### 2. Hero Headline (centered, massive)

- Huge editorial display type filling the viewport
- Text: **"Nigerian Used Cars. Redefined."** (or similar — this is the billboard moment)
- Below headline, a secondary line in muted text: **"Buy · Sell · Import — All in One Place"**
- This should feel like a Lagos billboard on Third Mainland Bridge — confident, unavoidable

### 3. Subtext (centered, below headline)

- One or two lines, muted color
- Something like: **"The trusted marketplace for clean Nigerian used cars. From private sellers to verified dealers — launching soon."**

### 4. Marketplace Preview Tease (centered)

- A visual mockup of what the marketplace will look like — NOT functional, purely visual
- Show: a search bar, 2-3 car listing cards (with car image placeholders, prices in ₦, location tags, specs), maybe a filter sidebar hint
- Apply a frosted glass / blur / fade overlay on top so it looks like you're peeking through a window at something being built
- Optional: subtle "Coming Soon" or "Launching Soon" text floating over the preview
- This communicates: "this is real, it's being built, it's not vaporware"
- The mockup should use realistic Nigerian car data:
  - 2019 Toyota Camry · ₦8,500,000 · Lagos
  - 2020 Lexus RX 350 · ₦18,200,000 · Abuja
  - 2017 Honda Accord · ₦5,800,000 · Port Harcourt

### 5. Trust Cards (three cards, horizontal row)

Three clean, minimal cards. Each has: icon + title + one-liner.

| Icon | Title | Description |
|------|-------|-------------|
| Shield/checkmark | **Verified Listings** | No scammers. Every listing checked. |
| Price tag/naira | **Market Pricing** | No overpaying. Fair, transparent prices. |
| Map pin/Nigeria | **Nationwide Reach** | Lagos to Abuja. Cars from across Nigeria. |

- Cards should be subtle — dark background, slight border, minimal. Not loud.
- Icons can be simple SVG line icons (Lucide-style)

### 6. Social Links

- Label: **"Follow the journey"** or **"Stay connected"**
- Channels (same as DirecTokunbo):
  - TikTok: https://www.tiktok.com/@directokunbo
  - YouTube: https://youtube.com/@directokunbo
  - X (Twitter): https://x.com/directokunbo
  - Instagram: https://www.instagram.com/directokunbo2025
  - Facebook: https://www.facebook.com/share/1Bi9NWUmxa/
  - Snapchat: https://snapchat.com/t/Gh13hoNs
- **Note:** These are DirecTokunbo's social accounts for now. Update to naijausedcar-specific accounts when available.

### 7. Footer

- **Partner link:** "Partner site of [DirecTokunbo](https://www.directokunbo.com)" — link opens in new tab
- **Contact:** trade@directokunbo.com (or naijausedcar email when available)
- **Copyright:** © 2026 NaijaUsedCar. All rights reserved.
- Keep it minimal — one or two lines max

---

## Visual Language

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#050505` | Page background |
| `--bg-card` | `#111111` | Card backgrounds |
| `--bg-elevated` | `#1a1a1a` | Elevated surfaces |
| `--green` | `#008751` | Primary accent (Nigerian green) |
| `--green-dark` | `#004d2e` | Gradient end / dark green |
| `--green-glow` | `rgba(0, 135, 81, 0.25)` | Glow effects |
| `--text` | `#ffffff` | Primary text |
| `--text-muted` | `#8a8a8a` | Secondary text |
| `--border` | `rgba(255, 255, 255, 0.08)` | Subtle borders |

### Typography

- **Display / Headline:** Bold, heavy display font — Bricolage Grotesque, Outfit 800+, or similar. NOT Inter, NOT Roboto, NOT Arial.
- **Body:** Outfit or similar clean sans-serif at 400-500 weight
- **Headline size:** `clamp(2.8rem, 8vw, 6.5rem)` — should be massive on desktop
- **Letter spacing:** Tight on headlines (-0.02em to -0.03em)

### Atmosphere & Effects

- **Background:** Dark with subtle green glow orbs (radial gradients, blurred, floating)
- **Grain overlay:** Very subtle noise texture over the entire page (opacity ~0.03)
- **Green gradient washes:** Subtle, not overwhelming — background ambience, not decoration
- **Card hover:** Slight translateY + green border glow on hover
- **Entrance animations:** Staggered fade-up on page load for each section element
- **Marketplace preview:** Frosted glass / gaussian blur overlay

### What NOT to do

- No countdown timer (no launch date confirmed)
- No email signup form / waitlist input (social links are the CTA)
- No emojis in the main UI (keep it premium)
- No gold/yellow (that's DirecTokunbo's color — naijausedcar is green)
- No generic AI aesthetics — no purple gradients, no overused fonts

---

## Technical Setup

### Stack

- Static HTML/CSS/JS (single file or minimal files)
- Vite for build tooling (same setup as DirecTokunbo)
- No framework needed — this is a single page

### File Structure

```
naijausedcar/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js (minimal — animations, cursor effects)
├── assets/
│   └── images/
│       └── logo.svg (naijausedcar logo — green gradient)
├── public/
│   └── CNAME (www.naijausedcar.com)
├── package.json
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml
```

### Deployment

- GitHub Pages (same workflow as DirecTokunbo)
- CNAME: `www.naijausedcar.com`
- Vite build output to `dist/`

### Logo Creation

- **Critical:** The logo text is **"naijausedcar"** — same font, weight, and styling as the DirecTokunbo logo
- **Color:** Green-to-black gradient instead of DirecTokunbo's gold
- **Format:** SVG so it scales cleanly
- **Reference:** Check the DirecTokunbo logo at `assets/images/logo.png` in the DirecTokunbo repo for the exact font and style to match. Recreate with "naijausedcar" text and green gradient.

---

## Content Reference (from physical banner)

The physical banner at the car lot reads:

- **naijausedcar.com** (top)
- **Buy · Sell · Import — All in One Place**
- **Trusted Auto Trading Platform**
- **Nigerian Used Cars Marketplace**
- Value props:
  - ✓ Clean Nigerian Used Cars
  - ✓ Private Sellers & Dealers
  - ✓ Budget & Premium Options
  - ✓ Nationwide Reach
- Also mentions: Foreign Used Cars, Tokunbo Cars
- Partner branding: DirecTokunbo logo visible alongside

Use this messaging as the source of truth for copy on the coming soon page.

---

## Summary Checklist

- [ ] SVG logo: "naijausedcar" text, green-to-black gradient, matching DirecTokunbo's logo style
- [ ] Dark theme with green accent (not gold)
- [ ] Massive billboard headline: "Nigerian Used Cars. Redefined."
- [ ] Subline: "Buy · Sell · Import — All in One Place"
- [ ] Marketplace preview mockup with frosted overlay
- [ ] Three trust cards: Verified Listings, Market Pricing, Nationwide Reach
- [ ] Social links section (DirecTokunbo channels for now)
- [ ] Footer: "Partner site of DirecTokunbo" with link
- [ ] Vite build setup
- [ ] GitHub Pages deployment with CNAME
- [ ] Entrance animations (staggered fade-up)
- [ ] Background glow orbs + grain texture
- [ ] Responsive (mobile-first)
- [ ] No countdown, no email form, no waitlist input
