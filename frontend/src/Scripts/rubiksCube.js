// ══════════════════════════════════════════════════
//  ADVANCED CURSOR WITH TRAILS
// ══════════════════════════════════════════════════
const cur = document.getElementById("cur");
const curDot = document.getElementById("cur-dot");
const curAura = document.getElementById("cur-aura");
const curRing = document.getElementById("cur-ring");
const rubiksCube3DContainer = document.getElementById("rubiksCube3DContainer");

let mx = 0,
  my = 0,
  cx = 0,
  cy = 0,
  trailCounter = 0;

// Cursor trail particles
const trailParticles = [];
const maxTrails = 8;

class CursorTrail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 4 + 2;
    this.opacity = 1;
    this.life = 40;
    this.maxLife = 40;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;

    this.el = document.createElement("div");
    this.el.className = "cursor-trail";
    this.el.style.width = this.radius * 2 + "px";
    this.el.style.height = this.radius * 2 + "px";
    this.el.style.background = `radial-gradient(circle at 35% 35%, rgba(255, 213, 0, 0.8), rgba(255, 88, 0, 0.4))`;
    this.el.style.boxShadow = "0 0 6px rgba(255, 213, 0, 0.6)";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    rubiksCube3DContainer.appendChild(this.el);
  }

  update() {
    this.life--;
    this.opacity = this.life / this.maxLife;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity

    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    this.el.style.opacity = this.opacity;

    if (this.life <= 0) {
      this.el.remove();
      return false;
    }
    return true;
  }
}

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;

  // Create trail particles every few pixels
  trailCounter++;
  if (trailCounter >= 3) {
    trailParticles.push(new CursorTrail(mx, my));
    if (trailParticles.length > maxTrails) {
      const removed = trailParticles.shift();
      removed.el.remove();
    }
    trailCounter = 0;
  }
});

// Smooth cursor movement with easing
(function moveCursor() {
  // Smooth follow with easing
  cx += (mx - cx) * 0.16;
  cy += (my - cy) * 0.16;

  // Update main cursor and layers
  cur.style.left = cx + "px";
  cur.style.top = cy + "px";

  curAura.style.left = cx + "px";
  curAura.style.top = cy + "px";

  curRing.style.left = cx + "px";
  curRing.style.top = cy + "px";

  // Center dot follows mouse exactly
  curDot.style.left = mx + "px";
  curDot.style.top = my + "px";

  // Update trail particles
  trailParticles.forEach((trail, index) => {
    if (!trail.update()) {
      trailParticles.splice(index, 1);
    }
  });

  requestAnimationFrame(moveCursor);
})();

// ══════════════════════════════════════════════════
//  SCROLL PROGRESS
// ══════════════════════════════════════════════════
const prog = document.getElementById("progress");
window.addEventListener(
  "scroll",
  () => {
    prog.style.width =
      (window.scrollY / (document.documentElement.scrollHeight - innerHeight)) *
        100 +
      "%";
  },
  { passive: true },
);

// ══════════════════════════════════════════════════
//  PARTICLES
// ══════════════════════════════════════════════════
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
const PCOLS = ["#FF5800", "#0051A2", "#FFD500", "#009B48", "#C41E3A"];
function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.init(true);
  }
  init(rand) {
    this.x = Math.random() * canvas.width;
    this.y = rand ? Math.random() * canvas.height : canvas.height + 10;
    this.sz = Math.random() * 7 + 2;
    this.col = PCOLS[Math.floor(Math.random() * PCOLS.length)];
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(Math.random() * 0.45 + 0.1);
    this.rot = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.045;
    this.a = Math.random() * 0.12 + 0.02; // Reduced opacity for atmospheric feel
  }
  tick() {
    this.x += this.vx;
    this.y += this.vy;
    this.rot += this.spin;
    if (this.y < -12 || this.x < -12 || this.x > canvas.width + 12)
      this.init(false);
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.globalAlpha = this.a;
    ctx.fillStyle = this.col;
    ctx.fillRect(-this.sz / 2, -this.sz / 2, this.sz, this.sz);
    ctx.restore();
  }
}

