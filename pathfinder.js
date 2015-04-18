function djikstra(node1, node2){
  // Fill in this function
  return []; //'shortest distance list of nodes from node1 to node2';
};

function heuristic(idk){
  // Fill in this function
  return '?';
};

function astar(node1, node2){
  // Fill in this function
  return []; //'shortest distance list of nodes from node1 to node2';
};

// Graph
function Node(cost){
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
