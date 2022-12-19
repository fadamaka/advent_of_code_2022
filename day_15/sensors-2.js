const fs = require("fs");
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rawData = data.split("\n");
  const regex = /[x,y](=)(-|\d)\d*/g;
  let objs = rawData
    .map((e) => {
      let arr = Array.from(e.matchAll(regex), (m) => m[0]);
      return {
        x: parseInt(arr[0].split("=")[1]),
        y: parseInt(arr[1].split("=")[1]),
        bx: parseInt(arr[2].split("=")[1]),
        by: parseInt(arr[3].split("=")[1]),
      };
    })
    .map((o) => ({ ...o, dist: calculateDistance(o.x, o.y, o.bx, o.by) }));
  let lowX = Infinity;
  let highX = 0;
  objs.forEach((e) => {
    if (e.x + e.dist > highX) {
      highX = e.x + e.dist;
    }
    if (e.x - e.dist < lowX) {
      lowX = e.x - e.dist;
    }
  });
  let y = 4000000;
  let x = 4000000;
  for (let i = 0; i <= x; i++) {
    for (let j = 0; j <= y; j++) {
      let covered = false;
      for (o of objs) {
        if (calculateDistance(i, j, o.x, o.y) <= o.dist) {
          covered = true;
          j += o.dist - calculateDistance(i, j, o.x, o.y);
          break;
        }
      }
      if (!covered) {
        throw i * 4000000 + j;
      }
    }
  }
} catch (err) {
  console.error(err);
}

function calculateDistance(fromX, fromY, toX, toY) {
  return Math.abs(fromX - toX) + Math.abs(fromY - toY);
}
