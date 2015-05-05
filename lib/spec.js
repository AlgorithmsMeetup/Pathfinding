var expect = chai.expect;

describe('Pathfinding Algorithms', function(){
  context('Helper functions', function(){
    it('getNodeWithLeastTentativeCost returns the node with the least tentative cost from a collection of nodes', function(){
      var node1 = new Node('1');
      node1.setTentativeCost(100);
      var node2 = new Node('2');
      node2.setTentativeCost(1);
      var node3 = new Node('3');
      node3.setTentativeCost(10);
      expect(getNodeWithLeastTentativeCost([node1, node2, node3])).to.deep.equal(node2)
    });
    it('findShortestPath returns an array of contiguous nodes sorted from startNode to endNode', function(){
      var graph = createTrickyGraph();
      graph.start.setTentativeCost(0)
      graph.node2.setTentativeCost(1);
      graph.node3.setTentativeCost(3);
      graph.node4.setTentativeCost(2);
      graph.node5.setTentativeCost(3);
      graph.end.setTentativeCost(3);
      expect(findShortestPath(graph.end, graph.start)).to.deep.equal([graph.start, graph.node2, graph.node4, graph.end])
    });
    it('findShortestPath doesn\'t get stuck in an infinite loop with same-cost nodes', function(){
      var n = 5; // number of nodes per side of square map
      var map = createMap(n);
      (function setNeighborsTentativeCost(node){
        if(typeof node.tentativeCost === 'undefined'){
          node.setTentativeCost(1);
          node.neighbors.forEach(setNeighborsTentativeCost);
        }
      })(map.start);
      dijkstra(map.start, map.end); // TODO !!!
      var path = findShortestPath(map.end, map.start);
      expect(path.length).to.equal(2*n-1);
      expect(path[0]).to.equal(map.start);
      expect(path[path.length-1]).to.equal(map.end);
    });
  });
  context('Dijkstra\'s Algorithm between two points',function(){
    it('returns a path including start and end nodes', function(){
      var graph = createSimpleGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(~path.indexOf(graph.start)).to.be.ok; // ok means truthy
      expect(~path.indexOf(graph.end)).to.be.ok;
    });
    it('assigns tentative costs to all nodes on the path', function(){
      var graph = createSimpleGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(
        path.reduce(function(wereAllVisited, node){
          return wereAllVisited && node.tentativeCost !== Infinity;
        }, true)
      ).to.be.true;
    })
    it('returns a contiguous path between two nodes', function(){
      var graph = createSimpleGraph();
      var path = dijkstra(graph.start, graph.end);
      path.forEach(function(node, index, path){
        if(index !== 0){
          expect(~node.neighbors.indexOf(path[index-1])).to.be.okay;
        }
        if(index !== path.length-1){
          expect(~node.neighbors.indexOf(path[index+1])).to.be.okay;
        }
      });
    });
    it('returns the shortest path between two nodes', function(){
      var graph = createSimpleGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(path.length).to.equal(3);
      expect(path[0]).to.equal(graph.start);
      expect(path[1]).to.equal(graph.node3);
      expect(path[2]).to.equal(graph.end);
    });
    it('doesn\'t only pick the cheapest next neighbor', function(){
      var graph = createTrickyGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(path.length).to.equal(4);
      expect(path[0]).to.equal(graph.start);
      expect(path[1]).to.equal(graph.node2);
      expect(path[2]).to.equal(graph.node4);
      expect(path[3]).to.equal(graph.end);
    });
    it('stops traversing when shortest path is found', function(){
      var graph = createTrickyGraph();
      dijkstra(graph.start, graph.end);
      var visitedConnectionsToEndNode = graph.end.neighbors.reduce(function(sum, node){
        return sum + node.visited ? 1 : 0;
      }, 0);
      expect(visitedConnectionsToEndNode).to.be.below(graph.end.neighbors.length);
    });
    it('works when all nodes have the same cost', function(){
      var map = createMap(5);
      var path = dijkstra(map.start, map.end);
      expect(path[0]).to.equal(map.start);
      expect(path[path.length-1]).to.equal(map.end);
    });
  });
  context('A* between two points', function(){
    it('uses a distance heuristic', function(){ // in this case use cost - √(x1-x2)^2 + (y1-y2)^2)
      var startNode = new Node('start', 1);
      var endNode = new Node('end', 1);
      startNode.setCoords(0,0);
      endNode.setCoords(3,4);
      var heuristic = createDistanceHeuristic(endNode.coords);
      expect(heuristic(startNode.coords)).to.equal(5); // 5 = √((3-0)^2+(4-0)^2)
    });
    it('returns the shortest path between two nodes', function(){
      var n = 5; // number of nodes per side of square map
      var map = createMap(n);
      var path = astar(map.start, map.end);
      expect(path.length).to.equal(2*n-1);
      expect(path[0]).to.equal(map.start);
      expect(path[path.length-1]).to.equal(map.end);
      expect(true);
    });
    it('performs better than Dijkstra when possible', function(){
      var map = createMap(3);
      dijkstra(map.start, map.end);
      var dijkstraVisitedCount = getAllNodes(map.start).reduce(function(sum, node){
        return sum += node.tentativeCost ? 1 : 0;
      }, 0);
      astar(map.start, map.end);
      var astarVisitedCount = getAllNodes(map.start).reduce(function(sum, node){
        return sum += node.tentativeCost ? 1 : 0;
      }, 0);
      console.log({dijkstraVisitedCount:dijkstraVisitedCount,astarVisitedCount:astarVisitedCount});
      console.log({dijkstra:dijkstra(map.start, map.end), astar:astar(map.start, map.end)});
      expect(astarVisitedCount).to.be.less.than(dijkstraVisitedCount);
    });
  });
});

