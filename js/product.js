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
            <h1 class="pdp-title">${currentProduct.name}</h1>
            <p class="pdp-description">${currentProduct.purchaseSummary || currentProduct.shortSubtitle}</p>
            <div class="pdp-price">
              <span>${app.formatPKR(currentProduct.price)}</span>
            </div>
          </div>

          <!-- Colour Selection -->
          <div class="pdp-selector-block">
            <div class="pdp-selector-header">
              <span class="pdp-selector-label">Colour</span>
            </div>
            <div class="color-options-row" role="group" aria-label="Select colour">
              ${colorsHtml}
            </div>
          </div>

          <!-- Size Selection (Required) -->
          <div class="pdp-selector-block" id="pdp-size-block">
            <div class="pdp-selector-header">
              <span class="pdp-selector-label">Size</span>
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
                <button type="button" class="qty-btn" id="pdp-qty-dec" aria-label="Decrease quantity" ${state.quantity === 1 ? "disabled" : ""}>−</button>
                <input
                  type="number"
                  id="pdp-qty-input"
                  class="qty-input"
                  value="${state.quantity}"
                  min="1"
                  max="15"
                  step="1"
                  inputmode="numeric"
                  aria-label="Quantity"
                />
                <button type="button" class="qty-btn" id="pdp-qty-inc" aria-label="Increase quantity" ${state.quantity === 15 ? "disabled" : ""}>+</button>
              </div>

              <button type="button" class="btn btn-primary btn-lg" id="pdp-add-to-cart-btn">
                Add to Bag
              </button>
            </div>

            <button type="button" class="btn btn-outline btn-block" id="pdp-buy-now-btn">
              Buy now
            </button>
            <p class="pdp-payment-note">Cash on Delivery available</p>
          </div>

          <!-- Collapsible details (closed by default) -->
          <div class="pdp-accordions">
            ${accordionHtml("details-panel", "Product details", `
              <p>${currentProduct.shortDescription}</p>
              <p><strong>Ages:</strong> ${currentProduct.ageGroup}</p>
              <ul>${detailsListHtml}</ul>
              <p class="accordion-meta">SKU: ${currentProduct.sku}</p>
            `)}
            ${accordionHtml("care-panel", "Fabric &amp; care", `
              <p><strong>Material:</strong> ${currentProduct.fabricSummary}</p>
              <p>${currentProduct.fabricCare}</p>
            `)}
            ${accordionHtml("delivery-panel", "Delivery &amp; exchanges", `
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

  // Mobile-only shortcut once the main purchase controls scroll away.
  function renderStickyBar() {
    const app = window.LittleTraitsApp;
    let bar = document.getElementById("pdp-sticky-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "pdp-sticky-bar";
      bar.className = "pdp-sticky-bar";
      bar.setAttribute("aria-hidden", "true");
      bar.innerHTML = `
        <div class="pdp-sticky-bar__info">
          <span class="pdp-sticky-bar__price"></span>
          <span class="pdp-sticky-bar__meta"></span>
        </div>
        <button type="button" class="btn btn-primary" data-sticky-add tabindex="-1"></button>
      `;
      document.body.appendChild(bar);
      observePurchaseRow(bar);
    }
    bar.querySelector(".pdp-sticky-bar__price").textContent = app.formatPKR(currentProduct.price * state.quantity);
    bar.querySelector(".pdp-sticky-bar__meta").textContent = state.selectedSize ? `${app.formatSize(state.selectedSize)} · Qty ${state.quantity}` : "Select a size";
    bar.querySelector("[data-sticky-add]").textContent = state.selectedSize ? "Add to Bag" : "Choose size";
    updateStickyBarVisibility(bar);
  }

  function updateStickyBarVisibility(bar) {
    const row = document.getElementById("pdp-purchase-row");
    const visible = !!row && window.matchMedia("(max-width: 768px)").matches && row.getBoundingClientRect().bottom < 0;
    bar.classList.toggle("is-visible", visible);
    bar.setAttribute("aria-hidden", String(!visible));
    const button = bar.querySelector("[data-sticky-add]");
    if (button) button.tabIndex = visible ? 0 : -1;
    document.body.classList.toggle("has-sticky-bar", visible);
  }

  function observePurchaseRow(bar) {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      () => updateStickyBarVisibility(bar),
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
    window.matchMedia("(max-width: 768px)").addEventListener("change", () => updateStickyBarVisibility(bar));
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
    const input = document.getElementById("pdp-qty-input");
    updateQuantity(input ? input.value : state.quantity);
    return app.addToCart({
      productId: currentProduct.id,
      size: state.selectedSize,
      colorName: state.selectedColor.name,
      quantity: state.quantity,
      silent: true
    });
  }

  // Update the existing controls in place. Replacing the PDP on input blur
  // removes a pressed purchase button before its click event can fire.
  function updateQuantity(value) {
    const parsed = parseInt(value, 10);
    state.quantity = Number.isNaN(parsed) ? 1 : Math.max(1, Math.min(15, parsed));
    const input = document.getElementById("pdp-qty-input");
    const decrease = document.getElementById("pdp-qty-dec");
    const increase = document.getElementById("pdp-qty-inc");
    if (input) input.value = state.quantity;
    if (decrease) decrease.disabled = state.quantity === 1;
    if (increase) increase.disabled = state.quantity === 15;
    renderStickyBar();
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
        updateQuantity(Number(document.getElementById("pdp-qty-input").value) - 1);
        return;
      }

      if (target.closest("#pdp-qty-inc")) {
        updateQuantity(Number(document.getElementById("pdp-qty-input").value) + 1);
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
        updateQuantity(e.target.value);
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
