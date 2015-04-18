function djikstra(node2, node1){
  // Fill in this function


  return []; //'shortest distance list of nodes from node1 to node2';
};

function heuristic(?){
  // Fill in this function


  return '?';
};

function astar(node2, node1){
  // Fill in this function


  return []; //'shortest distance list of nodes from node1 to node2';
};

// Graph
function Node(cost){
  this.wasVisited = false;
  this.neighbors = [];
};

Node.prototype.visit = function() {
  this.wasVisited = true;
};

Node.prototype.connectToNode = function(node){
  if(this.neighbors.indexOf(node) === -1){
    this.neighbors.push(node);
  }
  node.connectToNode(this);
};

// test methods; don't use these!
Node.prototype.unvisit = function() {
  this.wasVisited = false;
};
