const fs = require("fs");
let valves = {};
let relevantValves = [];
let distanceMatrix = [];
let valveRates = [];
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

  console.log(Object.keys(valveRates).length);

  console.log(Math.min(...calculateDistance("AA", "AA")));
  let max = 0;
  for (i of calculate("AA", [], 31, 0)) {
    max = max < i ? i : max;
  }
  console.log(max);
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

function calculate(poz, opened, time, value) {
  if (opened.length == Object.keys(valveRates).length) {
    return [value];
  }
  if (time <= 0) {
    return [value];
  }
  opened.push(poz);
  time--;
  value += valveRates[poz] * time;
  let distances = distanceMatrix[poz];
  let distKeys = Object.keys(distances).filter((e) => !opened.includes(e));
  if (distKeys.length == 0) {
    return [value];
  }
  return distKeys.flatMap((e) =>
    calculate(e, JSON.parse(JSON.stringify(opened)), time - distances[e], value)
  );
}
