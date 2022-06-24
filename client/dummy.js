const SolveGraph = (graph, start, end, visited = {}) => {
  if(visited[start]) return false;
  visited[start] = true;
  for(const node of graph[start]) {
    if (node === end ) return true;
    if (SolveGraph(graph, node, end, visited)) return true
  }
  return false;
}

const graph = {
  a: ['c'],
  b: ['c'],
  c: ['s', 'r'],
  d: ['a'],
  s: ['a', 'c'],
  r: ['d'],
  z: ['z'],
}

console.log(SolveGraph(graph, 'a', 'r'));
console.log(SolveGraph(graph, 'a', 'd'));
console.log(SolveGraph(graph, 's', 'b'));

module.exports = SolveGraph;