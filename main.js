// Variablessss

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let donas = [];
let timeout;
let totalScore = 0;
let counter =0; 


const images = {
  donut: 'Images/donut3.png',
  bg: 'Images/bg1.jpg'
};

//////////////////**CLASES */

class Board {
  constructor() {
    this.y = 0;
    this.x = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = images.bg;
    this.img.onload = () => {
      this.draw();
    };
  } //fin constructor
  draw() {
    clearInterval();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawCircles() {
    if (ctx) {
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = '#F73D8C';
        ctx.strokeStyle = '#F73DE9';
        ctx.arc(150 + 200 * i, 650, 50, 0, 2 * Math.PI);
        ctx.fill();
      } //end for
    } //end if
  } //end drawCircles
} // fin de la clase board

class Donut {
  constructor(speed, x) {
    this.x = x;
    this.y = 50;
    this.speed = speed;
    this.width = 100;
    this.height = 100;
    this.score = 0;
    this.fails = 0;
    this.img = new Image();
    this.img.src = images.donut;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.y += this.speed;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


} //end class Donut

const board = new Board();



//////////////////***************FUNCIONES */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateDonuts() {

  if (frames % 15 === 0) {

    let positionDonuts = [100, 300, 500, 700];

    let donita = new Donut(Math.floor(Math.random() * (14 - 7) + 7), positionDonuts[Math.floor(Math.random() * positionDonuts.length)]);
    donas.push(donita);
  }
}

function drawDonas(frames) {
  donas.forEach((donass) => donass.draw());
}


function checkOutOfCanvas() {

  donas.forEach((dona) => {
    if (dona.y > 800) {
      donas.splice();
    }
  });
}

function timer() {
  timeout = setTimeout(gameOver, 5000);
}


function gameOver() {
  ctx.font = 'bold 80px Serif';
  ctx.fillStyle = 'magenta';
  ctx.fillText('Time!', 400, 300);
  ctx.fillText(`Score: ${totalScore}`, 400, 450);
  clearInterval(interval);
}


window.onload = function () {
  startGame();

  function startGame() {
    interval = setInterval(update, 1000 / 60);
  }

}

function update() {
  timer();
  frames++;
  clearCanvas();
  board.draw();
  board.drawCircles();
  generateDonuts();
  drawDonas();
}





document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 65:
      console.log("hola desdae case 65");
      totalScore++;
      break;
    case 83:
      totalScore++;

      break;
    case 75:
      totalScore++;
      break;
    case 76:
      totalScore++;
      break;
  } //end switch
};

document.onkeyup = e => {


}