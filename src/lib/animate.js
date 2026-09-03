/** Modern Scroll Animation Engine — Reveals, ScrollSpy, Parallax, Progress & Counters. */

/** Top reading progress bar */
export function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/** IntersectionObserver-based modern scroll reveal with directional & stagger support. */
export function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve once revealed for performance
          // observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/** ScrollSpy: Highlights the active section link in the sticky navigation. */
export function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        return el ? { id: href, el, link } : null;
      }
      return null;
    })
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const match = sections.find(s => s.el === entry.target);
          if (match) {
            navLinks.forEach(l => l.classList.remove('active'));
            match.link.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.35 },
  );

  sections.forEach(s => spyObserver.observe(s.el));
}

/** Subtle scroll parallax on background doodles and tape accents */
export function initParallax() {
  const parallaxEls = document.querySelectorAll('.washi-tape, .handwritten-callout-top, .hero-note');
  if (!parallaxEls.length) return;

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxEls.forEach((el, i) => {
            const speed = 0.04 * ((i % 2 === 0) ? 1 : -0.7);
            const yOffset = scrollY * speed;
            el.style.transform = `${el.dataset.baseTransform || ''} translateY(${yOffset.toFixed(1)}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  // Store base transform
  parallaxEls.forEach(el => {
    el.dataset.baseTransform = window.getComputedStyle(el).transform === 'none' ? '' : window.getComputedStyle(el).transform;
  });
}

/**
 * Animate a number from `start` to `end` over `duration` ms with smooth ease-out curve.
 */
export function animateCounter(el, start, end, duration, suffix = '') {
  const t0 = performance.now();
  const isInt = Number.isInteger(end);

  function tick(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4); // Quartic ease out
    const val = start + (end - start) * eased;
    el.textContent = (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** Fire `animateCounter` on `.stat-number` elements when scrolled into view. */
export function initStatCounters() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = parseFloat(entry.target.dataset.target);
          const suffix = entry.target.dataset.suffix ?? '%';
          animateCounter(entry.target, 0, target, 2000, suffix);
        }
      });
    },
    { threshold: 0.4 },
  );
  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}
