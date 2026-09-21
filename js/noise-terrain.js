/* ──────────────────────────────────────────────────────────────
   Noise Terrain - topographic contour canvas background.
   Vanilla adaptation of the "Noise Terrain" hero spec.

   Usage: place a <canvas class="mag-field" aria-hidden="true"></canvas>
   as the first child of any positioned container with class "mag-host".
   The container's real content paints above (cards use z-index:1).

   Spec behaviour:
   - value noise + FBM (4 octaves, lacunarity 2, persistence 0.5)
   - sampled on a grid, contoured via marching squares (20 levels)
   - per-level opacity 0.03 (low) -> 0.11 (high), 1px stroke
   - cursor shifts the noise X/Y offset; terrain follows the pointer
   - idle: terrain drifts with time only
   - container-scoped pointer listeners (never window/document)
   - pointerleave decays the cursor offset back to centre
   - ResizeObserver sizing, HiDPI aware
   - prefers-reduced-motion: one static frame, no loop
─────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var LEVELS = 20;
  var OP_LOW = 0.03;
  var OP_HIGH = 0.11;
  var NOISE_SCALE = 0.0055;   // noise units per CSS pixel
  var TIME_SPEED = 0.0006;    // slow drift
  var CURSOR_RANGE = 1.6;     // noise units the cursor can shift the field
  var IDLE_MS = 3000;

  // Motion disabled: render a single static contour frame, no time drift,
  // no cursor-follow, no animation loop. (Texture stays, movement removed.)
  var reduceMotion = true;

  // ── Value noise + FBM ──────────────────────────────────────
  function hash(x, y) {
    var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function valueNoise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var tl = hash(xi, yi),     tr = hash(xi + 1, yi);
    var bl = hash(xi, yi + 1), br = hash(xi + 1, yi + 1);
    var u = smooth(xf), v = smooth(yf);
    var top = tl + (tr - tl) * u;
    var bot = bl + (br - bl) * u;
    return top + (bot - top) * v;
  }
  function fbm(x, y) {
    var amp = 1, freq = 1, sum = 0, norm = 0;
    for (var o = 0; o < 4; o++) {       // 4 octaves
      sum += valueNoise(x * freq, y * freq) * amp;
      norm += amp;
      amp *= 0.5;                       // persistence 0.5
      freq *= 2;                        // lacunarity 2
    }
    return sum / norm;                  // 0..1
  }

  function initHost(host) {
    var canvas = host.querySelector('.mag-field');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, dpr = 1, step = 6;
    var cols = 0, rows = 0;
    var field = null;                   // Float32Array of grid values
    var cur = { x: 0.5, y: 0.5, active: false };  // normalized cursor (0..1)
    var off = { x: 0, y: 0 };           // smoothed noise offset
    var lastMove = -Infinity;
    var raf = 0;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = W < 640 ? 11 : 6;          // ~50% fewer cells on mobile
      cols = Math.ceil(W / step) + 1;
      rows = Math.ceil(H / step) + 1;
      field = new Float32Array(cols * rows);
      if (reduceMotion) { sampleField(0); drawContours(); }
    }

    function sampleField(time) {
      var ox = off.x + time * TIME_SPEED;
      var oy = off.y + time * TIME_SPEED * 0.7;
      for (var gy = 0; gy < rows; gy++) {
        var ny = gy * step * NOISE_SCALE + oy;
        var rowBase = gy * cols;
        for (var gx = 0; gx < cols; gx++) {
          var nx = gx * step * NOISE_SCALE + ox;
          field[rowBase + gx] = fbm(nx, ny);
        }
      }
    }

    // marching squares interpolation on a cell edge
    function ix(level, x1, v1, x2, v2) {
      var t = (level - v1) / (v2 - v1);
      return x1 + (x2 - x1) * t;
    }

    function drawContours() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (var l = 0; l < LEVELS; l++) {
        var level = (l + 0.5) / LEVELS;
        var op = OP_LOW + (OP_HIGH - OP_LOW) * (l / (LEVELS - 1));
        ctx.strokeStyle = 'rgba(255,255,255,' + op.toFixed(3) + ')';
        ctx.beginPath();
        for (var gy = 0; gy < rows - 1; gy++) {
          for (var gx = 0; gx < cols - 1; gx++) {
            var x = gx * step, y = gy * step, s = step;
            var va = field[gy * cols + gx];           // top-left
            var vb = field[gy * cols + gx + 1];       // top-right
            var vc = field[(gy + 1) * cols + gx + 1]; // bottom-right
            var vd = field[(gy + 1) * cols + gx];     // bottom-left
            var idx = (va > level ? 8 : 0) | (vb > level ? 4 : 0) |
                      (vc > level ? 2 : 0) | (vd > level ? 1 : 0);
            if (idx === 0 || idx === 15) continue;

            // edge crossing points (only computed lazily per case below)
            var tx, ty, rx, ry, bx, by, lx, ly;
            // top edge: a(x,y)->b(x+s,y)
            tx = ix(level, x, va, x + s, vb); ty = y;
            // right edge: b(x+s,y)->c(x+s,y+s)
            rx = x + s; ry = ix(level, y, vb, y + s, vc);
            // bottom edge: d(x,y+s)->c(x+s,y+s)
            bx = ix(level, x, vd, x + s, vc); by = y + s;
            // left edge: a(x,y)->d(x,y+s)
            lx = x; ly = ix(level, y, va, y + s, vd);

            switch (idx) {
              case 1:  seg(lx, ly, bx, by); break;
              case 2:  seg(bx, by, rx, ry); break;
              case 3:  seg(lx, ly, rx, ry); break;
              case 4:  seg(tx, ty, rx, ry); break;
              case 5:  seg(tx, ty, lx, ly); seg(bx, by, rx, ry); break;
              case 6:  seg(tx, ty, bx, by); break;
              case 7:  seg(tx, ty, lx, ly); break;
              case 8:  seg(tx, ty, lx, ly); break;
              case 9:  seg(tx, ty, bx, by); break;
              case 10: seg(lx, ly, bx, by); seg(tx, ty, rx, ry); break;
              case 11: seg(tx, ty, rx, ry); break;
              case 12: seg(lx, ly, rx, ry); break;
              case 13: seg(bx, by, rx, ry); break;
              case 14: seg(lx, ly, bx, by); break;
            }
          }
        }
        ctx.stroke();
      }
    }

    function seg(x1, y1, x2, y2) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!field) return;

      var idle = (now - lastMove) > IDLE_MS;
      // target noise offset from cursor (centred when idle/inactive)
      var tx = cur.active && !idle ? (cur.x - 0.5) * 2 * CURSOR_RANGE : 0;
      var ty = cur.active && !idle ? (cur.y - 0.5) * 2 * CURSOR_RANGE : 0;
      off.x += (tx - off.x) * 0.06;
      off.y += (ty - off.y) * 0.06;

      sampleField(now);
      drawContours();
    }

    // ── container-scoped pointer handling ──
    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      cur.x = (e.clientX - rect.left) / rect.width;
      cur.y = (e.clientY - rect.top) / rect.height;
      cur.active = true;
      lastMove = performance.now();
    }
    function onLeave() { cur.active = false; }

    if (!reduceMotion) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    var ro = new ResizeObserver(function () { resize(); });
    ro.observe(canvas);

    resize();
    if (!reduceMotion) raf = requestAnimationFrame(frame);
  }

  function boot() {
    var hosts = document.querySelectorAll('.mag-host');
    for (var i = 0; i < hosts.length; i++) initHost(hosts[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
