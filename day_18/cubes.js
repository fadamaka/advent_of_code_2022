const fs = require("fs");

console.time("execution time");

const data = fs.readFileSync("data.txt", "utf8").split("\n");
let coords = data.map((c) => c.split(",").map((n) => parseInt(n)));
let xMax = Math.max(...coords.map((c) => c[0]));
let xMin = Math.min(...coords.map((c) => c[0]));
let yMax = Math.max(...coords.map((c) => c[1]));
let yMin = Math.min(...coords.map((c) => c[1]));
let zMax = Math.max(...coords.map((c) => c[2]));
let zMin = Math.min(...coords.map((c) => c[2]));

let cubes = [];

for (let x = 0; x <= xMax; x++) {
  cubes[x] = [];
  for (let y = 0; y <= yMax; y++) {
    cubes[x][y] = [];
    for (let z = 0; z <= zMax; z++) {
      cubes[x][y][z] = 0;
    }
  }
}
coords.forEach((c) => (cubes[c[0]][c[1]][c[2]] = 1));

let operations = [0, 1, -1];

let diagonalVariations = [];

for (x of operations) {
  for (y of operations) {
    for (z of operations) {
      diagonalVariations.push([x, y, z]);
    }
  }
}

let variations = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
console.log(
  cubes.reduce(
    (a, b, x) =>
      a +
      b.reduce(
        (c, d, y) =>
          c + d.reduce((e, f, z) => e + (f ? checkSides(x, y, z) : 0), 0),
        0
      ),
    0
  )
);

function checkSides(x, y, z) {
  return (
    6 -
    variations.reduce(
      (a, b) =>
        a +
        (cubes[x + b[0]]
          ? cubes[x + b[0]][y + b[1]]
            ? cubes[x + b[0]][y + b[1]][z + b[2]]
              ? cubes[x + b[0]][y + b[1]][z + b[2]]
              : 0
            : 0
          : 0),
      0
    )
  );
}
