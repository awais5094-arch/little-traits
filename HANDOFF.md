# Little Traits handoff

## Current version

v2.0, October 18, 2026. This replaces the earlier promotional homepage structure after an independent Claude audit and the user’s request to reduce the AI-template appearance. The existing palette, hero photographs, connected pages, Unisex category and removal of the homepage age strip are preserved.

## Pages and visual direction

- `index.html`: two manual campaign slides with concise headings and one CTA each; Boys/Girls photo links; four featured products; one editorial image with a short paragraph; shared footer. No extra campaign banners, icon circles, service-card strip, repetitive eyebrows or homepage age strip.
- `shop.html`: six department tabs including All and Unisex; size chips, result count, sorting, active filters and empty recovery. Counts represent overlapping category memberships, not mutually exclusive inventories. Featured sorting uses the actual flags.
- `product.html`: gallery, short name and summary, price, colour, required size with guide, quantity and primary Add to Bag, outline Buy now, three closed accordions and four related pieces. Redundant gallery captions, repeated material copy and the extra related-products label are removed. One-photo products do not render a redundant thumbnail rail.
- `about.html`: one photo/introduction and a short practical guide. No invented founder, manufacturing, certification or origin story, numbered decorative cards or repeated navy CTA panel.
- `contact.html`: size help, FAQs and a plainly labelled local-only enquiry form. There are no fake WhatsApp/email contacts or channel buttons that pretend to send messages.

Cream, navy and gold remain unchanged. Large campaign/page headings retain Fraunces. Smaller headings and product titles use Plus Jakarta Sans. Product cards have no container border, lift, shadow or image zoom; buttons and secondary filters use modest corners. Department photos retain their portrait proportions, with titles outside the image instead of overlays and pill CTAs.

## Catalogue

| ID | Product | Primary category | Photography |
| --- | --- | --- | --- |
| lt-01 | Zayd Shirt & Trouser Set | boys | One photographed outfit |
| lt-02 | Amara Ruffle Frock | girls | Two views of the same red frock |
| lt-03 | Rayan Stripe Set | boys | Two views of the same striped tee and green shorts |
| lt-04 | Noor Dot Tunic | girls | One photographed outfit |
| lt-05 | Milo Bear Romper | baby | One grey hooded romper |
| lt-06 | Safa Jacket & Shorts Set | unisex | One cream hooded jacket and striped shorts outfit |

Prices, IDs, slugs, sizes and department memberships are retained. Slugs intentionally keep compatibility with existing preview links. lt-03, lt-05 and lt-06 belong to Unisex. Featured products are lt-01, lt-02, lt-03 and lt-06. There are six catalogue products total; four are shown on the homepage.

Incorrect alternate outfits, fabric reference images presented as product photos, unverified colourways, demo badges, precise fabric compositions, organic/azo-free/nickel-free claims and inconsistent capsule counts are removed. Real fabric and construction details must come from the client. A single honest product view is preferable to an invented alternate outfit.

## Controllers and state

- `js/app.js`: shared navigation/footer; cart key `little_traits_demo_cart_v1`; bag, search, size guide and checkout preview. Reading an existing bag reconciles product names, prices and removed colours against the current catalogue and merges duplicate lines after migration. Search includes secondary categories.
- `js/home.js`: manual arrows/dots, keyboard navigation, touch swipe and crossfade state. No autoplay or pause button. Vertical gestures do not change slides; cancelled gestures clear their starting point. Inactive content is inert and aria-hidden.
- `js/shop.js`: query parameters for category, size and sort; counts, empty state, applied filters, focus and scroll preservation.
- `js/product.js`: required size, selected colour and image, quantity updates without replacing pressed controls, accordions, related products and a stable mobile sticky purchase bar. Quantity clamps to 1–15 on the PDP.
- Overlay management retains focus trapping, Escape/backdrop close, restored focus and inert background content.

## Accessibility and sizing

Muted text is darkened to `#5B6574`. Size/category/sort/filter/footer/cart and carousel targets addressed in the audit are at least 44px. Chip scrollers and thumbnail rails have 6px focus clearance. Product grids use shrinkable `minmax(0, 1fr)` tracks. Size-chart column headings include cm. Reduced-motion rules reset animation/transition delays as well as durations. The carousel copy uses intrinsic rows and a shared minimum-height frame instead of fixed description slots.

## Verification

Source checks: required files/product assets, JavaScript syntax, local links and duplicate IDs, CSS brace balance and git whitespace checks. Controller checks: all six PDPs, required size, current colour/image, typed quantity, cart totals, Buy now, accordions, sticky controls; shop filtering, counts, sorting, empty recovery and navigation/focus; search escaping and category search; manual carousel controls, wrapping, keyboard/swipe/vertical/cancelled gestures and inactive-slide accessibility; local-only contact form.

Rendered browser review is a separate publication step. Do not treat source/controller checks as screenshots, numeric responsive layout measurements or physical-device tests.

## Before WordPress launch

Obtain final branding, business contacts, product photos and stock, real material/care specifications, actual garment measurements, delivery pricing, exchange terms and payment/courier configuration. Use native WooCommerce order handling. The preview never places an order or sends a message. No invented reviews, newsletter collection or fake contact channel is added.

## Rendered review of v2.0

After publishing commit f083396, the live browser confirmed the new homepage and four-card grid at a 1363px viewport; the document width was 1348px, with no horizontal overflow at that width. Both hero slides settled correctly after manual selection. Unisex displayed Rayan, Safa and Milo. Safa’s required-size feedback, selecting 2–3Y, Add to Bag and the exact Rs. 4,890 checkout-preview summary were exercised in the live browser.

Fresh Firecrawl browser renders were visually inspected for the complete homepage at 390px and 320px and Safa’s product page at 390px. They showed clear hero CTA/dot separation, two-column department/product layouts, readable product controls and no visible clipping. These are emulated browser screenshots, not physical-device or cross-browser checks.

A follow-up trims the shop header’s redundant breadcrumb/age label and hides a redundant category-removal tag when category is the only filter. Category title/tab/active navigation remain. Combined size/category filters still show removable tags. FAQs now precede the form in DOM order as well as visually.
