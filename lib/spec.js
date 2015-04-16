var expect = chai.expect;

describe('Pathfinding Algorithms', function(){
  context('Dijkstra\'s Algorithm between two points',function(){
    it('returns the shortest path between two nodes');
    it('stops traversing when shortest path is found');
    it('does not traverse all nodes');
  });

  context('A* between two points', function(){
    it('returns the shortest path between two nodes');
    it('stops traversing when shortest path is found');
    it('does not traverse all nodes');
    it('performs better than Dijkstra in some cases');
  });

  context('Admissible heuristic for A*', function(){
    it('');
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
