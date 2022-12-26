const fs = require("fs");

const data = fs.readFileSync("data.txt", "utf8");

const functions = {
  "+": {
    fn(a, b) {
      return a + b;
    },
  },
  "-": {
    fn(a, b) {
      return a - b;
    },
  },
  "/": {
    fn(a, b) {
      return a / b;
    },
  },
  "*": {
    fn(a, b) {
      return a * b;
    },
  },
};

let rootOp = findOperation("root");
let side1 = calculate(rootOp[0]);
let side2 = calculate(rootOp[2]);
//change humn to 3296135418820
console.log(side1, "-", side2, "=", side1 - side2);
function calculate(name) {
  let operation = findOperation(name);
  if (operation.length == 1) {
    return parseInt(operation[0]);
  }
  return functions[operation[1]].fn(
    calculate(operation[0]),
    calculate(operation[2])
  );
}
function findOperation(name) {
  return data.match(new RegExp("(?<=" + name + ": )[^\n]*"))[0].split(" ");
}
