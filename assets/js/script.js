// =============================================================================
// REDLINE FIRE PROTECTION ENGINEERING — site scripts
// -----------------------------------------------------------------------------
// Four small, independent pieces:
//   1. Mobile menu toggle
//   2. Light/dark theme toggle
//   3. Scroll-reveal animation for sections
//   4. Contact form handling (Formspree, with a mailto fallback)
// =============================================================================

// ---- 1. Mobile menu -----------------------------------------------------
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const expanded = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ---- 2. Light/dark theme toggle -------------------------------------------
// Persists the choice in localStorage so it sticks across visits.
// (The logo swap itself is pure CSS — see .logo-light/.logo-dark in
// style.css — so there's no flash of the wrong logo while this runs.)
(() => {
  const THEME_KEY = 'redline-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable — theme just won't persist */ }
  }

  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
})();

// ---- 3. Scroll reveal ----------------------------------------------------
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// ---- 4. Contact form ------------------------------------------------------
// If a real Formspree endpoint has been set in index.html (the form's
// action no longer contains "YOUR_FORM_ID"), let the form submit normally.
// Otherwise, fall back to opening the visitor's email client with the
// details pre-filled, so the form is never a dead end.
const form = document.getElementById('contactForm');
if (form) {
  const usesPlaceholder = form.action.includes('YOUR_FORM_ID');

  form.addEventListener('submit', (evt) => {
    if (!usesPlaceholder) {
      // Real Formspree endpoint configured — let it submit, just give feedback.
      const btn = form.querySelector('.send-btn');
      btn.textContent = 'Sending…';
      return;
    }

    // No backend configured yet — use a mailto fallback instead.
    evt.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject details:\n${project}`
    );
    window.location.href = `mailto:rahil.hasan.mrh@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ---- Footer year ----------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
