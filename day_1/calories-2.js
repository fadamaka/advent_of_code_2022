const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let calories = data.split("\n");
  let current = 0;
  let elves = [];
  for (const element of calories) {
    if (element) {
      current += parseInt(element);
    } else {
      elves.push(current);
      current = 0;
    }
  }
  elves.sort((a, b) => a - b);
  console.log(
    elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3]
  );
} catch (err) {
  console.error(err);
}
