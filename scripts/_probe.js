const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const textTargets = [
  [".site-nav a", 0],
  [".hero h1", 0],
  [".hero h1", 1],
  [".hero-description", 0],
  [".hero-actions a", 0],
  [".hero-actions a", 1],
  [".availability", 0],
  [".about-content h2", 0],
  [".about-content p", 0],
  [".about-content p", 1],
  [".values-list", 0],
  [".profile-card figcaption strong", 0],
  [".profile-card figcaption span", 0],
  [".skills h2", 0],
  [".skill-card h3", 0],
  [".skill-card p", 0],
  [".tag-list li", 0],
  [".tag-list li", 3],
  [".tag-list li", 6],
  [".projects h2", 0],
  [".project-copy h3", 0],
  [".project-copy p", 0],
  [".metrics h2", 0],
  [".metrics-grid dd", 0],
  [".metrics-grid dt", 0],
  [".experience h2", 0],
  [".education-card li", 0],
  [".education-year", 0],
  [".timeline button", 0],
  [".contact h2", 0],
  [".contact-links a", 0],
  [".contact-cta", 0],
  [".footer-copyright", 0],
];

function fontMetrics(el) {
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize);
  const family = cs.fontFamily.split(",")[0].trim();
  const weight = cs.fontWeight;
  ctx.font = `${weight} ${size}px ${family}`;
  const m = ctx.measureText("Hg");
  let lh = cs.lineHeight;
  if (lh === "normal") {
    lh = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
  } else {
    lh = parseFloat(lh);
  }
  const lineTop = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
  const half = (lh - lineTop) / 2;
  return { size, lh, ascent: m.fontBoundingBoxAscent, baselineFromTop: half + m.fontBoundingBoxAscent };
}

function render() {
  const lines = [];

  textTargets.forEach(([selector, lineIndex]) => {
    const el = document.querySelectorAll(selector)[0];
    if (!el) {
      lines.push(`${selector} :: MISSING`);
      return;
    }
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const fm = fontMetrics(el);
    const contentTop = r.top + parseFloat(cs.paddingTop);
    const baseline = contentTop + fm.baselineFromTop + lineIndex * fm.lh;
    lines.push(
      `${selector}#${lineIndex} :: baseline=${baseline.toFixed(1)} size=${fm.size} lh=${fm.lh.toFixed(1)} ascent=${fm.ascent.toFixed(1)} top=${r.top.toFixed(1)} bottom=${r.bottom.toFixed(1)} h=${r.height.toFixed(1)}`,
    );
  });

  lines.push("--- structure");
  lines.push(`VIEWPORT clientWidth=${document.documentElement.clientWidth} innerWidth=${window.innerWidth}`);
  const sections = document.querySelectorAll("header, section, footer");
  sections.forEach((el) => {
    const r = el.getBoundingClientRect();
    lines.push(`SECTION ${el.className || el.tagName} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)}`);
  });

  const list = document.querySelector(".tag-list");
  if (list) {
    const rows = new Set();
    Array.from(list.children).forEach((li) => {
      rows.add(Math.round(li.getBoundingClientRect().top));
    });
    lines.push(`TAG rows=${rows.size} tops=${Array.from(rows).sort((a, b) => a - b).join(",")} listWidth=${list.getBoundingClientRect().width.toFixed(1)}`);
  }

  const h3 = document.querySelector(".skill-card h3");
  if (h3) {
    const r = h3.getBoundingClientRect();
    lines.push(`SKILLH3 top=${r.top.toFixed(1)} bottom=${r.bottom.toFixed(1)} h=${r.height.toFixed(1)} padTop=${getComputedStyle(h3).paddingTop} padBottom=${getComputedStyle(h3).paddingBottom}`);
  }

  ["c1", "c2", "c3"].forEach((id) => {
    const card = document.querySelector(`.skill-card[class*="${id}"], #${id}`);
  });

  document.querySelectorAll(".skill-card").forEach((card, i) => {
    const r = card.getBoundingClientRect();
    lines.push(`SKILLCARD${i} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
  });

  document.querySelectorAll(".project-card").forEach((card, i) => {
    const r = card.getBoundingClientRect();
    lines.push(`PROJECTCARD${i} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
  });

  const footer = document.querySelector(".site-footer");
  if (footer) {
    const r = footer.getBoundingClientRect();
    lines.push(`FOOTER top=${r.top.toFixed(1)} h=${r.height.toFixed(1)}`);
  }
  const copyright = document.querySelector(".footer-copyright");
  if (copyright) {
    const r = copyright.getBoundingClientRect();
    lines.push(`COPYRIGHT top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
  }
  const nav = document.querySelector(".footer-nav");
  if (nav) {
    const r = nav.getBoundingClientRect();
    lines.push(`FOOTERNAV top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
  }

  const aboutShell = document.querySelector(".about > .shell");
  if (aboutShell) {
    Array.from(aboutShell.children).forEach((el, index) => {
      const r = el.getBoundingClientRect();
      lines.push(`ABOUTCHILD${index} ${el.className || el.tagName} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
    });
  }
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) {
    Array.from(aboutContent.children).forEach((el, index) => {
      const r = el.getBoundingClientRect();
      lines.push(`ABOUTTEXT${index} ${el.tagName} top=${r.top.toFixed(1)} h=${r.height.toFixed(1)}`);
    });
  }
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    const r = profileImage.getBoundingClientRect();
    lines.push(`PROFILEIMG top=${r.top.toFixed(1)} h=${r.height.toFixed(1)} w=${r.width.toFixed(1)}`);
  }

  const text = lines.join("\n");
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(text, "*");
    return;
  }
  const pre = document.createElement("pre");
  pre.id = "probe-output";
  pre.textContent = text;
  const old = document.getElementById("probe-output");
  if (old) old.remove();
  document.body.appendChild(pre);
}

function run() {
  try {
    render();
  } catch (error) {
    const pre = document.createElement("pre");
    pre.id = "probe-output";
    pre.textContent = "ERR " + error.message;
    document.body.appendChild(pre);
  }
}

requestAnimationFrame(run);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => requestAnimationFrame(run));
}
