# Project Handoff & Continuity Guide (`HANDOFF.md`)

This document provides another developer or AI assistant with everything needed to continue developing **Little Traits Pakistan** or migrate it directly into WordPress + WooCommerce.

---

## 1. Completed Features

1. **Five Connected Views (`index.html`, `shop.html`, `product.html`, `about.html`, `contact.html`)**:
   - **Homepage (`index.html`)** — current v1.9 order: New Season / Baby & Toddler campaign banners (4.5-second crossfading autoplay + bottom dots/manual controls via `js/home.js`) → 32–48px pause → Boys/Girls photo tiles (2-up on mobile) → New Season Arrivals (6) → merged craft story → Baby & Co-ords editorial banners → service bar → footer. Banners retain the existing real Pexels photos, equal content rows and wider two-line mobile headlines, short descriptions and bottom-right dots beside the CTA. The old article-like introductory heading and category paragraphs are removed. See `DESIGN.md` §13.
   - **Shop / Category Page (`shop.html`)** — compact category title/count and Filter / sort row, followed directly by the product grid. Department and size/age radios live in `#shop-filter-drawer` outside main, using shared overlay/focus management. URL-synced filters (`?category=boys&size=2-3Y&sort=price-asc`), active-filter count, live View N pieces button, Clear all, and helpful empty state. This 19 October 2026 layout supersedes the horizontal tabs/size strip.
   - **Product Detail Page (`product.html`)** — rendered from `window.PRODUCTS` (`js/data.js`) via `?id=lt-01` … `lt-06` or `?slug=`. Current v1.3 order: title → short `purchaseSummary` → unit price → named colour buttons → size/Size Guide → quantity + navy Add to Bag → outline Buy now → quiet COD note → three closed accordions. The full description, age range, fabric, SKU and policies sit in those accordions. No duplicated colour label, price in the main button, age badge or reassurance strip. Mobile sticky bar (`#pdp-sticky-bar`, appended to `body`) shows total price and size/quantity. Accordions keep their open state across re-renders.
   - **Our Story (`about.html`)** — story, "The details you feel" numbered list (the depth that used to crowd the homepage), navy CTA card.
   - **Contact (`contact.html`)** — three action cards (WhatsApp and Email preview buttons, working size guide), then demo form (`#demo-contact-form`) beside a `<details>` FAQ (`#faq-section`). Unconfirmed contact addresses are not active links; the form states explicitly that it sends no message.

2. **Interactive Shopping & Demo Mechanics**:
   - **Required size validation**: Add to Bag / Buy now / sticky bar without a size shows an inline alert, scrolls to the size block and focuses the first size.
   - **Colour-linked gallery**: choosing a colour swaps the main image to that colourway.
   - **Cart drawer (`localStorage` key `little_traits_demo_cart_v1`)**: merges identical `productId + size + colour`, PKR subtotal, +/- (focus stays on the pressed button), remove, empty state. Header bag badge shows the count and the button's `aria-label` includes it. PDP Add to Bag opens the drawer (`addToCart({ silent: true })` skips the toast).
   - **Search drawer**: live filter over the 6 products; the query is HTML-escaped before rendering.
   - **Size & Fit Guide modal**: announcement bar, mobile menu, PDP, About, Contact and footer all open it (`[data-open-size-guide]`).
   - **Overlays**: one manager (`openOverlay` / `closeAllOverlays` in `js/app.js`) handles focus in/out, forward/reverse Tab wrapping, `inert` on the page behind, Escape and backdrop close. Drawers carry modal dialog semantics.
   - **Shared helpers**: `LittleTraitsApp.formatPKR()` and `LittleTraitsApp.formatSize()` (renders `8-10Y` as `8–10Y`; data keeps the hyphen).

3. **Responsive Verification (v1.2, headless Chrome)**:
   - **v1.2 historical browser checks (Oct 16):** zero horizontal overflow on Home, Shop (default + filtered), PDP (`lt-01`, `lt-06`), About and Contact at **1440, 1280, 1180, 1100, 1025, 1024, 900, 820, 768, 600, 480, 390, 360, 320px**. These checks predate the v1.3 purchase-panel changes; see the v1.3 verification note below.
   - `npm run check` passes (core files, 6 products, all image references).

---

## 2. Simulated Behaviours vs. Production Scope

