/**
 * LITTLE TRAITS — SHARED APPLICATION & UI CONTROLLER
 *
 * Provides shared functionality across index.html, shop.html, and product.html:
 * 1. Currency formatting (PKR / Rs.)
 * 2. LocalStorage Cart State (add, update quantity, remove, subtotal calculation)
 * 3. Shared Header, Navigation, Footer, Cart Drawer, Search Drawer, Size Guide Modal, and Honest Demo Checkout Modal
 * 4. Reusable Product Card HTML renderer
 */

(function () {
  const CART_STORAGE_KEY = "little_traits_demo_cart_v1";

  // Format PKR price cleanly: Rs. 4,250
  function formatPKR(amount) {
    const num = Number(amount) || 0;
    return "Rs. " + num.toLocaleString("en-PK");
  }

  // Cart State Management
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // Ignore storage quota errors in restricted environments
    }
    updateCartUI();
  }

  function addToCart({ productId, size, colorName, quantity = 1 }) {
    const product = (window.PRODUCTS || []).find((p) => p.id === productId);
    if (!product) return false;

    const selectedColor =
      product.colors.find((c) => c.name === colorName) || product.colors[0];
    const chosenSize = size || product.sizes[0];
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    const cart = getCart();
    const key = `${product.id}__${chosenSize}__${selectedColor.name}`;
    const existingIndex = cart.findIndex((item) => item.key === key);

    const imageObj =
      product.images[selectedColor.imageIndex] || product.images[0];

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        key,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        size: chosenSize,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        image: imageObj.src,
        quantity: qty
      });
    }

    saveCart(cart);
    showToast(`Added ${product.name} (${chosenSize}) to bag`);
    return true;
  }

  function updateCartItemQty(key, deltaOrNewQty, isAbsolute = false) {
    const cart = getCart();
    const idx = cart.findIndex((item) => item.key === key);
    if (idx === -1) return;

    const newQty = isAbsolute
      ? parseInt(deltaOrNewQty, 10)
      : cart[idx].quantity + deltaOrNewQty;

    if (newQty <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = Math.min(20, newQty);
    }
    saveCart(cart);
  }

  function removeCartItem(key) {
    const cart = getCart().filter((item) => item.key !== key);
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotals() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return { count, subtotal, items: cart };
  }

  // Reusable Product Card Renderer
  function renderProductCard(product) {
    const primaryImg = product.images[0];
    const secondaryImg = product.images[1] || product.images[0];
    const catObj = (window.CATEGORIES || []).find(
      (c) => c.id === product.category
    );
    const catLabel = catObj ? catObj.shortLabel : product.category;

    const swatchesHtml = product.colors
      .map(
        (c) =>
          `<span class="swatch-dot" style="background-color: ${c.hex};" title="${c.name}" aria-label="${c.name}"></span>`
      )
      .join("");

    const sizesSummary =
      product.sizes.length > 4
        ? `${product.sizes[0]} – ${product.sizes[product.sizes.length - 1]}`
        : product.sizes.join(", ");

    return `
      <article class="product-card" data-product-id="${product.id}">
        <a href="product.html?id=${product.id}" class="product-card__media" aria-label="View ${product.name}">
          ${
            product.badge
              ? `<span class="product-card__badge">${product.badge}</span>`
              : ""
          }
          <span class="product-card__category-tag">${catLabel}</span>
          <img
            src="${primaryImg.src}"
            alt="${primaryImg.alt}"
            class="product-card__img product-card__img--primary"
            loading="lazy"
            width="600"
            height="750"
          />
          <img
            src="${secondaryImg.src}"
            alt="${secondaryImg.alt}"
            class="product-card__img product-card__img--secondary"
            loading="lazy"
            width="600"
            height="750"
          />
        </a>
        <div class="product-card__body">
          <div class="product-card__meta-row">
            <span>Sizes: ${sizesSummary}</span>
            <div class="product-card__swatches" aria-label="Available colours">
              ${swatchesHtml}
            </div>
          </div>
          <h3 class="product-card__title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-card__subtitle">${product.shortSubtitle}</p>
          <div class="product-card__price-row">
            <span class="product-card__price">${formatPKR(product.price)}</span>
            <a href="product.html?id=${product.id}" class="link-arrow" style="font-size: 0.8rem;">
              Select Size
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // Inject Shared Header, Drawers, Modals, and Footer
  function initSharedShell() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const urlParams = new URLSearchParams(window.location.search);
    const currentCat = urlParams.get("category") || "";

    const headerMount = document.getElementById("site-header-mount");
    if (headerMount) {
      headerMount.innerHTML = `
        <div class="announcement-bar" role="region" aria-label="Store announcement">
          <div class="announcement-bar__inner">
            <span>✨ Debut Seasonal Edit — Breathable Cottons &amp; Soft Playwear Crafted in Pakistan ✨</span>
            <div class="announcement-bar__links">
              <button type="button" data-open-size-guide style="color: inherit; text-decoration: underline; cursor: pointer;">Size Chart (6M–10Y)</button>
              <span>•</span>
              <a href="contact.html">Customer Care</a>
            </div>
          </div>
        </div>
        <header class="site-header">
          <div class="container site-header__inner">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button type="button" class="icon-btn mobile-menu-toggle" id="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded="false">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="16" y2="18"></line>
                </svg>
              </button>
              <nav class="nav-primary" aria-label="Main navigation">
                <a href="index.html" class="nav-primary__link ${
                  currentPage === "index.html" || currentPage === "" ? "is-active" : ""
                }">Home</a>
                <a href="shop.html" class="nav-primary__link ${
                  currentPage === "shop.html" && (!currentCat || currentCat === "all")
                    ? "is-active"
                    : ""
                }">Shop All</a>
                <a href="shop.html?category=boys" class="nav-primary__link ${
                  currentCat === "boys" ? "is-active" : ""
                }">Boys</a>
                <a href="shop.html?category=girls" class="nav-primary__link ${
                  currentCat === "girls" ? "is-active" : ""
                }">Girls</a>
                <a href="shop.html?category=baby" class="nav-primary__link ${
                  currentCat === "baby" ? "is-active" : ""
                }">Baby</a>
              </nav>
            </div>

            <a href="index.html" class="brand-logo" aria-label="Little Traits Home">
              <span class="brand-logo__title">
                <svg class="brand-logo__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 2C9.5 6 7 9.5 7 13a5 5 0 0 0 10 0c0-3.5-2.5-7-5-11Z"/>
                  <path d="M12 22v-9"/>
                </svg>
                Little Traits
              </span>
              <span class="brand-logo__sub">Pakistan</span>
            </a>

            <div class="header-actions">
              <nav class="nav-primary" aria-label="Brand navigation" style="margin-right: 0.5rem;">
                <a href="about.html" class="nav-primary__link ${
                  currentPage === "about.html" ? "is-active" : ""
                }">Our Story</a>
                <a href="contact.html" class="nav-primary__link ${
                  currentPage === "contact.html" ? "is-active" : ""
                }">Contact</a>
              </nav>
              <button type="button" class="icon-btn" id="open-search-btn" aria-label="Search catalogue">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="20" y1="20" x2="16.35" y2="16.35"></line>
                </svg>
                <span class="hide-on-mobile">Search</span>
              </button>
              <button type="button" class="icon-btn" id="open-cart-btn" aria-label="Open shopping bag">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span class="hide-on-mobile">Bag</span>
                <span class="cart-badge" id="header-cart-count">0</span>
              </button>
            </div>
          </div>
        </header>
      `;
    }

    const footerMount = document.getElementById("site-footer-mount");
    if (footerMount) {
      footerMount.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-grid">
              <div>
                <div class="footer-brand__title">Little Traits</div>
                <p class="footer-brand__desc">
                  Thoughtfully made children’s clothing for ages 6 months to 10 years. Breathable combed cottons, gentle weaves, and comfortable silhouettes designed in Pakistan.
                </p>
                <div style="margin-top: 1.15rem; font-size: 0.78rem; color: #9EAAB8;">
                  All prices listed in Pakistani Rupees (PKR).
                </div>
              </div>

              <div>
                <h3 class="footer-col__heading">Collections</h3>
                <ul class="footer-links">
                  <li><a href="shop.html">Shop All Pieces (6)</a></li>
                  <li><a href="shop.html?category=boys">Boys Edit (1Y–10Y)</a></li>
                  <li><a href="shop.html?category=girls">Girls Edit (1Y–10Y)</a></li>
                  <li><a href="shop.html?category=baby">Baby &amp; Toddler (6M–3Y)</a></li>
                  <li><a href="shop.html?category=coords">Co-ord Sets &amp; Knits</a></li>
                </ul>
              </div>

              <div>
                <h3 class="footer-col__heading">Brand &amp; Care</h3>
                <ul class="footer-links">
                  <li><a href="about.html">Our Story &amp; Fabrics</a></li>
                  <li><a href="contact.html">Contact &amp; Order Help</a></li>
                  <li><button type="button" data-open-size-guide style="color: inherit; text-align: left;">Size &amp; Fit Guide</button></li>
                  <li><a href="contact.html#faq-section">Delivery &amp; Exchanges</a></li>
                </ul>
              </div>

              <div>
                <h3 class="footer-col__heading">Studio &amp; Dispatch</h3>
                <p style="font-size: 0.85rem; color: #CBD5E1; line-height: 1.6; margin-bottom: 0.85rem;">
                  Nationwide courier dispatch across Pakistan. Cash on Delivery (COD) and bank transfer supported.
                </p>
                <div style="padding: 0.85rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 8px; font-size: 0.78rem; color: #E2E8F0;">
                  <strong>Customer Care (Placeholder):</strong><br/>
                  hello@littletraits.pk • Mon–Sat, 10am–6pm PKT
                </div>
              </div>
            </div>

            <div class="footer-bottom">
              <span>&copy; 2026 Little Traits Pakistan. Prototype built for WordPress / Elementor / WooCommerce implementation.</span>
              <div style="display: flex; gap: 1.25rem;">
                <a href="about.html">Our Story</a>
                <a href="contact.html">Contact</a>
                <a href="shop.html">Shop</a>
                <button type="button" data-open-size-guide>Size Chart</button>
              </div>
            </div>
          </div>
        </footer>
      `;
    }

    // Inject Global Overlays (Mobile Nav, Search Drawer, Cart Drawer, Size Guide Modal, Demo Checkout Modal, Toast)
    const overlaysContainer = document.createElement("div");
    overlaysContainer.id = "global-overlays";
    overlaysContainer.innerHTML = `
      <div class="backdrop" id="global-backdrop" aria-hidden="true"></div>

      <!-- Mobile Navigation Drawer -->
      <aside class="drawer drawer--left" id="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true">
        <div class="drawer__header">
          <span class="drawer__title">Little Traits</span>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close menu">✕</button>
        </div>
        <div class="drawer__body">
          <p class="eyebrow" style="margin-bottom: 0.75rem;">Browse Store</p>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem;">
            <li><a href="index.html" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-sand); border-radius:8px; font-weight:600;"><span>Home</span><span>→</span></a></li>
            <li><a href="shop.html" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Shop All Pieces</span><span>6</span></a></li>
            <li><a href="shop.html?category=boys" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Boys (1Y–10Y)</span><span>→</span></a></li>
            <li><a href="shop.html?category=girls" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Girls (1Y–10Y)</span><span>→</span></a></li>
            <li><a href="shop.html?category=baby" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Baby &amp; Toddler (6M–3Y)</span><span>→</span></a></li>
            <li><a href="shop.html?category=coords" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Co-ord Sets &amp; Knits</span><span>→</span></a></li>
            <li><a href="about.html" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Our Story</span><span>→</span></a></li>
            <li><a href="contact.html" style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-weight:500;"><span>Contact &amp; Care</span><span>→</span></a></li>
          </ul>

          <p class="eyebrow" style="margin-bottom: 0.75rem;">Quick Jump by Size</p>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.45rem; margin-bottom: 2rem;">
            <a href="shop.html?size=6-12M" class="size-chip">6–12 Months</a>
            <a href="shop.html?size=12-18M" class="size-chip">12–18 Months</a>
            <a href="shop.html?size=2-3Y" class="size-chip">2–3 Years</a>
            <a href="shop.html?size=4-5Y" class="size-chip">4–5 Years</a>
            <a href="shop.html?size=6-7Y" class="size-chip">6–7 Years</a>
            <a href="shop.html?size=8-10Y" class="size-chip">8–10 Years</a>
          </div>

          <button type="button" class="btn btn-outline" style="width: 100%;" data-open-size-guide>
            Open Full Size Chart
          </button>
        </div>
      </aside>

      <!-- Search Drawer -->
      <aside class="drawer" id="search-drawer" aria-label="Search Catalogue" aria-hidden="true">
        <div class="drawer__header">
          <span class="drawer__title">Search Catalogue</span>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close search">✕</button>
        </div>
        <div class="drawer__body">
          <label for="global-search-input" class="sr-only">Search by garment name, fabric, or category</label>
          <div style="position: relative; margin-bottom: 1.25rem;">
            <input
              type="search"
              id="global-search-input"
              placeholder="Try 'linen', 'frock', 'boys', 'romper'..."
              style="width: 100%; padding: 0.8rem 1rem; background: var(--bg-card); border: 1.5px solid var(--border-strong); border-radius: var(--radius-xs); font-size: 0.92rem;"
            />
          </div>
          <div id="search-results-list" aria-live="polite"></div>
        </div>
      </aside>

      <!-- Shopping Bag / Cart Drawer -->
      <aside class="drawer" id="cart-drawer" aria-label="Shopping Bag" aria-hidden="true">
        <div class="drawer__header">
          <span class="drawer__title">Your Shopping Bag (<span id="drawer-cart-count">0</span>)</span>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close shopping bag">✕</button>
        </div>
        <div class="drawer__body" id="cart-drawer-body" aria-live="polite"></div>
        <div class="drawer__footer" id="cart-drawer-footer"></div>
      </aside>

      <!-- Size Guide Modal -->
      <div class="modal-wrap" id="size-guide-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" aria-hidden="true">
        <div class="modal-card">
          <div class="drawer__header">
            <h2 class="drawer__title" id="size-guide-title">Little Traits Size &amp; Fit Guide</h2>
            <button type="button" class="icon-btn" data-close-modals aria-label="Close size guide">✕</button>
          </div>
          <div class="modal-card__body">
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Our garments are cut with a relaxed, comfortable fit to allow room for movement and natural growth. If your child is between sizes, we recommend sizing up.
            </p>
            <div style="overflow-x: auto;">
              <table class="size-table">
                <thead>
                  <tr>
                    <th>Size Label</th>
                    <th>Age Guide</th>
                    <th>Child Height</th>
                    <th>Chest</th>
                    <th>Waist</th>
                  </tr>
                </thead>
                <tbody>
                  ${(window.SIZE_GUIDE_DATA || [])
                    .map(
                      (row) => `
                    <tr>
                      <td><strong>${row.size}</strong></td>
                      <td>${row.ageLabel}</td>
                      <td>${row.heightCm}</td>
                      <td>${row.chestCm}</td>
                      <td>${row.waistCm}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 1rem;">
              Note: All pre-washed cotton and linen blends allow a 2% natural tolerance. Measurements are in centimetres.
            </p>
          </div>
        </div>
      </div>

      <!-- Honest Demo Checkout Modal -->
      <div class="modal-wrap" id="demo-checkout-modal" role="dialog" aria-modal="true" aria-labelledby="demo-checkout-title" aria-hidden="true">
        <div class="modal-card">
          <div class="drawer__header">
            <h2 class="drawer__title" id="demo-checkout-title">Demo Checkout Preview (WooCommerce Handoff)</h2>
            <button type="button" class="icon-btn" data-close-modals aria-label="Close checkout preview">✕</button>
          </div>
          <div class="modal-card__body" id="demo-checkout-body"></div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="toast-notification" id="toast-notification" role="status" aria-live="polite">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A3D9B1" stroke-width="2.2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
        <span id="toast-message">Added to bag</span>
      </div>
    `;
    document.body.appendChild(overlaysContainer);

    bindGlobalEvents();
    updateCartUI();
    renderSearchResults("");
  }

  function openDrawer(drawerId) {
    closeAllOverlays();
    const drawer = document.getElementById(drawerId);
    const backdrop = document.getElementById("global-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.classList.add("is-open");
      document.body.classList.add("drawer-open");
    }
  }

  function openModal(modalId) {
    closeAllOverlays();
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById("global-backdrop");
    if (modal && backdrop) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      backdrop.classList.add("is-open");
      document.body.classList.add("drawer-open");
    }
  }

  function closeAllOverlays() {
    document.querySelectorAll(".drawer.is-open").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
    });
    document.querySelectorAll(".modal-wrap.is-open").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
    });
    const backdrop = document.getElementById("global-backdrop");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast-notification");
    const text = document.getElementById("toast-message");
    if (!toast || !text) return;
    text.textContent = msg;
    toast.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function updateCartUI() {
    const { count, subtotal, items } = getCartTotals();
    const headerBadge = document.getElementById("header-cart-count");
    const drawerCount = document.getElementById("drawer-cart-count");
    if (headerBadge) headerBadge.textContent = String(count);
    if (drawerCount) drawerCount.textContent = String(count);

    const bodyEl = document.getElementById("cart-drawer-body");
    const footerEl = document.getElementById("cart-drawer-footer");
    if (!bodyEl || !footerEl) return;

    if (items.length === 0) {
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--bg-sand); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h3 class="heading-sm" style="margin-bottom: 0.4rem;">Your shopping bag is empty</h3>
          <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            Explore our debut Pakistani kidswear collection for boys, girls, and babies.
          </p>
          <a href="shop.html" class="btn btn-primary" data-close-drawers>Browse Collection</a>
        </div>
      `;
      footerEl.innerHTML = "";
      return;
    }

    bodyEl.innerHTML = items
      .map(
        (item) => `
        <div class="cart-item" data-cart-key="${item.key}">
          <a href="product.html?id=${item.productId}">
            <img src="${item.image}" alt="${item.name}" class="cart-item__img" />
          </a>
          <div>
            <h4 class="cart-item__title">
              <a href="product.html?id=${item.productId}">${item.name}</a>
            </h4>
            <div class="cart-item__variant">
              Size: <strong>${item.size}</strong> • Colour: <strong>${item.color}</strong>
            </div>
            <div style="font-size: 0.84rem; font-weight: 700; margin-top: 0.25rem;">
              ${formatPKR(item.price * item.quantity)}
              ${
                item.quantity > 1
                  ? `<span style="font-weight:400; color:var(--text-muted); font-size:0.75rem;">(${formatPKR(
                      item.price
                    )} each)</span>`
                  : ""
              }
            </div>
            <div class="cart-item__bottom">
              <div class="cart-qty-mini" aria-label="Quantity controls">
                <button type="button" data-cart-dec="${item.key}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-inc="${item.key}" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="cart-remove-btn" data-cart-remove="${item.key}">Remove</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    footerEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
        <span style="font-size: 0.9rem; color: var(--text-secondary);">Subtotal (${count} ${
          count === 1 ? "item" : "items"
        })</span>
        <strong style="font-size: 1.18rem; font-family: var(--font-serif);">${formatPKR(
          subtotal
        )}</strong>
      </div>
      <p style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 1rem;">
        Shipping calculated at WooCommerce checkout. Cash on Delivery (COD) &amp; card payments supported in production.
      </p>
      <div style="display: grid; gap: 0.5rem;">
        <button type="button" class="btn btn-terracotta" id="proceed-demo-checkout-btn" style="width: 100%;">
          Proceed to Checkout Preview
        </button>
        <button type="button" class="btn btn-outline" data-close-drawers style="width: 100%; min-height: 40px; font-size: 0.8rem;">
          Continue Shopping
        </button>
      </div>
    `;
  }

  function openDemoCheckoutModal() {
    const { count, subtotal, items } = getCartTotals();
    const container = document.getElementById("demo-checkout-body");
    if (!container) return;

    const itemsSummaryHtml = items
      .map(
        (item) => `
        <div style="display: flex; justify-content: space-between; gap: 1rem; padding: 0.55rem 0; border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
          <span><strong>${item.quantity}×</strong> ${item.name} <em>(${item.size}, ${item.color})</em></span>
          <strong>${formatPKR(item.price * item.quantity)}</strong>
        </div>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="padding: 0.95rem 1.1rem; background: var(--bg-sage-tint); border: 1px solid #C5D6CC; border-radius: var(--radius-xs); margin-bottom: 1.25rem; font-size: 0.85rem; color: var(--text-primary);">
        <strong>Prototype Notice:</strong> This is an interactive frontend prototype. No real order is placed or charged here. In the final WordPress build, this step hands off directly to the native <strong>WooCommerce Checkout</strong> endpoint (<code>/checkout/</code>).
      </div>

      <h3 class="heading-sm" style="margin-bottom: 0.6rem;">Order Summary (${count} ${
        count === 1 ? "item" : "items"
      })</h3>
      <div style="margin-bottom: 1.25rem;">
        ${itemsSummaryHtml}
        <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; font-size: 1rem;">
          <span><strong>Total Merchandise Value</strong></span>
          <strong>${formatPKR(subtotal)}</strong>
        </div>
      </div>

      <div style="padding: 1rem; background: var(--bg-sand); border-radius: var(--radius-xs); font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        <strong>Production WooCommerce Integrations Planned:</strong>
        <ul style="list-style: disc; padding-left: 1.2rem; margin-top: 0.35rem;">
          <li>Cash on Delivery (COD) across Pakistan + Local Bank Transfer / JazzCash / EasyPaisa / Card Gateways</li>
          <li>Automated SMS / WhatsApp order confirmation &amp; courier tracking link</li>
          <li>Real-time SKU inventory deduction per size &amp; colour variation</li>
        </ul>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: flex-end;">
        <button type="button" class="btn btn-outline" data-close-modals>Return to Store</button>
      </div>
    `;

    openModal("demo-checkout-modal");
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById("search-results-list");
    if (!resultsContainer) return;

    const q = (query || "").trim().toLowerCase();
    const allProducts = window.PRODUCTS || [];

    const filtered = !q
      ? allProducts
      : allProducts.filter((p) => {
          const hay = `${p.name} ${p.shortSubtitle} ${p.category} ${p.fabricSummary} ${p.shortDescription} ${p.colors
            .map((c) => c.name)
            .join(" ")}`.toLowerCase();
          return hay.includes(q);
        });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem 0.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
          No garments matched "<strong>${query}</strong>". Try searching for <em>linen</em>, <em>frock</em>, <em>boys</em>, or <em>romper</em>.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <p style="font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.85rem;">
        ${q ? `Matching Pieces (${filtered.length})` : "All Catalogue Pieces (6)"}
      </p>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${filtered
          .map(
            (p) => `
          <a href="product.html?id=${p.id}" style="display: grid; grid-template-columns: 64px 1fr auto; gap: 0.85rem; align-items: center; padding: 0.6rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs);">
            <img src="${p.images[0].src}" alt="${p.name}" style="width: 64px; height: 78px; object-fit: cover; border-radius: 3px;" />
            <div>
              <div style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 500;">${p.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">${p.shortSubtitle}</div>
              <div style="font-size: 0.82rem; font-weight: 700; margin-top: 0.2rem;">${formatPKR(p.price)}</div>
            </div>
            <span style="font-size: 0.8rem; color: var(--accent-terracotta); font-weight: 600;">View →</span>
          </a>
        `
          )
          .join("")}
      </div>
    `;
  }

  function bindGlobalEvents() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest("#open-cart-btn") || target.closest("#footer-open-bag")) {
        e.preventDefault();
        openDrawer("cart-drawer");
        return;
      }

      if (target.closest("#open-search-btn")) {
        e.preventDefault();
        openDrawer("search-drawer");
        setTimeout(() => {
          const input = document.getElementById("global-search-input");
          if (input) input.focus();
        }, 120);
        return;
      }

      if (target.closest("#mobile-menu-btn")) {
        e.preventDefault();
        openDrawer("mobile-nav-drawer");
        return;
      }

      if (target.closest("[data-open-size-guide]")) {
        e.preventDefault();
        openModal("size-guide-modal");
        return;
      }

      if (target.closest("#proceed-demo-checkout-btn")) {
        e.preventDefault();
        openDemoCheckoutModal();
        return;
      }

      if (
        target.closest("[data-close-drawers]") ||
        target.closest("[data-close-modals]") ||
        target.id === "global-backdrop" ||
        target.classList.contains("modal-wrap")
      ) {
        closeAllOverlays();
        return;
      }

      // Cart quantity & removal buttons
      const incBtn = target.closest("[data-cart-inc]");
      if (incBtn) {
        updateCartItemQty(incBtn.getAttribute("data-cart-inc"), 1);
        return;
      }

      const decBtn = target.closest("[data-cart-dec]");
      if (decBtn) {
        updateCartItemQty(decBtn.getAttribute("data-cart-dec"), -1);
        return;
      }

      const remBtn = target.closest("[data-cart-remove]");
      if (remBtn) {
        removeCartItem(remBtn.getAttribute("data-cart-remove"));
        return;
      }
    });

    // Escape key closes drawers/modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllOverlays();
      }
    });

    // Live Search Input
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderSearchResults(e.target.value);
      });
    }
  }

  // Expose API globally for page-specific scripts
  window.LittleTraitsApp = {
    formatPKR,
    getCart,
    addToCart,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    getCartTotals,
    renderProductCard,
    openDrawer,
    openModal,
    openDemoCheckoutModal,
    closeAllOverlays,
    showToast
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSharedShell);
  } else {
    initSharedShell();
  }
})();
