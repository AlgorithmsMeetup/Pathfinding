function dijkstra(startNode, endNode){
  var visitedNodes = [];
  var unvisitedNodes = [startNode]; // minHeap is preferable to getNodeWithLeastTentativeCost and splice
  startNode.setTentativeCost(startNode.cost);
  // assign tentative costs until end is visited
  while(currentNode !== endNode){
    // set current node to unvisited node w least tentative cost
    var currentNode = getNodeWithLeastTentativeCost(unvisitedNodes);
    // consider unvisited neighbors
    var unvisitedNeighbors = currentNode.neighbors.filter(function(node){ return !~visitedNodes.indexOf(node); });;
    // add unvisited neighbors to unvisited minHeap
    unvisitedNodes = unvisitedNodes.concat(unvisitedNeighbors);
    // for each unvisited neighbor: calculate, compare, and if less, set tentative cost
    unvisitedNeighbors.forEach(function(neighbor){
      var tentativeCost = currentNode.tentativeCost + neighbor.cost;
      if (tentativeCost < neighbor.tentativeCost){
        neighbor.setTentativeCost(tentativeCost);
      }
    });
    // mark current node as visited
    visitedNodes.push(unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1)[0]);
  }

  // find shortest path
  var shortestPath = [endNode];
  while(currentNode !== startNode){ // currentNode === endNode
    currentNode = getNodeWithLeastTentativeCost(currentNode.neighbors);
    shortestPath.push(currentNode);
  }
  shortestPath = shortestPath.reverse();
  return shortestPath; // shortest distance list of nodes from startNode to endNode
};

function getNodeWithLeastTentativeCost(nodes){
  return nodes.reduce(function getLeastTentativeCost(leastNode, nextNode){
    return leastNode.tentativeCost < nextNode.tentativeCost ? leastNode : nextNode ;
  }, nodes[0]);
};

function heuristic(idk){
  // Fill in this function
  return '?';
};

function astar(startNode, endNode){
  // Fill in this function
  return []; // shortest distance list of nodes from startNode to endNode
};

// Graph
function Node(name, cost){
  this.name = name;
  this.cost = cost;
  this.tentativeCost = Infinity;
  this.neighbors = [];
};

Node.prototype.setTentativeCost = function(value) {
  this.tentativeCost = value;
};

Node.prototype.connectTo = function(node){
  if(this.neighbors.indexOf(node) === -1){
    this.neighbors.push(node);
    node.connectTo(this);
  }
};
