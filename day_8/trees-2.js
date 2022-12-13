const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  const trees = data.split("\n");
  const ints = trees.map((a) => a.split("").map((c) => parseInt(c)));
  console.log(
    trees[0].length,
    ints.length,
    ints[0].length,
    (ints.length + ints[0].length - 2) * 2
  );
  let result = 0;
  for (let i = 1; i < 98; i++) {
    for (let j = 1; j < 98; j++) {
      let visibility = determineVisibility(i, j, ints);
      if (result < visibility) {
        result = visibility;
      }
    }
  }
  console.log(result);
} catch (err) {
  console.error(err);
}

function determineVisibility(x, y, array) {
  let tree = array[x][y];
  let up = 0;
  let down = 0;
  let left = 0;
  let right = 0;
  for (let i = x - 1; i >= 0; i--) {
    up++;
    if (tree <= array[i][y]) {
      break;
    }
  }
  for (let i = x + 1; i < 99; i++) {
    down++;
    if (tree <= array[i][y]) {
      break;
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    right++;
    if (tree <= array[x][i]) {
      break;
    }
  }
  for (let i = y + 1; i < 99; i++) {
    left++;
    if (tree <= array[x][i]) {
      break;
    }
  }
  return up * down * left * right;
}
