const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  const trees = data.split("\n");
  const ints = trees.map((a) => a.split("").map((c) => parseInt(c)));
  let result = (ints.length + ints[0].length - 2) * 2;
  for (let i = 1; i < 98; i++) {
    for (let j = 1; j < 98; j++) {
      result += determineVisibility(i, j, ints) ? 1 : 0;
    }
  }
  console.log(result);
} catch (err) {
  console.error(err);
}

function determineVisibility(x, y, array) {
  let tree = array[x][y];
  let up = true;
  let down = true;
  let left = true;
  let right = true;
  for (let i = x - 1; i >= 0; i--) {
    if (tree <= array[i][y]) {
      up = false;
      break;
    }
  }
  if (up) {
    return up;
  }
  for (let i = x + 1; i < 99; i++) {
    if (tree <= array[i][y]) {
      down = false;
      break;
    }
  }
  if (down) {
    return down;
  }
  for (let i = y - 1; i >= 0; i--) {
    if (tree <= array[x][i]) {
      right = false;
      break;
    }
  }
  if (right) {
    return right;
  }
  for (let i = y + 1; i < 99; i++) {
    if (tree <= array[x][i]) {
      left = false;
      break;
    }
  }
  if (left) {
    return left;
  }
  return false;
}
