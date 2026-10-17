# Little Traits — Kidswear Ecommerce Prototype (Pakistan)

A complete, responsive kidswear ecommerce storefront prototype designed and built for a new Pakistani children's clothing brand (**ages 6 months – 10 years**). Built as a clean, zero-framework frontend reference ready for direct implementation in **WordPress + Elementor + WooCommerce** and suitable as a portfolio showcase.

---

## 1. Quick Start & Commands

### Prerequisites
- **Node.js** (v16+ recommended) — used only for the lightweight local HTTP server and verification script. No `npm install` or external runtime dependencies are required.
- Any modern web browser.

### Run Locally
```bash
npm start
```
Starts the local static server at **`http://localhost:4173`**:
- **Homepage:** `http://localhost:4173/index.html`
- **Shop / Category Listing:** `http://localhost:4173/shop.html`
- **Reusable Product Detail Page:** `http://localhost:4173/product.html?id=lt-01` (supports `lt-01` through `lt-06`)
- **Our Story / About Us:** `http://localhost:4173/about.html`
- **Contact & Customer Care:** `http://localhost:4173/contact.html`

*(Alternatively, you can serve the root directory with any static server such as `npx serve .` or VS Code Live Server.)*

### Run Integrity & Asset Verification
```bash
npm run check
```
Runs `scripts/verify-build.js`, which verifies that all required HTML, CSS, JS, documentation files, catalogue product fields, and referenced local photographic assets in `assets/images/` exist and are non-empty.

---

## 2. Project Structure

```text
little-traits/
├── index.html                  # Homepage (campaign banners, Boys/Girls, age strip, arrivals, craft story)
├── shop.html                   # Shop / Category listing page (department + size filters, sorting, empty state)
├── product.html                # Single reusable Product Detail Page populated dynamically via URL (?id=lt-01)
├── about.html                  # Our Story (story, garment details list, CTA)
├── contact.html                # Contact & Customer Care page (WhatsApp/Email cards, demo contact form & FAQs)
├── css/
│   └── styles.css              # Complete design system, Deep Navy & Golden Honey palette, breathable spacing
├── js/
│   ├── data.js                 # Centralized brand config, 6 demo products (PKR), categories & size chart data
│   ├── app.js                  # Shared Header, Footer, Search Drawer, persistent Cart Drawer & Modals
│   ├── home.js                 # Accessible manual campaign banner switching, with no autoplay
│   ├── shop.js                 # Department/size filter toolbar, sorting, URL sync, empty state
│   └── product.js              # PDP controller: variants, size validation, sticky mobile bar, accordions
├── assets/
│   └── images/                 # 26 original photos + 2 optimized campaign WebP assets
├── scripts/
│   ├── serve.js                # Zero-dependency Node HTTP server (port 4173)
│   └── verify-build.js         # Automated build, catalogue & local asset integrity checker
├── README.md                   # Setup, commands, structure & technology overview
├── DESIGN.md                   # Research synthesis, creative direction, typography, palette & asset attribution
├── HANDOFF.md                  # Completed features, simulated states, missing client info & changelog
├── WORDPRESS-MAPPING.md        # Step-by-step mapping to WordPress, Elementor & WooCommerce
└── package.json                # Scripts and project metadata
```

---

## 3. Scope & Connected Views

1. **Homepage (`index.html`)**:
   - Announcement bar (short COD/exchange line on mobile), sticky header (shop links left, logo centre, Our Story/Contact/Search/Bag right), mobile menu, search drawer, cart drawer.
   - Two manually switched **campaign banners** (New Season and Baby/Toddler): short headline + Shop CTA beside photography on desktop; image above compact copy on mobile. No autoplay. First slide remains usable without JavaScript.
   - A 32–48px pause, then **Boys/Girls collection tiles**, side by side on mobile and clickable across the entire card. The old long introductory headline and tile descriptions are removed.
   - **Shop by age** chip strip linking to pre-filtered shop views + size chart.
   - **New Season Arrivals** — all 6 pieces.
   - **Craft story** — one image + three fabric/finishing points.
   - Baby and Co-ords editorial banners, service bar, compact footer.

2. **Shop / Category Page (`shop.html`)**:
   - Heading, description and breadcrumb update with the department (`All`, `Boys`, `Girls`, `Baby & Toddler`, `Co-ords & Sets`).
   - Department tabs with counts; one horizontal toolbar with size chips (`6–12M` to `8–10Y`), result count and sort.
   - Applied-filter tags and an empty state with "Show all sizes" / "Reset filters".

3. **Product Detail Page (`product.html`)**:
   - One template for `?id=lt-01` … `lt-06`; thumbnails with colour-linked image switching.
   - Title, one-sentence purchase summary, price, named colour choices, **required size** (with Size Guide), quantity + navy **Add to Bag**, outline **Buy now**, and one quiet COD note.
   - Full description, age range, fabric, care, SKU and delivery/exchange information stay in three closed accordions below the buying controls.
   - Mobile: two colour columns and four size columns at ≤480px; sticky total + size/quantity + Add-to-Bag shortcut after the main button scrolls away; four related products.
   - Quantity changes update controls in place, so typing a number and immediately pressing Add to Bag or Buy now works on the first click.

4. **Our Story (`about.html`)**: story, "The details you feel" numbered list, navy CTA card.

5. **Contact (`contact.html`)**: WhatsApp / Email preview buttons (no outbound placeholder contacts), working Size Guide, local demo form (`#demo-contact-form`) with explicit no-message-sent feedback, FAQ (`#faq-section`).

Client preview refinements: navigation collapses at 1180px, shop filter changes preserve focus/scroll position and update the header, dialogs trap keyboard focus, and contact fields use 16px text and shrink safely on narrow screens. See `HANDOFF.md` for verification scope; fresh browser screenshots could not be completed in the final pass.

---

## 4. Technology Stack & Environment

- **Languages:** Semantic HTML5, modern CSS3 (Custom Properties, CSS Grid, Flexbox, `clamp()` fluid typography), Vanilla ES6+ JavaScript.
- **Fonts:** Google Fonts (`Fraunces` variable optical serif + `Plus Jakarta Sans`).
- **Storage:** `localStorage` (`little_traits_demo_cart_v1`) for persistent demo cart state across page reloads.
- **Target Production Platform:** WordPress 6.x + WooCommerce + Elementor (see `WORDPRESS-MAPPING.md`).
- **AI Assistant / Model Used:** Built in Cursor using `gemini-4-argon` (as exposed by the Cursor runtime environment).
