function dijkstra(startNode, endNode){
  // Fill in this function
  var path = [];
  path.push(startNode);
  var current = startNode;
  while( ~path.indexOf(endNode) ){
    path = path.reduce(function(newPath, node){
      newPath.push(node)
      node.neighbors.forEach(function(neighbor){
        if(!~newPath.indexOf(neighbor)){
          newPath.push(neighbor);
        }
      })
    },[]);
  }
  path.push(endNode);
  console.log(path);
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
function Node(name){
  this.name = name;
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
