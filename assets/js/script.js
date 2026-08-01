// =============================================================================
// REDLINE FIRE PROTECTION ENGINEERING — site scripts
// -----------------------------------------------------------------------------
// Six small, independent pieces:
//   1. Mobile menu toggle
//   2. Light/dark theme toggle
//   3. Scroll-reveal animation for sections
//   4. Contact form handling (Formspree, with a mailto fallback)
//   5. Meeting booking dialog (separate Formspree submission)
//   6. 3D model auto-tumble (rotates in all directions, not just side to side)
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

// ---- 5. Meeting booking dialog ---------------------------------------------
// Separate from the proposal form above — opens a small dialog and submits
// to Formspree in the background (no page reload), so a meeting request
// feels quick rather than like filling out another whole form page.
(() => {
  const openBtn = document.getElementById('bookMeetingBtn');
  const dialog = document.getElementById('meetingDialog');
  const closeBtn = document.getElementById('closeMeetingDialog');
  const meetingForm = document.getElementById('meetingForm');
  const statusEl = document.getElementById('meetingStatus');
  if (!openBtn || !dialog || !meetingForm) return;

  openBtn.addEventListener('click', () => {
    statusEl.textContent = '';
    dialog.showModal();
  });
  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  const usesPlaceholder = meetingForm.action.includes('YOUR_FORM_ID');

  meetingForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const btn = meetingForm.querySelector('button[type="submit"]');
    const originalLabel = btn.textContent;

    if (usesPlaceholder) {
      // No Formspree endpoint configured — fall back to opening email client.
      const name = document.getElementById('meetingName').value;
      const email = document.getElementById('meetingEmail').value;
      const time = document.getElementById('meetingTime').value;
      const notes = document.getElementById('meetingNotes').value;
      const subject = encodeURIComponent(`Meeting request from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPreferred time: ${time}\n\nNotes:\n${notes}`
      );
      window.location.href = `mailto:rahil.hasan.mrh@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    statusEl.textContent = '';

    try {
      const res = await fetch(meetingForm.action, {
        method: 'POST',
        body: new FormData(meetingForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        statusEl.textContent = "Sent — we'll confirm the meeting by email shortly.";
        statusEl.style.color = 'var(--red)';
        meetingForm.reset();
        setTimeout(() => dialog.close(), 1800);
      } else {
        statusEl.textContent = 'Something went wrong — please email rahil.hasan.mrh@gmail.com directly.';
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong — please email rahil.hasan.mrh@gmail.com directly.';
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
})();

// ---- 6. 3D model auto-tumble ------------------------------------------------
// model-viewer's built-in auto-rotate only spins side to side (one axis).
// This drives the camera manually instead, continuously sweeping all the
// way around horizontally while also slowly rocking up and down between
// near-top and near-bottom views, so the model tumbles in every direction
// rather than just spinning like a record. Pauses while the visitor is
// actively dragging/zooming, and resumes a couple of seconds after they
// let go — matching how auto-rotate normally behaves.
(() => {
  const mv = document.getElementById('modelViewer');
  if (!mv) return;

  let theta = 35;      // azimuthal angle (degrees) — matches the initial camera-orbit
  let phi = 70;         // polar angle (degrees)
  let phiDirection = 1; // ping-pongs between the near-top and near-bottom limits
  const PHI_MIN = 15;
  const PHI_MAX = 165;
  const THETA_SPEED = 0.12;  // degrees per frame
  const PHI_SPEED = 0.05;    // slower, so it reads as a gentle roll rather than a spin

  let userInteracting = false;
  let resumeTimer = null;

  mv.addEventListener('camera-change', (e) => {
    if (e.detail && e.detail.source === 'user-interaction') {
      userInteracting = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { userInteracting = false; }, 2200);
    }
  });

  function tick() {
    if (!userInteracting) {
      theta = (theta + THETA_SPEED) % 360;
      phi += PHI_SPEED * phiDirection;
      if (phi >= PHI_MAX) { phi = PHI_MAX; phiDirection = -1; }
      if (phi <= PHI_MIN) { phi = PHI_MIN; phiDirection = 1; }
      mv.cameraOrbit = `${theta}deg ${phi}deg auto`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// ---- Footer year ----------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
