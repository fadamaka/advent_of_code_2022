const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let instructions = data.split("\n");
  let cycle = 0;
  let x = 1;
  let inst = "";
  let pixels = "";
  while (instructions.length > 0) {
    let poz = cycle % 40;
    if (poz == 0) {
      pixels += "\n";
    }
    if (poz <= x + 1 && poz >= x - 1) {
      pixels += "#";
    } else {
      pixels += ".";
    }
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
  }
  console.log(pixels);
} catch (err) {
  console.error(err);
}
