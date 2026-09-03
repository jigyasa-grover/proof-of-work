/** Main Entry — Renders sections, initializes behaviors & modern scroll systems. */
import './styles/index.css';

import { Navbar }       from './sections/Navbar.js';
import { Hero }         from './sections/Hero.js';
import { Problem }      from './sections/Problem.js';
import { HowItWorks }   from './sections/HowItWorks.js';
import { Demo }         from './sections/Demo.js';
import { Architecture } from './sections/Architecture.js';
import { Efficiency }   from './sections/Efficiency.js';
import { UseCases }     from './sections/UseCases.js';
import { Footer }       from './sections/Footer.js';

import {
  initScrollProgressBar,
  initScrollReveal,
  initStatCounters,
  initScrollSpy,
  initParallax,
} from './lib/animate.js';

const sections = [
  Navbar, Hero, Problem, HowItWorks, Demo,
  Architecture, Efficiency, UseCases, Footer,
];

const app = document.getElementById('app');

app.innerHTML = `
  <div class="scroll-progress-bar"></div>
  <div class="grid-bg"></div>
  <div class="glow-bg"></div>
  <div class="noise-overlay"></div>
  ${sections.map(s => s.render()).join('<hr class="section-divider">')}
`;

/* Initialize sections and modern scroll systems */
sections.forEach(s => s.init?.());
initScrollProgressBar();
initScrollReveal();
initStatCounters();
initScrollSpy();
initParallax();

/* Ambient glow follows cursor */
document.addEventListener('mousemove', e => {
  const glow = document.querySelector('.glow-bg');
  if (glow) {
    glow.style.setProperty('--mx', `${e.clientX}px`);
    glow.style.setProperty('--my', `${e.clientY}px`);
  }
});

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
