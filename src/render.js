const fs = require("fs");
const path = JSON.parse(fs.readFileSync("snake-path.json"));

const cellSize = 15;
const snakeLength = 30;

let svg = `<svg width="${cellSize * 53}" height="${cellSize * 7}" xmlns="http://www.w3.org/2000/svg">\n`;

// Draw grid
for (let i = 0; i < path.length; i++) {
  const { x, y } = path[i];
  const isTail = i < path.length - snakeLength;
  const color = isTail ? "#e0e0e0" : "#39FF14";

  svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" rx="3" ry="3"/>\n`;
}

svg += "</svg>";

// Save it
fs.writeFileSync("public/snake.svg", svg);
console.log("✅ SVG generated at public/snake.svg");
