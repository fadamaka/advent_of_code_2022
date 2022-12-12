const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let entries = data.split("\n");
  //console.log(entries.filter(e=>e.includes('$ cd')).map(e=>e.slice(5)));
  let position = [];
  let fileSystem = {};
  let result = { count: 0 };
  let array = [];
  let lss = [];
  let filess = [];
  let allDirs = entries
    .filter((e) => e.includes("$ cd") && e.substring(5, 6).match("[a-z]"))
    .map((e) => e.slice(5));
  let allKeys = [];
  //console.log(traverse(fileSystem.d, "a"));
  fillFileSystem(position, fileSystem, entries);
  //console.log("obj", JSON.stringify(fileSystem, undefined, 4));
  console.log("totalDirSize");
  totalDirSize(fileSystem);
  crawl(fileSystem, result, array);
  console.log("obj", JSON.stringify(fileSystem, undefined, 4));
  console.log(
    "result",
    result,
    array.filter((e) => e <= 100000).reduce((a, b) => a + b, 0)
  );
  console.log(
    [...new Set(entries)]
      .filter((e) => e.substring(0, 1).match("[0-9]"))
      .reduce((a, b) => a + parseInt(b.split(" ")[0]), 0)
  );
  getAllLs(fileSystem, lss);
  console.log(
    "my total",
    lss
      .flatMap((e) => e)
      .filter((e) => e.substring(0, 1).match("[0-9]"))
      .reduce((a, b) => a + parseInt(b.split(" ")[0]), 0)
  );
  getAllFiles(fileSystem, filess);
  console.log(
    "_files total",
    filess.reduce((a, b) => a + b, 0)
  );
  console.log("alldirs", allDirs.length, allDirs);
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

function crawl(obj, result, array) {
  let keys = Object.keys(obj).filter((e) => !e.substring(0, 1).includes("_"));
  array.push(obj._total);
  result.count += obj._total <= 100000 ? obj._total : 0;
  obj._crawled = obj._crawled ? obj._crawled + 1 : 1;
  for (element of keys) {
    crawl(obj[element], result, array);
  }
}
function getAllLs(obj, array) {
  let keys = Object.keys(obj).filter((e) => !e.substring(0, 1).includes("_"));
  array.push(obj._ls);
  for (element of keys) {
    getAllLs(obj[element], array);
  }
}
function getAllFiles(obj, array) {
  let keys = Object.keys(obj).filter((e) => !e.substring(0, 1).includes("_"));
  array.push(obj._files);
  for (element of keys) {
    getAllFiles(obj[element], array);
  }
}
