/**
 * LITTLE TRAITS — DEMO CATALOGUE & STORE CONFIGURATION
 * 
 * Separated from presentation and UI logic so this maps directly to
 * WooCommerce Variable Products, Product Categories, and Product Attributes.
 * 
 * Note: Brand name "Little Traits" (taken from project workspace) is defined in
 * STORE_CONFIG and can be replaced in one place when final client branding is confirmed.
 */

window.STORE_CONFIG = {
  brandName: "Little Traits",
  brandTagline: "Soft Cottons & Playful Heirlooms",
  currency: "PKR",
  currencySymbol: "Rs.",
  // Unconfirmed business details marked clearly as placeholders per brief
  shippingNote: "Standard nationwide delivery across Pakistan (Placeholder — courier partner & flat rate to be confirmed by client)",
  exchangeNote: "Size exchanges accepted within 7 days on unworn garments with original tags (Placeholder policy)",
  supportNote: "Customer care via WhatsApp & Email • Mon–Sat, 10am–6pm PKT (Placeholder contact)"
};

window.CATEGORIES = [
  {
    id: "all",
    slug: "all",
    name: "All Pieces",
    shortLabel: "Shop All",
    ageSpan: "6M – 10Y",
    description: "Every piece from our debut seasonal edit — breathable cottons, soft weaves, and comfortable silhouettes made for everyday play.",
    accentColor: "#F3EDE2"
  },
  {
    id: "boys",
    slug: "boys",
    name: "Boys",
    shortLabel: "Boys",
    ageSpan: "1Y – 10Y",
    description: "Relaxed linen-cotton shirts, smart knit layering, and durable co-ord sets built for climbing, running, and family gatherings.",
    accentColor: "#E4ECE6"
  },
  {
    id: "girls",
    slug: "girls",
    name: "Girls",
    shortLabel: "Girls",
    ageSpan: "1Y – 10Y",
    description: "Gathered lawn frocks, hand-stamped botanical prints, and airy smock silhouettes with gentle movement.",
    accentColor: "#F6E7E4"
  },
  {
    id: "baby",
    slug: "baby",
    name: "Baby & Toddler",
    shortLabel: "Baby (6M–3Y)",
    ageSpan: "6M – 3Y",
    description: "Feather-soft rompers, fleecy hooded onesies, and gentle knits with nickel-free snaps for our littlest explorers.",
    accentColor: "#EFECE6"
  },
  {
    id: "coords",
    slug: "coords",
    name: "Co-ords & Knits",
    shortLabel: "Sets & Knits",
    ageSpan: "6M – 8Y",
    description: "Thoughtfully paired two-piece sets and heirloom-grade knitwear designed to mix, match, and pass down.",
    accentColor: "#F5ECD9"
  }
];

window.ALL_SIZES = [
  "6-12M",
  "12-18M",
  "18-24M",
  "2-3Y",
  "3-4Y",
  "4-5Y",
  "5-6Y",
  "6-7Y",
  "7-8Y",
  "8-10Y"
];

window.SIZE_GUIDE_DATA = [
  { size: "6-12M", heightCm: "68 – 76 cm", chestCm: "46 – 48 cm", waistCm: "45 – 47 cm", ageLabel: "6 – 12 Months" },
  { size: "12-18M", heightCm: "76 – 83 cm", chestCm: "48 – 50 cm", waistCm: "47 – 49 cm", ageLabel: "12 – 18 Months" },
  { size: "18-24M", heightCm: "83 – 90 cm", chestCm: "50 – 52 cm", waistCm: "49 – 50 cm", ageLabel: "18 – 24 Months" },
  { size: "2-3Y", heightCm: "90 – 98 cm", chestCm: "52 – 54 cm", waistCm: "50 – 51 cm", ageLabel: "2 – 3 Years" },
  { size: "3-4Y", heightCm: "98 – 104 cm", chestCm: "54 – 56 cm", waistCm: "51 – 52 cm", ageLabel: "3 – 4 Years" },
  { size: "4-5Y", heightCm: "104 – 110 cm", chestCm: "56 – 58 cm", waistCm: "52 – 54 cm", ageLabel: "4 – 5 Years" },
  { size: "5-6Y", heightCm: "110 – 116 cm", chestCm: "58 – 60 cm", waistCm: "54 – 55 cm", ageLabel: "5 – 6 Years" },
  { size: "6-7Y", heightCm: "116 – 122 cm", chestCm: "60 – 63 cm", waistCm: "55 – 57 cm", ageLabel: "6 – 7 Years" },
  { size: "7-8Y", heightCm: "122 – 128 cm", chestCm: "63 – 66 cm", waistCm: "57 – 59 cm", ageLabel: "7 – 8 Years" },
  { size: "8-10Y", heightCm: "128 – 140 cm", chestCm: "66 – 71 cm", waistCm: "59 – 62 cm", ageLabel: "8 – 10 Years" }
];