To keep the prototype honest and aligned with the brief:
- **Checkout (`#demo-checkout-modal`)**: Clicking *"Buy now"* on the PDP or *"Checkout"* inside the Shopping Bag opens a transparent Demo Checkout Modal. It displays the exact items and PKR subtotal from the user's bag and explains that live order placement, Cash on Delivery (COD), and courier dispatch will be handled by native WooCommerce checkout in production. It never pretends an order has been placed.
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

- **`v1.3.0` (Focused purchase-panel cleanup — Oct 17, 2026)**:
  - Removed the age badge, separate fabric line, repeated selected-colour text, size instruction, repeated button price and reassurance strip from the buying area. Added a one-sentence `purchaseSummary` for all six products; kept the original detailed copy inside Product details.
  - Kept Add to Bag primary and shortened the secondary action to Buy now; one COD note sits below. Size Guide is a quiet text link with a 44px touch height.
  - Smaller fluid title, consistent spacing, shrinkable grid tracks, two colour columns and four size columns on phones ≤480px. Quantity +/- targets are 44px wide; input text is 16px to avoid iOS input zoom.
  - Fixed the first-click purchase bug after manual quantity entry: the input and main buttons are no longer replaced on `change`. Quantity clamps to 1–15 and the boundary buttons disable. Purchase reads the current input value.
  - Sticky mobile bar now shows the quantity-adjusted total and selected size/quantity, keeps its button node stable, and toggles `aria-hidden`/tab order with visibility and the mobile breakpoint.
  - **Verification:** `npm run check`, JavaScript syntax and diff checks passed. A temporary Node VM controller regression harness exercised all six products with the actual shared cart API: required size, selected colour/image, typed quantity + first Add to Bag, quantity limits, Buy now, exact cart totals, accordion persistence, and sticky controls. This uses a minimal DOM adapter, not a browser layout engine. **No new browser/device screenshots or viewport-overflow measurements were available in this environment.**

## 6. Open Items for the Next Pass

- **Not tested in real devices or Safari/Firefox** — verification used headless Chrome device emulation only. `inert` and `:has()` need Safari ≥15.5/17.4 for full effect (fallbacks degrade gracefully).
- **v1.3 visual follow-up:** check the revised purchase panel on desktop, 768px, 390px and 320px, plus real iOS Safari. The previous v1.2 browser results are not a fresh visual verification of v1.3.
- **Photography**: the craft section still reuses `p4-detail.jpg`; replace it when the client supplies fabric/detail images. The homepage campaign now uses real stock photography with provenance in `DESIGN.md` §11; brand-owned campaign photography can replace it when supplied.
- **Copy** is placeholder throughout (claims, contact numbers, delivery promises) and was intentionally not audited.

## 7. Client Preview Check — Oct 17, 2026 (v1.4)

Confirmed issues fixed:
- Shop department changes now update desktop/mobile header active links. Filter rendering preserves keyboard focus and chip scroll position; removing an applied filter or recovering an empty result moves focus to the surviving filter control.
- Header navigation collapses at **1180px**, before its two desktop link groups crowd the centered logo. Header grid tracks can shrink. Contact form columns can shrink below 200px and all text inputs/selects use 16px text.
- Open dialogs wrap Tab/Shift+Tab through visible controls; search, cart and mobile navigation have dialog semantics.
- WhatsApp/email actions preview the intended channels without opening invented contacts. Removed dummy contact details; local form feedback explicitly says no message was sent. Footer identifies the site as a design preview.

Checks completed: JavaScript syntax, `npm run check`, `git diff --check`; local link/asset targets and duplicate IDs across all five pages; all-six-product controller/cart regression checks; shop filtering, counts, empty recovery, sorting, URL/header state, focus and scroll checks; dialog keyboard and search-escaping checks; local contact-preview behavior. Controller tests use Node VM DOM adapters, not a layout engine.

**Visual limit:** a fresh cloud-browser review was attempted but the browser session timed out before any page snapshot or screenshot returned. No new breakpoint screenshots, viewport-overflow measurements, or real-device checks were obtained. Do not describe this pass as visually verified or as a production-ready store. Checkout and contact submission remain explicit demos; client business details and final photography still need confirmation before production.

## 8. Client-Requested Campaign Hero — v1.5

The client approved the direction but requested a more recognizable ecommerce opening, especially on mobile: banners first, then Boys/Girls after some space. Replaced the long standalone heading with two compact shopping campaigns. Colours, type families, logo and all shopping pages remain consistent.

