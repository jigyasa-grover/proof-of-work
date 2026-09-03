/** Navbar Section. */
import { NAV_LINKS, REPO_URL } from '../data/config.js';

export const Navbar = {
  render() {
    const links = NAV_LINKS.map(
      l => `<a href="${l.href}" class="nav-link">${l.label}</a>`,
    ).join('');

    return `
      <nav class="nav" id="mainNav">
        <div class="nav-inner">
          <a href="#" class="nav-brand">
            <div class="nav-logo">PoW</div>
            <div class="nav-text">
              <h1>Proof of Work</h1>
              <div class="nav-sub">AI Teaching Assistant</div>
            </div>
          </a>
          <div class="nav-links">
            ${links}
            <a href="${REPO_URL}" target="_blank" rel="noopener" class="nav-cta">GitHub</a>
          </div>
        </div>
      </nav>
    `;
  },

  init() {
    window.addEventListener(
      'scroll',
      () => {
        document.getElementById('mainNav')
          ?.classList.toggle('scrolled', window.scrollY > 40);
      },
      { passive: true },
    );
  },
};