window.PRODUCTS = [
  {
    id: "lt-01",
    slug: "zayd-windowpane-linen-cotton-set",
    sku: "LT-AW26-01",
    name: "Zayd Windowpane Linen-Cotton Set",
    shortSubtitle: "Mandarin Collar Shirt & Twill Chinos",
    price: 4250,
    category: "boys",
    secondaryCategories: ["coords"],
    badge: "New Arrival",
    featured: true,
    ageGroup: "2Y – 8Y",
    fabricSummary: "70% Combed Cotton, 30% Breathable Linen",
    colors: [
      {
        name: "Meadow Check & Ochre",
        hex: "#A3B19B",
        secondaryHex: "#C89D66",
        imageIndex: 0
      },
      {
        name: "Charcoal Botanical",
        hex: "#4A524D",
        secondaryHex: "#D8D2C7",
        imageIndex: 1
      }
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y"],
    images: [
      {
        src: "assets/images/hero-boys.jpg",
        alt: "Young boy wearing the Zayd Windowpane Linen-Cotton Shirt and Ochre Twill Chinos outdoors",
        caption: "Relaxed mandarin-collar linen blend shirt paired with soft ochre twill chinos."
      },
      {
        src: "assets/images/p1-alt.jpg",
        alt: "Alternate view in Charcoal Botanical collared shirt and matching shorts",
        caption: "Charcoal Botanical colourway crafted for warm afternoon outings."
      },
      {
        src: "assets/images/p1-detail.jpg",
        alt: "Close-up of breathable natural linen-cotton weave texture",
        caption: "Close-up of our pre-washed linen-cotton weave — soft from the very first wear."
      }
    ],
    shortDescription: "An effortlessly smart two-piece set combining a mandarin-collar windowpane shirt with soft, pull-on cotton twill chinos.",
    details: [
      "Mandarin grandad collar with natural coconut-shell buttons",
      "Soft elastic inner waistband on chinos for easy dressing",
      "Roll-tab sleeves and ankle-grazer relaxed taper",
      "Pre-washed fabric to minimize shrinkage and soften texture"
    ],
    fabricCare: "70% combed Pakistani cotton, 30% linen. Machine wash cold on gentle cycle with similar colours. Line dry in shade; warm iron if desired."
  },
  {
    id: "lt-02",
    slug: "amara-ruffled-crimson-frock",
    sku: "LT-AW26-02",
    name: "Amara Ruffled Heirloom Frock",
    shortSubtitle: "Tiered Combed Cotton Dress",
    price: 4690,
    category: "girls",
    secondaryCategories: [],
    badge: "Signature Piece",
    featured: true,
    ageGroup: "2Y – 10Y",
    fabricSummary: "100% Combed Mercerised Cotton",
    colors: [
      {
        name: "Pomegranate Red",
        hex: "#B8332A",
        secondaryHex: "#F4EDE2",
        imageIndex: 0
      },
      {
        name: "Ivory Lace",
        hex: "#F2ECE1",
        secondaryHex: "#D9C5B2",
        imageIndex: 2
      }
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y"],
    images: [
      {
        src: "assets/images/p2-main.jpg",
        alt: "Smiling young girl wearing the Amara Ruffled Heirloom Frock in Pomegranate Red",
        caption: "Pie-crust ruffled collar and flared cuffs in rich pomegranate red."
      },
      {
        src: "assets/images/hero-girls.jpg",
        alt: "Full-length view showing tiered skirt volume and movement of the Amara Frock",
        caption: "Generous gathered waist and tiered hem designed for twirling."
      },
      {
        src: "assets/images/p2-alt.jpg",
        alt: "Flat-lay detail of the Ivory Lace variation on a white table",
        caption: "Delicate texture and trim detail on the Ivory Lace variation."
      }
    ],
    shortDescription: "A festive yet comfortable tiered frock featuring a pie-crust ruffle neckline, billowy bell sleeves, and a full gathered skirt.",
    details: [
      "Soft pie-crust ruffled stand collar that never scratches",
      "Horizontal yoke ruffle and gently elasticated bell cuffs",
      "Keyhole back closure with mother-of-pearl buttons",
      "Fully lined bodice in breathable 100% pure cotton lawn"
    ],
    fabricCare: "100% combed cotton outer and lining. Wash dark reds separately in cold water. Do not bleach; hang dry away from direct sunlight."
  },
  {
    id: "lt-03",
    slug: "rayan-harbour-stripe-play-set",
    sku: "LT-AW26-03",
    name: "Rayan Harbour Stripe Play Set",
    shortSubtitle: "Slub Jersey Tee & Washed Denim Shorts",
    price: 3490,
    category: "boys",
    secondaryCategories: ["coords", "baby"],
    badge: "Everyday Essential",
    featured: true,
    ageGroup: "12M – 6Y",
    fabricSummary: "100% Organic Cotton Jersey & Soft Chambray Denim",
    colors: [
      {
        name: "Harbour Stripe & Teal",
        hex: "#3A6B7C",
        secondaryHex: "#C94A38",
        imageIndex: 0
      },
      {
        name: "Sandstone & Indigo",
        hex: "#D4C3AE",
        secondaryHex: "#2F435A",
        imageIndex: 2
      }
    ],
    sizes: ["12-18M", "18-24M", "2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    images: [
      {
        src: "assets/images/p3-main.jpg",
        alt: "Toddler boy wearing the Rayan Harbour Stripe Tee and Teal washed denim shorts",
        caption: "Breathable striped cotton jersey tee paired with soft-washed teal shorts."
      },
      {
        src: "assets/images/p3-alt.jpg",
        alt: "Full-body outdoor view of the Rayan Harbour Stripe Play Set",
        caption: "Cut with extra room through the seat and knees for unrestricted play."
      },
      {
        src: "assets/images/p3-detail.jpg",
        alt: "Folded stack of soft combed cotton jersey fabrics",
        caption: "Combed single-jersey knit that holds its shape wash after wash."
      }
    ],
    shortDescription: "Built for sunlit mornings and park adventures, pairing a yarn-dyed striped jersey tee with ultra-soft washed cotton shorts.",
    details: [
      "Yarn-dyed stripes that stay crisp without fading",
      "Ribbed crew neckline with shoulder snap buttons on sizes up to 24M",
      "Soft-washed teal denim shorts with rolled cuffs and stretch waist",
      "Tagless heat-pressed neck label for zero itchiness"
    ],
    fabricCare: "Tee: 100% combed cotton jersey (180 GSM). Shorts: 98% cotton, 2% elastane. Machine wash warm; tumble dry low."
  },
  {
    id: "lt-04",
    slug: "noor-polka-smock-tunic-set",
    sku: "LT-AW26-04",
    name: "Noor Painterly Dot Smock & Shorts",
    shortSubtitle: "Hand-Stamped Muslin Tunic Set",
    price: 3950,
    category: "girls",
    secondaryCategories: ["coords"],
    badge: "New Arrival",
    featured: true,
    ageGroup: "2Y – 8Y",
    fabricSummary: "100% Double-Gauze Cotton Muslin",
    colors: [
      {
        name: "Chalk & Charcoal Dot",
        hex: "#F5F2EB",
        secondaryHex: "#383838",
        imageIndex: 0
      },
      {
        name: "Garden Floral",
        hex: "#DCE5DC",
        secondaryHex: "#7A9A82",
        imageIndex: 1
      }
    ],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y"],
    images: [
      {
        src: "assets/images/p4-main.jpg",
        alt: "Young girl in the Noor Painterly Dot Smock Tunic and cuffed denim shorts",
        caption: "Airy babydoll smock tunic in painterly charcoal dots over cuffed shorts."
      },
      {
        src: "assets/images/p4-alt.jpg",
        alt: "Girl wearing the Garden Floral summer variation with sun hat",
        caption: "Lightweight breathable weave suited for warm Pakistani afternoons."
      },
      {
        src: "assets/images/p4-detail.jpg",
        alt: "Interior studio detail of quilted honeycomb cotton texture hanging by window",
        caption: "Textured cotton weave with delicate waist pleats and bow accents."
      }
    ],
    shortDescription: "An artistic babydoll smock tunic featuring irregular brushstroke polka dots, paired with cuffed indigo cotton shorts.",
    details: [
      "High empire waist with gentle gathers for breezy airflow",
      "Relaxed long sleeves that roll effortlessly to the elbow",
      "Includes matching cuffed soft-denim shorts with adjustable inner waist",
      "Printed with water-based, azo-free pigments safe for sensitive skin"
    ],
    fabricCare: "100% double-gauze cotton muslin tunic; 100% cotton shorts. Gentle cold wash; shake out before drying to preserve crinkle texture."
  },
  {
    id: "lt-05",
    slug: "milo-cloud-fleece-bear-onesie",
    sku: "LT-AW26-05",
    name: "Milo Cloud-Sherpa Bear Romper",
    shortSubtitle: "Hooded Baby & Toddler All-in-One",
    price: 3650,
    category: "baby",
    secondaryCategories: [],
    badge: "Baby Favourite",
    featured: true,
    ageGroup: "6M – 24M",
    fabricSummary: "Organic Cotton Jersey Lined Sherpa Fleece",
    colors: [
      {
        name: "Cocoa Bear",
        hex: "#6E5243",
        secondaryHex: "#E8E2D9",
        imageIndex: 0
      },
      {
        name: "Pebble Grey",
        hex: "#B8B5AE",
        secondaryHex: "#F4F1EA",
        imageIndex: 1
      }
    ],
    sizes: ["6-12M", "12-18M", "18-24M"],
    images: [
      {
        src: "assets/images/p5-main.jpg",
        alt: "Baby sitting on white bedding wearing the Milo Cloud-Sherpa Bear Romper in Cocoa",
        caption: "Plush cocoa sherpa romper with sculpted bear ears on the hood."
      },
      {
        src: "assets/images/p5-alt.jpg",
        alt: "Smiling baby wearing the Pebble Grey buttoned romper on a soft rug",
        caption: "Pebble Grey variation with soft-touch front closure."
      },
      {
        src: "assets/images/p5-detail.jpg",
        alt: "Flat-lay detail of infant bodysuits and soft cotton trims",
        caption: "100% combed cotton interior lining keeps baby cosy without overheating."
      }
    ],
    shortDescription: "Our cosiest all-in-one romper with playful bear ears on the hood and a pure combed-cotton jersey lining against baby's skin.",
    details: [
      "Full-length asymmetrical zip with chin guard for quick diaper changes",
      "Lined inside with 100% breathable organic cotton jersey",
      "Fold-over cuffs on hands and feet to keep little fingers and toes warm",
      "Nickel-free hardware tested for infant safety"
    ],
    fabricCare: "Outer: Plush recycled-blend sherpa fleece. Lining: 100% organic cotton. Machine wash cold inside out; air dry flat."
  },
  {
    id: "lt-06",
    slug: "safa-sherpa-jacket-bloomer-set",
    sku: "LT-AW26-06",
    name: "Safa Sherpa Jacket & Stripe Bloomer Set",
    shortSubtitle: "versatile Two-Piece Layering Outfit",
    price: 4890,
    category: "coords",
    secondaryCategories: ["baby", "boys", "girls"],
    badge: "Limited Edit",
    featured: true,
    ageGroup: "6M – 4Y",
    fabricSummary: "Bouclé Fleece & Yarn-Dyed Cotton Twill",
    colors: [
      {
        name: "Oatmeal & Ochre Stripe",
        hex: "#EFECE4",
        secondaryHex: "#C69253",
        imageIndex: 0
      },
      {
        name: "Navy Trim Classic",
        hex: "#28364A",
        secondaryHex: "#7FA5C9",
        imageIndex: 1
      }
    ],
    sizes: ["6-12M", "12-18M", "18-24M", "2-3Y", "3-4Y"],
    images: [
      {
        src: "assets/images/p6-main.jpg",
        alt: "Toddler walking outdoors wearing the Safa Oatmeal Sherpa Hooded Jacket and Ochre Stripe Bloomers",
        caption: "Oatmeal hooded sherpa jacket paired with yarn-dyed ochre striped bloomer shorts."
      },
      {
        src: "assets/images/p1-main.jpg",
        alt: "Young boy smiling in the Navy Trim Classic knit layering variation",
        caption: "Navy Trim Classic colourway styled for crisp mornings and family gatherings."
      },
      {
        src: "assets/images/p6-alt.jpg",
        alt: "Stack of folded warm neutral knitwear and fleeces",
        caption: "Plush, lightweight warmth that layers easily over everyday tees."
      }
    ],
    shortDescription: "A gender-neutral transitional set pairing a hooded oatmeal bouclé jacket with yarn-dyed ochre and cream striped bloomer shorts.",
    details: [
      "Two-piece set: wear together or mix with wardrobe staples",
      "Front patch pockets for tiny treasures and seashell finds",
      "Softly gathered bloomer shorts with gentle leg elastics",
      "Designed with generous raglan sleeves for easy layering"
    ],
    fabricCare: "Jacket: 100% cotton-backed bouclé fleece. Bloomers: 100% yarn-dyed cotton. Cold gentle wash; reshape whilst damp."
  }
];

window.SHOP_THE_LOOK = {
  title: "Morning in the Courtyard",
  subtitle: "Curated sibling & play pairings from our debut 12-piece capsule.",
  EditorialImage: "assets/images/editorial-play.jpg",
  EditorialAlt: "Brother and sister sharing a secret in crisp cotton shirts and red accents",
  productIds: ["lt-01", "lt-02", "lt-03"]
};
