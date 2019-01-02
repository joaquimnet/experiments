let canvas, ctx;

let ballX = 33;
let ballY = 33;
let ballXSpeed = 10;
let ballYSpeed = 10;
let ballSize = 10;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
let paddleX = 400;
//let paddleY = ?;

let score = 0;


// Initialization
window.onload = () => {
  canvas = document.querySelector("#gameCanvas");
  ctx = canvas.getContext("2d");
  
  const fps = 30;
  setInterval(updateAll, 1000 / fps);
  
  canvas.addEventListener('mousemove', updateMousePos);
};

// Input
const updateMousePos = e => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  let mouseX = e.clientX - rect.left - root.scrollLeft;
  //let mouseY = e.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
  //paddleY = mouseY;
}

// Game functions
const updateAll = () => {
  moveAll();
  drawAll();
};

const moveAll = () => {
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if (ballX > canvas.width - ballSize) { // right
    ballXSpeed *= -1;
  } else if (ballX < ballSize) { // left
    ballXSpeed *= -1;
  }

  if (ballY > canvas.height - ballSize) { // bottom
    //ballYSpeed *= -1;
    ballReset();
  } else if (ballY < ballSize) { // top
    ballYSpeed *= -1;
  }

  let paddleTopEdgeY = canvas.height - PADDLE_THICKNESS - PADDLE_DIST_FROM_EDGE;
  let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  let paddleLeftEdgeX = paddleX;
  let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

  if (ballY > paddleTopEdgeY - ballSize && // top
      ballY < paddleBottomEdgeY && // bottom
      ballX > paddleLeftEdgeX - ballSize && // left
      ballX < paddleRightEdgeX + ballSize) { // right
        //ballYSpeed *= -1;
        ballYSpeed = - Math.abs(ballYSpeed);

        let centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
        let distFromPaddleCenterX = ballX - centerOfPaddleX;
        ballXSpeed = distFromPaddleCenterX * 0.35;

        score += 1;

        console.log('Score: ', score);
      }

};

const drawAll = () => {
  colorRect(0, 0, canvas.width, canvas.height, "black"); // clear screen
  colorCircle(ballX, ballY, ballSize, "white"); // draw ball
  colorRect(paddleX, canvas.height - PADDLE_THICKNESS - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
};

const ballReset = () => {
  score = 0;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

// Helpers
const colorRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

const colorCircle = (centerX, centerY, radius, fillColor) => {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.fill();
};
