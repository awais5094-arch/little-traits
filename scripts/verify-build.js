/**
 * Automated Integrity & Asset Verification Script
 * Checks:
 * 1. All required HTML, CSS, JS, and documentation files exist.
 * 2. All 6 demo products in data.js have valid PKR prices, sizes, colours, and existing local image files.
 * 3. All image references in index.html, shop.html, and product.html exist on disk and are non-empty.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();
let errors = 0;

function checkFile(relPath) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    console.error(`[MISSING] ${relPath}`);
    errors++;
    return false;
  }
  const stat = fs.statSync(full);
  if (stat.size === 0) {
    console.error(`[EMPTY] ${relPath}`);
    errors++;
    return false;
  }
  return true;
}

console.log("--- Little Traits Prototype Verification ---");

const coreFiles = [
  "index.html",
  "shop.html",
  "product.html",
  "css/styles.css",
  "js/data.js",
  "js/app.js",
  "js/shop.js",
  "js/product.js",
  "README.md",
  "DESIGN.md",
  "HANDOFF.md",
  "WORDPRESS-MAPPING.md",
  ".gitignore"
];

coreFiles.forEach(checkFile);

// Load data.js into a sandbox to inspect products
const sandbox = { window: {} };
const dataCode = fs.readFileSync(path.join(root, "js/data.js"), "utf8");
vm.runInNewContext(dataCode, sandbox);

const products = sandbox.window.PRODUCTS || [];
console.log(`Loaded ${products.length} demo products from js/data.js`);

if (products.length < 5 || products.length > 6) {
  console.error(`[ERROR] Expected 5–6 demo products, found ${products.length}`);
  errors++;
}

products.forEach((p) => {
  if (!p.id || !p.name || typeof p.price !== "number" || !p.category) {
    console.error(`[ERROR] Product ${p.id} missing core fields`);
    errors++;
  }
  if (!Array.isArray(p.sizes) || p.sizes.length === 0) {
    console.error(`[ERROR] Product ${p.id} has no sizes`);
    errors++;
  }
  if (!Array.isArray(p.colors) || p.colors.length === 0) {
    console.error(`[ERROR] Product ${p.id} has no colours`);
    errors++;
  }
  (p.images || []).forEach((img) => {
    if (!checkFile(img.src)) {
      console.error(`[ERROR] Missing image ${img.src} for product ${p.id}`);
    }
  });
});

// Check HTML image references
["index.html", "shop.html", "product.html"].forEach((page) => {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const regex = /src=["'](assets\/images\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    checkFile(match[1]);
  }
});

if (errors === 0) {
  console.log("SUCCESS: All core files, product variations, and local images verified.");
  process.exit(0);
} else {
  console.error(`FAILED with ${errors} error(s).`);
  process.exit(1);
}
