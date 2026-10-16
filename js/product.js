/**
 * LITTLE TRAITS — REUSABLE PRODUCT DETAIL PAGE (PDP) CONTROLLER
 *
 * Dynamically populates product.html from window.PRODUCTS based on ?id= or ?slug=.
 * Enforces required size selection before adding to cart or triggering Buy Now.
 * Maintains strict consistency between selected variation (size + colour) and the cart drawer.
 */

(function () {
  const products = window.PRODUCTS || [];
  const categories = window.CATEGORIES || [];
  const config = window.STORE_CONFIG || {};

  let currentProduct = null;
  let state = {
    selectedColor: null,
    selectedSize: null, // Explicitly null initially so size selection is required
    activeImageIndex: 0,
    quantity: 1,
    showSizeError: false,
    openPanels: new Set()
  };

  function resolveProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    const slugParam = params.get("slug");

    if (idParam) {
      const found = products.find(
        (p) => p.id.toLowerCase() === idParam.toLowerCase()
      );
      if (found) return found;
    }

    if (slugParam) {
      const found = products.find(
        (p) => p.slug.toLowerCase() === slugParam.toLowerCase()
      );
      if (found) return found;
    }

    // Default to first product (lt-01) so product.html is always functional even if opened directly
    return products[0] || null;
  }

  function renderBreadcrumb(product) {
    const bc = document.getElementById("pdp-breadcrumb");
    if (!bc) return;

    const catObj = categories.find((c) => c.id === product.category);
    const catName = catObj ? catObj.name : "Collection";
    const catLink = catObj ? `shop.html?category=${catObj.id}` : "shop.html";

    bc.innerHTML = `
      <a href="index.html">Home</a>
      <span aria-hidden="true">/</span>
      <a href="shop.html">Shop</a>
      <span aria-hidden="true">/</span>
      <a href="${catLink}">${catName}</a>
      <span aria-hidden="true" class="breadcrumb__tail">/</span>
      <span class="breadcrumb__tail breadcrumb__current" aria-current="page">${product.name}</span>
    `;
  }

  function focusKey(el) {
    if (!el || !el.closest || !el.closest("#pdp-mount")) return null;
    for (const attr of ["data-select-size", "data-select-color", "data-gallery-idx", "data-accordion-toggle"]) {
      if (el.hasAttribute(attr)) return `[${attr}="${el.getAttribute(attr)}"]`;
    }
    return el.id ? `#${el.id}` : null;
  }

  function renderProductView() {
    const mount = document.getElementById("pdp-mount");
    const app = window.LittleTraitsApp;
    if (!mount || !currentProduct || !app) return;
    const restoreFocus = focusKey(document.activeElement);

    document.title = `${currentProduct.name} — ${app.formatPKR(
      currentProduct.price
    )} | Little Traits Pakistan`;

    renderBreadcrumb(currentProduct);

    const activeImg =
      currentProduct.images[state.activeImageIndex] || currentProduct.images[0];

    const thumbsHtml = currentProduct.images
      .map(
        (img, idx) => `
        <button
          type="button"
          class="pdp-thumb-btn ${idx === state.activeImageIndex ? "is-active" : ""}"
          data-gallery-idx="${idx}"
          aria-label="View product image ${idx + 1}: ${img.alt}"
        >
          <img src="${img.src}" alt="" />
        </button>
      `
      )
      .join("");

    const colorsHtml = currentProduct.colors
      .map((col) => {
        const isSelected = state.selectedColor && state.selectedColor.name === col.name;
        return `
          <button
            type="button"
            class="color-choice-btn ${isSelected ? "is-selected" : ""}"
            data-select-color="${col.name}"
            aria-pressed="${isSelected}"
          >
            <span class="color-choice-swatch" style="background-color: ${col.hex};" aria-hidden="true"></span>
            <span>${col.name}</span>
          </button>
        `;
      })
      .join("");

    const sizesHtml = currentProduct.sizes
      .map((sz) => {
        const isSelected = state.selectedSize === sz;
        return `
          <button
            type="button"
            class="size-choice-btn ${isSelected ? "is-selected" : ""}"
            data-select-size="${sz}"
            aria-pressed="${isSelected}"
          >
            ${sz.replace("-", "–")}
          </button>
        `;
      })
      .join("");

    const detailsListHtml = currentProduct.details
      .map((d) => `<li>${d}</li>`)
      .join("");

    mount.innerHTML = `
      <div class="pdp-layout">
        <!-- Left Column: Image Gallery -->
        <div class="pdp-gallery">
          <div class="pdp-thumbs" role="group" aria-label="Product thumbnails">
            ${thumbsHtml}
          </div>
          <div class="pdp-stage">
            <div class="pdp-stage__img-wrap">
              ${
                currentProduct.badge
                  ? `<span class="product-card__badge">${currentProduct.badge}</span>`
                  : ""
              }
              <img
                src="${activeImg.src}"
                alt="${activeImg.alt}"
                class="pdp-stage__img"
                id="pdp-main-img"
                width="800"
                height="960"
              />
            </div>
            <div class="pdp-stage__caption" id="pdp-main-caption">
              ${activeImg.caption || activeImg.alt}
            </div>
          </div>
        </div>

        <!-- Right Column: Product information & purchase controls -->
        <div class="pdp-info">
          <div class="pdp-info__top">
            <span class="pdp-age-pill">Ages ${currentProduct.ageGroup}</span>
            <h1 class="pdp-title">${currentProduct.name}</h1>
            <p class="pdp-fabric">${currentProduct.fabricSummary}</p>
            <div class="pdp-price">
              <span>${app.formatPKR(currentProduct.price)}</span>
              <span class="pdp-price__tax">In stock • Cash on Delivery</span>
            </div>
          </div>

          <p class="pdp-description">
            ${currentProduct.shortDescription}
          </p>

          <!-- Colour Selection -->
          <div class="pdp-selector-block">
            <div class="pdp-selector-header">
              <div>
                <span class="pdp-selector-label">Colour</span>
                <span class="pdp-selector-value" id="selected-color-label">${
                  state.selectedColor ? state.selectedColor.name : ""
                }</span>
              </div>
            </div>
            <div class="color-options-row" role="group" aria-label="Select colour">
              ${colorsHtml}
            </div>
          </div>

          <!-- Size Selection (Required) -->
          <div class="pdp-selector-block" id="pdp-size-block">
            <div class="pdp-selector-header">
              <div>
                <span class="pdp-selector-label">Size</span>
                <span class="pdp-selector-value ${state.selectedSize ? "" : "is-placeholder"}" id="selected-size-label">
                  ${state.selectedSize ? state.selectedSize.replace("-", "–") : "Select your child’s size"}
                </span>
              </div>
              <button type="button" class="size-guide-trigger" data-open-size-guide>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="10" rx="1"/><line x1="6" y1="7" x2="6" y2="11"/><line x1="10" y1="7" x2="10" y2="13"/><line x1="14" y1="7" x2="14" y2="11"/><line x1="18" y1="7" x2="18" y2="13"/></svg>
                Size Guide
              </button>
            </div>
            <div class="size-options-grid" role="group" aria-label="Select size">
              ${sizesHtml}
            </div>
            <div class="pdp-validation-msg ${state.showSizeError ? "is-visible" : ""}" id="pdp-size-error" role="alert">
              ${state.showSizeError ? "Please choose a size first." : ""}
            </div>
          </div>

          <!-- Quantity & primary purchase action -->
          <div class="pdp-purchase">
            <div class="pdp-purchase-row" id="pdp-purchase-row">
              <div class="qty-control" role="group" aria-label="Quantity">
                <button type="button" class="qty-btn" id="pdp-qty-dec" aria-label="Decrease quantity">−</button>
                <input
                  type="number"
                  id="pdp-qty-input"
                  class="qty-input"
                  value="${state.quantity}"
                  min="1"
                  max="15"
                  aria-label="Quantity"
                />
                <button type="button" class="qty-btn" id="pdp-qty-inc" aria-label="Increase quantity">+</button>
              </div>

              <button type="button" class="btn btn-primary btn-lg" id="pdp-add-to-cart-btn">
                Add to Bag <span class="btn__divider" aria-hidden="true"></span> <span class="btn__price">${app.formatPKR(currentProduct.price * state.quantity)}</span>
              </button>
            </div>

            <button type="button" class="btn btn-outline btn-block" id="pdp-buy-now-btn">
              Buy now — Cash on Delivery
            </button>
          </div>

          <ul class="pdp-reassurance-list">
            <li class="pdp-reassurance-item">Gentle on sensitive skin</li>
            <li class="pdp-reassurance-item">7-day size exchange</li>
            <li class="pdp-reassurance-item">Delivery across Pakistan</li>
          </ul>

          <!-- Collapsible details (closed by default) -->
          <div class="pdp-accordions">
            ${accordionHtml("details-panel", "Garment details &amp; fit", `
              <ul>${detailsListHtml}</ul>
              <p class="accordion-meta">SKU: ${currentProduct.sku}</p>
            `)}
            ${accordionHtml("care-panel", "Fabric &amp; wash care", `
              <p><strong>Material:</strong> ${currentProduct.fabricSummary}</p>
              <p>${currentProduct.fabricCare}</p>
            `)}
            ${accordionHtml("delivery-panel", "Delivery &amp; size exchange", `
              <p><strong>Delivery:</strong> ${config.shippingNote}</p>
              <p><strong>Exchanges:</strong> ${config.exchangeNote}</p>
            `)}
          </div>
        </div>
      </div>
    `;

    renderStickyBar();

    if (restoreFocus) {
      const el = mount.querySelector(restoreFocus);
      if (el) el.focus({ preventScroll: true });
    }
  }

  function accordionHtml(id, title, body) {
    const open = state.openPanels.has(id);
    return `
      <div class="accordion-item">
        <button type="button" class="accordion-trigger" data-accordion-toggle="${id}" aria-expanded="${open}" aria-controls="${id}">
          <span>${title}</span>
          <span class="accordion-icon" aria-hidden="true"></span>
        </button>
        <div class="accordion-content" id="${id}" ${open ? "" : "hidden"}>
          ${body}
        </div>
      </div>
    `;
  }

  // Mobile-only bar that keeps price + Add to Bag reachable once the main button scrolls away
  function renderStickyBar() {
    const app = window.LittleTraitsApp;
    let bar = document.getElementById("pdp-sticky-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "pdp-sticky-bar";
      bar.className = "pdp-sticky-bar";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
      observePurchaseRow(bar);
    }
    bar.innerHTML = `
      <div class="pdp-sticky-bar__info">
        <span class="pdp-sticky-bar__name">${currentProduct.name}</span>
        <span class="pdp-sticky-bar__meta">${app.formatPKR(currentProduct.price)}${
          state.selectedSize ? ` • ${app.formatSize(state.selectedSize)}` : ""
        }</span>
      </div>
      <button type="button" class="btn btn-primary" data-sticky-add tabindex="-1">
        ${state.selectedSize ? "Add to Bag" : "Choose size"}
      </button>
    `;
  }

  function observePurchaseRow(bar) {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const row = document.getElementById("pdp-purchase-row");
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const scrolledPast = rect.bottom < 0;
        entries.forEach(() => {
          bar.classList.toggle("is-visible", scrolledPast);
          document.body.classList.toggle("has-sticky-bar", scrolledPast);
        });
      },
      { threshold: [0, 1] }
    );
    const attach = () => {
      const row = document.getElementById("pdp-purchase-row");
      if (row) io.observe(row);
    };
    attach();
    // Re-attach after each re-render replaces the purchase row
    new MutationObserver(() => {
      io.disconnect();
      attach();
    }).observe(document.getElementById("pdp-mount"), { childList: true });
  }

  function renderRelatedProducts() {
    const relatedGrid = document.getElementById("pdp-related-grid");
    const app = window.LittleTraitsApp;
    if (!relatedGrid || !currentProduct || !app) return;

    const related = (p) =>
      p.category === currentProduct.category ||
      (p.secondaryCategories || []).includes(currentProduct.category) ||
      (currentProduct.secondaryCategories || []).includes(p.category);
    const others = products
      .filter((p) => p.id !== currentProduct.id)
      .sort((a, b) => Number(related(b)) - Number(related(a)));

    relatedGrid.innerHTML = others
      .slice(0, 4)
      .map((p) => app.renderProductCard(p))
      .join("");
  }

  function validateSizeSelection() {
    if (state.selectedSize) {
      state.showSizeError = false;
      return true;
    }
    state.showSizeError = true;
    renderProductView();
    const block = document.getElementById("pdp-size-block");
    if (block) {
      const top = block.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
      const firstSize = block.querySelector("[data-select-size]");
      if (firstSize) firstSize.focus({ preventScroll: true });
    }
    return false;
  }

  function addSelectionToBag() {
    const app = window.LittleTraitsApp;
    if (!app || !currentProduct) return false;
    return app.addToCart({
      productId: currentProduct.id,
      size: state.selectedSize,
      colorName: state.selectedColor.name,
      quantity: state.quantity,
      silent: true
    });
  }

  function bindProductEvents() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      const thumbBtn = target.closest("[data-gallery-idx]");
      if (thumbBtn) {
        state.activeImageIndex = parseInt(thumbBtn.getAttribute("data-gallery-idx"), 10);
        renderProductView();
        return;
      }

      const colorBtn = target.closest("[data-select-color]");
      if (colorBtn && currentProduct) {
        const colName = colorBtn.getAttribute("data-select-color");
        const foundCol = currentProduct.colors.find((c) => c.name === colName);
        if (foundCol) {
          state.selectedColor = foundCol;
          if (typeof foundCol.imageIndex === "number") {
            state.activeImageIndex = foundCol.imageIndex;
          }
          renderProductView();
        }
        return;
      }

      const sizeBtn = target.closest("[data-select-size]");
      if (sizeBtn) {
        state.selectedSize = sizeBtn.getAttribute("data-select-size");
        state.showSizeError = false;
        renderProductView();
        return;
      }

      if (target.closest("#pdp-qty-dec")) {
        state.quantity = Math.max(1, state.quantity - 1);
        renderProductView();
        return;
      }

      if (target.closest("#pdp-qty-inc")) {
        state.quantity = Math.min(15, state.quantity + 1);
        renderProductView();
        return;
      }

      if (target.closest("#pdp-add-to-cart-btn") || target.closest("[data-sticky-add]")) {
        if (!validateSizeSelection()) return;
        if (addSelectionToBag()) window.LittleTraitsApp.openDrawer("cart-drawer");
        return;
      }

      if (target.closest("#pdp-buy-now-btn")) {
        if (!validateSizeSelection()) return;
        if (addSelectionToBag()) window.LittleTraitsApp.openDemoCheckoutModal();
        return;
      }

      const accBtn = target.closest("[data-accordion-toggle]");
      if (accBtn) {
        const panelId = accBtn.getAttribute("data-accordion-toggle");
        const panel = document.getElementById(panelId);
        if (panel) {
          const willOpen = panel.hidden;
          panel.hidden = !willOpen;
          accBtn.setAttribute("aria-expanded", String(willOpen));
          if (willOpen) state.openPanels.add(panelId);
          else state.openPanels.delete(panelId);
        }
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target && e.target.id === "pdp-qty-input") {
        const val = parseInt(e.target.value, 10);
        state.quantity = isNaN(val) ? 1 : Math.max(1, Math.min(15, val));
        renderProductView();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    currentProduct = resolveProductFromUrl();
    if (!currentProduct) return;
    state.selectedColor = currentProduct.colors[0];
    state.activeImageIndex = 0;
    state.selectedSize = null; // Size must be chosen explicitly before adding to bag
    state.quantity = 1;
    bindProductEvents();
    renderProductView();
    renderRelatedProducts();
  });
})();
