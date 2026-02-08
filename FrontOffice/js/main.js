// Minimal JS for FrontOffice interactions (mobile nav toggle, smooth scroll)
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav: create a toggle if nav has multiple links
  var nav = document.querySelector('header nav');
  if (!nav) return;

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = 'Menu';
  // insert toggle before nav
  nav.parentNode.insertBefore(toggle, nav);

  toggle.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    nav.classList.toggle('open');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          var t = document.querySelector('.nav-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
