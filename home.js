/* ------------------------------------------------------------------
   nitrox — homepage reveal
   One quiet fade-up per block. No scroll hijacking, no dependency.
   ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    blocks.forEach((block) => block.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  blocks.forEach((block) => observer.observe(block));
});
