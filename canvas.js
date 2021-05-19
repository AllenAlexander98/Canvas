var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// // Rectangle
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(300, 300, 100, 100);

// // Line
// c.beginPath();
// c.moveTo(100, 100);
// c.lineTo(400, 400);
// c.strokeStyle = "#f55c47";
// c.stroke();

// // Arc / Circle
// c.beginPath();
// c.arc(400,300, 100, 0, Math.PI * 2, false)
// c.strokeStyle = "#c6ffc1";
// c.stroke();

// // for loop
// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * innerWidth;
//   var y = Math.random() * innerHeight;
//   c.beginPath();
//   c.arc(x, y, 50, 0, Math.PI * 2, false)
//   c.strokeStyle = "#7b6079";
//   c.stroke();
//
// }

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

var colorArray = ['#f9b208', '#f5abc9', '#b6c9f0', '#faf3f3', '#a5e1ad'];
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor((Math.random() * colorArray.length))];


  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x  < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius)
      this.radius += 1;
    }
    else if (this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }

}

var circleArray = [];

for (var i = 0; i < 1000; i++) {
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height);
  var dx = (Math.random() - 0.5) * 4;
  var dy = (Math.random() - 0.5) * 4;
  var radius = (Math.floor(Math.random() * 4) + 1);

  circleArray.push(new Circle(x, y, dx, dy, radius));
}








// var x = 200;
// var y = 200;
// var dx = 30;
// var dy = 30;
// var radius = 50;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  // c.beginPath();
  // c.arc(x,y, radius, 0, Math.PI * 2, false)
  // c.strokeStyle = "#7b6079";
  // c.stroke();
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }


  // if (x + radius > innerWidth || x - radius < 0) {
  //   dx = -dx;
  // }
  //
  // if (y + radius > innerHeight || y - radius < 0) {
  //   dy = -dy;
  // }
  //
  // x += dx;
  // y += dy;
}

animate();
