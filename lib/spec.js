var expect = chai.expect;

describe('Pathfinding Algorithms', function(){
  context('Dijkstra\'s Algorithm between two points',function(){
    it('returns a path including start and end nodes', function(){
      var graph = createGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(~path.indexOf(graph.start)).to.be.ok; // ok means truthy
      expect(~path.indexOf(graph.end)).to.be.ok;
    });
    it('visits all nodes on the path', function(){
      var graph = createGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(
        path.reduce(function(visitedAll, node){
          return visitedAll && node.visited;
        }, true)
      ).to.be.true;
    })
    it('returns a contiguous path between two nodes', function(){
      var graph = createGraph();
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
      var graph = createGraph();
      var path = dijkstra(graph.start, graph.end);
      expect(path.length).to.equal(3);
      expect(path[0]).to.equal(graph.start);
      expect(path[1]).to.equal(graph.node3);
      expect(path[2]).to.equal(graph.end);
    });
    it('doesn\'t only pick the cheapest next neighbor')
    it('stops traversing when shortest path is found', function(){
      var graph = createGraph();
      dijkstra(graph.start, graph.end);
      var visitedConnectionsToEndNode = graph.end.neighbors.reduce(function(sum, node){
        return sum + node.visited ? 1 : 0;
      }, 0);
      expect(visitedConnectionsToEndNode).to.equal(1);
    });
  });
  xcontext('A* between two points', function(){
    it('returns a path between two nodes', function(){
      var graph = createGraph();
      var path = astar(graph.start, graph.end);
      expect(~path.indexOf(graph.start)).to.be.ok;
      expect(~path.indexOf(graph.end)).to.be.ok;
    })
    it('returns the shortest path between two nodes', function(){
      var graph = createGraph();
      var shortestPath = dijkstra(graph.start, graph.end);
      expect(shortestPath).to.deep.equal([{}]);
    });
    it('stops traversing when shortest path is found');
    it('does not traverse all nodes');
    it('performs better than Dijkstra in some cases', function(){
      var graph = createGraph();
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
    it('needs tests');
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
    var graph = createGraph();
    expect(graph.start.neighbors).to.not.include(graph.end);
    expect(graph.start.neighbors.reduce(function(array, node){ return array.concat(node.neighbors); }, [])).to.include(graph.end);
  });
  it('can traverse a graph', function(){
    var graph = createGraph();
    graph.start.visit();
    graph.node2.visit(start);
    graph.end.visit(node2);
    expect(graph.end.visited.visited).to.equal(graph.start);
  });
});

function createGraph(){
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
