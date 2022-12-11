const fs = require("fs");

const singMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const matchMap = {
  "A X": 3,
  "B X": 0,
  "C X": 6,
  "A Y": 6,
  "B Y": 3,
  "C Y": 0,
  "A Z": 0,
  "B Z": 6,
  "C Z": 3,
};

function points(round) {
  return singMap[round[2]] + matchMap[round];
}

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rounds = data.split("\n");
  console.log(rounds);
  console.log(rounds.map((e) => points(e)));
  console.log(rounds.reduce((a, b) => a + points(b), 0));
} catch (err) {
  console.error(err);
}

//A - Rock
//B - Paper
//C - Scissors

//X - Rock
//Y - Paper
//Z - Scissors
