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
  - *Husky / WOOF or Elementor Taxonomy Filter* (reproduces the category + size filter sidebar and mobile drawer on `shop.html`).

---

## 2. Design Tokens → Elementor Global Settings

Copy the `:root` variables from `css/styles.css` directly into **Elementor → Site Settings → Global Colors & Global Fonts**:

- **Global Colors:**
  - Primary Text: `#26221E` (`--text-primary`)
  - Secondary Text: `#5C544B` (`--text-secondary`)
  - Accent / Primary Brand: `#C86D51` (`--accent-terracotta`)
  - Secondary Accent: `#4A6B5D` (`--accent-sage`)
  - Background Primary: `#FAF7F2` (`--bg-linen`)
  - Background Secondary: `#F3EDE2` (`--bg-sand`)
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
| `shortSubtitle` + `fabricSummary` | Custom Field (ACF / Meta Box) or Product Short Description (`post_excerpt`) |
| `price` (`4250`) | Regular Price (`_regular_price` in PKR) |
| `category` + `secondaryCategories` | Product Categories (`product_cat`: `boys`, `girls`, `baby`, `coords`) |
| `badge` (`New Arrival`, `Bestseller`) | Product Tag (`product_tag`) or custom meta field rendered as card badge |
| `colors` (`[{ name, hex, imageIndex }]`) | Global Product Attribute `pa_colour` (Color Swatch type, linked to variation image) |
| `sizes` (`["2-3Y", "3-4Y", ...]`) | Global Product Attribute `pa_size` (Button/Label Swatch type, **Used for variations**) |
| `images` (3 photos per product) | Featured Image (`_thumbnail_id`) + Product Gallery (`_product_image_gallery`) |
| `details` & `fabricCare` | Product Description (`post_content`) or custom WooCommerce Tabs / Accordions |

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
1. **Split Boys / Girls Hero (`section.hero`):**
   - Elementor Flexbox Container (`2 columns` on desktop, `1 column` stacked on mobile).
   - Two Call-to-Action / Banner containers with background image, gradient overlay, badge heading (`BOYS EDIT • 1Y–10Y`), `Fraunces` title, and button linking to `/product-category/boys/` and `/product-category/girls/`.
2. **Department Arch Tiles (`.cat-arch-grid`):**
   - 4-column CSS Grid container. Set image wrapper border radius to `140px 140px 12px 12px` in Elementor Advanced → Border settings.
3. **New Season Arrivals (`#home-featured-grid`):**
   - Elementor **Loop Grid** widget querying `Products` (6 items, ordered by Date or Featured tag).
4. **Made for Pakistani Seasons (`.story-split`):**
   - 2-column Flexbox Container (`--bg-sand` background). Left column: Icon Box list for the 3 fabric pillars. Right column: 3-image overlapping collage using absolute/relative positioning or CSS classes from `css/styles.css`.
5. **Interactive Shop the Look (`#shop-the-look`):**
   - Elementor **Image Hotspot** widget (built into Elementor Pro) placed on the courtyard lifestyle photograph, paired with a 3-item Product Loop list in the right column.
6. **Dual Collection Banners & Garment Anatomy Grid:**
   - Static Elementor Flexbox containers styled with `--bg-card` and `--border-subtle`.
7. **Fast Age / Size Finder Strip:**
   - 5-column button grid linking directly to `/shop/?filter_size=6-12m`, `/shop/?filter_size=2-3y`, etc.

### C. Shop / Category Page (`shop.html`)
- Build in **Elementor Theme Builder → Product Archive**.
- Top horizontal category bar using **Taxonomy Filter** or custom category term links.
- Left column (240px on desktop, slide-out Off-Canvas widget on mobile): WooCommerce Attribute Filter (`pa_size`) and Category Filter (`product_cat`).
- Right column: WooCommerce Archive Products Loop Grid + native WooCommerce Sorting dropdown (`orderby`).

### D. Single Product Page (`product.html`)
- Build in **Elementor Theme Builder → Single Product**.
- **Left Column:** WooCommerce Product Images widget (configured with left vertical thumbnails on desktop and bottom horizontal thumbnails on mobile).
- **Right Column:**
  - Product SKU + Age Range meta.
  - Product Title (`Fraunces`) + Product Price (`Rs.`).
  - Product Short Description.
  - **Add to Cart Widget:** With *Variation Swatches for WooCommerce* active, WooCommerce automatically renders the colour swatches and size buttons and enforces required size selection before enabling the Add to Cart button.
  - Size Guide Popup trigger button placed right above the `pa_size` selector.
  - Elementor **Accordion** widget populated dynamically via Dynamic Tags (*Garment Details*, *Fabric & Wash Care*, and global *Delivery & Exchange Policy*).
  - **Related Products** Loop Grid at the bottom (`3 columns`).

---

## 5. Pakistan-Specific WooCommerce Checkout Setup

Once moved to WordPress, configure these native WooCommerce settings:
1. **Shipping Zones:** Create a **Pakistan** zone with either a Flat Rate (e.g., `Rs. 250`) and/or Free Shipping above a minimum order amount.
2. **Payment Gateways:**
   - Enable **Cash on Delivery (COD)** (primary payment method for Pakistani ecommerce).
   - Enable **Direct Bank Transfer (BACS)** with the client's local bank / IBAN details.
   - Optional card gateway integration (PayFast Pakistan, Safepay, or JazzCash/Easypaisa WooCommerce plugin).
3. **Courier Integration:** Connect Leopard Courier, TCS, CallCourier, or PostEx WooCommerce plugin for automated airway bill generation and tracking SMS.
