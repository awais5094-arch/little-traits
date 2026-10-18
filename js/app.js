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

  function formatSize(size) {
    return String(size || "").replace("-", "–");
  }

  function updateShopNavigation(category) {
    document.querySelectorAll(".nav-primary__link, .mnav-link").forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      if (!url.pathname.endsWith("/shop.html")) return;
      const active = (url.searchParams.get("category") || "all") === category;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
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

  function addToCart({ productId, size, colorName, quantity = 1, silent = false }) {
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
    if (!silent) showToast(`Added ${product.name} (${chosenSize}) to bag`);
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

    const swatchesHtml = product.colors
      .map(
        (c) =>
          `<span class="swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`
      )
      .join("");
    const colourNames = product.colors.map((c) => c.name).join(", ");

    return `
      <article class="product-card" data-product-id="${product.id}">
        <a href="product.html?id=${product.id}" class="product-card__media" tabindex="-1" aria-hidden="true">
          ${
            product.badge
              ? `<span class="product-card__badge">${product.badge}</span>`
              : ""
          }
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
            <span>Ages ${product.ageGroup}</span>
            <div class="product-card__swatches" role="img" aria-label="${product.colors.length} colours: ${colourNames}">
              ${swatchesHtml}
            </div>
          </div>
          <h3 class="product-card__title">
            <a href="product.html?id=${product.id}" class="product-card__link">${product.name}</a>
          </h3>
          <p class="product-card__subtitle">${product.shortSubtitle}</p>
          <div class="product-card__price-row">
            <span class="product-card__price">${formatPKR(product.price)}</span>
            <span class="product-card__cta" aria-hidden="true">
              <span class="product-card__cta-text">Choose size</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
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

    const shopNav = [
      { href: "shop.html", label: "Shop All", page: "shop.html", cat: "" },
      { href: "shop.html?category=boys", label: "Boys", page: "shop.html", cat: "boys" },
      { href: "shop.html?category=girls", label: "Girls", page: "shop.html", cat: "girls" },
      { href: "shop.html?category=unisex", label: "Unisex", page: "shop.html", cat: "unisex" },
      { href: "shop.html?category=baby", label: "Baby", page: "shop.html", cat: "baby" },
      { href: "shop.html?category=coords", label: "Co-ords", page: "shop.html", cat: "coords" }
    ];
    const brandNav = [
      { href: "about.html", label: "Our Story", page: "about.html" },
      { href: "contact.html", label: "Contact", page: "contact.html" }
    ];
    function isActiveLink(l) {
      if (l.page !== currentPage) return false;
      if (l.page !== "shop.html") return true;
      return (l.cat || "all") === (currentCat || "all");
    }

    const headerMount = document.getElementById("site-header-mount");
    if (headerMount) {
      headerMount.innerHTML = `
        <div class="announcement-bar" role="region" aria-label="Store announcement">
          <div class="announcement-bar__inner">
            <span class="announcement-bar__long">Debut Season Edit — breathable cottons &amp; soft playwear, crafted in Pakistan</span>
            <span class="announcement-bar__short">Cash on Delivery nationwide • 7-day size exchange</span>
            <div class="announcement-bar__links">
              <button type="button" data-open-size-guide>Size Chart</button>
              <span aria-hidden="true">•</span>
              <a href="contact.html">Customer Care</a>
            </div>
          </div>
        </div>
        <header class="site-header">
          <div class="container site-header__inner">
            <div class="site-header__left">
              <button type="button" class="icon-btn mobile-menu-toggle" id="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="16" y2="18"></line>
                </svg>
              </button>
              <nav class="nav-primary" aria-label="Main navigation">
                ${shopNav
                  .map(
                    (l) =>
                      `<a href="${l.href}" class="nav-primary__link ${
                        isActiveLink(l) ? "is-active" : ""
                      }"${isActiveLink(l) ? ' aria-current="page"' : ""}>${l.label}</a>`
                  )
                  .join("")}
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
              <nav class="nav-primary nav-primary--secondary" aria-label="Brand navigation">
                ${brandNav
                  .map(
                    (l) =>
                      `<a href="${l.href}" class="nav-primary__link ${
                        isActiveLink(l) ? "is-active" : ""
                      }"${isActiveLink(l) ? ' aria-current="page"' : ""}>${l.label}</a>`
                  )
                  .join("")}
              </nav>
              <button type="button" class="icon-btn" id="open-search-btn" aria-label="Search catalogue" aria-controls="search-drawer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="20" y1="20" x2="16.35" y2="16.35"></line>
                </svg>
                <span class="hide-on-mobile">Search</span>
              </button>
              <button type="button" class="icon-btn icon-btn--bag" id="open-cart-btn" aria-label="Open shopping bag" aria-controls="cart-drawer">
                <span class="icon-btn__glyph">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span class="cart-badge" id="header-cart-count" data-count="0" aria-hidden="true">0</span>
                </span>
                <span class="hide-on-mobile">Bag</span>
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
              <div class="footer-brand">
                <div class="footer-brand__title">Little Traits</div>
                <p class="footer-brand__desc">
                  Breathable cottons and gentle weaves for ages 6 months to 10 years, designed in Pakistan.
                </p>
              </div>

              <div>
                <h3 class="footer-col__heading">Shop</h3>
                <ul class="footer-links">
                  <li><a href="shop.html">All Pieces</a></li>
                  <li><a href="shop.html?category=boys">Boys</a></li>
                  <li><a href="shop.html?category=girls">Girls</a></li>
                  <li><a href="shop.html?category=unisex">Unisex</a></li>
                  <li><a href="shop.html?category=baby">Baby &amp; Toddler</a></li>
                  <li><a href="shop.html?category=coords">Co-ords &amp; Sets</a></li>
                </ul>
              </div>

              <div>
                <h3 class="footer-col__heading">Help</h3>
                <ul class="footer-links">
                  <li><a href="contact.html">Contact Us</a></li>
                  <li><button type="button" data-open-size-guide>Size &amp; Fit Guide</button></li>
                  <li><a href="contact.html#faq-section">Delivery &amp; Exchanges</a></li>
                  <li><a href="about.html">Our Story</a></li>
                </ul>
              </div>

              <div class="footer-care">
                <h3 class="footer-col__heading">Customer Care</h3>
                <p><a href="contact.html">Contact &amp; care</a><br />Mon–Sat, 10am–6pm PKT</p>
                <p class="footer-care__note">Cash on Delivery &amp; bank transfer • Prices in PKR</p>
              </div>
            </div>

            <div class="footer-bottom">
              <span>&copy; 2026 Little Traits Pakistan</span>
              <span>Design preview</span>
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
      <aside class="drawer drawer--left" id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation" aria-hidden="true">
        <div class="drawer__header">
          <span class="drawer__title">Little Traits</span>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close menu">✕</button>
        </div>
        <div class="drawer__body">
          <ul class="mnav-list">
            ${[
              { href: "index.html", label: "Home", page: "index.html", meta: "" },
              ...shopNav.map((l) => ({ ...l, meta: "" })),
              ...brandNav.map((l) => ({ ...l, meta: "" }))
            ]
              .map((l, i) => {
                const active = l.page === "index.html" ? currentPage === "index.html" || currentPage === "" : isActiveLink(l);
                const divider = i === shopNav.length + 1 ? ' class="mnav-list__divider"' : "";
                return `<li${divider}><a href="${l.href}" class="mnav-link ${active ? "is-active" : ""}"${active ? ' aria-current="page"' : ""}><span>${l.label}</span><span aria-hidden="true">→</span></a></li>`;
              })
              .join("")}
          </ul>

          <p class="mnav-label">Shop by age</p>
          <div class="mnav-sizes">
            ${(window.ALL_SIZES || [])
              .map((sz) => `<a href="shop.html?size=${sz}" class="size-chip">${formatSize(sz)}</a>`)
              .join("")}
          </div>

          <button type="button" class="btn btn-outline btn-block" data-open-size-guide>
            Size &amp; fit guide
          </button>
        </div>
      </aside>

      <!-- Search Drawer -->
      <aside class="drawer" id="search-drawer" role="dialog" aria-modal="true" aria-label="Search Catalogue" aria-hidden="true">
        <div class="drawer__header">
          <span class="drawer__title">Search Catalogue</span>
          <button type="button" class="icon-btn" data-close-drawers aria-label="Close search">✕</button>
        </div>
        <div class="drawer__body">
          <label for="global-search-input" class="sr-only">Search by garment name, fabric, or category</label>
          <input
            type="search"
            id="global-search-input"
            class="form-input search-input"
            placeholder="Try 'linen', 'frock', 'boys', 'romper'..."
          />
          <div id="search-results-list" aria-live="polite"></div>
        </div>
      </aside>

      <!-- Shopping Bag / Cart Drawer -->
      <aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Bag" aria-hidden="true">
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
            <h2 class="drawer__title" id="size-guide-title">Size &amp; Fit Guide <span class="drawer__title-sub">6M – 10Y</span></h2>
            <button type="button" class="icon-btn" data-close-modals aria-label="Close size guide">✕</button>
          </div>
          <div class="modal-card__body">
            <p class="modal-note">
              Cut with a relaxed fit for movement and growth. Between sizes? We recommend sizing up.
            </p>
            <div class="size-table-wrap">
              <table class="size-table">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Height</th>
                    <th scope="col">Chest</th>
                    <th scope="col">Waist</th>
                  </tr>
                </thead>
                <tbody>
                  ${(window.SIZE_GUIDE_DATA || [])
                    .map(
                      (row) => `
                    <tr>
                      <th scope="row">${formatSize(row.size)}</th>
                      <td>${row.heightCm.replace(" cm", "")}</td>
                      <td>${row.chestCm.replace(" cm", "")}</td>
                      <td>${row.waistCm.replace(" cm", "")}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <p class="modal-note modal-note--muted">
              All measurements in centimetres. Pre-washed fabrics allow roughly 2% natural tolerance.
            </p>
          </div>
        </div>
      </div>

      <!-- Honest Demo Checkout Modal -->
      <div class="modal-wrap" id="demo-checkout-modal" role="dialog" aria-modal="true" aria-labelledby="demo-checkout-title" aria-hidden="true">
        <div class="modal-card">
          <div class="drawer__header">
            <h2 class="drawer__title" id="demo-checkout-title">Checkout Preview</h2>
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

  let lastTrigger = null;

  function setPageInert(isInert) {
    document
      .querySelectorAll("#site-header-mount, main, #site-footer-mount, .pdp-sticky-bar")
      .forEach((el) => {
        if (isInert) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
  }

  function openOverlay(el) {
    const backdrop = document.getElementById("global-backdrop");
    if (!el || !backdrop) return;
    const active = document.activeElement;
    closeAllOverlays({ restoreFocus: false });
    if (active && active !== document.body && !active.closest(".drawer, .modal-wrap")) {
      lastTrigger = active;
    }
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    backdrop.classList.add("is-open");
    document.body.classList.add("drawer-open");
    setPageInert(true);
    if (el.id === "mobile-nav-drawer") {
      const menuBtn = document.getElementById("mobile-menu-btn");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    }
    const closeBtn = el.querySelector("[data-close-drawers], [data-close-modals], .icon-btn");
    if (closeBtn && el.id !== "search-drawer") {
      setTimeout(() => closeBtn.focus({ preventScroll: true }), 60);
    }
  }

  function openDrawer(drawerId) {
    openOverlay(document.getElementById(drawerId));
  }

  function openModal(modalId) {
    openOverlay(document.getElementById(modalId));
  }

  function closeAllOverlays({ restoreFocus = true } = {}) {
    let closedAny = false;
    document.querySelectorAll(".drawer.is-open, .modal-wrap.is-open").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
      closedAny = true;
    });
    const backdrop = document.getElementById("global-backdrop");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
    setPageInert(false);
    const menuBtn = document.getElementById("mobile-menu-btn");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    if (restoreFocus && closedAny && lastTrigger && document.contains(lastTrigger)) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
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
    if (headerBadge) {
      headerBadge.textContent = String(count);
      headerBadge.setAttribute("data-count", String(count));
    }
    const cartBtn = document.getElementById("open-cart-btn");
    if (cartBtn) {
      cartBtn.setAttribute(
        "aria-label",
        count ? `Open shopping bag, ${count} ${count === 1 ? "item" : "items"}` : "Open shopping bag"
      );
    }
    if (drawerCount) drawerCount.textContent = String(count);

    const bodyEl = document.getElementById("cart-drawer-body");
    const footerEl = document.getElementById("cart-drawer-footer");
    if (!bodyEl || !footerEl) return;

    if (items.length === 0) {
      bodyEl.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h3 class="heading-sm">Your bag is empty</h3>
          <p>Explore the debut capsule for boys, girls, and babies.</p>
          <a href="shop.html" class="btn btn-primary">Shop the Collection</a>
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
              ${formatSize(item.size)} • ${item.color}
            </div>
            <div class="cart-item__price">
              ${formatPKR(item.price * item.quantity)}
              ${
                item.quantity > 1
                  ? `<span class="cart-item__each">${formatPKR(item.price)} each</span>`
                  : ""
              }
            </div>
            <div class="cart-item__bottom">
              <div class="cart-qty-mini" role="group" aria-label="Quantity for ${item.name}">
                <button type="button" data-cart-dec="${item.key}" aria-label="Decrease quantity">−</button>
                <span aria-live="polite">${item.quantity}</span>
                <button type="button" data-cart-inc="${item.key}" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="cart-remove-btn" data-cart-remove="${item.key}" aria-label="Remove ${item.name} from bag">Remove</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    footerEl.innerHTML = `
      <div class="cart-summary">
        <span>Subtotal (${count} ${count === 1 ? "item" : "items"})</span>
        <strong>${formatPKR(subtotal)}</strong>
      </div>
      <p class="cart-summary__note">Delivery calculated at checkout • Cash on Delivery available</p>
      <div class="cart-actions">
        <button type="button" class="btn btn-primary btn-block" id="proceed-demo-checkout-btn">
          Checkout
        </button>
        <button type="button" class="btn-text" data-close-drawers>
          Continue shopping
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
        <div class="checkout-line">
          <span><strong>${item.quantity}×</strong> ${item.name} <span class="checkout-line__variant">${formatSize(item.size)}, ${item.color}</span></span>
          <strong>${formatPKR(item.price * item.quantity)}</strong>
        </div>
      `
      )
      .join("");

    container.innerHTML = `
      <p class="notice-box">
        <strong>Prototype preview.</strong> No order is placed here. In the live store this step opens WooCommerce checkout with Cash on Delivery, bank transfer, and card options.
      </p>
      <h3 class="heading-sm">Order summary (${count} ${count === 1 ? "item" : "items"})</h3>
      <div class="checkout-lines">
        ${itemsSummaryHtml}
        <div class="checkout-line checkout-line--total">
          <span>Subtotal</span>
          <strong>${formatPKR(subtotal)}</strong>
        </div>
      </div>
      <div class="modal-actions">
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
          const hay = `${p.name} ${p.shortSubtitle} ${p.category} ${(p.secondaryCategories || []).join(" ")} ${p.fabricSummary} ${p.shortDescription} ${p.colors
            .map((c) => c.name)
            .join(" ")}`.toLowerCase();
          return hay.includes(q);
        });

    if (filtered.length === 0) {
      const safeQuery = String(query).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
      resultsContainer.innerHTML = `
        <p class="search-empty">
          No pieces matched “<strong>${safeQuery}</strong>”. Try <em>linen</em>, <em>frock</em>, <em>boys</em>, or <em>romper</em>.
        </p>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <p class="search-results__label">
        ${q ? `${filtered.length} matching ${filtered.length === 1 ? "piece" : "pieces"}` : `All pieces (${allProducts.length})`}
      </p>
      <div class="search-results">
        ${filtered
          .map(
            (p) => `
          <a href="product.html?id=${p.id}" class="search-result">
            <img src="${p.images[0].src}" alt="" class="search-result__img" />
            <span class="search-result__body">
              <span class="search-result__name">${p.name}</span>
              <span class="search-result__sub">${p.shortSubtitle}</span>
              <span class="search-result__price">${formatPKR(p.price)}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
      const qtyBtn = target.closest("[data-cart-inc], [data-cart-dec]");
      if (qtyBtn) {
        const attr = qtyBtn.hasAttribute("data-cart-inc") ? "data-cart-inc" : "data-cart-dec";
        const key = qtyBtn.getAttribute(attr);
        updateCartItemQty(key, attr === "data-cart-inc" ? 1 : -1);
        const again = document.querySelector(`[${attr}="${CSS.escape(key)}"]`);
        if (again) again.focus();
        return;
      }

      const remBtn = target.closest("[data-cart-remove]");
      if (remBtn) {
        removeCartItem(remBtn.getAttribute("data-cart-remove"));
        return;
      }
    });

    // Keep keyboard navigation within the active dialog; Escape closes it.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllOverlays();
        return;
      }
      if (e.key === "Tab") {
        const overlay = document.querySelector(".drawer.is-open, .modal-wrap.is-open");
        if (!overlay) return;
        const controls = Array.from(overlay.querySelectorAll('a[href], button, input, select, textarea, [tabindex]'))
          .filter((el) => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) return;
        if (e.shiftKey && (document.activeElement === first || !overlay.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !overlay.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
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
    formatSize,
    updateShopNavigation,
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
