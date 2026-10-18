/** Little Traits demo catalogue. Stock photographs illustrate styles; final product specifications need client confirmation. */

window.STORE_CONFIG = {
  "brandName": "Little Traits",
  "brandTagline": "Clothes for growing up",
  "currency": "PKR",
  "currencySymbol": "Rs.",
  "shippingNote": "Delivery options and charges are shown before payment in the live store.",
  "exchangeNote": "Check the size chart before ordering. Exchange terms will be available with the live collection.",
  "supportNote": "For sizing and order questions, visit Contact & Care."
};

window.CATEGORIES = [
  {
    "id": "all",
    "slug": "all",
    "name": "All Pieces",
    "shortLabel": "All",
    "ageSpan": "6M – 10Y",
    "description": "Shirts, dresses, sets and cosy layers for ages 6 months to 10 years.",
    "accentColor": "#F3EDE2"
  },
  {
    "id": "boys",
    "slug": "boys",
    "name": "Boys",
    "shortLabel": "Boys",
    "ageSpan": "1Y – 10Y",
    "description": "Shirts and everyday sets, with sizes for little and bigger boys.",
    "accentColor": "#E4ECE6"
  },
  {
    "id": "girls",
    "slug": "girls",
    "name": "Girls",
    "shortLabel": "Girls",
    "ageSpan": "1Y – 10Y",
    "description": "Dresses and easy outfits for everyday days and special occasions.",
    "accentColor": "#F6E7E4"
  },
  {
    "id": "unisex",
    "slug": "unisex",
    "name": "Unisex",
    "shortLabel": "Unisex",
    "ageSpan": "6M – 6Y",
    "description": "Everyday sets, hooded rompers and layers for any little wardrobe.",
    "accentColor": "#F5ECD9"
  },
  {
    "id": "baby",
    "slug": "baby",
    "name": "Baby & Toddler",
    "shortLabel": "Baby & Toddler",
    "ageSpan": "6M – 3Y",
    "description": "Outfits and warm layers in baby and toddler sizes.",
    "accentColor": "#EFECE6"
  },
  {
    "id": "coords",
    "slug": "coords",
    "name": "Co-ords & Sets",
    "shortLabel": "Co-ords & Sets",
    "ageSpan": "6M – 8Y",
    "description": "Ready-to-wear pairings for an outfit in one step.",
    "accentColor": "#F5ECD9"
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
  {
    "size": "6-12M",
    "heightCm": "68 – 76 cm",
    "chestCm": "46 – 48 cm",
    "waistCm": "45 – 47 cm",
    "ageLabel": "6 – 12 Months"
  },
  {
    "size": "12-18M",
    "heightCm": "76 – 83 cm",
    "chestCm": "48 – 50 cm",
    "waistCm": "47 – 49 cm",
    "ageLabel": "12 – 18 Months"
  },
  {
    "size": "18-24M",
    "heightCm": "83 – 90 cm",
    "chestCm": "50 – 52 cm",
    "waistCm": "49 – 50 cm",
    "ageLabel": "18 – 24 Months"
  },
  {
    "size": "2-3Y",
    "heightCm": "90 – 98 cm",
    "chestCm": "52 – 54 cm",
    "waistCm": "50 – 51 cm",
    "ageLabel": "2 – 3 Years"
  },
  {
    "size": "3-4Y",
    "heightCm": "98 – 104 cm",
    "chestCm": "54 – 56 cm",
    "waistCm": "51 – 52 cm",
    "ageLabel": "3 – 4 Years"
  },
  {
    "size": "4-5Y",
    "heightCm": "104 – 110 cm",
    "chestCm": "56 – 58 cm",
    "waistCm": "52 – 54 cm",
    "ageLabel": "4 – 5 Years"
  },
  {
    "size": "5-6Y",
    "heightCm": "110 – 116 cm",
    "chestCm": "58 – 60 cm",
    "waistCm": "54 – 55 cm",
    "ageLabel": "5 – 6 Years"
  },
  {
    "size": "6-7Y",
    "heightCm": "116 – 122 cm",
    "chestCm": "60 – 63 cm",
    "waistCm": "55 – 57 cm",
    "ageLabel": "6 – 7 Years"
  },
  {
    "size": "7-8Y",
    "heightCm": "122 – 128 cm",
    "chestCm": "63 – 66 cm",
    "waistCm": "57 – 59 cm",
    "ageLabel": "7 – 8 Years"
  },
  {
    "size": "8-10Y",
    "heightCm": "128 – 140 cm",
    "chestCm": "66 – 71 cm",
    "waistCm": "59 – 62 cm",
    "ageLabel": "8 – 10 Years"
  }
];

window.PRODUCTS = [
  {
    "id": "lt-01",
    "slug": "zayd-windowpane-linen-cotton-set",
    "sku": "LT-AW26-01",
    "name": "Zayd Shirt & Trouser Set",
    "shortSubtitle": "Shirt & pull-on trousers",
    "purchaseSummary": "A pale blue shirt paired with ochre trousers.",
    "price": 4250,
    "category": "boys",
    "secondaryCategories": [
      "coords"
    ],
    "badge": "",
    "featured": true,
    "ageGroup": "2Y – 8Y",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Pale Blue & Ochre",
        "hex": "#B3C3CC",
        "imageIndex": 0,
        "secondaryHex": "#BD9754"
      }
    ],
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y"
    ],
    "images": [
      {
        "src": "assets/images/hero-boys.jpg",
        "alt": "Boy wearing a pale blue collarless shirt and ochre trousers",
        "caption": ""
      }
    ],
    "shortDescription": "Two-piece shirt and trouser outfit Collarless shirt with front buttons Ochre trousers with a relaxed shape.",
    "details": [
      "Two-piece shirt and trouser outfit",
      "Collarless shirt with front buttons",
      "Ochre trousers with a relaxed shape"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  },
  {
    "id": "lt-02",
    "slug": "amara-ruffled-crimson-frock",
    "sku": "LT-AW26-02",
    "name": "Amara Ruffle Frock",
    "shortSubtitle": "Long-sleeved ruffle dress",
    "purchaseSummary": "A red dress with ruffled sleeves and a full skirt.",
    "price": 4690,
    "category": "girls",
    "secondaryCategories": [],
    "badge": "",
    "featured": true,
    "ageGroup": "2Y – 10Y",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Red",
        "hex": "#B8332A",
        "imageIndex": 0
      }
    ],
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-10Y"
    ],
    "images": [
      {
        "src": "assets/images/p2-main.jpg",
        "alt": "Girl wearing a red dress with ruffled collar and sleeves",
        "caption": ""
      },
      {
        "src": "assets/images/hero-girls.jpg",
        "alt": "Full-length view of the same red ruffled dress",
        "caption": ""
      }
    ],
    "shortDescription": "Long sleeves with ruffled cuffs Gathered skirt with a ruffled hem Red colourway.",
    "details": [
      "Long sleeves with ruffled cuffs",
      "Gathered skirt with a ruffled hem",
      "Red colourway"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  },
  {
    "id": "lt-03",
    "slug": "rayan-harbour-stripe-play-set",
    "sku": "LT-AW26-03",
    "name": "Rayan Stripe Set",
    "shortSubtitle": "Striped tee & green shorts",
    "purchaseSummary": "A striped tee paired with green shorts.",
    "price": 3490,
    "category": "boys",
    "secondaryCategories": [
      "coords",
      "baby",
      "unisex"
    ],
    "badge": "",
    "featured": true,
    "ageGroup": "12M – 6Y",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Stripe & Green",
        "hex": "#E6E2D9",
        "imageIndex": 0,
        "secondaryHex": "#477866"
      }
    ],
    "sizes": [
      "12-18M",
      "18-24M",
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y"
    ],
    "images": [
      {
        "src": "assets/images/p3-main.jpg",
        "alt": "Toddler wearing a striped short-sleeved tee and green shorts",
        "caption": ""
      },
      {
        "src": "assets/images/p3-alt.jpg",
        "alt": "Full-length view of the toddler in the same striped tee and green shorts",
        "caption": ""
      }
    ],
    "shortDescription": "Two-piece tee and shorts outfit Short-sleeved striped tee Green shorts with turned-up hems.",
    "details": [
      "Two-piece tee and shorts outfit",
      "Short-sleeved striped tee",
      "Green shorts with turned-up hems"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  },
  {
    "id": "lt-04",
    "slug": "noor-polka-smock-tunic-set",
    "sku": "LT-AW26-04",
    "name": "Noor Dot Tunic",
    "shortSubtitle": "Long-sleeved dot-print tunic",
    "purchaseSummary": "A light tunic with large dark dots and gathered sleeves.",
    "price": 3950,
    "category": "girls",
    "secondaryCategories": [
      "coords"
    ],
    "badge": "",
    "featured": false,
    "ageGroup": "2Y – 8Y",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Cream & Charcoal",
        "hex": "#EEEAE3",
        "imageIndex": 0,
        "secondaryHex": "#383838"
      }
    ],
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y"
    ],
    "images": [
      {
        "src": "assets/images/p4-main.jpg",
        "alt": "Child wearing a cream tunic with large charcoal dots",
        "caption": ""
      }
    ],
    "shortDescription": "All-over dot print Long sleeves Loose gathered shape.",
    "details": [
      "All-over dot print",
      "Long sleeves",
      "Loose gathered shape"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  },
  {
    "id": "lt-05",
    "slug": "milo-cloud-fleece-bear-onesie",
    "sku": "LT-AW26-05",
    "name": "Milo Bear Romper",
    "shortSubtitle": "Hooded baby romper",
    "purchaseSummary": "A grey hooded romper with little bear ears.",
    "price": 3650,
    "category": "baby",
    "secondaryCategories": [
      "unisex"
    ],
    "badge": "",
    "featured": false,
    "ageGroup": "6M – 24M",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Grey",
        "hex": "#72716D",
        "imageIndex": 0
      }
    ],
    "sizes": [
      "6-12M",
      "12-18M",
      "18-24M"
    ],
    "images": [
      {
        "src": "assets/images/p5-main.jpg",
        "alt": "Baby wearing a grey hooded romper with bear ears",
        "caption": ""
      }
    ],
    "shortDescription": "All-in-one baby outfit Hood with bear-ear detail Grey colourway.",
    "details": [
      "All-in-one baby outfit",
      "Hood with bear-ear detail",
      "Grey colourway"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  },
  {
    "id": "lt-06",
    "slug": "safa-sherpa-jacket-bloomer-set",
    "sku": "LT-AW26-06",
    "name": "Safa Jacket & Shorts Set",
    "shortSubtitle": "Hooded jacket & striped shorts",
    "purchaseSummary": "A cream hooded jacket paired with striped bloomer shorts.",
    "price": 4890,
    "category": "unisex",
    "secondaryCategories": [
      "coords",
      "baby",
      "boys",
      "girls"
    ],
    "badge": "",
    "featured": true,
    "ageGroup": "6M – 4Y",
    "fabricSummary": "Check the garment label for fabric composition.",
    "colors": [
      {
        "name": "Cream & Brown Stripe",
        "hex": "#ECE9DD",
        "imageIndex": 0,
        "secondaryHex": "#8B6948"
      }
    ],
    "sizes": [
      "6-12M",
      "12-18M",
      "18-24M",
      "2-3Y",
      "3-4Y"
    ],
    "images": [
      {
        "src": "assets/images/p6-main.jpg",
        "alt": "Toddler wearing a cream hooded jacket and brown striped bloomer shorts",
        "caption": ""
      }
    ],
    "shortDescription": "Two-piece layering outfit Cream jacket with a hood Brown-and-cream striped bloomer shorts.",
    "details": [
      "Two-piece layering outfit",
      "Cream jacket with a hood",
      "Brown-and-cream striped bloomer shorts"
    ],
    "fabricCare": "Follow the garment care label. Wash similar colours together and check the recommended washing temperature."
  }
];
