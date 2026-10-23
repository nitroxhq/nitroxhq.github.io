/* Apply the saved theme before first paint so there is no flash.
   Values: device | dark | light. "dark" is the blue field, "light" is paper. */
(function () {
  var theme = "device";
  try {
    var saved = localStorage.getItem("nitrox-theme");
    if (saved === "device" || saved === "dark" || saved === "light") {
      theme = saved;
    }
  } catch (error) {
    /* storage can throw in private modes; the default still works */
  }
  document.documentElement.dataset.theme = theme;
})();
