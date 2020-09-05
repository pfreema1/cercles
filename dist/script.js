let c,
ctx,
fps = 60;
let mouse = {
  x: null,
  y: null };


window.requestAnimFrame = function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / fps);
    });

}();

window.onload = () => {
  c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  ctx = c.getContext("2d");

  animationLoop();
};

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX / c.width * 2 - 1;
  mouse.y = -(e.clientY / c.height) * 2 + 1;

});

const parabola = function (x, k) {
  return Math.pow(4 * x * (1 - x), k);
};

const map = (from1, to1, from2, to2, v) => {
  return from2 + (v - from1) * (to2 - from2) / (to1 - from1);
};

const animationLoop = time => {
  requestAnimFrame(animationLoop);

  time *= 0.001;

  render(time);
};
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const maxRadius = window.innerWidth * 0.25;
const angleStep = 2 * Math.PI / 200;
const numCircles = 60;
const margin = 0.025;
var noise = new Noise(Math.random());

const render = time => {
  ctx.fillStyle = "#F4F4F4";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.save();

  ctx.translate(c.width * 0.5, c.height * 0.5);

  for (let i = 0; i < numCircles; i++) {
    const radius = i * margin * maxRadius;
    drawCircle(radius, time, i);
  }

  ctx.restore();
};

function drawCircle(radius, time, index) {
  ctx.beginPath();
  const start = {
    x: radius * Math.cos(0),
    y: radius * Math.sin(0) };


  for (let a = 0; a < Math.PI * 2; a += angleStep) {
    const point = returnPoint(a, radius, time, index);

    ctx.lineTo(point.x, point.y);
  }

  ctx.strokeStyle = "#040404";
  ctx.stroke();
}

function returnPoint(a, radius, time, index) {
  const point = {
    x: null,
    y: null };


  const sample = {
    x: map(-1, 1, 0.000, 0.004, mouse.x) * radius * Math.cos(a - time * 0.2),
    y: map(-1, 1, 0.000, 0.004, mouse.y) * radius * Math.sin(a - time * 0.2) };


  const noiseVal = noise.perlin3(sample.x, sample.y, time * 0.5);

  const r = radius + radius * noiseVal;

  point.x = r * Math.cos(a);
  point.y = r * Math.sin(a);

  return point;
}