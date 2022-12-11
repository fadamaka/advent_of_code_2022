const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  console.log(data);
  for (let i = 0; i < data.length - 3; i++) {
    if (!isThereADuplicate(data.slice(i, i + 4))) {
      console.log(i + 4);
      break;
    }
  }
} catch (err) {
  console.error(err);
}

function isThereADuplicate(characters) {
  return (
    characters.slice(1).match(characters[0]) ||
    characters.slice(2).match(characters[1]) ||
    characters[2] === characters[3]
  );
}
