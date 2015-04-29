function dijkstra(startNode, endNode){
  // Fill in this function
  var path = [];
  var current = startNode;
  current.visit();
  path.push(current);
  var safetyValue = 0;
  while( !~path.indexOf(endNode) && safetyValue < 1000 ){
    safetyValue++;
    var nextNode;
    if( ~current.neighbors.indexOf(endNode) ){
      nextNode = endNode;
    } else {
      nextNode = current.neighbors.reduce(function(lowestCostNode, neighbor){
        return neighbor.cost < lowestCostNode.cost ? neighbor : lowestCostNode;
      }, {cost: Infinity});
    }
    current = nextNode;
    current.visit();
    path.push(current);
  }
  return path; //'shortest distance list of nodes from startNode to endNode';
};

function heuristic(idk){
  // Fill in this function
  return '?';
};

function astar(startNode, endNode){
  // Fill in this function
  return []; //'shortest distance list of nodes from startNode to endNode';
};

// Graph
function Node(name, cost){
  this.name = name;
  this.cost = cost;
  this.visited = false;
  this.neighbors = [];
};

Node.prototype.visit = function(value) {
  this.visited = value || true;
};

Node.prototype.connectTo = function(node){
  if(this.neighbors.indexOf(node) === -1){
    this.neighbors.push(node);
    node.connectTo(this);
  }
};

// test methods; don't use these!
Node.prototype.unvisit = function() {
  this.visited = false;
};
