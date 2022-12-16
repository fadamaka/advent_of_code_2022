let monkeys = require("./monkeys.json");

console.log(monkeys);

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 8; j++) {
    let monkey = monkeys["monkey" + j];
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();
      monkey.inspects++;
      let worry = calculateWorry(item, monkey.operation);
      let give = worry % monkey.test == 0 ? monkey.ifTrue : monkey.ifFalse;
      monkeys["monkey" + give].items.push(worry);
    }
  }
}

let inspectss = Object.entries(monkeys)
  .map((m) => m[1].inspects)
  .sort((a, b) => b - a);

console.log(inspectss[0] * inspectss[1]);

function calculateWorry(item, operation) {
  let worry = item;
  let op = operation.split(" ");
  let num = op[1] == "old" ? item : parseInt(op[1]);
  if (op[0] == "+") {
    worry += num;
  } else {
    worry *= num;
  }
  return Math.floor(worry / 3);
}
