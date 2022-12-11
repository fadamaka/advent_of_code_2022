const fs = require("fs");
let crates = require("./crates.json");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rearrangement = data.split("\n");
  console.log(crates);
  rearrangeAll(rearrangement.map((e) => parseInstruction(e)));
  console.log(crates, getFirstOfEach());
} catch (err) {
  console.error(err);
}

function rearrangeAll(instructions) {
  for (element of instructions) {
    operateCrane(element[0], element[1], element[2]);
  }
}

function operateCrane(from, to, number) {
  let fromStack = crates[from];
  let toStack = crates[to];
  for (let i = 0; i < number; i++) {
    toStack.unshift(fromStack.shift());
  }
}

function parseInstruction(instruction) {
  let arr = instruction.split(" from ");
  let arr2 = arr[1].split(" to ");
  return [arr2[0], arr2[1], parseInt(arr[0].slice(5))];
}

function getFirstOfEach() {
  return (
    crates["1"][0] +
    crates["2"][0] +
    crates["3"][0] +
    crates["4"][0] +
    crates["5"][0] +
    crates["6"][0] +
    crates["7"][0] +
    crates["8"][0] +
    crates["9"][0]
  );
}
