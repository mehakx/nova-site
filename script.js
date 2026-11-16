// ---------- 1. GET THE CANVAS ----------
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// ---------- 2. SETTINGS ----------
const STAR_COUNT = 650;
const COLORS = ["#ffffff", "#ffffff", "#f3d48a", "#bfe3ff", "#9b7bff"];

let width, height;
let stars = [];

// ---------- 3. SIZE THE CANVAS TO THE SCREEN ----------
function resize() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ---------- 4. CREATE ONE STAR ----------
function makeStar() {
  return {
    x: (Math.random() * 2 - 1) * width,
    y: (Math.random() * 2 - 1) * height,
    z: Math.random() * width,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  };
}

// ---------- 5. CREATE ALL THE STARS ----------
function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(makeStar());
  }
}

// ---------- 6. DRAW THEM ----------
function drawStars() {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;

  for (const star of stars) {
    const sx = (star.x / star.z) * (width / 2) + cx;
    const sy = (star.y / star.z) * (height / 2) + cy;

    const closeness = 1 - star.z / width;

    ctx.globalAlpha = Math.min(1, closeness * 1.4);
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(sx, sy, Math.max(0.3, closeness * 2), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

// ---------- 7. REDRAW IF THE WINDOW CHANGES SIZE ----------
window.addEventListener("resize", () => {
  resize();
  createStars();
  drawStars();
});

// ---------- 8. START ----------
resize();
createStars();
drawStars();