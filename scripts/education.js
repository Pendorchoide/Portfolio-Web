const educationCard = document.querySelector(".education-card");
const courseList = document.querySelector("#education-courses");
const educationYear = document.querySelector(".education-year");
const timeline = document.querySelector(".timeline");
const yearButtons = timeline
  ? Array.from(timeline.querySelectorAll("button[data-year]"))
  : [];

if (!educationCard || !courseList || !educationYear || !timeline || yearButtons.length !== 3) {
  throw new Error("No se pudo inicializar la sección de Formación.");
}

timeline.dataset.activeYear = "2024";

const coursesByYear = {
  "2024": [
    "Diseño Gráfico Digital (Curso UTN)",
    "Desarrollo de Videojuegos (Curso UTN)",
    "Audio Digital (Curso)",
    "Diseño Web (Curso)",
  ],
  "2025": [
    "B2 First (FCE)",
    "1° año Lic. en Sist. de Info.",
  ],
  "2026": ["2° año Lic. en Sist. de Info."],
};

const transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ? 0
  : 180;
let currentYear = "2024";
let transitionTimer;

yearButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedYear = button.dataset.year;
    const courses = coursesByYear[selectedYear];

    if (!courses || selectedYear === currentYear) {
      return;
    }

    currentYear = selectedYear;
    timeline.dataset.activeYear = selectedYear;
    educationCard.classList.remove("is-entering");
    yearButtons.forEach((yearButton) => {
      const isActive = yearButton === button;
      yearButton.classList.toggle("is-active", isActive);
      yearButton.setAttribute("aria-pressed", String(isActive));
    });

    educationCard.classList.add("is-transitioning");
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      const items = courses.map((course) => {
        const item = document.createElement("li");
        item.textContent = course;
        return item;
      });

      courseList.replaceChildren(...items);
      educationYear.textContent = selectedYear;
      educationCard.classList.remove("is-transitioning");
      educationCard.classList.add("is-entering");
    }, transitionDuration);
  });
});
