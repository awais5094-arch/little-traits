# Design System & Creative Direction (`DESIGN.md`)

## 1. Brand Positioning & "Middle Ground" Strategy

The client is launching a kidswear brand in Pakistan with an initial debut capsule of 10–15 pieces (represented in this prototype by 6 cohesive garments).

- **The Challenge:** Purely minimalist catalogue stores (like high-volume fast-fashion retailers) rely on massive seasonal campaign shoots to look appealing. With a smaller startup catalogue and modest studio/daylight photography, a bare white grid risks feeling sparse or generic. Conversely, overly decorative children's websites with heavy cartoons, gradients, and floating blobs distract from the clothing.
- **Our Creative Direction ("Sunlit Courtyard & Heirloom Cottons"):**
  We designed a warm, tactile, editorial-yet-shoppable storefront that frames modest photography inside soft linen surfaces, arched department frames, fabric-swatch storytelling, and clear age/size navigation. The design gives the brand immediate personality while keeping products, PKR prices, and size availability front and center.

### Temporary Brand Name
The workspace is titled `little traits`, so the storefront uses **Little Traits** (`Little Traits Pakistan`) as the working brand identity. It is centralized in `window.STORE_CONFIG` inside `js/data.js` and can be replaced globally in minutes once the client finalizes their trademark.

---

## 2. Reference Research & Extracted Principles

Before designing, four primary references were inspected:

1. **Rollover Pakistan (`https://rollover.com.pk/` & `/collections/boy`) — Verified Live Store**
   - *What we extracted:* Immediate gender/age collection entry points (`Boys` and `Girls`) right in the hero; unambiguous `Rs.` PKR pricing; high-utility size/age badges (`12M–14Y`); and horizontal sub-category pill strips at the top of collection pages for fast mobile filtering.
2. **Jamie Kay (`https://jamiekay.com/`) — Verified Live Store**
   - *What we extracted:* Warm bone and oatmeal background tones instead of stark `#FFFFFF`; refined serif headings paired with clean uppercase sans-serif micro-labels; subtle colour swatch dots on product cards; and emphasis on cotton/linen texture so simple studio or flat-lay photos feel luxurious.
3. **Konges Sløjd (`https://kongessloejd.com/`) — Verified Live Store**
   - *What we extracted:* Restrained nostalgic charm (tiny botanical leaf mark, quiet borders, generous whitespace around product cards) and structured editorial callouts that break up standard 3-column product grids.
4. **Rylee + Cru (`https://ryleeandcru.com/`) — Inspected via WebFetch Content** *(Note: Direct automated browser rendering encountered a Cloudflare bot challenge, so homepage structure and copy were inspected via fetched content)*
   - *What we extracted:* Sun-baked earthy palette (terracotta, sage, ochre), capsule "Shop the Look" outfit storytelling that shows how tops and bottoms pair together, and concise poetic copywriting.

---

## 3. Colour Palette & Surface Tokens

All colour tokens are defined in `:root` inside `css/styles.css` so they map 1:1 to Elementor Global Colours:

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| `--bg-canvas` | `#FDFBF7` | Primary page background — crisp, bright warm off-white cream |
| `--bg-sand` | `#F3EFE6` | Secondary section background, soft oatmeal sand frames, and pills |
| `--bg-oat` | `#EAE3D5` | Subtle hover surface and active card accents |
| `--bg-card` | `#FFFFFF` | Product card surface & modal backgrounds for crisp garment contrast |
| `--bg-sage-tint` / `--bg-ochre-tint` | `#EDF3EF` / `#FDF5E4` | Baby / Co-ords editorial banner panels |
| `--text-primary` / `--bg-navy` | `#1A2E4C` | Deep Midnight Navy — announcement bar, headings, primary buttons, prices |
| `--text-secondary` | `#4A5568` | Subtitles, fabric notes, and descriptions |
| `--text-muted` | `#6B7685` | Captions, age labels (≥4.5:1 on cream) |
| `--accent-gold` | `#E5A83B` | Golden Honey — **fills only**: Shop CTA on navy, badges, cart count, icon rules. ~2:1 on cream, so never use it for text on light surfaces |
| `--accent-gold-text` | `#9A6510` | Gold **text** on light surfaces: eyebrows, numerals, active-filter accents (4.7:1 on cream). `--accent-terracotta` aliases this |
| `--accent-caramel` | `#C2744B` | Warm secondary accent (sparingly) |
| `--accent-sage` | `#4D6F5E` | Meadow Sage — stock indicators and botanical accents |
| `--border-subtle` | `#E8E2D5` | Hairline borders across cards, accordions, and tables |

