/**
 * LITTLE TRAITS — SHOP / CATEGORY LISTING CONTROLLER
 *
 * Operates on window.PRODUCTS & window.CATEGORIES:
 * - Reads initial category, size & sort from URL query parameters (?category=boys&size=2-3Y&sort=price-asc)
 * - One filter drawer for departments and size/age, using the shared overlay and focus management
 * - Compact title/count and filter/sort row keep products close to the header
 */

(function () {
  const products = window.PRODUCTS || [];
  const categories = window.CATEGORIES || [];
  const allSizes = window.ALL_SIZES || [];
  const sortOptions = ["featured", "price-asc", "price-desc", "name-asc"];
  const sizeLabel = (sz) => String(sz).replace("-", "–");

  const state = {
    category: "all",
    size: "all",
    sort: "featured"
  };

  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const catParam = (params.get("category") || "all").toLowerCase();
    const sizeParam = params.get("size") || "all";
    const sortParam = params.get("sort") || "featured";

    state.category = categories.some((c) => c.id === catParam) ? catParam : "all";
    state.size = allSizes.includes(sizeParam) ? sizeParam : "all";
    state.sort = sortOptions.includes(sortParam) ? sortParam : "featured";
  }

  function syncUrlParams() {
    const url = new URL(window.location.href);
    const setOrDelete = (key, value, fallback) => {
      if (value && value !== fallback) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    };
    setOrDelete("category", state.category, "all");
    setOrDelete("size", state.size, "all");
    setOrDelete("sort", state.sort, "featured");
    window.history.replaceState({}, "", url.toString());
  }

  function matchesCategory(product, catId) {
    if (!catId || catId === "all") return true;
    if (product.category === catId) return true;
    return Array.isArray(product.secondaryCategories) && product.secondaryCategories.includes(catId);
  }

  function matchesSize(product, size) {
    return size === "all" || (product.sizes && product.sizes.includes(size));
  }

  function getFilteredProducts() {
    const list = products.filter(
      (p) => matchesCategory(p, state.category) && matchesSize(p, state.size)
    );
    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (state.sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function countFor(catId, size) {
    return products.filter((p) => matchesCategory(p, catId) && matchesSize(p, size)).length;
  }

  function renderHeader() {
    const activeCat = categories.find((c) => c.id === state.category) || categories[0];
    document.getElementById("shop-page-title").textContent = activeCat.name;
    document.title = `${activeCat.id === "all" ? "Shop All" : activeCat.name} — Little Traits | Kidswear Pakistan`;
  }

  function renderFilterOptions() {
    document.getElementById("shop-category-options").innerHTML = categories.map((c) => `
      <label class="shop-filter-option">
        <input type="radio" name="shop-category" value="${c.id}" ${state.category === c.id ? "checked" : ""}>
        <span>${c.id === "all" ? "All pieces" : c.shortLabel}</span>
      </label>
    `).join("");
    document.getElementById("shop-size-options").innerHTML = ["all", ...allSizes].map((size) => {
      const unavailable = size !== "all" && countFor(state.category, size) === 0;
      return `<label class="shop-size-option ${unavailable ? "is-unavailable" : ""}">
        <input type="radio" name="shop-size" value="${size}" ${state.size === size ? "checked" : ""}>
        <span>${size === "all" ? "All sizes" : sizeLabel(size)}</span>
        ${unavailable ? '<span class="sr-only"> — no matching pieces</span>' : ""}
      </label>`;
    }).join("");
  }

  function renderResultsSummary(count) {
    const pieces = `${count} ${count === 1 ? "piece" : "pieces"}`;
    document.getElementById("shop-results-count").textContent = pieces + (state.size === "all" ? "" : ` · Size ${sizeLabel(state.size)}`);
    const activeCount = Number(state.category !== "all") + Number(state.size !== "all");
    const badge = document.getElementById("shop-filter-count");
    badge.textContent = activeCount;
    badge.hidden = activeCount === 0;
    document.getElementById("shop-filter-toggle").setAttribute("aria-label", activeCount ? `Filter, ${activeCount} active` : "Filter products");
    document.getElementById("shop-view-results").textContent = `View ${pieces}`;
  }

  function renderCatalogueGrid() {
    const filtered = getFilteredProducts();
    const gridEl = document.getElementById("shop-product-grid");
    const emptyEl = document.getElementById("shop-empty-state");

    renderResultsSummary(filtered.length);
    if (!gridEl || !emptyEl) return;

    if (filtered.length === 0) {
      gridEl.hidden = true;
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      const catObj = categories.find((c) => c.id === state.category);
      emptyEl.innerHTML = `
        <div class="empty-state-box">
          <span class="eyebrow">No matching pieces</span>
          <h2 class="heading-md">Nothing in ${catObj ? catObj.name : "this collection"} for size ${sizeLabel(state.size)} yet.</h2>
          <p>Try a neighbouring size, or view every size in this collection. New pieces arrive each season.</p>
          <div class="empty-state-box__actions">
            <button type="button" class="btn btn-primary" data-set-size="all">
              Show all sizes in ${catObj ? catObj.shortLabel : "this collection"}
            </button>
            <button type="button" class="btn btn-outline" data-reset-filters>Reset filters</button>
          </div>
        </div>
      `;
      return;
    }

    emptyEl.hidden = true;
    emptyEl.innerHTML = "";
    gridEl.hidden = false;

    const app = window.LittleTraitsApp;
    if (app) {
      gridEl.innerHTML = filtered.map((p) => app.renderProductCard(p)).join("");
    }
  }

  function updateAll() {
    const focused = document.activeElement;
    const focusName = focused && focused.name;
    const focusValue = focused && focused.value;
    const restoreToTrigger = focused && focused.closest("#shop-empty-state");
    syncUrlParams();
    renderHeader();
    renderFilterOptions();
    renderCatalogueGrid();
    document.getElementById("shop-sort-select").value = state.sort;
    const app = window.LittleTraitsApp;
    if (app && app.updateShopNavigation) app.updateShopNavigation(state.category);
    if (focusName === "shop-category" || focusName === "shop-size") {
      const replacement = Array.from(document.getElementsByName(focusName)).find((el) => el.value === focusValue);
      if (replacement) replacement.focus({ preventScroll: true });
    } else if (restoreToTrigger) {
      document.getElementById("shop-filter-toggle").focus({ preventScroll: true });
    }
  }

  function initShopEvents() {
    document.getElementById("shop-filter-toggle").addEventListener("click", () => {
      window.LittleTraitsApp.openDrawer("shop-filter-drawer");
    });
    document.getElementById("shop-filter-drawer").addEventListener("change", (e) => {
      if (e.target.name === "shop-category") state.category = e.target.value;
      else if (e.target.name === "shop-size") state.size = e.target.value;
      else return;
      updateAll();
    });
    const sortSelect = document.getElementById("shop-sort-select");
    if (sortSelect) {
      sortSelect.value = state.sort;
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        updateAll();
      });
    }

    document.addEventListener("click", (e) => {
      const target = e.target;

      const catBtn = target.closest("[data-set-category]");
      if (catBtn) {
        state.category = catBtn.getAttribute("data-set-category") || "all";
        updateAll();
        return;
      }

      const sizeBtn = target.closest("[data-set-size]");
      if (sizeBtn) {
        const chosen = sizeBtn.getAttribute("data-set-size") || "all";
        state.size = state.size === chosen && chosen !== "all" ? "all" : chosen;
        updateAll();
        return;
      }

      if (target.closest("[data-reset-filters]")) {
        state.category = "all";
        state.size = "all";
        state.sort = "featured";
        if (sortSelect) sortSelect.value = "featured";
        updateAll();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    parseUrlParams();
    initShopEvents();
    updateAll();

  });
})();
