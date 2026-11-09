const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.fonts.ready.then(() => {
  const out = [];
  ["Diseño", "Complementos", "Desarrollo", "D", "ñ", "Creatividad"].forEach((t) => {
    [38, 78].forEach((size) => {
      ctx.font = `300 ${size}px "Space Grotesk"`;
      out.push(`${t} @${size} = ${ctx.measureText(t).width.toFixed(1)}`);
    });
  });
  const h3 = document.querySelector(".skill-card h3");
  const cs = getComputedStyle(h3);
  out.push(`h3 font: ${cs.font} / weight=${cs.fontWeight} / stretch=${cs.fontStretch} / align=${cs.textAlign}`);
  out.push(`h3 textContent=${JSON.stringify(h3.textContent)} childNodes=${h3.childNodes.length}`);
  const pre = document.createElement("pre");
  pre.id = "canvas-output";
  pre.textContent = out.join("\n");
  document.body.appendChild(pre);
});
