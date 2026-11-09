const targets = [
  ".site-header",
  ".brand-mark",
  ".brand-name",
  ".site-nav",
  ".header-socials",
  ".theme-indicator",
  ".hero",
  ".hero h1",
  ".hero h1 span",
  ".hero-description",
  ".hero-actions",
  ".hero-actions .button-accent",
  ".hero-actions .button-light",
  ".availability",
  ".about",
  ".profile-card",
  ".profile-image",
  ".about-content h2",
  ".about-content p",
  ".about-body",
  ".values-list",
  ".skills",
  ".skills h2",
  ".skill-card",
  ".skill-card h3",
  ".skill-card p",
  ".tag-list",
  ".projects",
  ".projects h2",
  ".project-card",
  ".project-art",
  ".project-copy h3",
  ".project-copy p",
  ".metrics",
  ".metrics h2",
  ".metrics-grid > div",
  ".metrics-grid dd",
  ".metrics-grid dt",
  ".experience",
  ".experience h2",
  ".education-card",
  ".education-card ul",
  ".education-year",
  ".timeline",
  ".timeline li button",
  ".contact",
  ".contact h2",
  ".contact-links a",
  ".contact-cta",
  ".site-footer",
  ".footer-copyright",
  ".footer-nav",
  ".footer-socials",
];

const textTargets = [
  ".brand-mark",
  ".brand-name",
  ".site-nav a",
  ".hero h1 span",
  ".hero-description",
  ".about-content h2",
  ".about-content p",
  ".skill-card h3",
  ".skill-card p",
  ".tag-list li",
  ".projects h2",
  ".project-copy h3",
  ".metrics-grid dd",
  ".contact h2",
];

function lineWidth(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0);
  if (!rects.length) {
    return 0;
  }
  return Math.max.apply(
    null,
    rects.map((r) => r.width),
  );
}

function render() {
  const lines = [];

  targets.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) {
      lines.push(`${selector} :: MISSING`);
      return;
    }
    const r = el.getBoundingClientRect();
    lines.push(
      `${selector} :: x=${r.x.toFixed(1)} y=${r.y.toFixed(1)} w=${r.width.toFixed(1)} h=${r.height.toFixed(1)}`,
    );
  });

  lines.push("--- text");

  textTargets.forEach((selector) => {
    const els = Array.from(document.querySelectorAll(selector)).slice(0, 4);
    if (!els.length) {
      lines.push(`${selector} :: MISSING`);
      return;
    }
    els.forEach((el, index) => {
      const style = getComputedStyle(el);
      const text = el.textContent.trim().replace(/\s+/g, " ").slice(0, 24);
      lines.push(
        `${selector}[${index}] "${text}" :: text=${lineWidth(el).toFixed(1)} size=${style.fontSize} ls=${style.letterSpacing} ff=${style.fontFamily.split(",")[0]}`,
      );
    });
  });

  const pre = document.createElement("pre");
  pre.id = "measure-output";
  pre.textContent = lines.join("\n");
  document.body.appendChild(pre);
}

document.fonts.ready.then(() => requestAnimationFrame(render));
