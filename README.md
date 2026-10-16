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
Runs `scripts/verify-build.js`, which verifies that all required HTML, CSS, JS, documentation files, catalogue product fields, and all 26 local photographic assets in `assets/images/` exist and are non-empty.

---

## 2. Project Structure

```text
little-traits/
├── index.html                  # Homepage (Split Boys/Girls hero, Shop by Collection, Value Props, WP-friendly sections)
├── shop.html                   # Shop / Category listing page (department + size filters, sorting, empty state)
├── product.html                # Single reusable Product Detail Page populated dynamically via URL (?id=lt-01)
├── about.html                  # Our Story / Brand values page (WordPress-friendly 2-column & 3-column sections)
├── contact.html                # Contact & Customer Care page (WhatsApp/Email cards, demo contact form & FAQs)
├── css/
│   └── styles.css              # Complete design system, Deep Navy & Golden Honey palette, breathable spacing
├── js/
│   ├── data.js                 # Centralized brand config, 6 demo products (PKR), categories & size chart data
│   ├── app.js                  # Shared Header, Footer, Search Drawer, persistent Cart Drawer & Modals
│   ├── shop.js                 # Category/size filter controller, sorting, URL sync & mobile filter drawer
│   └── product.js              # Simplified, mother-friendly PDP controller with 1-click size guide & collapsed accordions
├── assets/
│   └── images/                 # 26 locally stored, watermark-free product, editorial & textile photographs
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
   - Announcement bar with Size Chart trigger and PKR notice.
   - Sticky header with desktop navigation, mobile navigation drawer, live search drawer, and persistent shopping bag drawer.
   - Split photographic hero featuring **The Boys Collection** and **The Girls Collection** entry points.
   - Arch-shaped department cards (`Boys`, `Girls`, `Baby & Toddler`, `Co-ords & Knits`) + 4-column **Value Propositions Strip** (*100% Soft & Gentle*, *Made to Play*, *Easy 7-Day Exchanges*, *Loved by Mothers*).
   - **New Season Arrivals** 6-product showcase with hover image swap, colour swatches, and size pills.
   - **Made for Pakistani Seasons** brand & material story with 3 fabric pillars and single Elementor-friendly visual card.
   - **Built for Every Little Adventure** 2-column WordPress/Elementor-friendly Playwear & Cozy Sets feature banner.
   - Dual image-led collection spotlight banners (*The First Steps & Nursery Edit* and *Two-Piece Co-ord Sets*).
   - **Garment Construction & Details** 4-card breakdown (*French-Finished Seams*, *Soft-Stretch Waistbands*, *Azo-Free Pigments*, *Wide Keyhole Openings*).
   - **Fast Age / Size Finder** strip (`6–12M` to `6–10 Years`) linking directly into pre-filtered shop views.
   - Service promise bar & complete footer.

2. **Shop / Category Page (`shop.html`)**:
   - Dynamic collection banner and heading that updates when filtering (`All Pieces`, `Boys`, `Girls`, `Baby & Toddler`, `Co-ords & Knits`).
   - Category tabs with item counts, sidebar size filter (`6-12M` through `8-10Y`), and sorting (`Featured`, `Price: Low to High`, `Price: High to Low`, `Alphabetical`).
   - Mobile filter drawer for comfortable thumb filtering on `360px–768px` screens.
   - Active filter chips and a clear empty state with one-click filter reset when a category + size combination has 0 matches.

3. **Reusable Product Detail Page (`product.html`)**:
   - Single template rendering any of the 6 demo products via `?id=lt-01` .. `?id=lt-06` with clean, breathable spacing designed for effortless browsing by mothers.
   - 3-image vertical/horizontal thumbnail gallery with colour-linked image switching.
   - PKR pricing (`Rs.`), colour variation buttons, and **required child size selection** with 1-click **Size Guide** pill button and inline validation warning.
   - Quantity stepper, Deep Navy **Add to Shopping Bag** pill button, and Golden Honey **Buy Now with Cash on Delivery (Preview)** button.
   - Collapsible accordions (collapsed by default to keep the page uncluttered) for *Garment Details & Fit*, *Fabric & Wash Care*, and *Delivery & Size Exchange*.
   - Related products section (*You May Also Love*).

4. **Our Story / About Us (`about.html`)**:
   - Brand story hero, 2-column origin & craft narrative, 3-column core values grid, and 2-column collection exploration banner.

5. **Contact & Customer Care (`contact.html`)**:
   - Customer care hero, WhatsApp & Email support cards, interactive Size Chart card, working demo contact inquiry form (`#demo-contact-form`), and 4-card FAQ grid (`#faq-section`).

---

## 4. Technology Stack & Environment

- **Languages:** Semantic HTML5, modern CSS3 (Custom Properties, CSS Grid, Flexbox, `clamp()` fluid typography), Vanilla ES6+ JavaScript.
- **Fonts:** Google Fonts (`Fraunces` variable optical serif + `Plus Jakarta Sans`).
- **Storage:** `localStorage` (`little_traits_cart_v1`) for persistent demo cart state across page reloads.
- **Target Production Platform:** WordPress 6.x + WooCommerce + Elementor (see `WORDPRESS-MAPPING.md`).
- **AI Assistant / Model Used:** Built in Cursor using `gemini-4-argon` (as exposed by the Cursor runtime environment).
