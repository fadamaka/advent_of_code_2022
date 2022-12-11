const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let calories = data.split("\n");
  let highest = 0;
  let current = 0;
  for (const element of calories) {
    if (element) {
      current += parseInt(element);
      if (current > highest) {
        highest = current;
      }
    } else {
      current = 0;
    }
  }
  console.log(highest);
} catch (err) {
  console.error(err);
}
