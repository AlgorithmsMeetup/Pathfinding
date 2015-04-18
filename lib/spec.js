var expect = chai.expect;
var graph;
describe('Pathfinding Algorithms', function(){
  beforeEach(function(){
    graph = new Graph();
  });
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

  context('A* between two points', function(){
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

  context('Admissible heuristic for A*', function(){
    it('');
  });
});

describe('Node', function(){
  it('creates a new unvisted node', function(){
    //
  });
  it('connects to another node', function(){
    //
  });
  it('creates a new unvisted node connected to current node', function(){
    //
  });
  it('connects to another node', function(){
    //
  });
});

//   // beforeEach(function(){
//   // });
//   // it('', function(){
//   //   expect().to.deep.equal({});
//   // });
//   // it('', function(){
//   //   expect().to.include();
//   // });
//   // it('', function(){
//   //   expect().to.deep.equal()
//   // });
//   // it('', function(){
//   //   expect().to.equal();
//   // });
//   // it('', function(){
//   //   expect().to.not.include();
//   // });
//   // context('', function(){
//   //   xit('');
//   // });
// });
