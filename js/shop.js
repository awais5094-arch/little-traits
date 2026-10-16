/**
 * LITTLE TRAITS — SHOP / CATEGORY LISTING CONTROLLER
 *
 * Operates on window.PRODUCTS & window.CATEGORIES:
 * - Reads initial category & size filters from URL query parameters (?category=boys&size=2-3Y)
 * - Supports interactive filtering by department (All, Boys, Girls, Baby, Sets & Knits)
 * - Supports interactive filtering by child size (6-12M up to 8-10Y)
 * - Supports sorting (Featured, Price Low-High, Price High-Low, A-Z)
 * - Renders product count, active filter chips, and helpful empty states
 */

(function () {
  const products = window.PRODUCTS || [];
  const categories = window.CATEGORIES || [];
  const allSizes = window.ALL_SIZES || [];

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

    if (categories.some((c) => c.id === catParam)) {
      state.category = catParam;
    } else {
      state.category = "all";
    }

    if (allSizes.includes(sizeParam)) {
      state.size = sizeParam;
    } else {
      state.size = "all";
    }

    state.sort = sortParam;
  }

  function syncUrlParams() {
    const url = new URL(window.location.href);
    if (state.category && state.category !== "all") {
      url.searchParams.set("category", state.category);
    } else {
      url.searchParams.delete("category");
    }

    if (state.size && state.size !== "all") {
      url.searchParams.set("size", state.size);
    } else {
      url.searchParams.delete("size");
    }

    if (state.sort && state.sort !== "featured") {
      url.searchParams.set("sort", state.sort);
    } else {
      url.searchParams.delete("sort");
    }

    window.history.replaceState({}, "", url.toString());
  }

  function matchesCategory(product, catId) {
    if (!catId || catId === "all") return true;
    if (product.category === catId) return true;
    if (
      Array.isArray(product.secondaryCategories) &&
      product.secondaryCategories.includes(catId)
    ) {
      return true;
    }
    return false;
  }

  function getFilteredProducts() {
    let list = products.filter((p) => {
      const catMatch = matchesCategory(p, state.category);
      const sizeMatch =
        state.size === "all" || (p.sizes && p.sizes.includes(state.size));
      return catMatch && sizeMatch;
    });

    if (state.sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sort === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  function getCategoryCount(catId) {
    return products.filter((p) => matchesCategory(p, catId)).length;
  }

  function renderHeaderBanner() {
    const activeCat =
      categories.find((c) => c.id === state.category) || categories[0];

    const titleEl = document.getElementById("shop-page-title");
    const descEl = document.getElementById("shop-page-desc");
    const eyebrowEl = document.getElementById("shop-eyebrow");
    const breadcrumbEl = document.getElementById("breadcrumb-current");

    if (titleEl) titleEl.textContent = activeCat.name;
    if (descEl) descEl.textContent = activeCat.description;
    if (eyebrowEl)
      eyebrowEl.textContent = `Debut Capsule • Ages ${activeCat.ageSpan}`;
    if (breadcrumbEl) breadcrumbEl.textContent = activeCat.name;

    // Render top category tabs
    const tabsEl = document.getElementById("shop-category-tabs");
    if (tabsEl) {
      tabsEl.innerHTML = categories
        .map((c) => {
          const isActive = c.id === state.category;
          const count = getCategoryCount(c.id);
          return `
            <button
              type="button"
              role="tab"
              aria-selected="${isActive}"
              class="cat-tab ${isActive ? "is-active" : ""}"
              data-set-category="${c.id}"
            >
              ${c.shortLabel} (${count})
            </button>
          `;
        })
        .join("");
    }
  }

  function buildFilterPanelHTML() {
    const catItems = categories
      .map((c) => {
        const isSelected = c.id === state.category;
        const count = getCategoryCount(c.id);
        return `
          <li>
            <button
              type="button"
              class="filter-radio-item ${isSelected ? "is-selected" : ""}"
              data-set-category="${c.id}"
              style="width: 100%;"
            >
              <span>${c.name}</span>
              <span style="font-size: 0.76rem; color: var(--text-muted);">${count}</span>
            </button>
          </li>
        `;
      })
      .join("");

    const sizeChips = [
      `<button type="button" class="size-chip ${
        state.size === "all" ? "is-selected" : ""
      }" data-set-size="all" style="grid-column: 1 / -1;">All Sizes</button>`
    ]
      .concat(
        allSizes.map((sz) => {
          const isSelected = state.size === sz;
          return `
            <button
              type="button"
              class="size-chip ${isSelected ? "is-selected" : ""}"
              data-set-size="${sz}"
            >
              ${sz}
            </button>
          `;
        })
      )
      .join("");

    return `
      <div class="filter-group">
        <div class="filter-group__title">
          <span>Department</span>
          ${
            state.category !== "all" || state.size !== "all"
              ? `<button type="button" data-reset-filters style="font-family: var(--font-sans); font-size: 0.74rem; color: var(--accent-terracotta); text-decoration: underline;">Reset All</button>`
              : ""
          }
        </div>
        <ul class="filter-radio-list">
          ${catItems}
        </ul>
      </div>

      <div class="filter-group">
        <div class="filter-group__title">
          <span>Child Size / Age</span>
          <button type="button" data-open-size-guide style="font-family: var(--font-sans); font-size: 0.74rem; color: var(--text-muted); text-decoration: underline;">Size Chart</button>
        </div>
        <div class="size-filter-grid">
          ${sizeChips}
        </div>
      </div>
    `;
  }

  function renderFilters() {
    const html = buildFilterPanelHTML();
    const desktopMount = document.getElementById("desktop-filters-mount");
    const mobileMount = document.getElementById("mobile-filters-mount");
    if (desktopMount) desktopMount.innerHTML = html;
    if (mobileMount) mobileMount.innerHTML = html;

    // Active filter chips bar
    const activeBar = document.getElementById("active-filters-bar");
    if (!activeBar) return;

    const tags = [];
    if (state.category !== "all") {
      const catObj = categories.find((c) => c.id === state.category);
      tags.push(`
        <span class="active-filter-tag">
          Collection: <strong>${catObj ? catObj.name : state.category}</strong>
          <button type="button" data-set-category="all" aria-label="Remove category filter" style="margin-left: 0.25rem; font-weight: 700;">✕</button>
        </span>
      `);
    }
    if (state.size !== "all") {
      tags.push(`
        <span class="active-filter-tag">
          Size: <strong>${state.size}</strong>
          <button type="button" data-set-size="all" aria-label="Remove size filter" style="margin-left: 0.25rem; font-weight: 700;">✕</button>
        </span>
      `);
    }

    if (tags.length > 0) {
      activeBar.style.display = "flex";
      activeBar.innerHTML =
        tags.join("") +
        `<button type="button" data-reset-filters style="font-size: 0.78rem; color: var(--accent-terracotta); text-decoration: underline; margin-left: 0.35rem;">Clear all filters</button>`;
    } else {
      activeBar.style.display = "none";
      activeBar.innerHTML = "";
    }
  }

  function renderCatalogueGrid() {
    const filtered = getFilteredProducts();
    const gridEl = document.getElementById("shop-product-grid");
    const emptyEl = document.getElementById("shop-empty-state");
    const countEl = document.getElementById("shop-results-count");
    const applyMobileBtn = document.getElementById("apply-mobile-filters-btn");

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${products.length} ${
        filtered.length === 1 ? "piece" : "pieces"
      }`;
    }

    if (applyMobileBtn) {
      applyMobileBtn.textContent = `Show ${filtered.length} Matching ${
        filtered.length === 1 ? "Piece" : "Pieces"
      }`;
    }

    if (!gridEl || !emptyEl) return;

    if (filtered.length === 0) {
      gridEl.style.display = "none";
      gridEl.innerHTML = "";
      emptyEl.style.display = "block";
      const catObj = categories.find((c) => c.id === state.category);
      emptyEl.innerHTML = `
        <div class="empty-state-box">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-terracotta); margin-bottom: 0.5rem;">
            No Matching Garments
          </div>
          <h2 class="heading-md" style="margin-bottom: 0.65rem;">
            No pieces found for ${catObj ? catObj.name : "this collection"} in size ${state.size}.
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            Our baby rompers are sized from <strong>6-12M to 18-24M</strong>, while our boys and girls sets run up to <strong>8-10Y</strong>. Reset your filters to browse all 6 debut pieces.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;">
            <button type="button" class="btn btn-primary" data-reset-filters>
              Reset All Filters
            </button>
            <button type="button" class="btn btn-outline" data-set-size="all">
              Show All Sizes in ${catObj ? catObj.shortLabel : "Collection"}
            </button>
          </div>
        </div>
      `;
      return;
    }

    emptyEl.style.display = "none";
    emptyEl.innerHTML = "";
    gridEl.style.display = "grid";

    const app = window.LittleTraitsApp;
    if (app) {
      gridEl.innerHTML = filtered.map((p) => app.renderProductCard(p)).join("");
    }
  }

  function updateAll() {
    syncUrlParams();
    renderHeaderBanner();
    renderFilters();
    renderCatalogueGrid();
  }

  function initShopEvents() {
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
        // Toggle off if clicking already active size chip
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
        return;
      }

      if (target.closest("#open-mobile-filters-btn")) {
        if (window.LittleTraitsApp) {
          window.LittleTraitsApp.openDrawer("mobile-filter-drawer");
        }
        return;
      }

      if (
        target.closest("#close-mobile-filter-btn") ||
        target.closest("#apply-mobile-filters-btn")
      ) {
        if (window.LittleTraitsApp) {
          window.LittleTraitsApp.closeAllOverlays();
        }
        return;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    parseUrlParams();
    initShopEvents();
    updateAll();
  });
})();
