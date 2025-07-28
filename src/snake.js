const fs = require("fs");

// Load contribution data
const data = JSON.parse(fs.readFileSync("contributions.json"));

// GitHub contribution grid is 7 rows high, ~53 columns wide
const width = Math.ceil(data.length / 7);
const height = 7;

// Fill grid
const grid = Array.from({ length: height }, () => Array(width).fill(0));
data.forEach((entry, index) => {
  const row = index % 7;
  const col = Math.floor(index / 7);
  grid[row][col] = entry.count;
});

// Zigzag snake path
const path = [];

for (let col = 0; col < width; col++) {
  const column = [];

  for (let row = 0; row < height; row++) {
    column.push({ x: col, y: row });
  }

  if (col % 2 === 1) column.reverse(); // make it zigzag
  path.push(...column);
}

// Save path
fs.writeFileSync("snake-path.json", JSON.stringify(path, null, 2));
console.log("✅ Snake path saved to snake-path.json");
