/* ── Portfolio Slider ── */
(function () {
  var IMG_DIR = 'portfolio_pages/';
  var PFX = 'Portfolio_Zhenfang_An-逐页转图片-';
  var TOTAL = 18;
  var images = [];
  for (var i = 0; i < TOTAL; i++) {
    images.push(IMG_DIR + PFX + String(i + 1).padStart(5, '0') + '.jpg');
  }

  var currentIndex = 0;
  var track = document.getElementById('folio-track');
  var prevBtn = document.getElementById('folio-prev');
  var nextBtn = document.getElementById('folio-next');
  var counter = document.getElementById('folio-counter');
  var isTransitioning = false;

  if (!track) return;

  /* ── Build track ── */
  for (var j = 0; j < TOTAL; j++) {
    var wrap = document.createElement('div');
    wrap.className = 'folio-page-wrap';
    var img = document.createElement('img');
    img.src = images[j];
    img.alt = 'Page ' + (j + 1);
    wrap.appendChild(img);
    track.appendChild(wrap);
  }

  /* ── Update position ── */
  function update() {
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    counter.textContent = (currentIndex + 1) + ' / ' + TOTAL;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= TOTAL - 1;
  }

  /* ── Navigate ── */
  function goTo(index) {
    if (isTransitioning) return;
    if (index < 0 || index >= TOTAL) return;
    if (index === currentIndex) return;
    currentIndex = index;
    update();
    isTransitioning = true;
    setTimeout(function () { isTransitioning = false; }, 600);
  }

  function goNext() { goTo(currentIndex + 1); }
  function goPrev() { goTo(currentIndex - 1); }

  /* ── Buttons ── */
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goNext(); });
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goPrev(); });

  /* ── Keyboard ── */
  document.addEventListener('keydown', function (e) {
    var rect = track.parentElement.getBoundingClientRect();
    if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
  });

  /* ── Touch swipe ── */
  var tx = 0, ty = 0;
  track.addEventListener('touchstart', function (e) {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? goNext() : goPrev();
    }
  });

  /* ── Init ── */
  update();
})();

/* ── Navbar scroll ── */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

/* ── Mobile nav toggle ── */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  document.querySelectorAll('#nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
})();

/* ── Active nav link ── */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('#nav-menu a');
  if (!sections.length || !links.length) return;
  window.addEventListener('scroll', function () {
    var cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) cur = s.getAttribute('id');
    });
    links.forEach(function (l) {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  });
})();

/* ── Fade-in on scroll ── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.edu-item,.focus-item,.exp-item,.project-item,.pub-item,.awards-col,.contact-item').forEach(function (el) {
    el.classList.add('fade-in');
    obs.observe(el);
  });
})();

/* ── Content protection ── */
(function () {
  // Disable right-click on images
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // Disable drag on all images
  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

  // Disable common save shortcuts on images
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
  });
})();
