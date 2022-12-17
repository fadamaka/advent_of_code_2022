const fs = require("fs");

try {
  const data = fs.readFileSync("data-2.txt", "utf8");
  let packets = data.split("\n");
  let result = 1;
  let index = 0;
  for (element of packets.sort((a, b) =>
    compare(JSON.parse(a), JSON.parse(b)) ? -1 : 1
  )) {
    index++;
    if (element == "[[2]]") {
      result *= index;
    }
    if (element == "[[6]]") {
      result *= index;
      break;
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
