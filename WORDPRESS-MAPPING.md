# WordPress, Elementor & WooCommerce Implementation Mapping (`WORDPRESS-MAPPING.md`)

This prototype was specifically architected so every visual section, CSS token, product card, and shopping interaction translates cleanly into **WordPress + Elementor (Pro or Free + Woolementor/ShopEngine) + WooCommerce** without custom commerce hacks.

---

## 1. Recommended Theme & Plugin Stack

- **Base Theme:** `Hello Elementor` (lightweight, zero bloat) or `Astra` / `Kadence` with a child theme containing the custom properties from `css/styles.css`.
- **Page Builder:** `Elementor` + `Elementor Pro` (for Theme Builder Header, Footer, Archive Product template, and Single Product template).
- **Commerce Engine:** `WooCommerce` (configured with Currency: **Pakistani Rupee (`PKR` / `Rs.`)**, thousand separator `,`, decimals `0`).
- **Recommended Lightweight Plugins:**
  - *Variation Swatches for WooCommerce* (converts standard WooCommerce dropdown attributes `pa_colour` and `pa_size` into the exact circular colour swatches and rectangular size pills shown in `product.html`).
  - *FIBOSearch (Ajax Search for WooCommerce)* (reproduces the live header search drawer `#search-drawer`).
  - *Husky / WOOF or Elementor Taxonomy Filter* (reproduces the horizontal size-chip toolbar on `shop.html`; use a horizontal layout, not a sidebar).

---

## 2. Design Tokens → Elementor Global Settings

Copy the `:root` variables from `css/styles.css` directly into **Elementor → Site Settings → Global Colors & Global Fonts**:

- **Global Colors:**
  - Primary Brand Dark / Headings / Primary Buttons: `#1A2E4C` (`--text-primary` / `--accent-navy`)
  - Secondary Brand Accent / Badges / Secondary Buttons: `#E5A83B` (`--accent-gold`)
  - Secondary Text: `#4A5970` (`--text-secondary`)
  - Warm Caramel Accent: `#C2744B` (`--accent-terracotta`)
  - Meadow Sage Accent: `#4D6F5E` (`--accent-sage`)
  - Background Primary (Clean Cream): `#FDFBF7` (`--bg-linen`)
  - Background Secondary (Soft Oatmeal Sand): `#F3EFE6` (`--bg-sand`)
- **Global Fonts:**
  - Primary Heading: `Fraunces` (600 weight, line-height `1.15`)
  - Body & UI: `Plus Jakarta Sans` (400/500/600 weight, line-height `1.6`)

---

## 3. WooCommerce Data Model Mapping (`js/data.js` → WooCommerce)

Each item in `window.LITTLE_TRAITS_PRODUCTS` maps 1:1 to a **WooCommerce Variable Product**:

| Prototype Field (`js/data.js`) | WooCommerce Field / Taxonomy |
| :--- | :--- |
| `id` / `sku` (`LT-SS26-01`) | Product SKU (`_sku`) |
| `name` | Product Title (`post_title`) |
| `purchaseSummary` | Product Short Description (`post_excerpt`): one brief sentence above the purchase controls |
| `shortSubtitle` + `fabricSummary` | Optional custom fields for cards and the Fabric & Care accordion |
| `price` (`4250`) | Regular Price (`_regular_price` in PKR) |
| `category` + `secondaryCategories` | Product Categories (`product_cat`: `boys`, `girls`, `baby`, `coords`) |
| `badge` (`New Arrival`, `Bestseller`) | Product Tag (`product_tag`) or custom meta field rendered as card badge |
| `colors` (`[{ name, hex, imageIndex }]`) | Global Product Attribute `pa_colour` (Color Swatch type, linked to variation image) |
| `sizes` (`["2-3Y", "3-4Y", ...]`) | Global Product Attribute `pa_size` (Button/Label Swatch type, **Used for variations**) |
| `images` (3 photos per product) | Featured Image (`_thumbnail_id`) + Product Gallery (`_product_image_gallery`) |
| `shortDescription`, `ageGroup`, `details` & `fabricCare` | Product Description (`post_content`) or custom WooCommerce Tabs / Accordions below the purchase controls |

---

## 4. Section-by-Section Elementor Mapping

### A. Global Elements (`js/app.js`)
1. **Announcement Bar + Sticky Header:**
   - Build in **Elementor Theme Builder → Header**.
   - Top container (`#26221E`) with text + Popup trigger button for the **Size Guide Elementor Popup**.
   - Main sticky container (`position: sticky; top: 0`) with Nav Menu widget, centered SVG/text logo, Search Popup trigger, and **Elementor Menu Cart** widget (configured as a slide-out side cart drawer).
2. **Size Guide Modal (`#size-guide-modal`):**
   - Build as an **Elementor Popup** containing the HTML table from `js/app.js` (`window.SIZE_GUIDE_DATA`). Triggered by a class `.open-size-guide` on both the Header and Single Product template.

