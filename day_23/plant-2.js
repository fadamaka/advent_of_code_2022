const fs = require("fs");

const arr = fs.readFileSync("data.txt", "utf8").split("\n");
let elves = arr
  .reverse()
  .map((str, index) => {
    let elvesArr = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "#") {
        elvesArr.push({ y: index, x: i });
      }
    }
    return elvesArr;
  })
  .flat();
let queue = ["N", "S", "W", "E"];
let elfMap = elves.reduce(
  (a, b) =>
    (a = {
      ...a,
      [b.y + "," + b.x]: {
        plan: "",
      },
    }),
  {}
);
let operations = [0, 1, -1];

let diagonalVariations = [];

for (x of operations) {
  for (y of operations) {
    if (x + "," + y != "0,0") {
      diagonalVariations.push([x, y]);
    }
  }
}

let toCombine = [1, 0, -1];
let directionMap = {
  N: [1, 0],
  S: [-1, 0],
  W: [0, -1],
  E: [0, 1],
};

for (let i = 0; i < 1000; i++) {
  let elfEntries = Object.entries(elfMap);
  //plan
  elfEntries.forEach(([k, v]) => {
    let coords = k.split(",").map((c) => parseInt(c));
    let y = coords[0];
    let x = coords[1];
    if (hasNeighbour(y, x)) {
      for (e of queue) {
        if (checkDirection(e, y, x)) {
          v.plan = directionMap[e][0] + y + "," + (directionMap[e][1] + x);
          break;
        }
      }
    }
  });
  nextInQ();
  let blackList = Object.entries(
    elfEntries
      .map((e) => e[1].plan)
      .filter((e) => e != "")
      .reduce(function (count, currentValue) {
        return (
          count[currentValue]
            ? ++count[currentValue]
            : (count[currentValue] = 1),
          count
        );
      }, {})
  )
    .filter((e) => e[1] > 1)
    .map((e) => e[0]);
  if (
    Object.entries(elfEntries.map((e) => e[1].plan).filter((e) => e != ""))
      .length == 0
  ) {
    console.log("pt2 result:", i + 1);
    break;
  }
  //execute
  elfEntries.forEach(([k, v]) => {
    if (!blackList.includes(v.plan) && v.plan != "") {
      delete elfMap[k];
      elfMap[v.plan] = v;
    }
    v.plan = "";
  });
}

let allY = Object.keys(elfMap).map((e) => parseInt(e.split(",")[0]));
let allX = Object.keys(elfMap).map((e) => parseInt(e.split(",")[1]));
let count = allX.length;
let maxY = Math.max(...allY);
let minY = Math.min(...allY);
let maxX = Math.max(...allX);
let minX = Math.min(...allX);

console.log((maxY - minY + 1) * (maxX - minX + 1) - count);

function hasNeighbour(y, x) {
  return !!diagonalVariations.find((v) => elfMap[y + v[0] + "," + (x + v[1])]);
}
function checkDirection(dir, y, x) {
  if (dir == "N") {
    return !toCombine
      .map((e) => !!elfMap[y + 1 + "," + (x + e)])
      .find((e) => e);
  }
  if (dir == "S") {
    return !toCombine
      .map((e) => !!elfMap[y - 1 + "," + (x + e)])
      .find((e) => e);
  }
  if (dir == "W") {
    return !toCombine
      .map((e) => !!elfMap[y + e + "," + (x - 1)])
      .find((e) => e);
  }
  if (dir == "E") {
    return !toCombine
      .map((e) => !!elfMap[y + e + "," + (x + 1)])
      .find((e) => e);
  }
}

// nextInQ() {
//     this.queue.push(this.queue.shift());
//   },

function nextInQ() {
  queue.push(queue.shift());
}
