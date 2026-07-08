/* FarView — hero mouse-parallax (page-scoped; reveal is handled by include.js) */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.fv-hero');
  if (!hero || reduce) return;

  var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
  function loop() {
    cx += (tx - cx) * 0.035;           // slow, wind-like follow
    cy += (ty - cy) * 0.035;
    hero.style.setProperty('--mx', cx.toFixed(4));
    hero.style.setProperty('--my', cy.toFixed(4));
    if (Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005) {
      raf = requestAnimationFrame(loop);
    } else { raf = null; }
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  hero.addEventListener('mousemove', function (ev) {
    var r = hero.getBoundingClientRect();
    tx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((ev.clientY - r.top) / r.height - 0.5) * 2;
    kick();
  });
  hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
})();
