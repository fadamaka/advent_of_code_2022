const fs = require("fs");

const arr = fs.readFileSync("data.txt", "utf8").split("\n");

let map = arr.slice(0, arr.length - 2);
let dirMap = {
  0: 3,
  90: 0,
  180: 1,
  270: 2,
};
const path = Array.from(
  arr[arr.length - 1].matchAll(/[R|L]|\d*/g),
  (m) => m[0]
).filter((e) => e);
let degree = 90;

let y = 0;
let x = map[y].indexOf(".");
//console.log(map[y][x]);
for (let i = 0; i < path.length; i += 2) {
  //   drawMap();
  //   console.log(y, x);
  //   console.log(path[i], path[i + 1]);
  go(path[i]);
  if (path[i + 1] == "R") {
    degree = (degree + 90) % 360;
  } else if (path[i + 1] == "L") {
    degree = (degree - 90 + 360) % 360;
  }
}
//drawMap();
console.log((y + 1) * 1000 + (x + 1) * 4 + dirMap[degree]);
function go(distance) {
  if (degree === 90 || degree == 270) {
    for (let i = 0; i < distance; i++) {
      walkOnX(degree === 90 ? 1 : -1);
    }
  }
  if (degree === 180 || degree == 0) {
    for (let i = 0; i < distance; i++) {
      walkOnY(degree === 180 ? 1 : -1);
    }
  }
}
function walkOnX(direction) {
  let newX = x + direction;
  let position = map[y]?.[newX] || " ";
  if (position == " ") {
    if (direction > 0) {
      newX =
        map[y].indexOf(".") < map[y].indexOf("#")
          ? map[y].indexOf(".")
          : map[y].indexOf("#");
    } else {
      newX = map[y].length - 1;
    }
    position = map[y][newX];
  }
  if (position == ".") {
    x = newX;
  }
}
function walkOnY(direction) {
  let newY = y + direction;
  let position = map[newY]?.[x] || " ";
  if (position == " ") {
    if (direction > 0) {
      newY = findYFromTop();
    } else {
      newY = findYFromBottom();
    }
    position = map[newY][x];
  }
  if (position == ".") {
    y = newY;
  }
}
function findYFromBottom() {
  for (let i = map.length - 1; i >= 0; i--) {
    if (map[i][x] == "." || map[i][x] == "#") {
      return i;
    }
  }
}
function findYFromTop() {
  for (let i = 0; i < map.length; i++) {
    if (map[i][x] == "." || map[i][x] == "#") {
      return i;
    }
  }
}
function drawMap() {
  let result = JSON.parse(JSON.stringify(map));
  result[y] = replaceAt(result[y], x, "X");
  console.log(result);
}
function replaceAt(string, index, replacement) {
  return (
    string.substring(0, index) +
    replacement +
    string.substring(index + replacement.length)
  );
}
