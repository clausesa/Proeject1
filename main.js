const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
const images = {
  donut: 'Images/donut3.png',
  bg: 'Images/bg1.jpg'
};

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
    //this.y -= 3;
    //if (this.y < -canvas.height && frames % 5 === 0) this.y = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //ctx.drawImage(this.img, this.x, this.y + canvas.height, this.width, this.height);
  }
  drawCircles() {
    if (ctx) {
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = '#F73D8C';
        ctx.strokeStyle = '#F73DE9';
        ctx.arc(150 + 150 * i, 650, 50, 0, 2 * Math.PI);
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
    if (this.y > canvas.height) {
      this.y = 0;
    }

    this.y += this.speed;
    console.log(this.speed);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  isTouching() {
    return this.y > 550 && this.y < 600;
  }

  isFail() {
    if (this.y > 601) {
      ctx.font = 'bold 40px Serif';
      ctx.fillStyle = 'magenta';
      ctx.fillText('Fail!!', this.x, 760);

      //this.fails += 1;
    }
  } //end isFail
} //end class Donut

const board = new Board();
const donita = new Donut(5, 100);
const donita1 = new Donut(7, 250);
/*
const donita2 = new Donut(8, 400);
const donita3 = new donita(7, 550);
const donita4 = new Donut(9, 700);
*/
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = function() {
  startGame();

  function startGame() {
    interval = setInterval(update, 1000 / 60);
  }

  function update() {
    frames++;
    clearCanvas();
    board.draw();
    board.drawCircles();
    donita.draw();
    donita.isFail();
    donita1.draw();
    donita1.isFail();
  } //end update
}; //end window.onload

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 65:
      if (donita.isTouching()) {
        donita.score += 5;
        clearCanvas();
        donita.y += 300;
      }
  } //end switch
}; //End listener onkeypress
