(function () {
  const container = document.getElementById('js-testimonials');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('[data-testimonial]'));
  if (items.length <= 2) {
    // Show all if 2 or fewer
    items.forEach(el => el.classList.add('is-visible'));
    container.classList.add('js-testimonials-ready');
    return;
  }

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // Mark container as JS-ready (hides all), then show first 2
  container.parentElement.classList.add('js-testimonials-ready');
  items[0].classList.add('is-visible');
  items[1].classList.add('is-visible');
})();
