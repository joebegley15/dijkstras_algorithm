const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    return (lowest === null || costs[node] < costs[lowest]) &&
      !processed.includes(node)
      ? (lowest = node)
      : (lowest = lowest);
  }, null);
};

const dijkstras = graph => {
  const costs = Object.assign({ finish: Infinity }, graph.start);
  const parents = { finish: null };
  for (let child in graph.start) {
    parents[child] = "start";
  }
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      if (String(n) === "start") {
        return "BROKEN PATH";
      }
      let newCost = cost + children[n];
      if (!costs[n] || costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ["finish"];
  let parent = parents.finish;
  while (parent) {
    optimalPath.unshift(parent);
    parent = parents[parent];
  }

  return {
    distance: costs.finish,
    path: optimalPath
  };
};

const graph = {
  start: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {}
};

const problemGraph = {
  start: { A: 5, B: 2 },
  A: { start: 1, C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {}
};

console.log(dijkstras(graph));
console.log(dijkstras(problemGraph));
