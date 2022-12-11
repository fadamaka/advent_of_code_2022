const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  console.log(data);
  for (let i = 0; i < data.length - 13; i++) {
    if (!isThereADuplicate(data.slice(i, i + 14))) {
      console.log(i + 14);
      break;
    }
  }
} catch (err) {
  console.error(err);
}

function isThereADuplicate(characters) {
  for (let i = 0; i < 14; i++) {
    if (characters.slice(i + 1).match(characters[i])) {
      return true;
    }
  }
  return characters[13] === characters[14];
}
