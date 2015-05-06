// Dijkstra's Algorithm

function getNodeWithLeastTraversalCost(arrayOfNodes){
  // return node with least traversalCost
};

function findShortestPath(currentNode, goalNode){ // where nodes between start and end have tentative costs.
  // return shortest path array based on graph of nodes with traversalCosts assigned
};

function dijkstra(startNode, endNode){
  // return shortest path array of nodes
};

// Nodes for Graphs/Maps
function Node(name, cost){
  this.name = name;
  this.cost = cost;
  this.traversalCost = Infinity;
  this.neighbors = [];
};

Node.prototype.setTraversalCost = function(value) {
  this.traversalCost = value;
};

Node.prototype.connectTo = function(node){
  if(this.neighbors.indexOf(node) === -1){
    this.neighbors.push(node);
    node.connectTo(this);
  }
};

// A*

function astar(startNode, endNode){
  // return shortest path array of nodes
};

function createDistanceHeuristic(goalCoords){
  return function distanceHeuristic(currentCoords){ // closure/function generator is useful to avoid repeating goalCoords
    var deltaX = currentCoords.x - goalCoords.x;
    var deltaY = currentCoords.y - goalCoords.y;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  };
};

Node.prototype.setCoords = function(x, y){ // don't worry about coords till A*
  this.coords = {x: x, y: y};
};
