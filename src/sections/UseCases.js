/** UseCases Section — Senior Engineering & Educational Workflows. */
import { doodle } from '../lib/doodles.js';

const CASES = [
  { icon: 'gradCap',  color: '',      title: 'ML Engineering Practicums',     desc: 'Audit model construction trajectories: verify tensor dimension pre-computation, loss curve convergence tracking, and informed hyperparameter tuning.' },
  { icon: 'document', color: 'cyan',   title: 'Asynchronous Take-Home Audits', desc: 'Replace brittle LeetCode puzzles with recorded real-world problem challenges. Evaluate how candidates navigate ambiguity, system design, and debugging.' },
  { icon: 'flask',    color: 'amber',  title: 'Research & Ablation Integrity', desc: 'Verify researchers and students executed disciplined multi-seed ablation suites rather than cherry-picking non-reproducible stochastic anomalies.' },
  { icon: 'building', color: 'green',  title: 'Enterprise AI Copilot Steering', desc: 'Assess whether transitioning engineers critically verify and adapt generative AI completions or blindly inject uninspected code into production.' },
  { icon: 'users',    color: 'pink',   title: 'Peer Review Consistency Engine', desc: 'Synthesizes objective evidence vectors to calibrate human reviewers, mitigating subjective grading variance across large cohorts.' },
  { icon: 'trendUp',  color: 'orange', title: 'Longitudinal Trajectory Tracking', desc: 'Track continuous developer telemetry over 90-day intervals to quantitatively measure improvements in debugging velocity and cognitive planning.' },
];

export const UseCases = {
  render() {
    const cards = CASES.map(
      (c, i) => `
        <div class="usecase-card reveal reveal-delay-${(i % 3) + 1}">
          <div class="doodle-wrap ${c.color}">${doodle(c.icon)}</div>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      `,
    ).join('');

    return `
      <section id="usecases">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-label">Enterprise & Pedagogical Workflows</div>
            <h2 class="section-title">Engineered for <span class="text-gradient">Technical Leaders & Educators</span></h2>
            <p class="section-desc">From university deep learning courses to enterprise engineering audits — anywhere latent problem-solving trajectory is the primary quality signal.</p>
          </div>
          <div class="usecase-grid">${cards}</div>
        </div>
      </section>
    `;
  },
};
