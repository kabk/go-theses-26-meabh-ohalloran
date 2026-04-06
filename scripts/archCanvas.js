const canvas = document.getElementById('archCanvas');
const ctx = canvas.getContext('2d');

// Responsive sizing
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Get paragraphs from hidden container
const paragraphs = Array.from(document.querySelectorAll('.bible-text p'));
const allText = paragraphs.map(p => p.innerText).join('\n\n');

// Split into lines
const lines = allText.split('\n');

// Scroll control
let scrollY = 0;
window.addEventListener('wheel', e => {
  scrollY += e.deltaY;
  if (scrollY < 0) scrollY = 0;
  const maxScroll = lines.length * 30; // rough max scroll
  if (scrollY > maxScroll) scrollY = maxScroll;
  draw();
});

// Draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#8b8b8b";
  ctx.font = "18px serif";
  ctx.textAlign = "center";
  
  const centerX = canvas.width / 2;
  const topY = 50;
  const radius = 300; // curvature radius
  let yOffset = -scrollY + topY;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Split line into characters
    const chars = line.split('');
    const angleStep = Math.PI / (chars.length + 2); // control arch curve
    let startAngle = -Math.PI/2;

    for (let j = 0; j < chars.length; j++) {
      const char = chars[j];
      const angle = startAngle + angleStep * j;
      const x = centerX + radius * Math.sin(angle);
      const y = yOffset + radius * (1 - Math.cos(angle));

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle - Math.PI/2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
    yOffset += 30; // line spacing
  }
}

// Initial draw
draw();