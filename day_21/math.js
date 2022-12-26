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

console.log(calculate("root"));
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
