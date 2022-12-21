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

for (let x = 0; x <= xMax + 4; x++) {
  cubes[x] = [];
  for (let y = 0; y <= yMax + 4; y++) {
    cubes[x][y] = [];
    for (let z = 0; z <= zMax + 4; z++) {
      cubes[x][y][z] = {
        value: 0,
        faces: 0,
        conn: new Set().add(x + "," + y + "," + z),
      };
    }
  }
}
coords.forEach((c) => (cubes[c[0] + 2][c[1] + 2][c[2] + 2] = { value: 1 }));

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

for (let x = 0; x <= xMax + 4; x++) {
  for (let y = 0; y <= yMax + 4; y++) {
    for (let z = 0; z <= zMax + 4; z++) {
      checkSides(x, y, z);
    }
  }
}
let result = [];
cubes[0][0][0].conn.forEach((b) =>
  result.push(cubes[b.split(",")[0]][b.split(",")[1]][b.split(",")[2]].faces)
);
console.log(result.reduce((a, b) => a + b, 0));

function checkSides(x, y, z) {
  let currObj = cubes[x][y][z];
  if (currObj.value == 0) {
    let neighbours = variations.map((b) => [
      [x + b[0], y + b[1], z + b[2]],
      cubes[x + b[0]]?.[y + b[1]]?.[z + b[2]]?.value || 0,
    ]);
    for (n of neighbours) {
      if (n[1] > 0) {
        currObj.faces++;
      }
      if (n[1] == 0) {
        let neighObj = cubes[n[0][0]]?.[n[0][1]]?.[n[0][2]] || 0;
        if (neighObj?.value == 0) {
          let theirs = neighObj.conn;
          theirs.forEach((e) => currObj.conn.add(e));
          neighObj.conn = currObj.conn;
        }
      }
    }
    return neighbours;
  }
  return 0;
}

for (let x = 0; x <= xMax + 4; x++) {
  cubes[x] = [];
  for (let y = 0; y <= yMax + 4; y++) {
    cubes[x][y] = [];
    for (let z = 0; z <= zMax + 2; z++) {
      cubes[x][y][z] = {
        value: 0,
        faces: 0,
        conn: new Set().add(x + "," + y + "," + z),
      };
    }
  }
}
