const fs = require("fs");
try {
  const data = fs.readFileSync("data.txt", "utf8");
  let rawData = data.split("\n");

  let valves = Object.fromEntries(
    rawData.map((e) => [
      e.match(/(Valve )[A-Z]{2}/)[0].split(" ")[1],
      {
        rate: parseInt(e.match(/(rate=)\d*/)[0].split("=")[1]),
        tunnels: Array.from(
          e.split("to valve")[1].matchAll(/[A-Z]{2}/g),
          (m) => m[0]
        ),
        open: false,
      },
    ])
  );

  console.log(valves);

  let currentBest = { name: "KR", value: 0, time: 30, opportunityCost: 0 };
  let time = 30;
  let result = 0;
  let prevName = "";
  let infLoop = 0;
  while (
    time > 0 &&
    Object.entries(valves).filter((o) => !o[1].open && o[1].rate > 0).length > 0
  ) {
    if (prevName === currentBest.name) {
      infLoop++;
    } else {
      prevName = currentBest.name;
      infLoop = 0;
    }
    if (infLoop > 2) {
      break;
    }
    time = currentBest.time;
    console.log(currentBest);
    if (time < 30) {
      result += currentBest.value;
      valves[currentBest.name].open = true;
      currentBest.value = 0;
      currentBest.opportunityCost = 0;
    }
    console.log(valves);
    findBestValue(valves, currentBest.name, [], currentBest.time, currentBest);
  }
  console.log(currentBest);
  console.log(result);
} catch (err) {
  console.error(err);
}

function findBestValue(valves, current, visited, time, currentBest) {
  let currValve = valves[current];
  visited.push(current);
  time--;
  let currValue = currValve.rate * time;
  if (
    currentBest.value * currentBest.opportunityCost <
      currValue * calculateOpportunityCost(valves, current) &&
    !currValve.open
  ) {
    currentBest.name = current;
    currentBest.value = currValue;
    currentBest.time = time;
    currentBest.opportunityCost = calculateOpportunityCost(valves, current);
  }
  currValve.tunnels
    .filter((t) => !visited.includes(t))
    .forEach((element) => {
      findBestValue(
        valves,
        element,
        JSON.parse(JSON.stringify(visited)),
        time,
        currentBest
      );
    });
}
function calculateOpportunityCost(valves, current) {
  let currValve = valves[current];
  let openableNeighbours = Object.entries(valves)
    .filter((o) => currValve.tunnels.includes(o[0]))
    .filter((o) => !o[1].open && o[1].rate > 0);
  return (
    openableNeighbours.length +
    openableNeighbours.reduce((a, b) => a + b[1].rate, 1)
  );
}
