var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");

var gameEnded = false;
canvas.width = 400;
canvas.height = 400;

var snakeSegments = [];
var snakeLength = 1;

var snakeX = 0;
var snakeY = 0;

var directionX = 10;
var directionY = 0;

var dots = [];

// Change the X, Y position of the snake for every frame
function moveSnake() {
  // Add snake segments to the array as the snake moves
  snakeSegments.unshift({ x: snakeX, y: snakeY });
  
  // Change the snake's X and Y positions as it moves
  snakeX += directionX;
  snakeY += directionY;
  
  // Clear the last snake segment as it moves
  while (snakeSegments.length > snakeLength) {
    snakeSegments.pop();
  }
}

// Draw (and re-draw) the snake for every frame of the game
function drawSnake() {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  canvas2d.fillStyle = "black"; 
  for (var i = 0; i < snakeSegments.length; i++) {
    canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
  }
}

// Game loop so the game updates every 100 milliseconds with new info such as the snake's location or directions.
function gameLoop() {
  moveSnake();
  drawSnake();
  spawnDots();
  checkCollision();
  if(!gameEnded) {
    setTimeout(gameLoop, 100);
  }
}
gameLoop();

// Change the direction everytime the player presses left/right/up/down arrows
document.onkeydown = function(event) {
switch (event.keyCode) {
  case 37: // Left arrow
    directionX = -10;
    directionY = 0;
    break;
  case 38: // Up arrow
    directionX = 0;
    directionY = -10;
    break;
  case 39: // Right arrow
    directionX = 10;
    directionY = 0;
    break;
  case 40: // Down arrow
    directionX = 0;
    directionY = 10;
    break;
  }
};

// Function to add the red dots to act as the snake's food
function spawnDots() {
  // Randomly generate X and Y coordinates for 10 dots
  if(dots.length < 10) {
    var dotX = Math.floor(Math.random() * canvas.width);
    var dotY = Math.floor(Math.random() * canvas.height);
    dots.push({ x: dotX, y: dotY });
  }
  // Draw the dots onto the canvas, using a red color
  for (var i = 0; i < dots.length; i++) {
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
  }
}

// Check if the snake collided with the dots, wall or tail
function checkCollision() {
  // Check if the snake hit any of the dots
  for (var i = 0; i < dots.length; i++) {
    if (snakeX < dots[i].x + 10 && 
      snakeX + 10 > dots[i].x && 
      snakeY < dots[i].y + 10 && 
      snakeY + 10 > dots[i].y) {
        snakeLength++;
        dots.splice(i, 1);
    }
  }
  // Check if the snake hit any of the canvas' walls
  if (snakeX < -10 || 
    snakeY < -10 || 
    snakeX > canvas.width+10 ||
    snakeY > canvas.height+10) {
      gameOver();
  }
  // Check if the snake hit its own tail
  for (var i = 1; i < snakeSegments.length; i++) {
    if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
      gameOver();
    }
  }
}

// Function to print a game over alert
function gameOver() {
  setTimeout(function() {
    alert("Game over!");
  }, 500); 
  gameEnded = true
}
