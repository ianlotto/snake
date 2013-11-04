(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var View = SnakeGame.View = function(container) {
    this.$container = $(container);
  }

  View.prototype.start = function() {
    this.board = new SnakeGame.Board(20);
    var board = this.board

    $(window).on("keydown", function(event){
      var key = event.which.toString();
      var snake = board.snake;
      if (snake.dirs[key]) {
        snake.turn(key);
      }
    });
    for (var i = 0; i < 5; i++) {
      board.addApple();
    }
    this.animate();
  }

  View.prototype.animate = function () {
    var view = this;
    var board = this.board;

    var intervalId = setInterval(function() {

      board.snake.move();

      if (board.snake.collides()){
        alert('You lost!');
        view.endGame(intervalId);
      }

      view.render();
      if (Math.random() < 0.06) {
        board.addApple();
      }
    }, 100)

  }

  View.prototype.endGame = function(intervalId){
    clearInterval(intervalId);
  }

  View.prototype.render = function () {
    var snake = this.board.snake;
    var grid = this.board.grid;
    var boardString = '';

    grid.forEach(function(row, rowIndex){
      row.forEach(function(square, squareIndex){
        var isSnake = false;
        snake.segments.forEach(function(coord){
          if (coord.posX === squareIndex && coord.posY === rowIndex) {
            isSnake = true;
          }
        })
        if (isSnake) {
          boardString += '<div class="snake"></div>';
        }
        else if ( square === 'a') {
          boardString += '<div class="apple"></div>';
        }
        else {
          boardString += '<div></div>'
        }
      })

    })

    this.$container.html(boardString);
  }
})(this);

$(function(){
  var view = new SnakeGame.View('#container');
  view.start();
});