---

## 4. Typography System

- **Editorial Headings (`--font-serif`):** `'Fraunces'` (Google Fonts, variable optical size, weights 400–600, Roman & Italic). Used for hero headlines, section titles, product names on the PDP, and editorial quotes. Gives a warm, storybook human touch without sacrificing legibility.
- **UI, Navigation & Pricing (`--font-sans`):** `'Plus Jakarta Sans'` (Google Fonts, weights 400–700). Used for navigation links, filter controls, size pills, PKR prices, and garment specifications.
- **Fluid Sizing:** Headings use `clamp()` (e.g., `--heading-xl: clamp(2rem, 3.8vw + 1rem, 3.35rem)`) for smooth scaling between `360px` mobile screens and `1440px` desktop monitors.

---

## 5. Layout, Spacing & Component Rules

- **Container & Grid:** Max width `1320px` (`--container-max`) with fluid horizontal padding (`1.25rem` on mobile up to `3.5rem` on desktop).
- **Avoidance of Generic AI Patterns:** No neon gradients, random floating blobs, glassmorphic cards, or fake customer review carousels. Visual interest comes from real photography, soft tinted panels, pill shapes, and the serif/sans contrast — not from decoration on every section.
- **Product Card Discipline:**
  - `4:5` vertical portrait aspect ratio — standard for kidswear photography and works with both model shots and flat-lays.
  - Secondary image cross-fade on desktop hover.
  - Displays: age range + colour swatches, title, subtitle, `Rs.` price and a quiet "Choose size →" cue. Below 480px the subtitle and cue text hide so prices never wrap.
  - Badges are rare (`Signature`, `Limited` only). If every card has a badge, none of them mean anything.
  - The whole card is one link (`.product-card__link::after` stretched link); the image link is `tabindex="-1"` so keyboard users get one stop per product.
- **Button hierarchy (one primary per view):**
  - `.btn-primary` (navy) — the single main action: Add to Bag, Checkout, Send message, WhatsApp.
  - `.btn-outline` — secondary: Buy now (COD), Send an email, Open size chart.
  - `.btn-gold` — only on navy surfaces (About CTA card), where gold has contrast.
  - `.btn-light` / `.btn-light-outline` — on photos and navy.
  - `.link-arrow` / `.btn-text` — tertiary ("Shop all pieces", "Continue shopping").
- **Motion & Accessibility:**
  - Gentle `cubic-bezier(0.22, 1, 0.36, 1)` transitions; full `prefers-reduced-motion` support.
  - Navy `:focus-visible` outline (gold on navy surfaces).
  - Closed drawers/modals use `visibility: hidden` so they leave the tab order; the page behind an open overlay is `inert`; focus moves to the close button on open and returns to the trigger on close.

---

## 6. v1.2 Refinement — Direction & Decisions

The v1.2 pass (independent ecommerce design + frontend review) kept the identity, logo, palette and typography, and changed **structure, hierarchy and responsive behaviour**.

### Homepage order (shop first, story second)
1. **Split hero** — H1 + "Ages 6M – 10Y" + "Shop all 6 pieces", then two compact Boys/Girls photo panels (16/10 capped at 520px on desktop → 6/5 tablet → 4/5 → 3/4 phones). Both panels stay **side by side on mobile** so both entry points sit above the fold.
2. **Shop by age strip** — one pill card of size chips linking to `shop.html?size=…` + Size chart button. Replaces the old separate size-finder section.
3. **New Season Arrivals** — 6 products (now reached within ~1.5 screens on mobile).
4. **Craft story** — one merged section (image + 3 fabric/finishing points + "Read our story"). Replaces the old fabric story, garment anatomy and value-props strip, which repeated each other.
5. **Two editorial collection banners** — Baby ("First Steps Edit") and Co-ords ("Matching Sets for Siblings", sibling photo).
6. **Service bar** — COD, 7-day size exchange, nationwide delivery, small-batch quality.

