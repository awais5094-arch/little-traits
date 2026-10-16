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
    quantity: 1
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
      <span aria-hidden="true">/</span>
      <span style="color: var(--text-primary); font-weight: 500;">${product.name}</span>
    `;
  }

  function renderProductView() {
    const mount = document.getElementById("pdp-mount");
    const app = window.LittleTraitsApp;
    if (!mount || !currentProduct || !app) return;

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
          <img src="${img.src}" alt="${img.alt}" />
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
            <span class="color-choice-swatch" style="background-color: ${col.hex};"></span>
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
            ${sz}
          </button>
        `;
      })
      .join("");

    const detailsListHtml = currentProduct.details
      .map((d) => `<li>${d}</li>`)
      .join("");

    // Quick switcher pills so reviewers can also jump between all 6 demo products right from the top
    const quickProductSwitcher = products
      .map(
        (p) => `
        <a
          href="product.html?id=${p.id}"
          style="padding: 0.3rem 0.65rem; font-size: 0.75rem; border-radius: 4px; border: 1px solid ${
            p.id === currentProduct.id ? "var(--text-primary)" : "var(--border-subtle)"
          }; background: ${
            p.id === currentProduct.id ? "var(--bg-sand)" : "var(--bg-card)"
          }; font-weight: ${p.id === currentProduct.id ? "600" : "400"}; white-space: nowrap;"
        >
          ${p.name.split(" ").slice(0, 2).join(" ")}
        </a>
      `
      )
      .join("");

    mount.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; overflow-x: auto; padding-bottom: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
        <span style="font-size: 0.74rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap;">Catalogue Jump:</span>
        ${quickProductSwitcher}
      </div>

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

        <!-- Right Column: Product Information & Variation Controls -->
        <div class="pdp-info">
          <div class="pdp-info__top">
            <div class="pdp-sku-row">
              <span>SKU: ${currentProduct.sku}</span>
              <span>Age Range: ${currentProduct.ageGroup}</span>
            </div>
            <h1 class="heading-lg" style="margin-bottom: 0.25rem;">${currentProduct.name}</h1>
            <p style="font-size: 0.95rem; color: var(--text-secondary);">${currentProduct.shortSubtitle} • ${currentProduct.fabricSummary}</p>
            <div class="pdp-price">
              <span>${app.formatPKR(currentProduct.price)}</span>
              <span class="pdp-price__tax">Inclusive of all taxes in Pakistan</span>
            </div>
          </div>

          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.65;">
            ${currentProduct.shortDescription}
          </p>

          <!-- Colour Selection -->
          <div class="pdp-selector-block">
            <div class="pdp-selector-header">
              <div>
                <span class="pdp-selector-label">Colour:</span>
                <span class="pdp-selector-value" id="selected-color-label">${
                  state.selectedColor ? state.selectedColor.name : ""
                }</span>
              </div>
            </div>
            <div class="color-options-row" role="radiogroup" aria-label="Select colour">
              ${colorsHtml}
            </div>
          </div>

          <!-- Size Selection (Required) -->
          <div class="pdp-selector-block">
            <div class="pdp-selector-header">
              <div>
                <span class="pdp-selector-label">Child Size: <span style="color: var(--accent-berry);">*</span></span>
                <span class="pdp-selector-value" id="selected-size-label">
                  ${state.selectedSize ? state.selectedSize : "Please select a size"}
                </span>
              </div>
              <button type="button" class="size-guide-trigger" data-open-size-guide>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="10" rx="1"/><line x1="6" y1="7" x2="6" y2="11"/><line x1="10" y1="7" x2="10" y2="13"/><line x1="14" y1="7" x2="14" y2="11"/><line x1="18" y1="7" x2="18" y2="13"/></svg>
                Size Guide
              </button>
            </div>
            <div class="size-options-grid" role="radiogroup" aria-label="Select size">
              ${sizesHtml}
            </div>
            <div class="pdp-validation-msg" id="pdp-size-error" role="alert">
              Please select a child size above before adding this garment to your bag.
            </div>
          </div>

          <!-- Quantity & Add to Cart Actions -->
          <div class="pdp-purchase-row">
            <div class="qty-control" aria-label="Product quantity">
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

            <button type="button" class="btn btn-primary" id="pdp-add-to-cart-btn" style="min-height: 48px; font-size: 0.92rem;">
              Add to Shopping Bag — ${app.formatPKR(currentProduct.price * state.quantity)}
            </button>
          </div>

          <!-- Secondary Honest Demo Buy Now Action -->
          <button type="button" class="btn btn-outline" id="pdp-buy-now-btn" style="width: 100%; min-height: 44px;">
            Buy Now (Preview WooCommerce Checkout)
          </button>

          <!-- Selected Variation Summary Pill -->
          <div style="padding: 0.7rem 0.95rem; background: var(--bg-sand); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); font-size: 0.8rem; color: var(--text-secondary); display: flex; justify-content: space-between; align-items: center;">
            <span id="variation-summary-text">
              Selected: <strong>${state.selectedColor ? state.selectedColor.name : ""}</strong> • Size: <strong>${
      state.selectedSize || "Not selected"
    }</strong>
            </span>
            <span style="color: var(--accent-sage); font-weight: 600;">In Stock</span>
          </div>

          <!-- Product Details, Fabric & Care, and Delivery Accordions -->
          <div class="pdp-accordions">
            <div class="accordion-item">
              <button type="button" class="accordion-trigger" data-accordion-toggle="details-panel" aria-expanded="true">
                <span>Garment Details &amp; Construction</span>
                <span aria-hidden="true">−</span>
              </button>
              <div class="accordion-content" id="details-panel">
                <ul>
                  ${detailsListHtml}
                </ul>
              </div>
            </div>

            <div class="accordion-item" id="care-accordion">
              <button type="button" class="accordion-trigger" data-accordion-toggle="care-panel" aria-expanded="true">
                <span>Fabric Composition &amp; Wash Care</span>
                <span aria-hidden="true">−</span>
              </button>
              <div class="accordion-content" id="care-panel">
                <p><strong>Material:</strong> ${currentProduct.fabricSummary}</p>
                <p style="margin-top: 0.35rem;">${currentProduct.fabricCare}</p>
              </div>
            </div>

            <div class="accordion-item" id="delivery-accordion">
              <button type="button" class="accordion-trigger" data-accordion-toggle="delivery-panel" aria-expanded="true">
                <span>Delivery &amp; Size Exchange Information</span>
                <span aria-hidden="true">−</span>
              </button>
              <div class="accordion-content" id="delivery-panel">
                <p><strong>Delivery:</strong> ${config.shippingNote}</p>
                <p style="margin-top: 0.35rem;"><strong>Exchanges:</strong> ${config.exchangeNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderRelatedProducts() {
    const relatedGrid = document.getElementById("pdp-related-grid");
    const app = window.LittleTraitsApp;
    if (!relatedGrid || !currentProduct || !app) return;

    const others = products.filter((p) => p.id !== currentProduct.id);
    // Prioritize same category or secondary category matches
    others.sort((a, b) => {
      const aScore = a.category === currentProduct.category ? 2 : 1;
      const bScore = b.category === currentProduct.category ? 2 : 1;
      return bScore - aScore;
    });

    const topThree = others.slice(0, 3);
    relatedGrid.innerHTML = topThree
      .map((p) => app.renderProductCard(p))
      .join("");
  }

  function validateSizeSelection() {
    const errEl = document.getElementById("pdp-size-error");
    if (!state.selectedSize) {
      if (errEl) errEl.classList.add("is-visible");
      return false;
    }
    if (errEl) errEl.classList.remove("is-visible");
    return true;
  }

  function bindProductEvents() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      // Gallery thumbnail click
      const thumbBtn = target.closest("[data-gallery-idx]");
      if (thumbBtn) {
        state.activeImageIndex = parseInt(
          thumbBtn.getAttribute("data-gallery-idx"),
          10
        );
        renderProductView();
        return;
      }

      // Colour variation click
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

      // Size variation click
      const sizeBtn = target.closest("[data-select-size]");
      if (sizeBtn) {
        state.selectedSize = sizeBtn.getAttribute("data-select-size");
        renderProductView();
        return;
      }

      // Quantity decrement
      if (target.closest("#pdp-qty-dec")) {
        state.quantity = Math.max(1, state.quantity - 1);
        renderProductView();
        return;
      }

      // Quantity increment
      if (target.closest("#pdp-qty-inc")) {
        state.quantity = Math.min(15, state.quantity + 1);
        renderProductView();
        return;
      }

      // Add to Cart
      if (target.closest("#pdp-add-to-cart-btn")) {
        if (!validateSizeSelection()) return;
        const app = window.LittleTraitsApp;
        if (app && currentProduct) {
          app.addToCart({
            productId: currentProduct.id,
            size: state.selectedSize,
            colorName: state.selectedColor.name,
            quantity: state.quantity
          });
          app.openDrawer("cart-drawer");
        }
        return;
      }

      // Buy Now (Honest Demo Checkout State)
      if (target.closest("#pdp-buy-now-btn")) {
        if (!validateSizeSelection()) return;
        const app = window.LittleTraitsApp;
        if (app && currentProduct) {
          app.addToCart({
            productId: currentProduct.id,
            size: state.selectedSize,
            colorName: state.selectedColor.name,
            quantity: state.quantity
          });
          app.openDemoCheckoutModal();
        }
        return;
      }

      // Accordion toggles
      const accBtn = target.closest("[data-accordion-toggle]");
      if (accBtn) {
        const panelId = accBtn.getAttribute("data-accordion-toggle");
        const panel = document.getElementById(panelId);
        if (panel) {
          const isHidden = panel.style.display === "none";
          panel.style.display = isHidden ? "block" : "none";
          accBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
          const iconSpan = accBtn.querySelector("span:last-child");
          if (iconSpan) iconSpan.textContent = isHidden ? "−" : "+";
        }
        return;
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
    if (currentProduct) {
      state.selectedColor = currentProduct.colors[0];
      state.activeImageIndex = 0;
      state.selectedSize = null; // Require explicit user selection per brief
      state.quantity = 1;
    }
    bindProductEvents();
    renderProductView();
    renderRelatedProducts();
  });
})();
