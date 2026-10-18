# Little Traits

A static kidswear store preview for a Pakistani clothing brand. Five connected pages use HTML, CSS and vanilla JavaScript. The source is a reference for the eventual WordPress and WooCommerce build; ordering and contact submission are demos.

## Run and check

Node.js 18 or later is required. No dependency installation is needed.

```sh
npm start
npm run check
```

The local server uses port 4173. `npm run check` verifies required files, all six products, sizes, colours and local image references.

## Current design v2.0

- Cream, navy and gold remain the brand palette. Fraunces is reserved for the wordmark and large editorial/page titles; smaller headings and product names use Plus Jakarta Sans.
- The header has a solid background and a text wordmark. Primary shopping buttons are rounded rectangles; the hero keeps a pill CTA.
- Homepage: two manually controlled photo campaigns → Boys/Girls category links → four featured outfits → one editorial image and a short introduction → footer. The age strip, duplicate collection banners and icon-based craft/service modules are removed.
- The campaign uses arrows, dots, arrow keys and horizontal touch swipes. Slides crossfade; there is no timer or autoplay. Inactive content is inert and aria-hidden. Reduced motion also resets delays.
- Product cards use flat photo-led layouts, short names, prices and accurate single/two-tone colour swatches. There are no decorative size buttons, demo badges, card lifts or image zooms. A second image swaps on hover only when supplied; otherwise the first image remains.
- Shop departments are underlined text tabs. Size chips and sorting remain available. Featured sorting puts the four selected pieces first.
- About and Contact have shorter, practical copy. Contact has a working size guide, FAQs and a local-only form; invented contact details, dead channel buttons and unsupported production claims are removed.

## Catalogue and interactions

`js/data.js` owns store configuration, categories, sizes, the size guide and six demo products. IDs, slugs, prices, size ranges and category memberships remain stable. Unisex contains Rayan, Milo and Safa. Each product currently has one photographed colourway; only Amara and Rayan have a second verified view of the same outfit. Other products use one photo until genuine alternate views are available.

`js/app.js` owns the shared shell, search, size guide, demo checkout, product cards and persistent bag. Existing bags are reconciled against the current catalogue so old names and removed colourways do not survive the correction. `js/shop.js`, `js/product.js` and `js/home.js` own their respective views.

The bag, search, filters, quantity controls, size validation, Buy now and local checkout preview are interactive. No real order is placed and no contact message is sent. Stock photos are illustrative; client photography, actual product specifications, business contacts and confirmed delivery/exchange terms are still needed for production.

## Documentation

- `HANDOFF.md`: current structure, behaviour, checks and production dependencies.
- `DESIGN.md`: visual decisions and the v2.0 refinement; earlier sections are historical.
- `WORDPRESS-MAPPING.md`: translation to WooCommerce and Elementor.