Removed: arch collection tiles (duplicated hero + nav), the navy closing CTA (the footer follows directly). The deeper material/detail content moved to About rather than being deleted.

### Shop: one horizontal filter bar
Baymard's guidance for catalogues with few filter types is a horizontal toolbar with applied filters shown beneath it. With 6–15 pieces and only two facets (department, size), the old sidebar + mobile drawer + pill bar duplicated each other. Now:
- Department tabs (with counts) in the page header.
- Toolbar: size chips (scrollable; sizes with zero matches are dashed) + result count + sort. Sizes get their own row ≤1024px.
- Applied-filter tags below the toolbar; "Clear all" only when 2+ filters apply.
- Empty state offers "Show all sizes in X" and "Reset filters".

### PDP: purchase controls first
This describes the v1.2 pass; the current purchase panel is specified in §8 below.
- Info column order: age pill → title → fabric → price + "In stock • Cash on Delivery" → description → colour → size (with Size Guide) → Add to Bag (with live price) → outline "Buy now — Cash on Delivery" → 3 reassurance ticks → accordions.
- Mobile (≤768): single column, image capped at `min(72vh, 640px)`, and a **sticky bottom bar** (name, price/size, Add to Bag or "Choose size") appears once the main button scrolls out of view.
- Size validation scrolls to the size block and focuses the first size. Add to Bag opens the cart drawer instead of a toast that covered the drawer's CTA.

### About & Contact
- About owns the depth: story → "The details you feel" (numbered 01–04 list with one image) → navy CTA card.
- Contact leads with three tappable action cards (WhatsApp, Email, Size help), then the form beside the FAQ.

### Breakpoints
`1180` (editorial banners stack) · `1024` (mobile nav, 2-up grids, PDP thumbs below) · `900` (story/contact/about stack) · `768` (single-column PDP + sticky bar, short announcement, 60px header) · `600` (banners one column) · `480` (compact cards) · `360` (smaller logo, price dropped from the Add to Bag label).

---

## 7. Photographic Asset Sources & Licensing

The original 26 photographs in `assets/images/` are stored locally (zero external image hotlinks) and sourced from **Unsplash** under the [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use, no watermark, attribution appreciated). The two v1.5 campaign WebP assets were generated separately; see §10 for provenance and prompts.

