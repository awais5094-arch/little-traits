/** Campaign carousel: stable slides, six-second rotation and explicit pause. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("campaign-banner");
    if (!banner) return;
    const slides = Array.from(banner.querySelectorAll("[data-campaign-slide]"));
    const dots = Array.from(banner.querySelectorAll("[data-campaign-index]"));
    const controls = banner.querySelector(".campaign-controls");
    const rotation = banner.querySelector("[data-campaign-rotation]");
    const pauseIcon = banner.querySelector("[data-campaign-pause-icon]");
    const playIcon = banner.querySelector("[data-campaign-play-icon]");
    const status = document.getElementById("campaign-status");
    if (slides.length < 2 || !controls || !rotation) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let paused = reducedMotion.matches;
    let hovered = false;
    let focusPaused = false;
    let inView = true;
    let timer = null;
    const delay = 6000;
    controls.hidden = false;

    function canRotate() {
      return !paused && !hovered && !focusPaused && inView &&
        !document.hidden && !document.body.classList.contains("drawer-open");
    }

    function updateRotationControl() {
      rotation.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
      rotation.setAttribute("aria-pressed", String(paused));
      if (pauseIcon) pauseIcon.hidden = paused;
      if (playIcon) playIcon.hidden = !paused;
    }

    function scheduleRotation() {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
      if (!canRotate()) return;
      timer = window.setTimeout(function () {
        timer = null;
        if (canRotate()) selectSlide(current + 1, false);
        scheduleRotation();
      }, delay);
    }

    function selectSlide(index, announce) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => { slide.hidden = position !== current; });
      dots.forEach((dot, position) => {
        dot.classList.toggle("is-active", position === current);
        dot.setAttribute("aria-pressed", String(position === current));
      });
      // Automatic rotation stays quiet and never moves keyboard focus.
      if (announce && status) status.textContent = slides[current].getAttribute("aria-label");
    }

    controls.addEventListener("click", function (event) {
      const dot = event.target.closest("[data-campaign-index]");
      const arrow = event.target.closest("[data-campaign-step]");
      if (event.target.closest("[data-campaign-rotation]")) {
        paused = !paused;
        if (!paused) focusPaused = false; // Explicit Play can start while this control has focus.
        updateRotationControl();
      } else if (dot) selectSlide(Number(dot.getAttribute("data-campaign-index")), true);
      else if (arrow) selectSlide(current + Number(arrow.getAttribute("data-campaign-step")), true);
      scheduleRotation();
    });

    controls.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      selectSlide(current + (event.key === "ArrowRight" ? 1 : -1), true);
      dots[current].focus({ preventScroll: true });
      scheduleRotation();
    });

    banner.addEventListener("pointerenter", function (event) {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      scheduleRotation();
    });
    banner.addEventListener("pointerleave", function (event) {
      if (event.pointerType !== "mouse") return;
      hovered = false;
      scheduleRotation();
    });
    banner.addEventListener("focusin", function () {
      focusPaused = true;
      scheduleRotation();
    });
    banner.addEventListener("focusout", function (event) {
      focusPaused = banner.contains(event.relatedTarget);
      scheduleRotation();
    });
    document.addEventListener("visibilitychange", scheduleRotation);
    reducedMotion.addEventListener("change", function (event) {
      if (event.matches) paused = true;
      updateRotationControl();
      scheduleRotation();
    });

    if ("IntersectionObserver" in window) {
      inView = false;
      new window.IntersectionObserver(function (entries) {
        inView = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.1);
        scheduleRotation();
      }, { threshold: [0, 0.1] }).observe(banner);
    }
    if ("MutationObserver" in window) {
      // Shared cart/menu/modals set this class while the page is inert.
      new window.MutationObserver(scheduleRotation).observe(document.body, {
        attributes: true, attributeFilter: ["class"]
      });
    }
    window.addEventListener("pagehide", function () {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    });
    window.addEventListener("pageshow", scheduleRotation);

    updateRotationControl();
    scheduleRotation();
  });
})();