- New assets: `assets/images/campaign-season.webp` (1536×1024, approximately 165KB) and `assets/images/campaign-baby.webp` (1536×1024, approximately 203KB), generated with built-in imagegen and encoded as WebP. The source PNGs remain outside the repo; production campaign photography should replace these concept assets when supplied.
- `js/home.js` owns manual arrows/dots, left/right keyboard selection, selected state and polite announcements. Controls are hidden until JS initializes; first campaign/CTA is available in the HTML. Hidden slides leave the layout and keyboard order. No auto-rotation or timer.
- H1 is a stable, visually hidden store heading; each visible campaign uses an H2. Both department tiles are single links, with no nested CTA anchors. Mobile images retain the full 3:2 source ratio; category tiles stay side by side at 4:5.
- `npm run check`, JS syntax/diff checks, homepage link/asset/heading/ID checks and manual-banner controller regressions passed. Generated photography was visually inspected. Fresh browser layout/device verification remains unavailable; do not treat source/controller tests as screenshot QA.

## 9. Stable Banner Layout, Real Photography & Autoplay — v1.6

- Root cause: vertical centering depended on each slide's total text height. A two-line description shifted its heading/CTA relative to a one-line description. Both bodies now use identical CSS Grid row sizes for eyebrow, two-line title, description and CTA. Desktop slide height is 420–480px; mobile uses a shared 3:2 media row plus a 312px centered copy/control area. Description text remains readable, without line clamping or clipping.
- Mobile text, button and navigation now share a centered axis. The description is visible again and has a reserved two-line row. Both slides have the same title size and row spacing, so changing slides does not change the banner height.
- Replaced displayed AI concepts with real Pexels images: `campaign-season-real.webp` (Vika Glitter, photo 14571366, 1600×1068, ~61KB) and `campaign-baby-real.webp` (Matilda Wormwood, photo 7484842, 1600×1069, ~64KB). Originals and licence links are in `DESIGN.md` §11; old concept files remain archived but are no longer referenced by the homepage.
- Autoplay interval is **6000ms** with one timer, a Pause/Play control and quiet automatic changes. It pauses for mouse hover, keyboard focus, offscreen banner, hidden tab and shared overlays. Reduced-motion preference starts paused; explicit Play can opt in. Manual arrows/dots and keyboard selection remain available. Both small photos load eagerly, with the second at low fetch priority.
- Shortened the first description to “Soft cottons for everyday play.” so an age range does not wrap onto its own line. The shared description slot also accommodates the longer second slide without moving its heading or button.
- Checks: JS syntax, integrity/assets, local links/markup and controller regressions for timing, single-timer behavior, wrapping, manual controls, focus/hover, Pause/Play, tab visibility, viewport visibility, overlays, reduced motion and page lifecycle passed.
- Fresh live screenshot QA at **1440×1000 desktop** and **390×844 mobile** covered both the initial slide and the automatically selected second slide. Banner edges, heading rows, CTA, controls and the following department tiles stayed visually aligned; the real photos loaded and mobile content was centered. These are browser screenshots, not physical-device testing or numeric DOM measurements. The older v1.4/v1.5 visual limitation is resolved for this homepage banner at these two widths; the separate purchase-panel and real-device follow-ups above remain open.

## 10. Retail Hero Refinement — v1.7

