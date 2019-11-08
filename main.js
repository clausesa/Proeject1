// Variablessss

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let donas = [];
let timeout;
let singlescore = 0;
let onescore = 0;
let twoscore = 0;
let winner = ['Player One', 'Player Two', 'Ok there is no winner try it again'];

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
      ctx.font = 'bold 100px Serif';
      ctx.fillStyle = "white";
      ctx.strokeStyle = 'purple';
      ctx.fillText('A', 115, 680);
      ctx.strokeText('A', 115, 680);
      ctx.fillStyle = "white";
      ctx.strokeStyle = 'purple';
      ctx.fillText('S', 325, 680);
      ctx.strokeText('S', 325, 680);
      ctx.fillStyle = "white";
      ctx.strokeStyle = 'purple';
      ctx.fillText('L', 720, 680);
      ctx.strokeText('L', 720, 680);

      ctx.font = 'bold 95px Serif';
      ctx.fillStyle = "white";
      ctx.strokeStyle = 'purple';
      ctx.fillText('K', 515, 680);
      ctx.strokeText('K', 515, 680);
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
  let positionDonuts = [100, 300, 500, 700];

  if (frames % 15 === 0) {
    let donita = new Donut(Math.floor(Math.random() * (14 - 7) + 7), positionDonuts[Math.floor(Math.random() * positionDonuts.length)]);
    donas.push(donita);
  }
}

function drawDonas(frames) {
  donas.forEach((dona) => dona.draw());
}

function touchDona(x) {
  donas.forEach((dona, i) => {
    if (x === dona.x) {
      if (dona.y < 700 && dona.y > 580) {
        donas.splice(i, 1)
        if (x === 100 || x === 300) {
          onescore++;
        } else if (x === 500 || x === 700) {
          twoscore++;
        }
      }
    }
  })

}

function getWinner() {
  if (onescore > twoscore) {
    return winner[0];
  } else if (twoscore > onescore) {
    return winner[1];
  } else {
    return winner[2];
  }
}



function checkOutOfCanvas() {
  donas.forEach((dona, i) => {
    if (dona.y > 800) {
      donas.splice(i, 1);
    }
  });
}

function timer() {
  timeout = setTimeout(gameOver, 5000);
}


function gameOver() {
  ctx.font = 'bold 100px Serif';
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'yellow';
  ctx.fillText('Time!', 300, 300);
  ctx.strokeText('Time!', 300, 300);
  ctx.font = 'bold 40px Serif';
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'yellow';
  ctx.fillText(`Winner: ${getWinner()}`, 90, 450);
  ctx.strokeText(`Winner: ${getWinner()}`, 90, 450);
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'yellow';
  ctx.fillText(`Score Player One: ${onescore}`, 250, 500);
  ctx.strokeText(`Score Player One: ${onescore}`, 250, 500);
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'yellow';
  ctx.fillText(`Score Player Two: ${twoscore}`, 250, 560);
  ctx.strokeText(`Score Player Two: ${twoscore}`, 250, 560);
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
  checkOutOfCanvas()
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 65:
      touchDona(100)
      break;
    case 83:
      touchDona(300)
      break;
    case 75:
      touchDona(500)
      break;
    case 76:
      touchDona(700)
      break;

  } //end switch
};