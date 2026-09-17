document.addEventListener("DOMContentLoaded", () => {
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

        // Highlight active link based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
          const href = link.getAttribute('href').replace(/^\.\//, '');
          if (href === currentPath) {
            link.classList.add('active');
          }
        });
      })
      .catch(err => console.error("Failed to load navbar:", err));
  }
});

