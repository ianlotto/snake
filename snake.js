(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function(board) {
    this.dirs = { "37": [-1,0], // left
                  "38": [0,-1], // up
                  "39": [1, 0], // right
                  "40": [0, 1]  // down
                };
    this.dir = this.dirs["39"];
    this.segments = [ new Coord(2,5),
                      new Coord(2,4),
                      new Coord(2,3),
                      new Coord(2,2),
                      new Coord(1,2),
                      new Coord(0,2)
                    ];
    this.board = board;
  }

  Snake.prototype.move = function () {
    var newHeadPos = SnakeGame.Coord.plus(this.segments[0], this.dir);

    this.segments.unshift( newHeadPos );

    if (!this.board.eatApple()) {
      this.segments.pop();
    }
  }

  Snake.prototype.turn = function (keyCode) {
    var newDir = this.dirs[keyCode]

   if(this.dir[0] + newDir[0] !== 0 || this.dir[1] + newDir[1] !== 0) {
      this.dir = newDir
   }
  }

  Snake.prototype.collides = function () {
    var head = this.segments[0];
    var collided = false;

    this.segments.slice(1).forEach(function(coord){
      if (head.posX === coord.posX && head.posY === coord.posY) {
        collided = true
      }
    });
    return collided;
  }

  var Coord = SnakeGame.Coord = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  Coord.plus = function (coord1, dir) {
    return new Coord(coord1.posX + dir[0], coord1.posY + dir[1] );
  }

  var Board = SnakeGame.Board = function(dim) {
    this.snake = new Snake(this);
    this.grid = Board.buildBoard(dim);
  }

  Board.buildBoard = function (dim) {
    var array = [];

    for ( var i = 0; i < dim; i++ ) {
      array.push([]);
      for ( var j = 0; j < dim; j++ ) {
        array[i].push("_");
      }
    }

    return array;
  }

  Board.prototype.addApple = function() {
    var apple_coord = []
    for (var i = 0; i < 2; i++ ) {
      apple_coord.push(Math.floor((Math.random() * this.grid.length)));
    }

    this.grid[apple_coord[0]][apple_coord[1]] = 'a';
  }

  Board.prototype.eatApple = function () {
    var head = this.snake.segments[0];
    var headPos = this.grid[head.posY][head.posX];
    if (headPos === 'a') {
      this.grid[head.posY][head.posX] = "_";
      return true;
    } else {
      return false;
    }
  }

})(this);