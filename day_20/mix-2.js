const fs = require("fs");

let arr = fs
  .readFileSync("data.txt", "utf8")
  .split("\n")
  .map((e) => ({ num: parseInt(e), moved: false }));

//console.log(arr.reduce((a, b) => a + b.num + ",", ""));
for (let i = 0; i < arr.length; i++) {
  let num = arr[i];
  if (num.moved) {
    continue;
  }
  //console.log(num.num, "moves");
  let newIndex = (num.num % (arr.length - 1)) + i;
  newIndex =
    newIndex < 0
      ? arr.length + newIndex
      : (newIndex % arr.length) + (num.num < 0 ? 0 : 1);

  num.moved = true;
  arr.splice(newIndex, 0, num);
  if (newIndex < i) {
    arr.splice(i + 1, 1);
  } else {
    arr.splice(i, 1);
  }
  if (newIndex > i) {
    i--;
  }
  //console.log(arr.reduce((a, b) => a + b.num + ",", ""));
}
let numArr = arr.map((o) => o.num);
let results = [1000, 2000, 3000];
console.log(
  results.reduce(
    (a, b) => a + numArr[(b + numArr.indexOf(0)) % numArr.length],
    0
  )
);
