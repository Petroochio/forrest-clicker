const elem = document.getElementById('renderer');
const ctx = elem.getContext('2d');

ctx.fillStyle = '#000';
ctx.lineWidth = 1.5;
let clicks = 1;
let branches = 1;
const end = 7;

const degToRad = Math.PI / 180.0;

function drawLine(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

function drawBranch(x1, y1, angle, d, length) {
  if (d !== 0) {
    const l = d !== 1 ? 10.0 : length;
    const ugh = clicks / 10 - (branches - d);
    const x2 = x1 + (Math.cos(angle * degToRad) * ugh * l * 1.5);
    const y2 = y1 + (Math.sin(angle * degToRad) * ugh * l * 1.5);
    drawLine(x1, y1, x2, y2);
    drawBranch(x2, y2, angle - 40, d - 1, length);
    drawBranch(x2, y2, angle + 20, d - 1, length);
    drawBranch(x2, y2, angle - 10, d - 1, length);
  }
}

const drawTree = (depth, length) => {
  ctx.clearRect(0, 0, elem.width, elem.height);
  ctx.beginPath();
  drawBranch(300, 500, -90, depth, length);
  ctx.closePath();
  ctx.stroke();
};

elem.addEventListener('click', () => {
  clicks++;
  if (clicks % 10 === 0) branches++;
  if (!(branches >= end)) {
    drawTree(branches, clicks % 10);
  }
});
