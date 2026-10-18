/** User-controlled campaign carousel: crossfade, arrows, dots, keyboard and touch swipe. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("campaign-banner");
    if (!banner) return;
    const slides = Array.from(banner.querySelectorAll("[data-campaign-slide]"));
    const dots = Array.from(banner.querySelectorAll("[data-campaign-index]"));
    const controls = banner.querySelector(".campaign-controls");
    const status = document.getElementById("campaign-status");
    if (slides.length < 2 || !controls) return;
    let current = 0;
    let startPoint = null;
    banner.classList.add("is-ready");
    slides.forEach((slide) => { slide.hidden = false; });
    selectSlide(0, false);
    controls.hidden = false;

    function selectSlide(index, announce) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        const active = position === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        slide.inert = !active;
      });
      dots.forEach((dot, position) => {
        dot.classList.toggle("is-active", position === current);
        dot.setAttribute("aria-pressed", String(position === current));
      });
      if (announce && status) status.textContent = slides[current].getAttribute("aria-label");
    }

    controls.addEventListener("click", function (event) {
      const dot = event.target.closest("[data-campaign-index]");
      const arrow = event.target.closest("[data-campaign-step]");
      if (dot) selectSlide(Number(dot.getAttribute("data-campaign-index")), true);
      else if (arrow) selectSlide(current + Number(arrow.getAttribute("data-campaign-step")), true);
    });
    controls.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      selectSlide(current + (event.key === "ArrowRight" ? 1 : -1), true);
      dots[current].focus({ preventScroll: true });
    });
    banner.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "touch" || event.isPrimary === false || event.target.closest(".campaign-controls")) return;
      startPoint = { x: event.clientX, y: event.clientY };
    });
    banner.addEventListener("pointerup", function (event) {
      if (!startPoint) return;
      const dx = event.clientX - startPoint.x;
      const dy = event.clientY - startPoint.y;
      startPoint = null;
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) selectSlide(current + (dx < 0 ? 1 : -1), true);
    });
    banner.addEventListener("pointercancel", function () { startPoint = null; });
  });
})();
