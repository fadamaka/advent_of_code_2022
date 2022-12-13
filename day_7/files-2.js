const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let entries = data.split("\n");
  let position = [];
  let fileSystem = {};
  let result = { count: 0 };
  let array = [];
  fillFileSystem(position, fileSystem, entries);
  console.log("totalDirSize");
  totalDirSize(fileSystem);
  crawl(fileSystem, result, array,30000000-(70000000-fileSystem._total));
  console.log("obj", JSON.stringify(fileSystem, undefined, 4));
  console.log(
    "result",
    result,
    array.filter((e) => e <= 100000).reduce((a, b) => a + b, 0)
  );
  console.log("need to free up",30000000-(70000000-fileSystem._total), "site to delete", Math.min(...array))
} catch (err) {
  console.error(err);
}

function fillFileSystem(position, fileSystem, entries) {
  let obj = fileSystem;
  let pos = position;
  let count = 0;
  for (element of entries) {
    console.log(count++, element);
    if (element.includes("$ cd")) {
      let dir = element.slice(5);
      console.log(element, dir);
      if (dir === "/") {
        pos = [];
        continue;
      }
      if (dir === "..") {
        pos.pop();
        obj = traverse(fileSystem, pos);
        obj._pos = pos.join();
      } else {
        pos.push(dir);
        obj = traverse(obj, [dir]);
        obj._pos = pos.join();
      }
    } else {
      if (element.includes("$ ls")) {
        obj._ls = [];
      } else {
        obj._ls.push(element);
        obj._files = countFileSize(obj._ls);
      }
    }
  }
}

function traverse(obj, dir) {
  let localObj = obj;
  for (element of dir) {
    if (!localObj[element]) {
      localObj[element] = {};
    }
    localObj = localObj[element];
  }

  return localObj;
}

function countFileSize(ls) {
  return ls
    .map((e) => e.split(" "))
    .filter((e) => !e[0].includes("dir"))
    .reduce((a, b) => a + parseInt(b[0]), 0);
}

function totalDirSize(obj) {
  obj._total = 0;
  let keys = Object.keys(obj).filter((e) => !e.substring(0, 1).includes("_"));
  obj._total += obj._files ? obj._files : 0;
  obj._total += keys ? keys.reduce((a, b) => a + totalDirSize(obj[b]), 0) : 0;
  return obj._total;
}

function crawl(obj, result, array, spaceNeeded) {
  let keys = Object.keys(obj).filter((e) => !e.substring(0, 1).includes("_"));
  if(obj._total >= spaceNeeded){
    console.log()
    array.push(obj._total);
  }
  for (element of keys) {
    crawl(obj[element], result, array, spaceNeeded);
  }
}
