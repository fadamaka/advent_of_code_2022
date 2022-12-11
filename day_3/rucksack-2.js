const fs = require("fs");
const map = createPriorityMap();
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let sacks = data.split("\n");

  console.log(findGroups(sacks).reduce((a, b) => a + findGroupMatch(b), 0));
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

function findGroups(sacks) {
  let ret = [];
  for (let i = 0; i < 300; i += 3) {
    ret.push([sacks[i], sacks[i + 1], sacks[i + 2]]);
  }
  return ret;
}

function findGroupMatch(group) {
  for (element of group[0]) {
    if (group[1].match(element) && group[2].match(element)) {
      return map[element];
    }
  }
}
