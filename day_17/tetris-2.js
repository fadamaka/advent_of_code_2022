const fs = require("fs");

let myLogFileStream = fs.createWriteStream("output.log");

let myConsole = new console.Console(myLogFileStream, myLogFileStream);
console.time("execution time");
let map = [[1, 1, 1, 1, 1, 1, 1]];
let mapLengthOffset = 0;
const offsetObj = {
  "+": [
    [0, 0],
    [1, 1],
    [1, 0],
    [2, 0],
    [1, -1],
  ],
  "-": [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  L: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  "|": [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  sq: [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ],
};
const shapes = ["-", "+", "L", "|", "sq"];
let shapesIndex = 0;
let data = "";
let dataIndex = "";
try {
  data = fs.readFileSync("data.txt", "utf8");
  for (let i = 0; i < 1000000000000 - 999999996840; i++) {
    shapesIndex = shapesIndex < shapes.length ? shapesIndex : 0;
    let rockObj = new Rock(shapes[shapesIndex++]);
    while (moveRock(rockObj)) {}
    stopRock(rockObj);
    if (map.length + mapLengthOffset - 1 == 2528) {
      console.log(map.length + mapLengthOffset - 1, i);
    }
    if ((map.length + mapLengthOffset - 1) % 2626 == 2527) {
      console.log(map.length + mapLengthOffset - 1, i);
    }
  }
  drawMap();

  console.log(map.length + mapLengthOffset - 1 + 581395347 * 2626);
} catch (err) {
  console.error(err);
}

console.timeEnd("execution time");

function Rock(sign) {
  this.sign = sign;
  this.y = sign == "+" ? map.length + 4 : map.length + 3;
  this.x = 2;
  this.offsets = offsetObj[sign];

  return this;
}

function moveRock(rock) {
  if (getGasDirection() === "<") {
    if (checkCollision(rock, -1, 0).length == 0) {
      rock.x += -1;
    }
  } else {
    if (checkCollision(rock, 1, 0).length == 0) {
      rock.x += 1;
    }
  }
  //move rock down
  if (checkCollision(rock, 0, -1).length == 0) {
    rock.y -= 1;
    return true;
  } else {
    return false;
  }
}
function checkCollision(rock, x, y) {
  if (x != 0) {
    let xCoords = rock.offsets.map((o) => rock.x + o[0] + x);
    if (Math.max(...xCoords) > 6) {
      return [1];
    }
    if (Math.min(...xCoords) < 0) {
      return [1];
    }
  }
  return rock.offsets
    .map((os) =>
      map[rock.y + os[1] + y]
        ? map[rock.y + os[1] + y][rock.x + os[0] + x]
        : false
    )
    .filter((e) => e);
}
function stopRock(rock) {
  let allX = rock.offsets.map((o) => rock.y + o[1]);
  let height = Math.max(...allX);
  let min = Math.min(...allX);
  while (map.length < height + 1) {
    map.push([0, 0, 0, 0, 0, 0, 0]);
  }

  solidifyRock(rock);
  if (map[min].every((e) => e == 1)) {
    for (let y = min - 1; y >= 0; y--) {
      myConsole.log(map[y].reduce((a, b) => a + b, ""));
    }
    map = map.slice(min);
    mapLengthOffset += min;
  }
}
function solidifyRock(rock) {
  rock.offsets.forEach((o) => (map[rock.y + o[1]][rock.x + o[0]] = 1));
}
function drawMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    myConsole.log(map[y].reduce((a, b) => a + b, ""));
  }
}
function getGasDirection() {
  dataIndex = dataIndex < data.length ? dataIndex : 0;
  return data[dataIndex++];
}
