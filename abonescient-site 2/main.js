// À bon escient · V2 · apparitions douces, frises, sommaire actif (sans librairie)
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fermer le menu mobile après un clic
  document.querySelectorAll('.burger nav a').forEach(function (a) {
    a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
  });

  // Sommaire : lien actif selon la section visible
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('on'); });
          var a = map[e.target.id]; if (a) a.classList.add('on');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }


  // Boussole : une question à la fois, défilement automatique (pause au survol, au focus ou au clic)
  document.querySelectorAll('.qrot').forEach(function (box) {
    var items = box.querySelectorAll('.qrot-list li');
    var dots = box.querySelectorAll('.qrot-dots button');
    var count = box.querySelector('.qrot-count');
    var pauseBtn = box.querySelector('.qrot-pause');
    var i = 0, timer = null, paused = false, hover = false;
    function show(n) {
      i = (n + items.length) % items.length;
      items.forEach(function (li, k) { li.classList.toggle('on', k === i); li.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      if (count) count.textContent = (i + 1) + ' / ' + items.length;
    }
    function start() { stop(); if (!paused && !hover) timer = setInterval(function () { show(i + 1); }, 4500); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); start(); }); });
    if (pauseBtn) pauseBtn.addEventListener('click', function () {
      paused = !paused; pauseBtn.textContent = paused ? 'Lecture' : 'Pause';
      pauseBtn.setAttribute('aria-label', paused ? 'Reprendre le défilement' : 'Mettre en pause'); paused ? stop() : start();
    });
    box.addEventListener('mouseenter', function () { hover = true; stop(); });
    box.addEventListener('mouseleave', function () { hover = false; start(); });
    box.addEventListener('focusin', function () { hover = true; stop(); });
    box.addEventListener('focusout', function () { hover = false; start(); });
    show(0);
    if (!reduce) start();
  });

  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');

  // Décalage de 80 ms entre éléments d'une même liste
  document.querySelectorAll('[data-stagger]').forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (el, i) {
      el.classList.add('rv');
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  document.querySelectorAll('.rv, .rule, .frise').forEach(function (el) { io.observe(el); });
})();
