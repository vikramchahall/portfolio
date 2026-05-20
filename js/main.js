// ===== PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'));// ===== NAV SCROLL =====
// Adds a shadow to the navbar once you scroll past 20px
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER =====
// Opens/closes the mobile menu when the ☰ button is tapped
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
// Closes the mobile menu when any link inside it is tapped
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== PROJECT TOGGLE =====
// Grabs the two filter buttons from the Projects section header
const techBtn = document.querySelector('[data-filter="tech"]');
const civilBtn = document.querySelector('[data-filter="civil"]');
// Grabs the two project grids — one for tech, one for civil
const techGrid = document.getElementById('techProjects');
const civilGrid = document.getElementById('civilProjects');

// Shows the selected grid and hides the other, updates active button style
// Also re-triggers fade-in animations on the newly shown cards
function switchProjects(show) {
  if (show === 'tech') {
    techGrid.classList.remove('hidden');
    civilGrid.classList.add('hidden');
    techBtn.classList.add('active');
    civilBtn.classList.remove('active');
    techGrid.querySelectorAll('.fade-up').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  } else {
    civilGrid.classList.remove('hidden');
    techGrid.classList.add('hidden');
    civilBtn.classList.add('active');
    techBtn.classList.remove('active');
    civilGrid.querySelectorAll('.fade-up').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  }
}

techBtn.addEventListener('click', () => switchProjects('tech'));
civilBtn.addEventListener('click', () => switchProjects('civil'));

// ===== SCROLL FADE IN =====
// Watches every element with class .fade-up
// When it enters the viewport, adds .visible which triggers the CSS transition
// The stagger delay (i * 80ms) makes cards animate in one after another
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 }); // 0.08 = triggers when 8% of the element is visible

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== TILT (desktop only) =====
// Only runs on screens wider than 900px (no tilt on mobile/tablet)
// On mousemove: calculates cursor position relative to card center
// and tilts the card slightly toward the cursor using CSS 3D perspective
// On mouseleave: resets the card back to flat
if (window.innerWidth > 900) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;  // -0.5 to 0.5
      card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ===== MARQUEE DUPLICATE =====
// The scrolling text strip needs its content doubled so the loop
// looks seamless — when the first copy scrolls out, the second is right behind it
const track = document.querySelector('.marquee-track');
if (track) track.innerHTML += track.innerHTML;

// ===== UPI COPY =====
// Called when the user clicks/taps the UPI box in the Support card
// Copies the UPI ID to clipboard, then swaps the hint text to "✓ copied!"
// After 2 seconds it resets back to "tap to copy"
function copyUPI() {
  const upi = '8837510630@sbi'; // 
  const hint = document.getElementById('copyHint');     // "tap to copy" text
  const copied = document.getElementById('copiedMsg');  // "✓ copied!" text

  const finish = () => {
    hint.style.display = 'none';
    copied.style.display = 'inline';
    setTimeout(() => {
      hint.style.display = 'inline';
      copied.style.display = 'none';
    }, 2000);
  };

  // Modern browsers: use the Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(upi).then(finish).catch(() => {
      fallbackCopy(upi); // if clipboard API fails, use the old method
      finish();
    });
  } else {
    fallbackCopy(upi); // older browsers don't have clipboard API at all
    finish();
  }
}

// ===== UPI COPY FALLBACK =====
// For older browsers that don't support navigator.clipboard
// Creates a hidden textarea, puts the text in it, selects it,
// runs the old execCommand('copy'), then removes the textarea
function fallbackCopy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';  // prevents page from jumping to it
  el.style.opacity = '0';       // invisible to the user
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy'); // deprecated but still works in old browsers
  document.body.removeChild(el);
}
// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));