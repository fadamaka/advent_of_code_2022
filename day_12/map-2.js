const fs = require("fs");
let map = [];
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rows = data.split("\n");

  map = rows.map((r) => {
    let arr = [];
    for (element of r) {
      arr.push(new PozObj(element));
    }
    return arr;
  });
  map[20][0].cost = 0;
  map[20][0].height = "a";
  map[20][158].height = "A";
  calculateCost(20, 0);
  console.log(map[20][158]);
} catch (err) {
  console.error(err);
}

function PozObj(str) {
  this.height = str;
  this.cost = Infinity;

  return this;
}
function canMove(from, to) {
  let fromNum = parseInt(from, 36);
  let toNum = parseInt(to, 36);
  return toNum === fromNum + 1 || toNum < fromNum || toNum === fromNum;
}

function calculateCost(y, x) {
  let currPoz = map[y][x];
  if (y + 1 < 41) {
    updatePoz(currPoz, y + 1, x);
  }
  if (y - 1 > -1) {
    updatePoz(currPoz, y - 1, x);
  }
  if (x + 1 < 181) {
    updatePoz(currPoz, y, x + 1);
  }
  if (x - 1 > -1) {
    updatePoz(currPoz, y, x - 1);
  }
}
function updatePoz(currPoz, toY, toX) {
  let obj = map[toY][toX];
  if (canMove(currPoz.height, obj.height) && currPoz.cost + 1 < obj.cost) {
    if (obj.height == "a" && obj.cost == Infinity) {
      obj.cost = 0;
    } else {
      obj.cost = currPoz.cost + 1;
    }
    calculateCost(toY, toX);
  }
}
