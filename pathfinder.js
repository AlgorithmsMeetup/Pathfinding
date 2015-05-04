function getNodeWithLeastTentativeCost(nodes){
  return nodes.reduce(function getLeastTentativeCost(leastNode, nextNode){
    return leastNode.tentativeCost < nextNode.tentativeCost ? leastNode : nextNode ;
  }, nodes[0]);
};

function findShortestPath(currentNode, endNode){ // where nodes between start and end have tentative costs.
  var shortestPath = [currentNode];
  while(currentNode !== endNode){
    currentNode = getNodeWithLeastTentativeCost(currentNode.neighbors);
    shortestPath.push(currentNode);
  }
  shortestPath = shortestPath.reverse();
  return shortestPath;
};

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
  return findShortestPath(currentNode, startNode) // currentNode === endNode
};

// Graph
function Node(name, cost, coords){
  this.name = name;
  this.cost = cost;
  this.tentativeCost = Infinity;
  this.neighbors = [];
  this.coords = coords; // don't worry about coords until A*
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

function createDistanceHeuristic(goalCoords){
  return function distanceHeuristic(currentCoords){ // closure/function generator is useful to avoid repeating goalCoords
    var deltaX = currentCoords.x - goalCoords.x;
    var deltaY = currentCoords.y - goalCoords.y;
    return math.sqrt(deltaX*deltaX + deltaY*deltaY);
  };
};

function astar(startNode, endNode){
  var visitedNodes = [];
  var unvisitedNodes = [startNode]; // minHeap is preferable to getNodeWithLeastTentativeCost and splice
  var distanceHeuristic = createDistanceHeuristic(endNode.coords); // initialize heuristic
  startNode.setTentativeCost(startNode.cost - distanceHeuristic(startNode.coords)); // use heuristic
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
      var tentativeCost = currentNode.tentativeCost + neighbor.cost - distanceHeuristic(neighbor.coords); // use heuristic
      if (tentativeCost < neighbor.tentativeCost){
        neighbor.setTentativeCost(tentativeCost);
      }
    });
    // mark current node as visited
    visitedNodes.push(unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1)[0]);
  }

  // find shortest path
  return findShortestPath(currentNode, startNode) // currentNode === endNode
};
