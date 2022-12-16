let monkeys = require("./monkeys.json");

console.log(monkeys);
let tests = BigInt(Object.entries(monkeys).reduce((a, m) => a * m[1].test, 1));
console.log(tests);

for (let m = 0; m < 8; m++) {
  let monkey = monkeys["monkey" + m];
  monkey.items = monkey.items.map((i) => BigInt(i));
  monkey.test = BigInt(monkey.test);
}
for (let i = 0; i < 10000; i++) {
  console.log(i);
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

console.log(inspectss[0], inspectss[1], inspectss[0] * inspectss[1]);

function calculateWorry(item, operation) {
  let worry = item;
  let op = operation.split(" ");
  let num = op[1] == "old" ? item : BigInt(op[1]);
  if (op[0] == "+") {
    worry += num;
  } else {
    worry *= num;
  }

  return worry % tests;
}
