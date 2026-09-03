/** Footer Section. */
import { REPO_URL } from '../data/config.js';

export const Footer = {
  render() {
    return `
      <section class="author-section">
        <div class="container">
          <div class="author-avatar reveal">JG</div>
          <div class="author-name reveal">Jigyasa Grover</div>
          <div class="author-role reveal">ML Engineer · AI Educator · Author</div>
          <div class="author-badges reveal">
            <span class="badge badge-indigo">Google Developer Expert — ML</span>
            <span class="badge badge-violet">Author: Sculpting Data for ML</span>
            <span class="badge badge-sky">Google I/O Speaker</span>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="footer-built">
            Built with <strong>Gemini's Agentic Video Understanding</strong>
            <span style="color:var(--accent-light)">✦</span> Proof of Work
          </div>
          <div class="footer-links">
            <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/" target="_blank" rel="noopener" class="footer-link">Google Launch</a>
            <a href="https://github.com/jigyasa-grover/proof-of-work/blob/main/blog.md" target="_blank" rel="noopener" class="footer-link">Blog Post</a>
            <a href="${REPO_URL}" target="_blank" rel="noopener" class="footer-link">GitHub</a>
            <a href="https://ai.google.dev" target="_blank" rel="noopener" class="footer-link">Gemini API</a>
            <a href="https://www.linkedin.com/in/jigyasagrover/" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
            <a href="#hero" class="footer-link">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    `;
  },
};
