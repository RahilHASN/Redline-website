// =============================================================================
// REDLINE FIRE PROTECTION ENGINEERING — site scripts
// -----------------------------------------------------------------------------
// Three small, independent pieces:
//   1. Mobile menu toggle
//   2. Scroll-reveal animation for sections
//   3. Contact form handling (Formspree, with a mailto fallback)
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

// ---- 2. Scroll reveal ----------------------------------------------------
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

// ---- 3. Contact form ------------------------------------------------------
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
