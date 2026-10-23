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

        // Mobile nav: three lines when closed, list panel when open
        const nav = document.querySelector('.nitrox-nav');
        const navToggle = nav && nav.querySelector('.nav-toggle');
        if (nav && navToggle) {
          const setNavOpen = (open) => {
            nav.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
          };

          navToggle.addEventListener('click', () => {
            setNavOpen(!nav.classList.contains('is-open'));
          });

          nav.querySelectorAll('.nav-buttons').forEach(link => {
            link.addEventListener('click', () => setNavOpen(false));
          });

          document.addEventListener('click', (event) => {
            if (!nav.classList.contains('is-open')) return;
            if (!nav.contains(event.target)) setNavOpen(false);
          });

          document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
            setNavOpen(false);
            navToggle.focus();
          });

          const wideScreen = window.matchMedia('(min-width: 721px)');
          const closeOnWide = (event) => {
            if (event.matches) setNavOpen(false);
          };
          if (wideScreen.addEventListener) {
            wideScreen.addEventListener('change', closeOnWide);
          } else {
            wideScreen.addListener(closeOnWide);
          }
        }

        // Theme picker is homepage-only for now. The saved theme still applies
        // on every page via theme.js.
        if (!document.body.classList.contains('home')) {
          const themeGroup = document.querySelector('.nav-theme');
          if (themeGroup) themeGroup.remove();
        }

        // Theme picker: device / dark / light
        const themeButtons = document.querySelectorAll('.theme-btn');
        if (themeButtons.length) {
          const THEME_KEY = 'nitrox-theme';
          const root = document.documentElement;
          const themeMeta = document.querySelector('meta[name="theme-color"]');

          const syncThemeUi = (value) => {
            themeButtons.forEach(btn => {
              btn.setAttribute('aria-pressed', String(btn.dataset.themeValue === value));
            });
            if (themeMeta) {
              const paperPage = value === 'light' && !document.body.classList.contains('home');
              themeMeta.setAttribute('content', paperPage ? '#f6f4ef' : '#3232ff');
            }
          };

          const setTheme = (value) => {
            root.dataset.theme = value;
            try {
              localStorage.setItem(THEME_KEY, value);
            } catch (error) {
              /* private mode: the theme still applies for this page */
            }
            syncThemeUi(value);
          };

          syncThemeUi(root.dataset.theme || 'device');
          themeButtons.forEach(btn => {
            btn.addEventListener('click', () => setTheme(btn.dataset.themeValue));
          });
        }
      })
      .catch(err => console.error("Failed to load navbar:", err));
  }
});