describe('Node', function(){
  it('creates a new node', function(){
    var node = new Node('myName', 7);
    expect(node.name).to.equal('myName');
    expect(node.cost).to.equal(7);
    expect(node.tentativeCost).to.equal(Infinity);
  });
  it('can set tentativeCost', function(){
    var node = new Node();
    expect(node.tentativeCost).to.equal(Infinity);
    node.setTentativeCost(4);
    expect(node.tentativeCost).to.equal(4);
  });
  it('connects to another node', function(){
    var node1 = new Node();
    var node2 = new Node();
    node1.connectTo(node2);
    expect(node1.neighbors).to.include(node2);
  });
  it('can create a graph', function(){
    var graph = createSimpleGraph();
    expect(graph.start.neighbors).to.not.include(graph.end);
    expect(graph.start.neighbors.reduce(function(array, node){ return array.concat(node.neighbors); }, [])).to.include(graph.end);
  });
  it('can have coordinates', function(){
    var node = new Node('1',2)
    node.setCoords(3, 4);
    expect(node.coords).to.deep.equal({x:3, y:4});
  });
});

function createSimpleGraph(){
  var start = new Node('start', 1);
  var node2 = new Node('2', 2);
  var node3 = new Node('3', 1);
  var end = new Node('end', 1);
  start.connectTo(node2);
  start.connectTo(node3);
  node2.connectTo(node3);
  end.connectTo(node2);
  end.connectTo(node3);
  return {
    start: start,
    node2: node2,
    node3: node3,
    end: end
  }
};

function createTrickyGraph(){
  var start = new Node('start', 1);
  var node2 = new Node('2', 2);
  var node3 = new Node('3', 1);
  var node4 = new Node('4', 1);
  var node5 = new Node('5', 3);
  var end = new Node('end', 1);
  start.connectTo(node2);
  node2.connectTo(node4);
  end.connectTo(node4);
  start.connectTo(node3);
  node3.connectTo(node5);
  end.connectTo(node5);
  return {
    start: start,
    node2: node2,
    node3: node3,
    node4: node4,
    node5: node5,
    end: end
  }
};

function createMap(n){
  // Yes, this is O(2n^2); don't use in production.
  var map = [];

  // initialize nodes
  for(var i = 0; i < n; i++){
    map[i] = [];
    for(var k = 0; k < n; k++){
      map[i][k] = new Node(''+i+k, 1);
      map[i][k].setCoords(i, k);
    }
  }
  // link nodes eight ways (diagonal moves allowed)
  for(var i = 0; i < n; i++){
    for(var k = 0; k < n; k++){
      // if(i<n-1 && k<n-1){ map[i][k].connectTo(map[i+1][k+1]); }
      if(i<n-1){          map[i][k].connectTo(map[i+1][k+0]); }
      // if(i<n-1 && k>0){   map[i][k].connectTo(map[i+1][k-1]); }
      if(k<n-1){          map[i][k].connectTo(map[i+0][k+1]); }
      if(k>0){            map[i][k].connectTo(map[i+0][k-1]); }
      // if(i>0 && k<n-1){   map[i][k].connectTo(map[i-1][k+1]); }
      if(i>0){            map[i][k].connectTo(map[i-1][k+0]); }
      // if(i>0 && k>0){     map[i][k].connectTo(map[i-1][k-1]); }
    }
  }

  return {
    start: map[0][0],
    end: map[n-1][n-1]
  }
};

function getAllNodes(startNode){
  var allNodes = [];
  (function setNeighborsTentativeCost(node){
    if(allNodes.indexOf(node) === -1){
      allNodes.push(node);
      node.neighbors.forEach(setNeighborsTentativeCost);
    }
  })(startNode);
  return allNodes;
};
