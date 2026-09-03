/** HowItWorks Section — 4-Step Technical Workflow Pipeline. */
import { doodle } from '../lib/doodles.js';

const STEPS = [
  { num: '01', icon: 'record',  title: 'Continuous Stream Capture',  desc: 'Candidate captures continuous IDE and terminal interaction telemetry (30–60 min raw screen and audio stream).' },
  { num: '02', icon: 'upload',  title: 'Multimodal Ingestion',    desc: 'Ingests stream via Google AI Studio API or local buffer with zero-exposure credential handling and frame indexing.' },
  { num: '03', icon: 'analyze', title: '5-Pass Agentic Traversal', desc: 'Gemini executes autonomous think → tool → observe policy over discrete native tools (get_transcript, get_frames, get_audio).' },
  { num: '04', icon: 'score',   title: 'Calibrated Scorecard', desc: 'Synthesizes multi-dimensional telemetry into ordinal ratings, grounded timestamps, and actionable pedagogical feedback.' },
];

export const HowItWorks = {
  render() {
    const steps = STEPS.map(
      (s, i) => `
        <div class="how-step card reveal reveal-delay-${i + 1}" style="position:relative;">
          <div class="washi-tape center ${i % 2 === 0 ? 'sage' : 'yellow'}" style="width:50px; height:16px; top:-8px;"></div>
          <div class="how-step-badge">${s.num}</div>
          <div class="doodle-wrap green" style="margin: 0 auto 14px;">${doodle(s.icon)}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          ${i < 3 ? `<div class="how-step-arrow">${doodle('curvedArrowRight', 24)}</div>` : ''}
        </div>
      `,
    ).join('');

    return `
      <section id="how">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-label">${doodle('sparkle', 14)} Systems Pipeline</div>
            <h2 class="section-title">Four Steps to <span class="text-gradient">Process Telemetry</span></h2>
            <p class="section-desc">Transforming uncurated developer screen recordings into verifiable cognitive telemetry — powered by Gemini's native agentic video tools.</p>
          </div>
          <div class="how-flow">${steps}</div>
          <div class="handwritten-note" style="margin-top:32px; justify-content:center; color:var(--accent); font-size:19px;">
            ${doodle('pencil', 18)} <span>Zero brittle OCR or text scraping — native agentic multimodal tool navigation!</span>
          </div>
        </div>
      </section>
    `;
  },
};
