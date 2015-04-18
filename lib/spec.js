var expect = chai.expect;

describe('Pathfinding Algorithms', function(){
  context('Dijkstra\'s Algorithm between two points',function(){
    it('returns a path between two nodes', function(){
      var path = dijkstra(graph.start, graph.end);
      expect(path.indexOf(graph.start)).to.not.be(-1);
      expect(path.indexOf(graph.end)).to.not.be(-1);
    })
    it('returns the shortest path between two nodes', function(){
      var shortestPath = dijkstra(graph.start, graph.end);
      expect(shortestPath).to.deep.equal([{}]);
    });
    it('stops traversing when shortest path is found', function(){
      dijkstra(graph.start, graph.end);
      expect(graph.end.neighbors.reduce(function(visitedTooMany, node){ return visitedTooMany && node.wasVisited }, true));
    });
  });
  xcontext('A* between two points', function(){
    it('returns a path between two nodes', function(){
      var path = astar(graph.start, graph.end);
      expect(path.indexOf(graph.start)).to.not.be(-1);
      expect(path.indexOf(graph.end)).to.not.be(-1);
    })
    it('returns the shortest path between two nodes', function(){
      var shortestPath = dijkstra(graph.start, graph.end);
      expect(shortestPath).to.deep.equal([{}]);
    });
    it('stops traversing when shortest path is found');
    it('does not traverse all nodes');
    it('performs better than Dijkstra in some cases', function(){
      dijkstra(graph.start, graph.end);
      var dijkstraVisitedCount = graph.allNodes.reduce(function(sum, node){
        var wasVisited = node.wasVisited;
        node.wasVisited = false;
        return sum += wasVisited;
      });
      astar(graph.start, graph.end);
      var astarVisitedCount = graph.allNodes.reduce(function(sum, node){
        var wasVisited = node.wasVisited;
        node.wasVisited = false;
        return sum += wasVisited;
      });
      expect(astarVisitedCount).to.be.less.than(dijkstraVisitedCount);
    });
  });
  xcontext('Admissible heuristic for A*', function(){
    it('');
  });
});

describe('Node', function(){
  it('creates a new unvisted node', function(){
    var node = new Node();
    expect(node.visited).to.equal(false);
  });
  it('connects to another node', function(){
    var node1 = new Node();
    var node2 = new Node();
    node1.connectTo(node2);
    expect(node1.neighbors).to.include(node2);
  });
  it('can be visited', function(){
    var node = new Node();
    node.visit();
    expect(node.visited).to.equal(true);
  });
  it('can mark visited with custom value', function(){
    var node1 = new Node();
    var node2 = new Node();
    node2.visit(node1)
    expect(node2.visited).to.equal(node1);
  });
  it('has a cost associated with visiting');
});

describe('graph', function(){
  it('can create a graph', function(){
    var start = new Node();
    var node2 = new Node();
    var node3 = new Node();
    var end = new Node();
    start.connectTo(node2);
    start.connectTo(node3);
    node2.connectTo(node3);
    end.connectTo(node2);
    end.connectTo(node3);
    expect(start.neighbors).to.not.include(end);
    expect(start.neighbors.reduce(function(array, node){ return array.concat(node.neighbors); }, [])).to.include(end);
  });
  it('can traverse a graph', function(){
    var start = new Node();
    var node2 = new Node();
    var node3 = new Node();
    var end = new Node();
    start.connectTo(node2);
    start.connectTo(node3);
    node2.connectTo(node3);
    end.connectTo(node2);
    end.connectTo(node3);
    start.visit();
    node2.visit(start);
    end.visit(node2);
    expect(end.visited.visited).to.equal(start);
  });
});
