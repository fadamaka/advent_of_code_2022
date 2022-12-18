const fs = require("fs");
let map = [];
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rocks = data.split("\n");
  let lowX = Infinity;
  let lowY = 0;
  let highX = 0;
  let highY = 0;
  let points = rocks.flatMap((l) => l.split(" -> "));
  points.forEach((e) => {
    let point = e.split(",");
    if (lowX > parseInt(point[0])) {
      lowX = parseInt(point[0]);
    }
    if (highX < parseInt(point[0])) {
      highX = parseInt(point[0]);
    }
    if (highY < parseInt(point[1])) {
      highY = parseInt(point[1]);
    }
  });

  for (let i = lowX - 500; i <= highX + 500; i++) {
    for (let j = lowY; j <= highY + 2; j++) {
      map[j] = map[j] ? map[j] : [];
      map[j][i] = ".";
    }
  }
  console.log("lowX", lowX, "highX", highX, "lowY", lowY, "highY", highY);
  drawMap();

  for (line of rocks) {
    let coords = line.split(" -> ");
    for (let i = 0; i < coords.length - 1; i++) {
      drawLine(coords[i], coords[i + 1]);
    }
  }
  map[0][500] = "+";
  drawLine(highX + 500 + "," + (highY + 2), lowX - 500 + "," + (highY + 2));
  let sand = 0;
  while (dropSand()) {
    sand++;
  }
  drawMap();
  console.log(sand + 1);
} catch (err) {
  console.error(err);
}

function drawMap() {
  map.map((l) => {
    console.log(l.reduce((a, b) => a + b, ""));
  });
}
function drawLine(fromCoord, toCoord) {
  let from = fromCoord.split(",").map((e) => parseInt(e));
  let to = toCoord.split(",").map((e) => parseInt(e));
  if (from[0] == to[0]) {
    let fromY = from[1] > to[1] ? to[1] : from[1];
    let toY = from[1] < to[1] ? to[1] : from[1];
    for (let i = fromY; i <= toY; i++) {
      map[i][from[0]] = "#";
    }
  }

  if (from[1] == to[1]) {
    let fromX = from[0] > to[0] ? to[0] : from[0];
    let toX = from[0] < to[0] ? to[0] : from[0];
    for (let i = fromX; i <= toX; i++) {
      map[from[1]][i] = "#";
    }
  }
}
function dropSand() {
  let y = 0;
  let x = 500;
  while (
    map[y + 1][x] === "." ||
    map[y + 1][x - 1] === "." ||
    map[y + 1][x + 1] === "."
  ) {
    if (map[y + 1][x] === ".") {
      y++;
    } else if (map[y + 1][x - 1] === ".") {
      y++;
      x--;
    } else if (map[y + 1][x + 1] === ".") {
      y++;
      x++;
    }
  }
  if (!map[y + 1][x - 1] || !map[y + 1][x + 1] || (x === 500 && y === 0)) {
    return false;
  } else {
    map[y][x] = "O";
    return true;
  }
}
