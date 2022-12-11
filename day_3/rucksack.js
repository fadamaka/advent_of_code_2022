const fs = require("fs");
const map = createPriorityMap();
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let sacks = data.split("\n");

  console.log(sacks.map((e) => findMatch(e)).reduce((a, b) => a + b, 0));
} catch (err) {
  console.error(err);
}

function createPriorityMap() {
  let map = {};
  for (let i = 0; i < 26; i++) {
    map[(i + 10).toString(36)] = i + 1;
  }
  for (let i = 0; i < 26; i++) {
    map[(i + 10).toString(36).toUpperCase()] = i + 27;
  }
  return map;
}

function findMatch(comp) {
  let splits = [comp.slice(0, comp.length / 2), comp.slice(comp.length / 2)];
  for (element of splits[0]) {
    if (splits[1].match(element)) {
      return map[element];
    }
  }
}