| Local Filename | Usage in Prototype | Unsplash Photo ID / Source URL |
| :--- | :--- | :--- |
| `hero-boys.jpg` | Homepage Boys Hero & `lt-01` Main | `https://images.unsplash.com/photo-1519238263530-99bdd11df2ea` |
| `hero-girls.jpg` | Homepage Girls Hero & `lt-02` Main | `https://images.unsplash.com/photo-1518831959646-742c3a14ebf7` |
| `editorial-play.jpg` | About CTA card | `https://images.unsplash.com/photo-1471286174890-9c112ffca5b4` |
| `editorial-rack.jpg` | Fabric Collage & Co-ords Spotlight Banner | `https://images.unsplash.com/photo-1567113463300-102a7eb3cb26` |
| `editorial-wardrobe.jpg` | About story image | `https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4` |
| `p1-alt.jpg` | `lt-01` Alternate (Charcoal Botanical) | `https://images.unsplash.com/photo-1503919545889-aef636e10ad4` |
| `p1-detail.jpg` | `lt-01` Detail (Linen-Cotton Weave) | `https://images.unsplash.com/photo-1596870230751-ebdfce98ec42` |
| `p2-alt.jpg` | `lt-02` Alternate (Rosewater Clay) | `https://images.unsplash.com/photo-1543163521-1bf539c55dd2` |
| `p2-detail.jpg` | `lt-02` Detail (Gathered Cotton Tier) | `https://images.unsplash.com/photo-1519457431-44ccd64a579b` |
| `p3-main.jpg` | `lt-03` Main (Rayan Harbour Stripe Set) | `https://images.unsplash.com/photo-1485546246426-74dc88dec4d9` |
| `p3-alt.jpg` | `lt-03` Alternate (Ochre Sun Stripe) | `https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9` |
| `p3-detail.jpg` | `lt-03` Detail (Jersey Stitch Detail) | `https://images.unsplash.com/photo-1514090458221-65bb69cf63e6` |
| `p4-main.jpg` | `lt-04` Main (Noor Painterly Dot Smock) | `https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8` |
| `p4-alt.jpg` | `lt-04` Alternate (Flat-lay view) | `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af` |
| `p4-detail.jpg` | `lt-04` Detail (Muslin Dot Print) | `https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4` |
| `p5-main.jpg` | `lt-05` Main (Milo Cloud-Sherpa Romper) | `https://images.unsplash.com/photo-1522771930-78848d9293e8` |
| `p5-alt.jpg` | `lt-05` Alternate (Warm Biscuit Fleece) | `https://images.unsplash.com/photo-1519689680058-324335c77eba` |
| `p5-detail.jpg` | `lt-05` Detail (Hood & Ear Detail) | `https://images.unsplash.com/photo-1544126592-807ade215a0b` |
| `p6-main.jpg` | `lt-06` Main (Safa Sherpa & Bloomer Set) | `https://images.unsplash.com/photo-1604467794349-0b74285de7e7` |
| `p6-alt.jpg` | `lt-06` Alternate (Layered Flat-lay) | `https://images.unsplash.com/photo-1596870230751-ebdfce98ec42` |
| `p6-detail.jpg` | `lt-06` Detail (Stripe Cotton Bloomer) | `https://images.unsplash.com/photo-1567113463300-102a7eb3cb26` |
| `fabric-linen.jpg` | Homepage Fabric Collage (Macro Weave) | `https://images.unsplash.com/photo-1584100936595-c0654b55a2e2` |
| `fabric-buttons.jpg` | About "The details you feel" image | `https://images.unsplash.com/photo-1558769132-cb1aea458c5e` |
| `fabric-fold.jpg` | Auxiliary Textile Detail | `https://images.unsplash.com/photo-1620799140408-edc6dcb6d633` |

*(Note: When the client photographs their actual 10–15 garments, replacing these files in `assets/images/` or uploading them to the WordPress Media Library with a `4:5` portrait crop will preserve the exact visual balance of the layout.)*

## 8. v1.3 Product Purchase Panel — Current Direction

The purchase panel should help a parent choose and buy with little reading. Use this order: **title → one short sentence → price → colour → size → quantity + Add to Bag → Buy now**. Add one subdued COD note underneath. Keep the existing cream/navy/gold identity and type families.

- Remove the age badge, separate fabric summary, repeated colour/size values, price inside the primary button, and reassurance strip. The selected buttons already communicate the chosen options.
- Use `purchaseSummary` (about 8–11 words) for the panel. Preserve the full description, age range, garment/fit details and SKU in **Product details**. Fabric/care and delivery/exchanges stay in two more accordions, all closed initially.
- Keep the title fluid at 25.6–32px, with about 20–24px between the major control groups. Space should separate decisions without requiring long instructions or decorative panels.
- On phones ≤480px, show two named colour choices per row and four sizes per row; all options remain visible without horizontal scrolling. Quantity +/- targets are 44px wide, with a 16px input. Flexible grid tracks use `minmax(0, …)` so long titles/labels can wrap.
- The mobile shortcut appears only after the main purchase controls leave view. It shows the selected quantity's total and size/quantity, with Add to Bag or Choose size; hidden controls leave the accessibility tree/tab order. Main Add to Bag and Buy now remain visually distinct.
- Quantity changes update the existing controls, preserving click targets and focus. Never rebuild the whole product panel when the quantity input blurs.

Verification limits for this pass are recorded in `HANDOFF.md`; the previous pass's browser measurements are historical.

## 9. Client Preview Polish (v1.4)

Keep the approved page structure and visual identity. The header switches to menu navigation at 1180px so the centered logo is not squeezed by both desktop link groups. Contact form columns shrink below 200px; field text is 16px. Shop filters retain keyboard focus and chip position, update the active header department, and dialogs contain keyboard navigation. Unconfirmed WhatsApp/email channels use preview buttons rather than working links to invented contact details. The footer uses the short label **Design preview**.

This pass completed source/controller checks; fresh browser visual signoff could not be completed because the browser timed out. See `HANDOFF.md` §7 for the exact scope.

