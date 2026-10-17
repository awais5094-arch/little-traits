/** Two manually controlled campaign banners; no autoplay or timed focus changes. */
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
    controls.hidden = false;

    function selectSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => { slide.hidden = position !== current; });
      dots.forEach((dot, position) => {
        dot.classList.toggle("is-active", position === current);
        dot.setAttribute("aria-pressed", String(position === current));
      });
      if (status) status.textContent = slides[current].getAttribute("aria-label");
    }

    controls.addEventListener("click", function (event) {
      const dot = event.target.closest("[data-campaign-index]");
      const arrow = event.target.closest("[data-campaign-step]");
      if (dot) selectSlide(Number(dot.getAttribute("data-campaign-index")));
      else if (arrow) selectSlide(current + Number(arrow.getAttribute("data-campaign-step")));
    });

    controls.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      selectSlide(current + (event.key === "ArrowRight" ? 1 : -1));
      dots[current].focus({ preventScroll: true });
    });
  });
})();
