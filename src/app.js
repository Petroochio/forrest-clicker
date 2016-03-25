const elem = document.getElementById('renderer');
const context = elem.getContext('2d');

context.fillStyle = '#000';
context.lineWidth = 1;

const degToRad = Math.PI / 180.0;
const depth = 9;

function drawLine(x1, y1, x2, y2) {
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
}

function drawTree(x1, y1, angle, d) {
  if (d !== 0) {
    const x2 = x1 + (Math.cos(angle * degToRad) * d * 10.0) + 5;
    const y2 = y1 + (Math.sin(angle * degToRad) * d * 10.0) + 5;
    drawLine(x1, y1, x2, y2, d);
    drawTree(x2, y2, angle - 40, d - 1);
    drawTree(x2, y2, angle + 20, d - 1);
    drawTree(x2, y2, angle - 10, d - 1);
  }
}

context.beginPath();
drawTree(300, 500, -90, depth);
context.closePath();
context.stroke();
