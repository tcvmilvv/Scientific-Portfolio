/* Contact-me animation: a pulse runs through the chain of circles, right to left,
   and the loop closes seamlessly. It plays by itself (like a GIF) and has no controls. */
(function () {
  "use strict";
  var D = window.CONTATO_FRAMES, svg = document.getElementById("contato-arte");
  var path = document.getElementById("contato-forma");
  if (!D || !svg || !path) return;

  var PERIODO = 5000;                         // ms for one full right-to-left pass
  var F = D.f, N = D.n;
  var bin = atob(D.s), buf = new Uint8Array(bin.length);
  for (var k = 0; k < bin.length; k++) buf[k] = bin.charCodeAt(k);
  var V = new Int16Array(buf.buffer);          // [frame][point][x,y] in 1/10 units
  var pts = new Float32Array(N * 2);

  function frame(i, j) { return V[((i % F + F) % F) * N * 2 + j] / 10; }

  function pose(u) {                           // u in [0,1): Catmull-Rom across frames (cyclic)
    var p = u * F, i = Math.floor(p), t = p - i, t2 = t * t, t3 = t2 * t;
    for (var j = 0; j < N * 2; j++) {
      var a = frame(i - 1, j), b = frame(i, j), c = frame(i + 1, j), d = frame(i + 2, j);
      pts[j] = 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
    }
  }
  function draw() {                            // smooth closed curve through the points
    var s = "", n = N;
    function mx(i, c) { return (pts[(i % n) * 2 + c] + pts[((i + 1) % n) * 2 + c]) / 2; }
    s = "M" + mx(n - 1, 0).toFixed(2) + " " + mx(n - 1, 1).toFixed(2);
    for (var i = 0; i < n; i++) {
      s += "Q" + pts[i * 2].toFixed(2) + " " + pts[i * 2 + 1].toFixed(2) + " " + mx(i, 0).toFixed(2) + " " + mx(i, 1).toFixed(2);
    }
    path.setAttribute("d", s + "Z");
  }

  pose(0); draw();
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var visivel = true, rodando = false;
  function tick(now) {
    if (!visivel) { rodando = false; return; }
    pose((now % PERIODO) / PERIODO); draw();   // phase depends only on the clock: always a perfect loop
    requestAnimationFrame(tick);
  }
  function liga() { if (!rodando) { rodando = true; requestAnimationFrame(tick); } }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { visivel = e[0].isIntersecting; if (visivel) liga(); }).observe(svg);
  } else liga();
  liga();
})();
