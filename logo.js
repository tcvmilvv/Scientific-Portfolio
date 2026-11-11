/* Logo hover animation.
   Mouse enters : 01 > 02 > 03 > 02 > 01
   Mouse leaves : 01 > 04 > 05 > 04 > 01
   Frames are pre-computed morphs (data/logo-frames.js); this file only plays them. */
(function () {
  "use strict";
  var F = window.LOGO_FRAMES;
  var box = document.querySelector(".marca");
  var shape = document.getElementById("marca-forma");
  if (!F || !box || !shape) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SEG = 380, HOLD = 140;                       // ms per morph / pause at the extremes
  var K = F.A.length - 1;
  var ease = function (t) { return 0.5 - 0.5 * Math.cos(Math.PI * t); };

  // [transition, direction] ; null = hold
  var ENTER = [["A", 1], ["B", 1], null, ["B", -1], ["A", -1]];
  var LEAVE = [["C", 1], ["D", 1], null, ["D", -1], ["C", -1]];

  var steps = [], stepStart = 0, running = false, pending = [];

  function draw(tr, t) {
    var i = Math.round(ease(t) * K);
    shape.setAttribute("d", F[tr][i]);
  }
  function tick(now) {
    if (!stepStart) stepStart = now;
    var s = steps[0], el = now - stepStart;
    if (!s) {
      if (el >= HOLD) { next(); return; }
    } else if (el >= SEG) {
      draw(s[0], s[1] > 0 ? 1 : 0); next(); return;
    } else {
      var t = el / SEG; draw(s[0], s[1] > 0 ? t : 1 - t);
    }
    requestAnimationFrame(tick);
  }
  function next() {
    steps.shift(); stepStart = 0;
    if (!steps.length) {
      running = false;
      if (pending.length) play(pending.shift());
      return;
    }
    requestAnimationFrame(tick);
  }
  function play(seq) {
    if (running) {                                   // never cut an animation mid-way
      if (pending[pending.length - 1] !== seq) pending.push(seq);
      pending = pending.slice(-2);
      return;
    }
    running = true; steps = seq.slice(); stepStart = 0;
    requestAnimationFrame(tick);
  }

  box.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" || e.pointerType === "pen") play(ENTER); });
  box.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse" || e.pointerType === "pen") play(LEAVE); });
  box.addEventListener("pointerdown", function (e) {            // touch: one tap plays both
    if (e.pointerType === "touch") { play(ENTER); play(LEAVE); }
  });
})();