- User feedback: the centered mobile composition and large copy/control block felt weak for the store’s first impression. Kept both existing image files unchanged.
- Competitor research: inspected the [Hopscotch homepage](https://ilovehopscotch.com/) on mobile and [Bachaa Party](https://www.bachaaparty.com/) homepage copy plus its current desktop/mobile campaign assets. These emphasize a short campaign, a prominent shopping action, and nearby category entry points. Minnie Minors was also checked, but its promotion popup blocked a useful hero comparison. Research details and source links are in `DESIGN.md` §12.
- New headlines: “Made for play. Loved all day.” and “Small outfits. Big cuddles.” Supporting copy stays brief; the first CTA now says “Shop new arrivals”.
- Mobile returns to left alignment with a responsive 28–35.2px, weight-600 title. Removed the 312px centered block and separate control footer: the compact copy grid is roughly 225–241px tall, with dots/Pause over the photo. Desktop keeps its split layout at 380–440px tall with a slightly larger photo share; tablets 601–768px use a 360px split frame instead of the tall phone stack.
- Preserved equal title/description/CTA slots and the existing six-second, pausable carousel controller. Phones use the two 44px dot targets and Pause/Play; tablet/desktop retain arrows too. The phone pill is inset 6px from the photo top so it clears the left child’s head at 320px.
- Source verification: `npm run check`, `git diff --check` and the actual-controller regression harness passed.
- Fresh live screenshot QA: both slides at 1440px desktop and 390px/320px phone widths; then follow-up captures at 320px (photo-control clearance), 601px (both automatically rotated slides) and 768px after the tablet refinement. No clipping or visible heading/CTA/frame movement was observed in these captures. At 390px the copy area is approximately 82px shorter than v1.6; both department cards and their CTAs fit in the 844px first screen. Tablet now uses a 360px split frame.
- Verification limit: these are real rendered browser screenshots plus controller tests, not numeric browser DOM measurements or physical-device testing. Local Playwright browser installation failed, and competitor interaction calls returned `INVALID_ARGUMENT`; the successful screenshot and direct-asset research paths supplied the visual evidence.

## 11. Wider Headlines, Bottom Dots & Smooth Rotation — v1.8

- Based on the user’s annotated mobile screenshots, removed the Pause/Play control entirely and moved phone dots off the image to the copy panel’s bottom right, alongside the CTA. Phone dot targets are 28×28px; tablet/desktop retain 44px arrows and dots.
- Expanded the headlines to “Made for little ones. Loved every day.” and “Soft little outfits. Great big cuddles.” The phone font grows with viewport width (`clamp(1.65rem, 8.4vw, 3.25rem)`), uses a looser 1.12 line-height and less tight letter spacing. The short descriptions are 13px on phones; 16px vertical padding and smaller gaps remove unnecessary space between copy and CTA. Baby CTA is now “Shop babywear”. Images are unchanged.
- Rotation interval is now **4500ms**. Both rendered slides share one Grid cell and crossfade over 500ms; copy moves a subtle 8px. Inactive slides are inert, aria-hidden and non-interactive. The first slide remains available without JS. Reduced motion uses manual controls; hover, focus, offscreen, overlays and tab/page visibility suspend automatic rotation.
- Verification: syntax, integrity/assets, homepage markup/links and controller regressions passed, including operation without any rotation-button node, 4500ms/single-timer behavior, inactive-slide accessibility, rapid manual selection, keyboard/focus, visibility, overlays, reduced motion and page lifecycle. Fresh live screenshot QA passed at 320px and 390px (first campaign), 390px/440px (automatic second campaign), 1440px desktop and 601px tablet. The 390px comparison keeps the frame, headline baseline, description, CTA, dots and following tiles aligned. Headlines remain two lines; phone descriptions remain one line; dots clear the CTA even at 320px. These are settled browser screenshots plus controller-state checks, not a frame-by-frame animation recording or physical-device measurements.

## 12. Description Readability & CTA Spacing — v1.8.1

Increased both campaign descriptions from 13px to 14.4px on phones and from 14.4px to 16px on tablet/desktop; weight is now 500 with line-height 1.6. Copy-row gaps are 12px and the CTA row adds 8px of breathing room above the button (about 20px from the description box). Narrow split layouts reserve two lines so larger text does not collide with the CTA. Both slides retain identical rows and bottom-dot alignment.

## 13. Unisex Department & Homepage Cleanup — v1.9 (Oct 18, 2026)

- Added Unisex (`?category=unisex`) to the category data, desktop/mobile navigation and footer. The existing shop controller generates its tab, count, heading and breadcrumb; size filters and sorting work through the same path as other departments.
- Assigned Rayan (`lt-03`), Milo (`lt-05`) and Safa (`lt-06`) to the demo Unisex edit. Safa uses Unisex as its primary breadcrumb category while retaining its existing Co-ords, Baby, Boys and Girls memberships. Other department counts are preserved. Search now includes secondary category names.
- Removed the homepage Shop by age section, its initializer and its unused CSS. Arrivals now follow the Boys/Girls tiles directly. Shop size filters and the shared Size Guide remain available.
- Versioned shared CSS/catalogue/app URLs at `v=1.9` across all five pages so returning preview visitors receive the updated navigation and catalogue together.
- Verification: `npm run check`, JavaScript syntax and `git diff --check` passed. Existing shop, search/dialog, campaign and all-six-product/cart controller checks passed. Focused Unisex checks passed for direct URL entry, heading/breadcrumb, three-product count, size filters, sorting, active navigation, empty recovery and primary/secondary category search; prior category counts are unchanged. All-page local links/assets and unique IDs passed.
- Visual limit: no new browser screenshots or physical-device checks in this pass; the changes were verified through source and actual-controller checks.