// ══════════════════════════════════════════════════
//  WATER BUBBLES
// ══════════════════════════════════════════════════
class WaterBubble {
  constructor() {
    this.init(true);
  }
  init(rand) {
    this.x = Math.random() * canvas.width;
    this.y = rand ? Math.random() * canvas.height : canvas.height + 20;
    this.radius = Math.random() * 15 + 8;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.3 + 0.15);
    this.wobblePhase = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    this.innerAlpha = Math.random() * 0.3 + 0.2;
    this.outerAlpha = Math.random() * 0.15 + 0.08;
  }
  tick() {
    this.x += this.vx;
    this.y += this.vy;
    this.wobblePhase += this.wobbleSpeed;

    // Slight wobble movement
    this.vx += Math.sin(this.wobblePhase) * 0.002;

    // Gradually shrink as it rises
    this.radius *= 0.998;
    this.innerAlpha *= 0.998;
    this.outerAlpha *= 0.995;

    if (
      this.y < -30 ||
      this.x < -30 ||
      this.x > canvas.width + 30 ||
      this.radius < 2
    )
      this.init(false);
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Outer bubble glow
    ctx.globalAlpha = this.outerAlpha * 0.5;
    ctx.strokeStyle = "#00D9FF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 3, 0, Math.PI * 2);
    ctx.stroke();

    // Main bubble outline
    ctx.globalAlpha = this.outerAlpha;
    ctx.strokeStyle = "#00D9FF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Internal reflection/shine
    ctx.globalAlpha = this.innerAlpha * 0.7;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(
      -this.radius * 0.3,
      -this.radius * 0.3,
      this.radius * 0.2,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Subtle inner glow
    ctx.globalAlpha = this.innerAlpha * 0.3;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
    gradient.addColorStop(0, "rgba(0, 217, 255, 0.4)");
    gradient.addColorStop(1, "rgba(0, 217, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

const parts = Array.from({ length: 72 }, () => new Particle());
const bubbles = Array.from({ length: 28 }, () => new WaterBubble());

(function tickP() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bubbles first (background layer)
  bubbles.forEach((b) => {
    b.tick();
    b.draw();
  });

  // Draw particles on top
  parts.forEach((p) => {
    p.tick();
    p.draw();
  });

  requestAnimationFrame(tickP);
})();

// ══════════════════════════════════════════════════
//  3D RUBIK'S CUBE — FULL 27-CUBIE SYSTEM
// ══════════════════════════════════════════════════
const CUBIE_PX = 66;
const GAP_PX = 0;
const HALF_PX = 33;
const STEP_PX = 66;

const FC = {
  front: { bg: "#009B48", cls: "fc-green" },
  back: { bg: "#0051A2", cls: "fc-blue" },
  right: { bg: "#C41E3A", cls: "fc-red" },
  left: { bg: "#FF5800", cls: "fc-orange" },
  top: { bg: "#FFFFFF", cls: "fc-white" },
  bottom: { bg: "#FFD500", cls: "fc-yellow" },
  inner: { bg: "#1a1a1a", cls: "fc-inner" },
};

const FACE_DEFS = [
  { key: "front", t: `translateZ(${HALF_PX}px)` },
  { key: "back", t: `rotateY(180deg) translateZ(${HALF_PX}px)` },
  { key: "right", t: `rotateY(90deg) translateZ(${HALF_PX}px)` },
  { key: "left", t: `rotateY(-90deg) translateZ(${HALF_PX}px)` },
  { key: "top", t: `rotateX(90deg) translateZ(${HALF_PX}px)` },
  { key: "bottom", t: `rotateX(-90deg) translateZ(${HALF_PX}px)` },
];

const cubeScene = document.getElementById("cubeScene");
const cubies = [];

function makeCubie(lx, ly, lz) {
  const el = document.createElement("div");
  el.className = "cubie";
  FACE_DEFS.forEach((fd) => {
    let fc = FC.inner;
    if (fd.key === "front" && lz === 1) fc = FC.front;
    if (fd.key === "back" && lz === -1) fc = FC.back;
    if (fd.key === "right" && lx === 1) fc = FC.right;
    if (fd.key === "left" && lx === -1) fc = FC.left;
    if (fd.key === "top" && ly === 1) fc = FC.top;
    if (fd.key === "bottom" && ly === -1) fc = FC.bottom;

    const face = document.createElement("div");
    face.className = "cubie-face " + fc.cls;
    face.style.transform = fd.t + (fc === FC.inner ? " scale(0.98)" : "");
    if (fc !== FC.inner) {
      face.style.backgroundColor = fc.bg;
      face.innerHTML = '<div class="gloss"></div><div class="shine"></div>';
    } else {
      face.style.backgroundColor = "#111";
    }
    el.appendChild(face);
  });
  const m = new DOMMatrix().translate(
    lx * STEP_PX,
    -ly * STEP_PX,
    lz * STEP_PX,
  );
  el.style.transform = m.toString();
  return { el, m };
}

function buildCube() {
  cubeScene.innerHTML = "";
  cubies.length = 0;
  for (let y = 1; y >= -1; y--) {
    for (let x = -1; x <= 1; x++) {
      for (let z = 1; z >= -1; z--) {
        const c = makeCubie(x, y, z);
        cubeScene.appendChild(c.el);
        cubies.push(c);
      }
    }
  }
}

function snap(m) {
  // Round translation components to nearest STEP_PX
  m.m41 = Math.round(m.m41 / STEP_PX) * STEP_PX;
  m.m42 = Math.round(m.m42 / STEP_PX) * STEP_PX;
  m.m43 = Math.round(m.m43 / STEP_PX) * STEP_PX;

  // Round rotation components (top-left 3x3) to nearest integer (-1, 0, or 1)
  // This ensures orthogonality and prevents skewing/distortion
  ["m11", "m12", "m13", "m21", "m22", "m23", "m31", "m32", "m33"].forEach(
    (f) => {
      if (Math.abs(m[f]) < 0.1) m[f] = 0;
      else m[f] = Math.sign(m[f]);
    },
  );
}

function rotateLayer(axis, slice, angle, ms) {
  return new Promise((resolve) => {
    // Select cubies based on their current world-space snap-points
    const layer = cubies.filter((c) => {
      const x = Math.round(c.m.m41 / STEP_PX);
      const y = Math.round(-c.m.m42 / STEP_PX);
      const z = Math.round(c.m.m43 / STEP_PX);
      const val = axis === "x" ? x : axis === "y" ? y : z;
      return val === slice;
    });

    if (layer.length === 0) {
      resolve();
      return;
    }

    // Create a temporary pivot at scene origin
    const pivot = document.createElement("div");
    pivot.style.cssText =
      "position:absolute;width:0;height:0;transform-style:preserve-3d;";
    cubeScene.appendChild(pivot);
    layer.forEach((c) => pivot.appendChild(c.el));

    pivot.getBoundingClientRect(); // force layout

    // Animation setup
    if (ms > 0) {
      pivot.style.transition = `transform ${ms}ms cubic-bezier(0.34, 1.25, 0.64, 1)`;
    }
    pivot.style.transform =
      axis === "y"
        ? `rotateY(${angle}deg)`
        : axis === "x"
          ? `rotateX(${angle}deg)`
          : `rotateZ(${angle}deg)`;

    setTimeout(() => {
      const rotStr =
        axis === "y"
          ? `rotateY(${angle}deg)`
          : axis === "x"
            ? `rotateX(${angle}deg)`
            : `rotateZ(${angle}deg)`;
      const rotM = new DOMMatrix(rotStr);

      layer.forEach((c) => {
        // Math: New World Matrix = Rotation * Old World Matrix
        c.m = rotM.multiply(c.m);

        // CRITICAL: Snap the matrix to clean integers to prevent drift/skew
        snap(c.m);

        // Re-parent back to the main scene
        cubeScene.appendChild(c.el);

        // Set the new transformation instantly
        c.el.style.transition = "none";
        c.el.style.transform = c.m.toString();
        void c.el.offsetHeight; // force reflow
      });

      pivot.remove();
      resolve();
    }, ms + 40); // extra padding to ensure animation is 100% done
  });
}

// ── Move definitions ─────────────────────────────
const MOVES = [
  { axis: "y", slice: 1, angle: 90 },
  { axis: "y", slice: 1, angle: -90 },
  { axis: "y", slice: 0, angle: 90 },
  { axis: "y", slice: 0, angle: -90 },
  { axis: "y", slice: -1, angle: 90 },
  { axis: "y", slice: -1, angle: -90 },
  { axis: "x", slice: 1, angle: 90 },
  { axis: "x", slice: 1, angle: -90 },
  { axis: "x", slice: 0, angle: 90 },
  { axis: "x", slice: 0, angle: -90 },
  { axis: "x", slice: -1, angle: 90 },
  { axis: "x", slice: -1, angle: -90 },
  { axis: "z", slice: 1, angle: 90 },
  { axis: "z", slice: 1, angle: -90 },
  { axis: "z", slice: -1, angle: 90 },
  { axis: "z", slice: -1, angle: -90 },
];

let history = [];
let busy = false;
let manualMode = false;
let manualTimer;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function setStatus(txt) {
  const el = document.getElementById("cubeStatus");
  if (el) el.textContent = txt;
}

function setBtnsDisabled(v) {
  const b1 = document.getElementById("btnScramble");
  const b2 = document.getElementById("btnSolve");
  if (b1) b1.disabled = v;
  if (b2) b2.disabled = v;
}

// ── Scramble ─────────────────────────────────────
async function scramble(n = 14, ms = 185) {
  if (busy) return;
  busy = true;
  setBtnsDisabled(true);
  setStatus("Scrambling...");
  history = [];

  for (let i = 0; i < n; i++) {
    let m;
    do {
      m = MOVES[Math.floor(Math.random() * MOVES.length)];
    } while (
      history.length &&
      history[history.length - 1].axis === m.axis &&
      history[history.length - 1].slice === m.slice
    );
    history.push(m);
    await rotateLayer(m.axis, m.slice, m.angle, ms);
    await sleep(18);
  }
  busy = false;
  setBtnsDisabled(false);
  setStatus("Scrambled — ready to solve");
}

// ── Solve (reverse the history) ──────────────────
async function solve(ms = 340) {
  if (busy || !history.length) return;
  busy = true;
  setBtnsDisabled(true);
  setStatus("Solving...");

  const moves = [...history].reverse().map((m) => ({ ...m, angle: -m.angle }));
  for (const m of moves) {
    await rotateLayer(m.axis, m.slice, m.angle, ms);
    await sleep(28);
  }
  history = [];
  busy = false;
  setBtnsDisabled(false);
  setStatus("Solved! ✓");
}

async function startScrambleSolve(n = 10, ms = 360) {
  const cubeWrapper = document.getElementById("cubeWrapper");
  if (!cubeWrapper) return;

  cubeWrapper.style.opacity = 0;
  await scramble(n, 0);
  cubeWrapper.style.opacity = 1;
  await sleep(400);
  await solve(ms);
}

// Build and start
buildCube();
startScrambleSolve(10, 380);

// Buttons
document.getElementById("btnScramble").addEventListener("click", () => {
  if (history.length > 0) return; // Only scramble if currently solved or at start
  manualMode = true;
  clearTimeout(manualTimer);
  manualTimer = setTimeout(() => {
    manualMode = false;
  }, 15000);
  scramble(14, 200);
});
document.getElementById("btnSolve").addEventListener("click", () => {
  manualMode = true;
  clearTimeout(manualTimer);
  manualTimer = setTimeout(() => {
    manualMode = false;
  }, 15000);
  solve(380);
});

// ══════════════════════════════════════════════════
//  WHOLE-CUBE DRAG WITH INERTIA
// ══════════════════════════════════════════════════
let rotX = -22,
  rotY = 45;
let velX = 0,
  velY = 0;
let dragging = false,
  lx2 = 0,
  ly2 = 0;
let lastDx = 0,
  lastDy = 0;

function applyRot() {
  cubeScene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

(function animRot() {
  if (!dragging) {
    // Inertia decay
    velY *= 0.92;
    velX *= 0.92;
    // Drift toward gentle auto-rotate when not in manual mode
    if (!manualMode && !busy) {
      velY += (0.25 - velY) * 0.025;
      velX += (0 - velX) * 0.025;
    }
    rotY += velY;
    rotX += velX;
    // Clamp pitch
    rotX = Math.max(-65, Math.min(65, rotX));
  }
  applyRot();
  requestAnimationFrame(animRot);
})();

// Mouse drag
const cubeVP = document.querySelector(".cube-viewport");
cubeVP.addEventListener("mousedown", (e) => {
  dragging = true;
  lx2 = e.clientX;
  ly2 = e.clientY;
  velX = 0;
  velY = 0;
  lastDx = 0;
  lastDy = 0;
  manualMode = true;
  clearTimeout(manualTimer);
  e.preventDefault();
});
document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  lastDx = (e.clientX - lx2) * 0.45;
  lastDy = (e.clientY - ly2) * 0.45;
  rotY += lastDx;
  rotX -= lastDy;
  rotX = Math.max(-65, Math.min(65, rotX));
  lx2 = e.clientX;
  ly2 = e.clientY;
});
document.addEventListener("mouseup", () => {
  if (!dragging) return;
  dragging = false;
  // Pass final delta as launch velocity for inertia
  velY = lastDx * 0.85;
  velX = -lastDy * 0.85;
  manualTimer = setTimeout(() => {
    manualMode = false;
  }, 8000);
});

// Touch drag
cubeVP.addEventListener(
  "touchstart",
  (e) => {
    dragging = true;
    lx2 = e.touches[0].clientX;
    ly2 = e.touches[0].clientY;
    velX = 0;
    velY = 0;
    lastDx = 0;
    lastDy = 0;
    manualMode = true;
    clearTimeout(manualTimer);
  },
  { passive: true },
);
document.addEventListener(
  "touchmove",
  (e) => {
    if (!dragging) return;
    lastDx = (e.touches[0].clientX - lx2) * 0.45;
    lastDy = (e.touches[0].clientY - ly2) * 0.45;
    rotY += lastDx;
    rotX -= lastDy;
    rotX = Math.max(-65, Math.min(65, rotX));
    lx2 = e.touches[0].clientX;
    ly2 = e.touches[0].clientY;
  },
  { passive: true },
);
document.addEventListener("touchend", () => {
  dragging = false;
  velY = lastDx * 0.85;
  velX = -lastDy * 0.85;
  manualTimer = setTimeout(() => {
    manualMode = false;
  }, 8000);
});
