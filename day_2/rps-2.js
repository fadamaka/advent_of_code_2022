const fs = require("fs");

//A - Rock
//B - Paper
//C - Scissors

//X - Lose
//Y - Draw
//Z - Win

const matchMap = {
  "A X": 3, //Rock vs Scissors 0 + 3
  "B X": 1, //Paper vs Rock 0 + 1
  "C X": 2, //Scissors vs Paper 0 + 2
  "A Y": 4, //Rock vs Rock 3+1
  "B Y": 5, //Paper vs Paper 3+2
  "C Y": 6, //Scissors vs Scissors 3+3
  "A Z": 8, //Rock vs Paper 6+2
  "B Z": 9, //Paper vs Scissors 6+9
  "C Z": 7, //Scissors vs Rock 6+1
};

function points(round) {
  return matchMap[round];
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
