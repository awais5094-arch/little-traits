# Project Handoff & Continuity Guide (`HANDOFF.md`)

This document provides another developer or AI assistant with everything needed to continue developing **Little Traits Pakistan** or migrate it directly into WordPress + WooCommerce.

---

## 1. Completed Features

1. **Five Connected Views (`index.html`, `shop.html`, `product.html`, `about.html`, `contact.html`)**:
   - **Homepage (`index.html`)** — v1.2 order: split hero (H1 + two Boys/Girls photo panels, 2-up on mobile) → Shop by age chip strip → New Season Arrivals (6) → merged craft story → Baby & Co-ords editorial banners → service bar → footer. See `DESIGN.md` §6 for the reasoning.
   - **Shop / Category Page (`shop.html`)** — URL-synced filters (`?category=boys&size=2-3Y&sort=price-asc`). Department tabs with counts in the header; one horizontal toolbar (size chips + result count + sort); applied-filter tags underneath; helpful empty state. **No sidebar and no filter drawer** (removed on purpose, see `DESIGN.md`).
   - **Product Detail Page (`product.html`)** — rendered from `window.PRODUCTS` (`js/data.js`) via `?id=lt-01` … `lt-06` or `?slug=`. Purchase controls sit directly under price/description; navy Add to Bag (with live price) is the one primary action, "Buy now — Cash on Delivery" is outline. Mobile sticky Add-to-Bag bar (`#pdp-sticky-bar`, appended to `body`). Accordions keep their open state across re-renders.
   - **Our Story (`about.html`)** — story, "The details you feel" numbered list (the depth that used to crowd the homepage), navy CTA card.
   - **Contact (`contact.html`)** — three tappable action cards (WhatsApp `wa.me` link, `mailto:`, size guide), then demo form (`#demo-contact-form`) beside a `<details>` FAQ (`#faq-section`).

2. **Interactive Shopping & Demo Mechanics**:
   - **Required size validation**: Add to Bag / Buy now / sticky bar without a size shows an inline alert, scrolls to the size block and focuses the first size.
   - **Colour-linked gallery**: choosing a colour swaps the main image to that colourway.
   - **Cart drawer (`localStorage` key `little_traits_demo_cart_v1`)**: merges identical `productId + size + colour`, PKR subtotal, +/- (focus stays on the pressed button), remove, empty state. Header bag badge shows the count and the button's `aria-label` includes it. PDP Add to Bag opens the drawer (`addToCart({ silent: true })` skips the toast).
   - **Search drawer**: live filter over the 6 products; the query is HTML-escaped before rendering.
   - **Size & Fit Guide modal**: announcement bar, mobile menu, homepage age strip, PDP, About, Contact and footer all open it (`[data-open-size-guide]`).
   - **Overlays**: one manager (`openOverlay` / `closeAllOverlays` in `js/app.js`) handles focus in/out, `inert` on the page behind, Escape and backdrop close.
   - **Shared helpers**: `LittleTraitsApp.formatPKR()` and `LittleTraitsApp.formatSize()` (renders `8-10Y` as `8–10Y`; data keeps the hyphen).

3. **Responsive Verification (v1.2, headless Chrome)**:
   - Zero horizontal overflow on Home, Shop (default + filtered), PDP (`lt-01`, `lt-06`), About and Contact at **1440, 1280, 1180, 1100, 1025, 1024, 900, 820, 768, 600, 480, 390, 360, 320px**.
   - `npm run check` passes (core files, 6 products, all image references).

---

## 2. Simulated Behaviours vs. Production Scope

To keep the prototype honest and aligned with the brief:
- **Checkout (`#demo-checkout-modal`)**: Clicking *"Buy now — Cash on Delivery"* on the PDP or *"Checkout"* inside the Shopping Bag opens a transparent Demo Checkout Modal. It displays the exact items and PKR subtotal from the user's bag and explains that live order placement, Cash on Delivery (COD), and courier dispatch will be handled by native WooCommerce checkout in production. It never pretends an order has been placed.
- **No Fabricated Social Proof**: We did not invent star ratings, customer reviews, fake discounts, certifications, or delivery guarantees.

---

## 3. Unconfirmed Client Details (To Collect Before WordPress Launch)

The following business details are currently marked as clean placeholders in `js/data.js` (`window.STORE_CONFIG`) and `product.html`:

1. **Final Brand Name & Logo SVG**: Currently set to **Little Traits** (`window.STORE_CONFIG.brandName`).
2. **Courier Partner & Shipping Rates**: Currently displays a transparent placeholder note (*"Standard nationwide delivery across Pakistan — courier partner & flat rate to be confirmed"*). Confirm whether flat-rate shipping (e.g., `Rs. 250`) or free shipping above a threshold (e.g., `Rs. 5,000`) applies.
3. **Return & Exchange Window**: Currently set to a placeholder 7-day size exchange policy on unworn items with original tags.
4. **Customer Support Channels**: Confirm official WhatsApp Business number, Instagram handle, support email, and dispatch city (Lahore / Karachi / Islamabad) for the footer.
5. **Final Product Photography & SKUs**: Replace the 6 demo products in WooCommerce with the client's 10–15 photographed garments, actual cost/retail PKR prices, and exact stock quantities per size.

