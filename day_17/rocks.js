const fs = require("fs");
let map = [[1, 1, 1, 1, 1, 1, 1]];
const offsetObj = {
  "+": [
    [1, 1],
    [1, 0],
    [2, 0],
    [1, -1],
  ],
  "-": [
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  L: [
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  "|": [
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  sq: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
};
try {
  const data = fs.readFileSync("data.txt", "utf8");
  console.log(Object.keys(offsetObj).map((k) => new Rock(k)));
} catch (err) {
  console.error(err);
}

function Rock(sign) {
  this.sign = sign;
  this.y = sign == "+" ? map.length + 4 : map.length + 3;
  this.x = 2;
  this.offsets = offsetObj[sign];

  return this;
}
