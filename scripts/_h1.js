function dump() {
  const out = [];
  const h1 = document.querySelector(".hero h1");
  const walk = (node, depth) => {
    if (node.nodeType === 3) {
      const t = node.textContent;
      out.push(`TEXT node "${t}" codes=${Array.from(t).map(c=>c.charCodeAt(0)).join(",")}`);
      const r = document.createRange();
      r.selectNodeContents(node);
      Array.from(r.getClientRects()).forEach((rect) => {
        out.push(`  rect x=${rect.x.toFixed(1)} y=${rect.y.toFixed(1)} w=${rect.width.toFixed(1)} h=${rect.height.toFixed(1)}`);
      });
    } else if (node.nodeType === 1) {
      const cs = getComputedStyle(node);
      out.push(`EL ${node.tagName} display=${cs.display} font=${cs.fontFamily.split(",")[0]} size=${cs.fontSize}`);
      Array.from(node.childNodes).forEach((c) => walk(c, depth + 1));
    }
  };
  Array.from(h1.childNodes).forEach((n) => walk(n, 0));
  const pre = document.createElement("pre");
  pre.id = "h1dump";
  pre.textContent = out.join("\n");
  document.body.appendChild(pre);
}
document.fonts.ready.then(() => requestAnimationFrame(dump));
