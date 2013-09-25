(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function() {
    this.dirs = { "37": [-1,0], // left
                  "38": [0,-1], // up
                  "39": [1, 0], // right
                  "40": [0, 1]  // down
                };
    this.dir = this.dirs["39"];
    this.segments = [ new Coord(2,2),
                      new Coord(1,2),
                      new Coord(0,2)
                    ];
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

  var Board = SnakeGame.Board = function(dim) {
    this.snake = new Snake();
    this.grid = Board.buildBoard(dim);
  }

  Board.buildBoard = function (dim) {
    var array = [];

    for ( var i = 0; i < dim; i++ ) {
      array.push([]);
      for ( var j = 0; j < dim; j++ ) {
        array[i].push("*");
      }
    }

    return array;
  }

  Board.prototype.render = function () {
    var snake = this.snake;
    var grid = this.grid;
    var boardString = '';
    this.grid.forEach(function(row, rowIndex){
      row.forEach(function(square, squareIndex){
        var isSnake = false;
        snake.segments.forEach(function(coord){
          if (coord.posX === squareIndex && coord.posY === rowIndex) {
            isSnake = true;
          }
        })
        boardString += isSnake ? 'S' : '.';
      boardString += ' ';
      })
      boardString += '\n';

    })

    console.log(boardString);
  }

  Board.prototype.animate = function () {
    var board = this;

    setInterval(function() {
      board.render();
      board.snake.move()

    }, 500)

  }

})(this);

$(function(){
  var board = new SnakeGame.Board(20);
  board.animate();

  $(window).on("keydown", function(event){
    var key = event.which;
    var snake = board.snake;

    snake.dir = snake.dirs[""+key];
  });

});








