(function () {
  const percent = document.getElementById('bsod-percent');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (percent) {
    if (calm) {
      percent.textContent = '100';
    } else {
      let value = 0;
      const step = function () {
        value = Math.min(100, value + 1 + Math.floor(Math.random() * 7));
        percent.textContent = String(value);
        if (value < 100) {
          window.setTimeout(step, 450 + Math.random() * 1100);
        }
      };
      window.setTimeout(step, 1200);
    }
  }

  // "press any key to continue"
  document.addEventListener('keydown', function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Tab' || event.key === 'Shift') return;
    window.location.href = './index.html';
  });
})();
