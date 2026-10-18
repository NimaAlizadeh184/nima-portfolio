/* Nima Alizadeh: portfolio scripts */
(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var bar = document.getElementById('scroll-progress');

  /* Nav border, active link, progress bar */
  function onScroll() {
    var y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 8);

    var current = '';
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    if (bar) {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (y / total) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navLinks');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* Hero diffraction pattern: draw once on load */
  var xrd = document.querySelector('.xrd');
  if (xrd) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { xrd.classList.add('drawn'); });
    });
  }

  /* Publication tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.pub-tab'));
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
        document.getElementById('tab-' + t.dataset.tab).hidden = !on;
      });
    });
  });

  /* Contact form opens the visitor's email app */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      if (!name || !email || !message) return;
      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:nimaalizadeh184@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
