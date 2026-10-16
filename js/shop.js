/**
 * LITTLE TRAITS — SHOP / CATEGORY LISTING CONTROLLER
 *
 * Operates on window.PRODUCTS & window.CATEGORIES:
 * - Reads initial category, size & sort from URL query parameters (?category=boys&size=2-3Y&sort=price-asc)
 * - Department pills (header) and size chips (toolbar) form one horizontal filter bar on every breakpoint
 * - Renders product count, applied-filter overview, and a helpful empty state
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

    const titleEl = document.getElementById("shop-page-title");
    const descEl = document.getElementById("shop-page-desc");
    const eyebrowEl = document.getElementById("shop-eyebrow");
    const breadcrumbEl = document.getElementById("breadcrumb-current");

    if (titleEl) titleEl.textContent = activeCat.name;
    if (descEl) descEl.textContent = activeCat.description;
    if (eyebrowEl) eyebrowEl.textContent = `Debut Capsule • Ages ${activeCat.ageSpan}`;
    if (breadcrumbEl) breadcrumbEl.textContent = activeCat.name;
    document.title = `${activeCat.id === "all" ? "Shop All" : activeCat.name} — Little Traits | Kidswear Pakistan`;

    const tabsEl = document.getElementById("shop-category-tabs");
    if (tabsEl) {
      tabsEl.innerHTML = categories
        .map((c) => {
          const isActive = c.id === state.category;
          return `
            <button type="button" class="cat-tab ${isActive ? "is-active" : ""}" data-set-category="${c.id}" aria-pressed="${isActive}">
              ${c.shortLabel} <span class="cat-tab__count">${countFor(c.id, "all")}</span>
            </button>
          `;
        })
        .join("");
    }
  }

  function renderSizeChips() {
    const chipsEl = document.getElementById("shop-size-chips");
    if (!chipsEl) return;

    const chip = (value, label) => {
      const isSelected = state.size === value;
      const available = value === "all" || countFor(state.category, value) > 0;
      return `
        <button type="button" class="size-chip ${isSelected ? "is-selected" : ""} ${available ? "" : "is-unavailable"}"
          data-set-size="${value}" aria-pressed="${isSelected}">
          ${label}
        </button>
      `;
    };

    chipsEl.innerHTML = [chip("all", "All sizes")]
      .concat(allSizes.map((sz) => chip(sz, sizeLabel(sz))))
      .join("");
  }

  function renderAppliedFilters(filteredCount) {
    const countEl = document.getElementById("shop-results-count");
    if (countEl) {
      countEl.textContent = `${filteredCount} ${filteredCount === 1 ? "piece" : "pieces"}`;
    }

    const activeBar = document.getElementById("active-filters-bar");
    if (!activeBar) return;

    const tags = [];
    if (state.category !== "all") {
      const catObj = categories.find((c) => c.id === state.category);
      tags.push(`
        <button type="button" class="active-filter-tag" data-set-category="all" aria-label="Remove ${catObj ? catObj.name : state.category} filter">
          ${catObj ? catObj.name : state.category} <span aria-hidden="true">✕</span>
        </button>
      `);
    }
    if (state.size !== "all") {
      tags.push(`
        <button type="button" class="active-filter-tag" data-set-size="all" aria-label="Remove size ${sizeLabel(state.size)} filter">
          Size ${sizeLabel(state.size)} <span aria-hidden="true">✕</span>
        </button>
      `);
    }

    if (tags.length > 0) {
      activeBar.hidden = false;
      activeBar.innerHTML =
        tags.join("") +
        (tags.length > 1 ? `<button type="button" class="btn-text" data-reset-filters>Clear all</button>` : "");
    } else {
      activeBar.hidden = true;
      activeBar.innerHTML = "";
    }
  }

  function renderCatalogueGrid() {
    const filtered = getFilteredProducts();
    const gridEl = document.getElementById("shop-product-grid");
    const emptyEl = document.getElementById("shop-empty-state");

    renderAppliedFilters(filtered.length);
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

  function scrollActiveChipsIntoView() {
    document
      .querySelectorAll(".chip-scroller .is-active, .chip-scroller .is-selected")
      .forEach((el) => {
        const scroller = el.closest(".chip-scroller");
        if (scroller && scroller.scrollWidth > scroller.clientWidth) {
          const offset = el.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
          scroller.scrollLeft += offset - scroller.clientWidth / 2 + el.clientWidth / 2;
        }
      });
  }

  function updateAll() {
    syncUrlParams();
    renderHeader();
    renderSizeChips();
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
    scrollActiveChipsIntoView();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scrollActiveChipsIntoView);
    }
  });
})();