## 10. Campaign-First Homepage (Client Revision, v1.5)

Historical first banner pass; the current layout, rotation and photo sources are in §11.

The client approved the design but felt that the standalone long heading made the opening resemble an article. The new opening is **campaign banner → 32–48px breathing room → Boys/Girls tiles → age strip → products**. The campaign uses a short two-line shopping headline and one Shop CTA. Two campaigns can be selected manually; no autoplay, fake sale, discount badge or extra introductory copy.

Desktop: navy copy on sand/cream beside a campaign photograph, approximately 380–480px high. Mobile ≤768px: 3:2 photo above a compact headline/CTA, with the supporting paragraph hidden. The banner retains the existing rounded corners, Fraunces and Plus Jakarta Sans. Boys/Girls tiles remain side by side, with only the title and visual CTA, and the full tile is one link.

### Generated campaign assets

Both assets use **built-in imagegen**, not CLI/API fallback. Originals were generated as 1536×1024 PNGs; project copies use WebP quality 84 without cropping. They are campaign concepts, not photographs of confirmed client inventory. Existing product/category images and the logo were preserved.

- `assets/images/campaign-season.webp` — New Season campaign, approximately 165KB.
- `assets/images/campaign-baby.webp` — Baby & Toddler campaign, approximately 203KB.

Final prompt — New Season:

> Use case: ads-marketing. Asset type: real photographic imagery for a premium Pakistani children's clothing ecommerce homepage banner, image only, no typography. Create a polished natural fashion campaign photograph, wide landscape 3:2 composition. Two Pakistani/South Asian children about 5 and 7 years old, a boy and a girl, standing next to each other in a relaxed playful candid pose. Full garments clearly visible, heads and shoes safely within frame with generous breathing room. Boy wears a cream cotton grandad collar shirt and warm honey ochre relaxed chinos; girl wears a navy blue cotton tiered dress with understated ruffled trim, ivory socks and simple shoes. Tasteful everyday kidswear, age appropriate. Warm cream textured studio wall and soft sand floor, natural afternoon light with subtle shadows, an understated honey-gold arch painted on the wall, no unrelated props. Children centered as a group within central 65% of image, so the image can be cropped to a square. Natural skin texture, authentic cotton fabric texture, warm candid expressions, premium catalog photography, not glossy plastic, no cartoon rendering. No logos, no text, no watermarks, no frames, no embedded UI. Palette cream #FDFBF7, navy #1A2E4C and muted honey #E5A83B.

Final prompt — Baby & Toddler:

> Use case: ads-marketing. Asset type: real photographic imagery for a premium Pakistani baby and toddler clothing ecommerce campaign banner, image only, no typography. Wide landscape 3:2 fashion campaign photograph. Two Pakistani/South Asian toddlers around 2 and 3 years old, seated side by side on a low broad cream upholstered bench, naturally playing together with one small plain wooden stacking toy. One wears an oatmeal cotton-lined sherpa hooded jacket and warm ochre striped bloomer shorts with cream socks; the other wears a soft ivory hooded one-piece romper with tiny bear ears. Full outfits and both faces remain safely inside frame. Warm cream studio wall, sand floor, muted honey-gold curtain edge in far background, soft diffused window daylight, cozy but clean premium ecommerce catalog styling. Subjects as a centered group within the middle 65% so square mobile crops preserve them. Authentic cotton and sherpa texture, natural expressions and realistic small hands, premium candid photography, not cartoon, no plastic skin. No text, no logos, no watermarks, no embedded UI, no borders. Consistent soft cream #FDFBF7, sand #F3EFE6, muted honey accents #E5A83B with tiny navy clothing details.

## 11. Campaign Grid & Real Stock Photo Provenance — v1.6 / v1.7

Slide copy uses equal CSS Grid rows, not vertical centering based on the varying total text height: eyebrow, a two-line title slot, a two-line description slot and a fixed-height CTA. Current v1.7 desktop slide height is `clamp(380px, 33vw, 440px)`; phones ≤600px have a 3:2 image above compact left-aligned copy. Tablets 601–768px use a 360px-tall split frame. Dots/Pause overlay the upper left of the photo, so the CTA needs no separate control footer. Keep the reserved rows if copy changes. Do not hide overflow or truncate the description to simulate alignment.

