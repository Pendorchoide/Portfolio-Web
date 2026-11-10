(function () {
  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    if (toggleBtn) {
      const img = toggleBtn.querySelector("img");
      const isLight = theme === "light";
      toggleBtn.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
      toggleBtn.setAttribute("title", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
      if (img) {
        img.src = isLight ? "styles/assets/svg/dark_mode.svg" : "styles/assets/svg/light_mode.svg";
        img.alt = isLight ? "Modo claro activo" : "Modo oscuro activo";
      }
    }
  }

  // Inicialización inmediata
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Escuchar cambios de preferencia del sistema si el usuario no fijó una
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "light" : "dark");
    }
  });
})();
