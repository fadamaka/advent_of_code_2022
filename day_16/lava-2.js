const fs = require("fs");
let valves = {};
let relevantValves = [];
let distanceMatrix = [];
let valveRates = [];

let myLogFileStream = fs.createWriteStream("output.log");

let myConsole = new console.Console(myLogFileStream, myLogFileStream);

let result = 0;

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rawData = data.split("\n");

  valves = Object.fromEntries(
    rawData.map((e) => [
      e.match(/(Valve )[A-Z]{2}/)[0].split(" ")[1],
      {
        rate: parseInt(e.match(/(rate=)\d*/)[0].split("=")[1]),
        tunnels: Array.from(
          e.split("to valve")[1].matchAll(/[A-Z]{2}/g),
          (m) => m[0]
        ),
      },
    ])
  );
  relevantValves = Object.entries(valves)
    .filter((e) => e[1].rate)
    .map((e) => e[0]);

  relevantValves.push("AA");
  relevantValves.sort();

  for (i of relevantValves) {
    distanceMatrix[i] = [];
    for (j of relevantValves) {
      distanceMatrix[i][j] = Math.min(...calculateDistance(i, j));
    }
  }

  for (i of relevantValves) {
    valveRates[i] = valves[i].rate;
  }
  calculate("AA", [], 27, 0, 27, "AA");
  console.log(result);
} catch (err) {
  console.error(err);
}

function calculateDistance(from, to, visited = [], distance = 0) {
  visited.push(from);
  if (from === to) {
    return [0];
  }
  if (valves[from].tunnels.includes(to)) {
    return [distance + 1];
  }
  return valves[from].tunnels
    .filter((e) => !visited.includes(e))
    .flatMap((e) =>
      calculateDistance(
        e,
        to,
        JSON.parse(JSON.stringify(visited)),
        distance + 1
      )
    );
}

function calculate(poz, opened, time, value, elTime, elPoz) {
  let meWaiting = time < elTime;
  let elWaiting = elTime < time;
  if (elPoz == poz && poz != "AA") {
    return;
  }
  if (opened.length == Object.keys(valveRates).length) {
    updateResult(value);
    return;
  }
  if (time <= 0 && elTime <= 0) {
    updateResult(value);
    return;
  }
  if (!meWaiting) {
    opened.push(poz);
    time--;
    value += valveRates[poz] * time;
  }
  if (!elWaiting) {
    if (elPoz != "AA") {
      opened.push(elPoz);
    }
    elTime--;
    value += valveRates[elPoz] * elTime;
  }
  let distances = distanceMatrix[poz];
  let distKeys = Object.keys(distances).filter((e) => !opened.includes(e));
  let elDistances = distanceMatrix[elPoz];
  let elDistKeys = Object.keys(elDistances).filter((e) => !opened.includes(e));
  if (distKeys.length == 0 && elDistKeys.length == 0) {
    updateResult(num);
    return;
  }
  if (elWaiting || elDistKeys.length == 0) {
    return distKeys.forEach((e) =>
      calculate(
        e,
        JSON.parse(JSON.stringify(opened)),
        time - distances[e],
        value,
        elTime,
        elPoz
      )
    );
  }
  if (meWaiting || distKeys.length == 0) {
    return elDistKeys.forEach((e) =>
      calculate(
        poz,
        JSON.parse(JSON.stringify(opened)),
        time,
        value,
        elTime - elDistances[e],
        e
      )
    );
  }
  return distKeys.forEach((e) => {
    return elDistKeys.forEach((el) =>
      calculate(
        e,
        JSON.parse(JSON.stringify(opened)),
        time - distances[e],
        value,
        elTime - elDistances[el],
        el
      )
    );
  });
}
function updateResult(num) {
  if (num > result) {
    console.log(num);
  }
  result = result < num ? num : result;
}
