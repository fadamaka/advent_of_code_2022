const fs = require("fs");
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let pairs = data.split("\n");
  console.log(pairs.reduce((a, b) => a + isFullOverlap(b), 0));
} catch (err) {
  console.error(err);
}

function getRanges(pair) {
  let elfs = pair.split(",");
  return [getRange(elfs[0]), getRange(elfs[1])];
}

function getRange(elf) {
  let range = elf.split("-");
  let numberRange = [];
  for (let i = parseInt(range[0]); i <= range[1]; i++) {
    numberRange.push(i);
  }
  return numberRange;
}

function intersect(arrays) {
  return arrays[0].filter((e) => arrays[1].includes(e));
}

function isFullOverlap(pair) {
  let parArr = getRanges(pair);
  let overlap = intersect(parArr);
  return (
    overlap.length === parArr[0].length || overlap.length === parArr[1].length
  );
}
