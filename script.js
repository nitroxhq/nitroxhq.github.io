/* ------------------------------------------------------------------
   nitrox links — edit URLs here, one place only.
   Elements with data-link="<key>" get their href filled in automatically.
   ------------------------------------------------------------------ */
const NITROX_LINKS = {
  discord: "https://discord.gg/nitrox",          // TODO: swap in the real invite
  github: "https://github.com/nitroxhq",
  community: "./community.html",
  join: "./community.html",
};

function applyLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    const key = el.getAttribute("data-link");
    const url = NITROX_LINKS[key];
    if (!url) return;
    el.setAttribute("href", url);
    if (/^https?:\/\//.test(url)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLinks();

  const placeholder = document.getElementById('nav-placeholder') || document.getElementById('navbar');
  if (placeholder) {
    fetch('./navbar.html')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(data => {
        if (placeholder.tagName.toLowerCase() === 'nav') {
          placeholder.outerHTML = data;
        } else {
          placeholder.innerHTML = data;
        }

        // links inside the freshly injected navbar
        applyLinks();

        // Highlight active link based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-buttons');
        links.forEach(link => {
          const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
          if (href === currentPath) {
            link.classList.add('active');
          }
        });
      })
      .catch(err => console.error("Failed to load navbar:", err));
  }
});
