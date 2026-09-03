/** Efficiency Section — Multimodal Attention Economics & Token Telemetry. */

import { SAMPLE_RESULTS, LAUNCH_LINKS } from '../data/config.js';
import { doodle } from '../lib/doodles.js';

export const Efficiency = {
  render() {
    const t = SAMPLE_RESULTS.tokenUsage;

    return `
      <section id="efficiency">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-label">Multimodal Attention Economics</div>
            <h2 class="section-title">Agentic Video Understanding <span class="text-gradient">in Gemini</span></h2>
            <p class="section-desc">
              Dense uniform frame extraction incurs quadratic attention overhead ($O(N^2)$) and context saturation ($700\\text{k}+\\text{ tokens}$). Gemini's agentic multimodal architecture executes an active <strong>think → tool → observe</strong> policy to dynamically sample high-density frames ($10+\\text{ FPS}$) only around salient interaction regions.
            </p>
          </div>

          <div class="stats-grid reveal">
            <div class="stat-card">
              <div class="stat-number" data-target="88" data-suffix="%">0</div>
              <div class="stat-label">Token Compression</div>
              <div class="stat-desc">Up to 88% token reduction vs. static uniform frame ingestion</div>
            </div>
            <div class="stat-card">
              <div class="stat-number" data-target="66" data-suffix="%">0</div>
              <div class="stat-label">Inference Cost Reduction</div>
              <div class="stat-desc">Up to 66% lower cost per long-form video evaluation</div>
            </div>
            <div class="stat-card">
              <div class="stat-number" data-target="7" data-suffix="%">0</div>
              <div class="stat-label">Benchmark Accuracy Gain</div>
              <div class="stat-desc">+7% absolute accuracy gain on the 1H-VideoQA benchmark (~90.1%)</div>
            </div>
          </div>

          <!-- Tool reasoning loop architecture -->
          <div class="tools-loop-grid reveal" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin: 32px 0;">
            <div class="card" style="padding: 20px; border-left: 3px solid var(--accent);">
              <div style="font-family:var(--font-mono); font-size:13px; color:var(--accent-light); margin-bottom:6px; font-weight:700;">
                1. get_transcript()
              </div>
              <div style="font-size:14px; color:var(--text-secondary); line-height:1.5;">
                Performs macro-temporal text and OCR indexing across spoken commentary and terminal logs to pinpoint error timestamps.
              </div>
            </div>
            <div class="card" style="padding: 20px; border-left: 3px solid var(--green);">
              <div style="font-family:var(--font-mono); font-size:13px; color:var(--green); margin-bottom:6px; font-weight:700;">
                2. get_frames(start, end, fps)
              </div>
              <div style="font-size:14px; color:var(--text-secondary); line-height:1.5;">
                Selectively queries visual frames with dynamic FPS (up to 10+ FPS for rapid code execution; throttles to 0 FPS on static pauses).
              </div>
            </div>
            <div class="card" style="padding: 20px; border-left: 3px solid var(--amber);">
              <div style="font-family:var(--font-mono); font-size:13px; color:var(--amber); margin-bottom:6px; font-weight:700;">
                3. get_audio(start, end)
              </div>
              <div style="font-size:14px; color:var(--text-secondary); line-height:1.5;">
                Extracts raw audio waveforms on-demand to evaluate verbal cognitive explanations, inflection, and hesitation intervals.
              </div>
            </div>
          </div>

          <!-- DeepMind Architectural Pillars -->
          <div class="arch-pillars-grid reveal" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:14px; margin-bottom: 32px;">
            <div class="card" style="padding: 16px; background:var(--bg-root); border:1px dashed var(--border-strong);">
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px;">Sub-Second Retrieval</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">Traps split-second stack traces and terminal stdout missed at fixed 1 FPS.</div>
            </div>
            <div class="card" style="padding: 16px; background:var(--bg-root); border:1px dashed var(--border-strong);">
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px;">Dynamic Variable FPS</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">Adapts sample density on-the-fly (0.2 → 10+ FPS) based on interaction velocity.</div>
            </div>
            <div class="card" style="padding: 16px; background:var(--bg-root); border:1px dashed var(--border-strong);">
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px;">Pareto Frontier Accuracy</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">Gemini 3.7 Flash establishes the optimal accuracy-to-cost Pareto frontier on 1H-VideoQA.</div>
            </div>
            <div class="card" style="padding: 16px; background:var(--bg-root); border:1px dashed var(--border-strong);">
              <div style="font-size:13px; font-weight:700; color:var(--accent); margin-bottom:4px;">LVBench Long-Form Search</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">Resolves multi-hour needle-in-a-haystack queries with zero context overflow.</div>
            </div>
          </div>

          <div class="eff-compare reveal" style="position:relative;">
            <div class="eff-box static" style="position:relative;">
              <div class="washi-tape yellow center" style="width:50px; height:16px; top:-8px;"></div>
              <div class="eff-label" style="color:var(--red); font-weight:700;">Static Ingestion (Dense Frame Array)</div>
              <div class="eff-tokens" style="color:var(--red)">~2,697,000</div>
              <div class="eff-sub">tokens (saturates context with 2,700+ redundant frames)</div>
            </div>
            <div class="eff-vs">vs</div>
            <div class="eff-box agentic" style="position:relative;">
              <div class="washi-tape sage center" style="width:50px; height:16px; top:-8px;"></div>
              <div class="eff-label" style="color:var(--green); font-weight:700;">Proof of Work (Agentic Multimodal)</div>
              <div class="eff-tokens" style="color:var(--green)">57,226</div>
              <div class="eff-sub">tokens (~99% compression via targeted tool navigation)</div>
            </div>
          </div>

          <div class="handwritten-note" style="margin-top:20px; justify-content:center; color:var(--accent); font-size:19px;">
            ${doodle('curvedArrowRight', 24)} <span>97.9% token compression — 2.7M down to 57K tokens per session!</span>
          </div>

          <!-- Official Announcement links card -->
          <div class="card reveal" style="position:relative; margin-top: 32px; padding: 24px; text-align: center; border: 1px solid var(--border-strong);">
            <div class="washi-tape sage left" style="top:-10px;"></div>
            <div class="paperclip-holder" style="right:20px; top:-12px;">${doodle('paperclip', 24)}</div>
            <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-light); margin-bottom: 8px; font-weight: 700;">
              Production Models & Deployment Resources
            </div>
            <p class="section-subtitle">
              Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite establish a new paradigm in video analysis costs and latency through <strong>Agentic Video Understanding</strong>. By autonomously deciding which parts of a video to watch, at what speed, and through which modality, it reduces token usage by 88% and lowers costs by 66%.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
              <a href="${LAUNCH_LINKS.blog}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px; padding: 8px 14px;">
                ${doodle('book', 14)} Google Research Announcement
              </a>
              <a href="${LAUNCH_LINKS.aiStudio}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px; padding: 8px 14px;">
                ${doodle('code', 14)} Google AI Studio API
              </a>
              <a href="${LAUNCH_LINKS.deepmind}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px; padding: 8px 14px;">
                ${doodle('sparkle', 14)} Gemini Architecture
              </a>
              <a href="${LAUNCH_LINKS.developers}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px; padding: 8px 14px;">
                ${doodle('users', 14)} Google Developers
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  },
};
