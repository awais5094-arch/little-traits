# Little Traits WordPress mapping

This repository is a static reference for a WordPress, Elementor and WooCommerce build. v2.0 is the current visual direction. Ordering and contact submission in the preview are local demos.

## Product data

| Prototype field | WooCommerce equivalent |
| --- | --- |
| id / sku | Product SKU; preserve stable identity |
| name | Product title |
| purchaseSummary | Short description |
| category and secondaryCategories | product_cat: boys, girls, unisex, baby, coords |
| price | Regular price in PKR |
| sizes | pa_size; required variation attribute |
| colors | pa_colour, using only confirmed photographed colourways |
| images | Featured image and real product gallery |
| featured | Featured product flag |
| details / fabricCare | Description and product tabs, populated from verified client details |

Current preview: six products, four featured; Unisex includes Rayan, Milo and Safa. Multiple category membership is deliberate. Incorrect alternate outfits and unverified material claims were removed. Keep existing slugs or provide redirects when changing them.

## Shared shell

Elementor Theme Builder header: solid cream background, text wordmark, shopping navigation including Unisex, search and bag. Collapse navigation before it crowds the logo. Announcement is one short useful line. Footer contains shop/help links, contact and a size-guide trigger. Keep the actual customer-care channels only when supplied by the client.

Build the size guide as an accessible popup with size, height (cm), chest (cm), waist (cm) and clear measurement guidance. Replace the reference measurements with the client’s actual garment chart before launch.

## Homepage

1. Two campaign slides using existing photography, one heading and CTA each. Manual arrows/dots, keyboard selection and swipe, a gentle crossfade and reduced-motion handling. No autoplay. On phones, image above copy; tablet/desktop use a split layout. Copy rows must expand intrinsically.
2. Two Boys/Girls photo links. Portrait proportions, text outside each photo, no overlaid pill buttons. Retain two columns on phones.
3. Four featured products in an Elementor Loop Grid: four columns on wide screens, two on mobile. Plain photo/name/price layouts with accurate colour swatches. One full-card link; no fake quick-add button or elevated card effect.
4. One editorial photograph with a short store introduction and About link.
5. Shared footer. Do not restore Shop by age, duplicate collection banners, craft icon bullets or service-card modules.

## Shop

Use a WooCommerce Product Archive with title/description and underlined department links. Keep the size filter, result count, native sorting and active-filter removal in one toolbar. No sidebar or filter drawer. Show a helpful empty state. Featured sorting should put the selected products first. Counts represent category memberships, so they do not sum to total stock.

## Single product

Use the real gallery at left; hide a thumbnail rail when only one photo exists. At right: title, one-sentence summary, price, colour, required size/guide, quantity plus primary Add to Bag, outline Buy now and one payment note. Three closed panels contain details, verified fabric/care information, delivery/exchanges. Do not repeat the summary in gallery captions and accordions. Related products have one heading.

Use native WooCommerce variation validation and cart/checkout. Keep the mobile sticky purchase control clear of the footer and respect safe-area insets. Never present a different garment as a colour variation.

## About and Contact

About: a short real introduction, one photograph and practical sizing/care guidance. Replace the preview story with client facts when available; do not invent founder/manufacturing/certification claims.

Contact: working size guide, FAQs before the form in reading order and actual verified customer-care channels. Replace the local demo form with a real form handler before changing the preview messaging. Remove demo labels only when the associated operation actually works.

## Style and accessibility

Retain cream/navy/gold; use serif on the wordmark and large editorial titles, sans-serif on smaller headings and product titles. Primary buttons use modest corners, with the hero CTA retaining its pill shape. Product cards are flat and photo-led. Avoid repeating label + serif heading + pill + icon in every section.

Audited touch controls need 44px targets; chip/thumbnail focus rings need 6px clearance. Muted text uses #5B6574. Use shrinkable grid tracks, cm in table headers and reduced-motion rules that reset delays. Test browser layouts and real mobile devices separately from source integrity checks.
