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
| `--bg-linen` | `#FDFBF7` | Primary page background — crisp, bright warm off-white cream |
| `--bg-sand` | `#F3EFE6` | Secondary section background, soft oatmeal sand frames, and pills |
| `--bg-oat` | `#E8E1D3` | Subtle hover surface and active card accents |
| `--bg-card` | `#FFFFFF` | Product card surface & modal backgrounds for crisp garment contrast |
| `--text-primary` / `--accent-navy` | `#1A2E4C` | Deep Midnight Navy — announcement bar, primary headings, pill buttons, and prices |
| `--text-secondary` | `#4A5970` | Slate Navy — subtitles, fabric notes, and descriptions |
| `--text-muted` | `#748296` | Muted Slate — SKU labels, age badges, and captions |
| `--accent-gold` | `#E5A83B` | Warm Golden Honey / Ochre — secondary pill buttons, badges, and playful highlights |
| `--accent-terracotta` | `#C2744B` | Cozy Caramel — warm secondary accent |
| `--accent-sage` | `#4D6F5E` | Meadow Sage — Boys collection badge, stock indicators, and botanical accents |
| `--accent-blush` | `#F2DFD7` | Soft Clay Blush — Girls collection accents and gentle callout backgrounds |
| `--border-subtle` | `#E5DFD3` | Hairline structural borders across cards, accordions, and tables |

---

## 4. Typography System

- **Editorial Headings (`--font-serif`):** `'Fraunces'` (Google Fonts, variable optical size, weights 400–600, Roman & Italic). Used for hero headlines, section titles, product names on the PDP, and editorial quotes. Gives a warm, storybook human touch without sacrificing legibility.
- **UI, Navigation & Pricing (`--font-sans`):** `'Plus Jakarta Sans'` (Google Fonts, weights 400–700). Used for navigation links, filter controls, size pills, PKR prices, and garment specifications.
- **Fluid Sizing:** Headings use `clamp()` (e.g., `--heading-xl: clamp(2rem, 3.8vw + 1rem, 3.35rem)`) for smooth scaling between `360px` mobile screens and `1440px` desktop monitors.

---

## 5. Layout, Spacing & Component Rules

- **Container & Grid:** Max width `1320px` (`--container-max`) with fluid horizontal padding (`1.25rem` on mobile up to `3.5rem` on desktop).
- **Avoidance of Generic AI Patterns:** No neon gradients, random floating blobs, glassmorphic cards, or fake customer review carousels. Visual interest comes from **arch-topped department frames** (`border-radius: 140px 140px 12px 12px`), **linen-bordered editorial collages**, **interactive numbered lookbook pins**, and **tactile garment anatomy cards**.
- **Product Card Discipline:**
  - `4:5` vertical portrait aspect ratio (`aspect-ratio: 4 / 5`) — standard for kidswear photography and works well with both child model shots and flat-lays.
  - Secondary image cross-fade on desktop hover.
  - Displays: Category + Age Range (`1Y – 10Y`), Title, Subtitle, Colour Swatch dots, available Size Pills, and clear `Rs.` price.
- **Motion & Accessibility:**
  - Gentle `0.3s cubic-bezier(0.22, 1, 0.36, 1)` transitions on hover and drawer slides.
  - Full `@media (prefers-reduced-motion: reduce)` support disabling animations when requested by the OS.
  - Visible `:focus-visible` outlines in `--accent-terracotta` (`#C86D51`) and semantic ARIA attributes (`aria-expanded`, `aria-pressed`, `role="dialog"`, `aria-live`).

---

## 6. Photographic Asset Sources & Licensing

All 26 photographs in `assets/images/` are stored locally (zero external image hotlinks) and sourced from **Unsplash** under the [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use, no watermark, attribution appreciated).

| Local Filename | Usage in Prototype | Unsplash Photo ID / Source URL |
| :--- | :--- | :--- |
| `hero-boys.jpg` | Homepage Boys Hero & `lt-01` Main | `https://images.unsplash.com/photo-1519238263530-99bdd11df2ea` |
| `hero-girls.jpg` | Homepage Girls Hero & `lt-02` Main | `https://images.unsplash.com/photo-1518831959646-742c3a14ebf7` |
| `editorial-play.jpg` | Homepage "Shop the Look: Courtyard Morning" | `https://images.unsplash.com/photo-1471286174890-9c112ffca5b4` |
| `editorial-rack.jpg` | Fabric Collage & Co-ords Spotlight Banner | `https://images.unsplash.com/photo-1567113463300-102a7eb3cb26` |
| `editorial-wardrobe.jpg` | Nursery Spotlight Banner | `https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4` |
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
| `fabric-buttons.jpg` | Homepage Fabric Collage (Folded Stack) | `https://images.unsplash.com/photo-1558769132-cb1aea458c5e` |
| `fabric-fold.jpg` | Auxiliary Textile Detail | `https://images.unsplash.com/photo-1620799140408-edc6dcb6d633` |

*(Note: When the client photographs their actual 10–15 garments, replacing these files in `assets/images/` or uploading them to the WordPress Media Library with a `4:5` portrait crop will preserve the exact visual balance of the layout.)*
