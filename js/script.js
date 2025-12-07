document.addEventListener("DOMContentLoaded", () => {

  // Helper function to animate elements on scroll
  function animateOnScroll(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      console.warn(`No elements found for selector: "${selector}"`);
      return;
    }

    // If IntersectionObserver is not supported, just add animate class
    if (!("IntersectionObserver" in window)) {
      elements.forEach(el => el.classList.add("animate"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          obs.unobserve(entry.target); // stop observing after first trigger
        }
      });
    }, options);

    elements.forEach(el => observer.observe(el));
  }

  // Animate sections
  animateOnScroll(".build", { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });
  animateOnScroll(".playbook", { threshold: 0.3 });
  animateOnScroll(".benefit-card", { threshold: 0.1 });

  // Animate multiple service cards (optional stagger effect)
  const serviceCards = document.querySelectorAll('.service');
  if (serviceCards.length && "IntersectionObserver" in window) {
    const serviceObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 150); // stagger animation by 150ms
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    serviceCards.forEach(card => serviceObserver.observe(card));
  } else {
    serviceCards.forEach(card => card.classList.add('animate'));
  }

});


document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service");

  if (!serviceCards.length) return;

  // IntersectionObserver fallback check
  if (!("IntersectionObserver" in window)) {
    serviceCards.forEach(card => {
      card.classList.add("animate");
      const img = card.querySelector(".service__image");
      if (img) img.classList.add("animate");
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Animate the card
        entry.target.classList.add("animate");

        // Animate image with slight delay for staggered effect
        const img = entry.target.querySelector(".service__image");
        if (img) setTimeout(() => img.classList.add("animate"), 150);

        obs.unobserve(entry.target); // stop observing after first trigger
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => observer.observe(card));
});
