document.addEventListener("DOMContentLoaded", () => {
  const buildSection = document.querySelector(".build");

  // 1. Check if element exists
  if (!buildSection) {
    console.warn("'.build' section not found in DOM");
    return;
  }

  // 2. Check for browser support
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver not supported in this browser");
    // Fallback: directly add class
    buildSection.classList.add("animate");
    return;
  }

  try {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");

            // Stop observing after first trigger for performance
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px", // start slightly before
      }
    );

    observer.observe(buildSection);
  } catch (error) {
    console.error("IntersectionObserver error:", error);
    buildSection.classList.add("animate");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const playbook = document.querySelector(".playbook");

  if (!playbook) {
    console.warn("Playbook section not found.");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    playbook.classList.add("animate");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          obs.unobserve(entry.target); // Stop after first trigger
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(playbook);
});
