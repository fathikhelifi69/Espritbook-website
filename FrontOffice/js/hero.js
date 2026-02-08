// Lightweight hero slider (vanilla JS) — no dependencies
document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('#billboard .main-slider');
  if (!slider) return;
  var slides = Array.from(slider.querySelectorAll('.slider-item'));
  if (!slides.length) return;

  var current = 0;
  function show(index) {
    slides.forEach(function (s, i) {
      s.style.display = i === index ? 'flex' : 'none';
    });
  }

  // create controls
  var prev = document.createElement('button');
  prev.className = 'hero-control hero-prev';
  prev.innerHTML = '&#x2039;';
  var next = document.createElement('button');
  next.className = 'hero-control hero-next';
  next.innerHTML = '&#x203A;';
  slider.appendChild(prev);
  slider.appendChild(next);

  prev.addEventListener('click', function () {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  });
  next.addEventListener('click', function () {
    current = (current + 1) % slides.length;
    show(current);
  });

  // autoplay
  var play = true;
  var interval = setInterval(function () { if (play) { current = (current + 1) % slides.length; show(current); } }, 4500);

  slider.addEventListener('mouseenter', function () { play = false; });
  slider.addEventListener('mouseleave', function () { play = true; });

  // initial
  show(current);
});
