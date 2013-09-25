(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function() {
    this.dirs = { "37": [-1,0], // left
                  "38": [0,-1], // up
                  "39": [1, 0], // right
                  "40": [0, 1]  // down
                };
    this.dir = this.dirs["39"];
    this.segments = [[2,2],[2,3],[2,4]]
  }

  Snake.prototype.move = function (grow) {
    var newHeadPos = SnakeGame.Coord.plus(this.segments[0], this.dir);
    this.segments.unshift( newHeadPos );
    if (!grow) {
      this.segments.pop();
    }

  }

  Snake.prototype.turn = function (keyCode) {
    this.dir = this.dirs[keyCode]
  }

  var Coord = SnakeGame.Coord = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  Coord.plus = function (coord1, dir) {
    return new Coord(coord1.posX + dir[0], coord1.posY + dir[1] );
  }

})(this);