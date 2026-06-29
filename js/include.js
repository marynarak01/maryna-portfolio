(function () {
  'use strict';

  var page = location.pathname.split('/').pop() || 'index.html';
  var isProject = /^project-/.test(page);

  if (isProject) document.body.classList.add('is-project');

  function loadPartial(url, callback) {
    var placeholder = document.querySelector('[data-include="' + url + '"]');
    if (!placeholder) return;
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Could not load ' + url);
        return r.text();
      })
      .then(function (html) {
        placeholder.innerHTML = html;
        if (callback) callback(placeholder);
      })
      .catch(function (e) { console.warn(e); });
  }

  loadPartial('partials/header.html', function (container) {
    container.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
    var btn  = container.querySelector('.menu-btn');
    var menu = container.querySelector('#mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        menu.classList.toggle('open');
      });
    }
  });

  loadPartial('partials/footer.html');

  /* ----------------------------------------------------------
     Scroll reveal
     Elements opt in with [data-reveal]. A container can stagger
     its direct children with [data-reveal-group].
     Visible-by-default: we only hide an element right before we
     observe it, so if JS fails nothing stays invisible.
     ---------------------------------------------------------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;

    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No IntersectionObserver (or reduced motion): show everything, no animation.
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Arm: set the hidden start state now that we know JS is running.
    els.forEach(function (el) {
      el.classList.add('reveal-on');
      if (el.hasAttribute('data-reveal-group')) {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.setProperty('--i', i);
        });
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);   // play once
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
