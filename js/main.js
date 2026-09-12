/* BNP Group — Main JS */

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (p) { p.style.opacity = '0'; setTimeout(() => p.remove(), 600); }
  }, 1800);
});

// Navbar
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Active nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Scroll reveal
const revEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revEls.length) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 }).observe || revEls.forEach(el => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 }).observe(el);
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  revEls.forEach(el => obs.observe(el));
} else {
  revEls.forEach(el => el.classList.add('visible'));
}

// Count up
function countUp(el, target, suffix) {
  let n = 0; const step = Math.ceil(target / 50);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n + (suffix || '');
    if (n >= target) clearInterval(t);
  }, 22);
}
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target, +e.target.dataset.count, e.target.dataset.suffix || ''); cObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    }, 1500);
  });
}
