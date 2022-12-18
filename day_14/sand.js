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
    if (lowX > point[0]) {
      lowX = point[0];
    }
    if (highX < point[0]) {
      highX = point[0];
    }
    if (highY < point[1]) {
      highY = point[1];
    }
  });

  for (let i = lowX; i <= highX; i++) {
    for (let j = lowY; j <= highY; j++) {
      map[j] = map[j] ? map[j] : [];
      map[j][i] = ".";
    }
  }
  console.log(map);
  console.log("lowX", lowX, "highX", highX, "lowY", lowY, "highX", highX);
  //drawMap();

  for (line of rocks) {
    let coords = line.split(" -> ");
    for (let i = 0; i < coords.length - 1; i++) {
      drawLine(coords[i], coords[i + 1]);
    }
  }
  drawMap();
} catch (err) {
  console.error(err);
}

function drawMap() {
  map.map((l) => {
    console.log(l.reduce((a, b) => a + b, ""));
  });
}
function drawLine(fromCoord, toCoord) {
  let from = fromCoord.split(",");
  let to = toCoord.split(",");
  console.log(fromCoord, " -> ", toCoord);
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
  drawMap();
}
