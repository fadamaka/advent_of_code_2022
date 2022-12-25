const fs = require("fs");
const arr = fs.readFileSync("data.txt", "utf8").split("\n");
let dictObj = {
  2: 2,
  1: 1,
  0: 0,
  "-": -1,
  "=": -2,
};
let snafuNumbers = ["2", "1", "0", "-", "="];
function fromSnafuToDecimal(snafu) {
  let decimal = 0;

  for (let i = snafu.length - 1; i >= 0; i--) {
    let decimalPlace = snafu.length - i;
    let multiplicant = decimalPlace > 1 ? 5 ** (decimalPlace - 1) : 1;
    decimal += multiplicant * dictObj[snafu[i]];
  }

  return decimal;
}
function fromDecimalToSnafu(decimal) {
  let snafu = "";
  while (decimal > fromSnafuToDecimal(snafu)) {
    snafu += "2";
  }
  let newSnafu = "";
  for (let i = 1; i <= snafu.length; i++) {
    let char = "";
    for (e of snafuNumbers) {
      if (fromSnafuToDecimal(newSnafu + e + snafu.substring(i)) >= decimal) {
        char = e;
      }
    }
    newSnafu += char;
  }
  return newSnafu;
}
console.log(
  fromDecimalToSnafu(arr.reduce((a, b) => a + fromSnafuToDecimal(b), 0))
);