---

## 4. Known Limitations & Notes

- **Static Prototype Architecture**: Filtering, cart state, and product routing run entirely in the browser via Vanilla JS (`js/data.js`, `js/app.js`, `js/shop.js`, `js/product.js`). There is no backend database in this repository because WooCommerce will serve as the production backend.
- **Reference Inspection Note**: During initial research, Rollover Pakistan, Jamie Kay, and Konges Sløjd were inspected directly in the browser. Rylee + Cru (`https://ryleeandcru.com/`) presented a Cloudflare automated-browser challenge in headless view, so its homepage copy, navigation hierarchy, and collection structure were extracted via HTTP content fetch.

---

## 5. Changelog

- **`v1.0.0` (Initial Complete Delivery — Oct 16, 2026)**:
  - Completed competitive research across Rollover Pakistan, Jamie Kay, Konges Sløjd, and Rylee + Cru.
  - Downloaded and verified 26 local kidswear and textile photographs in `assets/images/`.
  - Implemented design system (`css/styles.css`) with `Fraunces` + `Plus Jakarta Sans` typography and warm linen/terracotta/sage palette.
  - Created structured 6-product Pakistani kidswear catalogue (`js/data.js`) with PKR pricing, sizes (`6-12M` to `8-10Y`), and colourways.
  - Built connected Homepage (`index.html`), Shop/Category page (`shop.html`), and reusable Product Detail Page (`product.html`).
  - Verified responsive layouts (`1440px`, `1024px`, `768px`, `390px`, `360px`), image loading, filters, required size validation, and persistent cart calculations.
  - Added `README.md`, `DESIGN.md`, `HANDOFF.md`, and `WORDPRESS-MAPPING.md`.

- **`v1.1.0` (Client Pitch Refinement, Palette Update & Inner Pages — Oct 16, 2026)**:
  - Updated colour system to match the client's reference palette: Deep Midnight Navy (`#1A2E4C`), Warm Golden Honey / Ochre (`#E5A83B`), Crisp Warm Cream (`#FDFBF7`), and Soft Oatmeal Sand (`#F3EFE6`) with pill-shaped buttons (`999px`) and friendly rounded corners.
  - Replaced the complex numbered-pin hotspot section on `index.html` with a clean, 100% WordPress/Elementor-friendly 2-column Playwear & Sibling Sets banner (`Built for Every Little Adventure.`) and added a 4-column Value Propositions strip below Shop by Collection.
  - Simplified the Product Detail Page (`product.html` / `js/product.js`): removed the Catalogue Jump bar, increased right-column breathing room (`gap: 1.85rem`), added a 1-click `Size Guide` pill button, simplified the reassurance strip, and collapsed the 3 detail accordions by default for effortless browsing by mothers.
  - Added complete `about.html` (*Our Story*) and `contact.html` (*Contact & Customer Care* with interactive inquiry form and FAQs) and wired them across Header, Mobile Drawer, and Footer.

- **`v1.2.0` (Independent design + frontend review — Oct 16, 2026)**:
  - **Homepage**: products moved up (hero compressed, 2-up on mobile; age strip replaces size finder); fabric story, garment anatomy and value props merged into one craft section; collection tiles and navy closing CTA removed; Co-ords banner uses the sibling photo.
  - **Shop**: sidebar and mobile filter drawer removed in favour of one horizontal toolbar; dashed chips for sizes with no matches; applied filters under the toolbar; better empty state.
  - **PDP**: purchase block directly under the description; one primary button; outline COD Buy now; mobile sticky bar; size validation scrolls and focuses; 4 related products.
  - **Shell**: header now actually sticks (`#site-header-mount { display: contents }`; before, the sticky header was trapped in its wrapper); bag count badge sits on the icon; shorter mobile announcement; desktop nav split into shop links (left) and brand links (right); compact footer; mobile menu with age chips.
  - **Accessibility**: `--accent-gold-text` for gold text (old gold text was ~2:1); closed overlays leave the tab order; `inert` page behind overlays; focus management; stretched-link cards; search query escaping; size/age chips ≥40px tall, size buttons 46px, cart qty buttons 40px (was 26px); the PDP qty stepper is 34px wide × 52px tall at ≤480.
  - **Content**: badges reduced to Signature/Limited; "Co-ords & Sets" naming; size labels shown with en dash.
  - **Docs**: `DESIGN.md` §6 records the direction and decisions; this changelog; README + WordPress mapping updated to the new structure.

---

## 6. Open Items for the Next Pass

- **Not tested in real devices or Safari/Firefox** — verification used headless Chrome device emulation only. `inert` and `:has()` need Safari ≥15.5/17.4 for full effect (fallbacks degrade gracefully).
- **Sticky PDP bar button** is `tabindex="-1"` inside an `aria-hidden` bar (duplicate of the in-page Add to Bag for touch users). If the client wants it keyboard reachable, remove both attributes and toggle `aria-hidden` with visibility.
- **Photography**: the craft section and banners reuse product photos; when the client shoots real fabric/detail images, swap `p4-detail.jpg` (craft) and the banner images first.
- **Copy** is placeholder throughout (claims, contact numbers, delivery promises) and was intentionally not audited.
