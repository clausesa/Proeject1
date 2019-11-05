const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
keys = 5;
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
    //this.y--; // preguntamos si la primer imagen ya esta fuera del canvas
    //if (this.y < -canvas.height && frames % 5 === 0) this.y = 0;
    // dibujamos la imagen normal
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    //ctx.drawImage(this.img, this.x, this.y + canvas.height, this.width, this.height);
    //interval = setInterval(update, 2000 / 1);
  }
}

class Donut {
  constructor() {
    this.x = 100;
    this.y = 50;
    this.width = 100;
    this.height = 100;
    this.img = new Image();
    this.img.src = images.donut;
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.y += 1;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.y === canvas.height) this.y = 0;
    interval = setInterval(update, 2000 / 3);
  }
  isTouching() {
    return this.y > 600 && this.y < 700;
  }
}

const board = new Board();
const donita = new Donut();

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  // frames++;
  clearCanvas();
  board.draw();
  donita.draw();
  donita.isTouching();
}