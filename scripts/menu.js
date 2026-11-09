const menu = document.querySelector(".mobile-menu");

if (menu) {
  const summary = menu.querySelector("summary");

  const syncState = () => {
    summary.setAttribute("aria-expanded", String(menu.open));
  };

  menu.addEventListener("toggle", syncState);
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.open = false;
    }
  });
  syncState();
}
