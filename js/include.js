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
    /* Active nav link */
    container.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* Mobile menu toggle */
    var btn  = container.querySelector('.menu-btn');
    var menu = container.querySelector('#mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        menu.classList.toggle('open');
      });
    }
  });

  loadPartial('partials/footer.html');
})();