The slider rotates every 6 seconds with a short opacity transition. Pause/Play is always available; hover, keyboard focus, hidden tab, offscreen state and overlays suspend rotation. Reduced-motion users start paused. Auto-rotation never moves focus or announces every slide.

### Current photo provenance (verified October 18, 2026)

| Local asset | Photographer | Photo page | Downloaded source |
| --- | --- | --- | --- |
| `assets/images/campaign-season-real.webp` | Vika Glitter | [Three children wearing white shirts](https://www.pexels.com/photo/three-children-wearing-white-shirts-while-sitting-on-white-surface-14571366/) | https://images.pexels.com/photos/14571366/pexels-photo-14571366.jpeg?auto=compress&cs=tinysrgb&w=1600 |
| `assets/images/campaign-baby-real.webp` | Matilda Wormwood | [A person holding baby clothes](https://www.pexels.com/photo/a-person-holding-baby-clothes-7484842/) | https://images.pexels.com/photos/7484842/pexels-photo-7484842.jpeg?auto=compress&cs=tinysrgb&w=1600 |

Both photo pages identify the images as free stock and link to the [Pexels License](https://www.pexels.com/license/), which was read directly. It permits website and promotional use subject to its restrictions, including no implied endorsement. These are illustrative stock assets for the design preview, not proof of the client's actual inventory. Attribution is recorded here even though Pexels does not require it. Files were encoded as WebP quality 86 with their original downloaded framing; no generated replacement or semantic photo editing was applied. Combined size is approximately 126KB.

## 12. Compact, Left-Aligned Retail Hero — v1.7

### Research and interpretation (October 18, 2026)

- [Hopscotch Pakistan](https://ilovehopscotch.com/): the current mobile view uses a clear campaign followed immediately by category photography. The useful principle is fast campaign recognition and a short path into shopping. Its sale offer and art direction are not adopted.
- [Bachaa Party](https://www.bachaaparty.com/): source content places its seasonal campaign and Shop Now before Shop By Category. A location popup obscured the initial screenshot, so the linked campaign images were inspected directly: [desktop asset](https://www.bachaaparty.com/cdn/shop/files/Web-banner_jpg_d4f0fda6-55b7-4cac-9b08-3ef3efd278ad.jpg?v=1790957083) and [mobile asset](https://www.bachaaparty.com/cdn/shop/files/Mob-banner_jpg_42902cac-95f3-48a7-a8e0-8875b94efb29.jpg?v=1790957097). The mobile asset rearranges its short headline, photo and shopping prompt for the smaller frame.
- [Minnie Minors](https://www.minnieminors.com/) was checked but its promotional overlay prevented a useful hero comparison. It did not determine the new layout.

The design inference is to give the existing photo, a concise headline and one shopping action the space, while bringing Boys/Girls into view sooner. This is a visual reference review, not a conversion study. No competitor images or text are used in the site.

### Applied composition

- Existing photos and their provenance in §11 are retained without file changes. The desktop split is 42.5% copy / 57.5% photo, with a 380–440px frame.
- Phone copy (≤600px) starts from the left, with 18–24px horizontal inset and 20px vertical padding. Fraunces stays consistent with the brand, using weight 600, line-height 1.04 and a responsive 28–35.2px title instead of a wide centered heading.
- Shared Grid rows reserve a two-line title and two-line description. Both campaign buttons therefore share the same vertical position even when description lengths differ. The mobile copy area is approximately 225–241px, down from 312px.
- Tablets (601–768px) keep a 360px split frame, a 28–32px title, compact CTA and controls beneath the copy; the large stacked photo is reserved for phones.
- Phone dots and Pause/Play sit in a compact light pill over the photograph; each control keeps its 44px target. Desktop arrows remain. Autoplay, reduced-motion behavior and keyboard controls are unchanged.
- Copy: **Everyday favourites / Made for play. Loved all day. / Feel-good cottons for every little adventure. / Shop new arrivals.** Second campaign: **Baby & toddler / Small outfits. Big cuddles. / Soft, easy layers for their first adventures. / Shop Baby & Toddler.**