### B. Homepage (`index.html`)
1. **Campaign Banners (`.campaign-hero`) + Boys / Girls (`.shop-departments`):**
   - Elementor Nested Carousel with two slides, **6000ms autoplay**, Pause/Play, pause on hover/focus, arrows/dots, keyboard navigation, and only the active slide in the tab order. Respect reduced-motion preference and pause when offscreen or behind a modal. Each slide uses two children: copy left and a real stock photo right.
   - Use identical copy Grid rows for eyebrow, two-line title, description and CTA; reserve at least two description lines on every slide. At ≤768px stack the 3:2 image above a shared 312px copy/control area; center the text, CTA and navigation and keep controls at least 44px. Do not let content-dependent centering move the heading/button when one description wraps.
   - Keep one stable store H1 using the `.sr-only` class, with H2 campaign headlines. No separate oversized intro above the banner.
   - After a responsive **32–48px gap**, add a two-column Flexbox Container for Boys/Girls at **every breakpoint**. Each entire tile links to its category, with a photo, light bottom gradient, title and visual Shop CTA; no nested links or descriptive paragraphs. Mobile tile ratio is 4:5.
2. **Shop by Age Strip (`.age-strip`):**
   - One rounded container with a Heading and a row of Button widgets (pill style) linking to `/shop/?filter_size=6-12m`, `/shop/?filter_size=2-3y`, etc., plus a Size Guide popup trigger. Make the row horizontally scrollable on mobile (custom CSS `overflow-x: auto`).
3. **New Season Arrivals (`#homepage-featured-grid`):**
   - Elementor **Loop Grid** widget querying `Products` (6 items, ordered by Date or Featured tag).
4. **Craft Story (`.craft-story`):**
   - 2-column Flexbox Container (`--bg-sand`): Image widget left; eyebrow + Heading + Text + Icon List (3 points) + text link right. Stacks at 900px.
5. **Collection Banners (`.collection-banners`):**
   - Two cards (image + tinted panel with Heading, Text, Button) using `--bg-sage-tint` and `--bg-ochre-tint`.
6. **Service Bar (`.service-bar`):** 4 Icon Box widgets (2×2 on tablet/mobile).

### E. Our Story (`about.html`) & Contact Us (`contact.html`)
- **Our Story (`about.html`):** Centered hero; 2-column Image + Text (`.about-story-grid`); "The details you feel" container with one image and a numbered list (`.detail-list`, 01–04); navy CTA card (`.wp-feature-card--navy`) with gold + light-outline buttons.
- **Contact & Care (`contact.html`):** Compact hero; 3 action cards (WhatsApp, Email, Size Guide popup trigger); then 2 columns — **Elementor Form** (or CF7/WPForms) left, Accordion/Toggle FAQ right. The prototype's first two actions show preview feedback; connect real `wa.me`/`mailto:` targets only after the client confirms them. Replace demo form submission with an actual form handler, then update its button/feedback copy.

### C. Shop / Category Page (`shop.html`)
- Build in **Elementor Theme Builder → Product Archive**.
- Header: breadcrumb, title/description (dynamic term name + description), department links with counts.
- **One horizontal toolbar, no sidebar or off-canvas filter**: a `pa_size` attribute filter rendered as pill links (e.g. WooCommerce "Filter Products by Attribute" in list mode styled as chips, or a filter plugin's horizontal layout), product count, and the native Sorting dropdown (`orderby`). Show active filters (WooCommerce "Active Product Filters" widget) directly beneath.
- Below: WooCommerce Archive Products Loop Grid (3 columns desktop, 2 tablet/mobile).

### D. Single Product Page (`product.html`)
- Build in **Elementor Theme Builder → Single Product**.
- **Left Column:** WooCommerce Product Images widget (configured with left vertical thumbnails on desktop and bottom horizontal thumbnails on mobile).
- **Right Column:**
  - Product Title (`Fraunces`), one-sentence Product Short Description (`purchaseSummary`), then Product Price (`Rs.`).
  - **Add to Cart Widget:** With *Variation Swatches for WooCommerce* active, WooCommerce automatically renders the colour swatches and size buttons and enforces required size selection before enabling the Add to Cart button.
  - Size Guide Popup trigger button placed right above the `pa_size` selector.
  - Quantity next to navy **Add to Bag**; outline **Buy now** beneath; one quiet Cash on Delivery note. Do not repeat the unit price in the primary button or add a reassurance strip here.
  - On phones ≤480px, use two columns of named colour buttons and four columns of sizes, with ≥44px touch targets and 16px quantity input text.
  - Elementor **Accordion** widget, all items closed initially, populated dynamically via Dynamic Tags: *Product details* (full description, age range, fit, SKU), *Fabric & care*, and *Delivery & exchanges*.
  - **Related Products** Loop Grid at the bottom (4 items; 4 columns desktop, 2 tablet/mobile).
  - Mobile sticky Add-to-Cart bar: many themes/plugins provide one (e.g. "Sticky Add to Cart"); show it only ≤768px once the main button scrolls out of view. Display the selected quantity's total and size/quantity; keep hidden controls outside the tab order.

---

## 5. Pakistan-Specific WooCommerce Checkout Setup

Once moved to WordPress, configure these native WooCommerce settings:
1. **Shipping Zones:** Create a **Pakistan** zone with either a Flat Rate (e.g., `Rs. 250`) and/or Free Shipping above a minimum order amount.
2. **Payment Gateways:**
   - Enable **Cash on Delivery (COD)** (primary payment method for Pakistani ecommerce).
   - Enable **Direct Bank Transfer (BACS)** with the client's local bank / IBAN details.
   - Optional card gateway integration (PayFast Pakistan, Safepay, or JazzCash/Easypaisa WooCommerce plugin).
3. **Courier Integration:** Connect Leopard Courier, TCS, CallCourier, or PostEx WooCommerce plugin for automated airway bill generation and tracking SMS.
