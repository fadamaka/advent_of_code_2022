const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let instructions = data.split("\n");
  let cycle = 1;
  let x = 1;
  let inst = "";
  let save = [20, 60, 100, 140, 180, 220];
  let result = 0;
  while (instructions.length > 0) {
    inst = inst ? inst : instructions.shift();
    cycle++;
    if (inst == "noop") {
      inst = "";
    }
    if (inst.length == 2) {
      x += parseInt(inst[1]);
      inst = "";
    } else if (inst.length > 2) {
      inst = inst.split(" ");
    }
    if (save.includes(cycle)) {
      console.log(cycle, x, x * cycle);
      result += x * cycle;
    }
  }
  console.log(result);
} catch (err) {
  console.error(err);
}
