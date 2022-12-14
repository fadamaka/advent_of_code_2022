const fs = require("fs");
let movement = {
  hPoz: "0,0",
  poz1: "0,0",
  poz2: "0,0",
  poz3: "0,0",
  poz4: "0,0",
  poz5: "0,0",
  poz6: "0,0",
  poz7: "0,0",
  poz8: "0,0",
  tPoz: "0,0",
  cords: {
    "0,0": new CordObj().hVisit().tVisit(),
  },
};
try {
  const data = fs.readFileSync("data.txt", "utf8");
  const moves = data.split("\n");
  //console.log(movement);
  for (element of moves) {
    move(element);
  }
  console.log(Object.entries(movement.cords).filter((e) => e[1].t).length);
} catch (err) {
  console.error(err);
}

function CordObj() {
  this.h = false;
  this.t = false;
  this.hCount = 0;
  this.tCount = 0;

  this.hVisit = function () {
    this.hCount++;
    this.h = true;
    return this;
  };
  this.tVisit = function () {
    this.tCount++;
    this.t = true;
    return this;
  };
}

function move(str) {
  const move = str.split(" ");
  let i = parseInt(move[1]);
  if (move[0] == "R" || move[0] == "L") {
    if (move[0] == "L") {
      i *= -1;
    }
    moveOnAxis(i, true);
  } else {
    if (move[0] == "D") {
      i *= -1;
    }
    moveOnAxis(i, false);
  }
}

function moveOnAxis(int, xAxis) {
  let x = parseInt(movement.hPoz.split(",")[0]);
  let y = parseInt(movement.hPoz.split(",")[1]);

  let negative = int < 0;
  let moves = negative ? int * -1 : int;
  let move = negative ? -1 : 1;
  for (let i = 0; i < moves; i++) {
    if (xAxis) {
      x += move;
    } else {
      y += move;
    }
    movement.hPoz = x + "," + y;
    if (!movement.cords[x + "," + y]) {
      movement.cords[x + "," + y] = new CordObj().hVisit();
    } else {
      movement.cords[x + "," + y].hVisit();
    }
    updateAll();
  }
}
function updateAll() {
  let knots = [
    "hPoz",
    "poz1",
    "poz2",
    "poz3",
    "poz4",
    "poz5",
    "poz6",
    "poz7",
    "poz8",
    "tPoz",
  ];
  for (let i = 0; i < 9; i++) {
    follow(knots[i], knots[i + 1]);
  }
}
function follow(head, tail) {
  let hX = parseInt(movement[head].split(",")[0]);
  let hY = parseInt(movement[head].split(",")[1]);
  let tX = parseInt(movement[tail].split(",")[0]);
  let tY = parseInt(movement[tail].split(",")[1]);
  if (-1 > hX - tX || hX - tX > 1 || -1 > hY - tY || hY - tY > 1) {
    if (hX === tX) {
      let by = tY > hY ? -1 : 1;
      moveTailToCord(tX, tY + by, tail);
    } else if (tY === hY) {
      let by = tX > hX ? -1 : 1;
      moveTailToCord(tX + by, tY, tail);
    } else {
      let yBy = tY > hY ? -1 : 1;
      let xBy = tX > hX ? -1 : 1;
      moveTailToCord(tX + xBy, tY + yBy, tail);
    }
  }
}
function moveTailToCord(x, y, tail) {
  movement[tail] = x + "," + y;
  if (tail == "tPoz") {
    if (!movement.cords[x + "," + y]) {
      movement.cords[x + "," + y] = new CordObj().tVisit();
    } else {
      movement.cords[x + "," + y].tVisit();
    }
  }
}
