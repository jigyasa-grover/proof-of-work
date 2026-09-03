/** Architecture Section — Decoupled Multi-Pass Pipeline. */
import { doodle } from '../lib/doodles.js';

const PASSES = [
  { num: 'Pass 1', weight: '25%', icon: 'compass',   title: 'Macro-Temporal Segmentation', desc: 'Reconstructs state-machine phases: Problem Formulation, Architectural Planning, Implementation, Debugging, Verification.' },
  { num: 'Pass 2', weight: '25%', icon: 'search',    title: 'Debugging Entropy & Trajectories', desc: 'Traps runtime faults (CUDA, OOMs, assertions); isolates exception recovery behavior and hypothesis-driven debugging.' },
  { num: 'Pass 3', weight: '20%', icon: 'book',      title: 'Resource & Tooling Veracity',     desc: 'Audits browser context switches, API doc lookups, and generative AI copilot interactions; quantifies copy-paste entropy.' },
  { num: 'Pass 4', weight: '15%', icon: 'code',      title: 'Code Mutation & Refactoring',   desc: 'Evaluates code quality derivative (∂Q/∂t), test-driven iteration, intermediate assertions, and modular abstraction.' },
  { num: 'Pass 5', weight: '15%', icon: 'clipboard', title: 'Calibrated Multi-Criteria Synthesis', desc: 'Synthesizes grounded temporal evidence vectors into calibrated ordinal scores and actionable pedagogical coaching.' },
];

export const Architecture = {
  render() {
    const passesHtml = PASSES.map(
      (p, i) => `
        <div class="arch-pass">
          <div class="doodle-wrap green" style="margin: 0 auto 10px">${doodle(p.icon)}</div>
          <div class="arch-pass-num">${p.num} • <span style="color:var(--accent); font-weight:700;">Weight: ${p.weight}</span></div>
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          ${i < PASSES.length - 1 ? `<div class="arch-arrow">${doodle('curvedArrowRight', 20)}</div>` : ''}
        </div>
      `,
    ).join('');

    return `
      <section id="architecture">
        <div class="container container-wide">
          <div class="section-header reveal">
            <div class="section-label">${doodle('sparkle', 14)} Decoupled Pipeline Architecture</div>
            <h2 class="section-title">Five Orthogonal <span class="text-gradient">Analysis Passes</span></h2>
            <p class="section-desc">
              Monolithic prompts suffer from attentional saturation and cross-attribute covariance bias. Proof of Work executes five isolated passes where Gemini executes independent <strong>think → tool → observe</strong> reasoning trajectories over native tools (<code>get_transcript</code>, <code>get_frames</code>, <code>get_audio</code>).
            </p>
          </div>
          <div class="arch-pipeline card reveal">${passesHtml}</div>
        </div>
      </section>
    `;
  },
};
