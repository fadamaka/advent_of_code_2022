const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let packets = data.split("\n");
  let result = 0;
  for (let i = 0; i < packets.length; i += 3) {
    console.log(
      // compare(JSON.parse(packets[i]), JSON.parse(packets[i + 1])),
      // packets[i + 2],

      // compare(JSON.parse(packets[i]), JSON.parse(packets[i + 1]))
      //   ? "Correct"
      //   : "Incorrect",
      i,
      (compare(JSON.parse(packets[i]), JSON.parse(packets[i + 1]))
        ? "Correct"
        : "Incorrect") == packets[i + 2]
    );
    if (compare(JSON.parse(packets[i]), JSON.parse(packets[i + 1]))) {
      result += i / 3 + 1;
    }
  }
  console.log(result);
} catch (err) {
  console.error(err);
}

function compare(left, right) {
  let index = -1;
  for (value of left) {
    index++;
    if (Number.isInteger(value) && Number.isInteger(right[index])) {
      if (value > right[index]) {
        return false;
      }
      if (value < right[index]) {
        return true;
      }
    } else {
      if (
        (!right && !Number.isInteger(right)) ||
        (!right[index] && !Number.isInteger(right[index]))
      ) {
        return false;
      }
      let passedLeft = Number.isInteger(value) ? [value] : value;
      let passedRight = Number.isInteger(right[index])
        ? [right[index]]
        : right[index];
      if (compare(passedLeft, passedRight)) {
        if (
          passedLeft.length == passedRight.length &&
          checkEqual(passedLeft, passedRight)
        ) {
          continue;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}

function checkEqual(left, right) {
  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return true;
  }
  if (Array.isArray(left) && Array.isArray(right) && left.length == 0) {
    return false;
  }
  if (Array.isArray(left) && left.length === 0 && Number.isInteger(right)) {
    return false;
  }
  if (Number.isInteger(left) && Number.isInteger(right)) {
    return left === right;
  } else {
    return checkEqual(
      Number.isInteger(left) ? left : left[0],
      Number.isInteger(right) ? right : right[0]
    );
  }
}
