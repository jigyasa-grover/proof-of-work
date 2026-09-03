/** Hero Section — Staff-level technical framing, widescreen stats strip, and 3-column evaluation deck. */
import { CYCLE_WORDS, REPO_URL } from '../data/config.js';
import { doodle } from '../lib/doodles.js';

export const Hero = {
  render() {
    return `
      <section class="hero" id="hero">
        <div class="container">
          <div class="hero-badge">
            <span class="pulse-dot"></span>
            ${doodle('sparkle', 14)} Gemini 3.7 Agentic Multimodal Video Architecture
          </div>
          <h2>Verify the <span class="text-gradient">Latent Process</span>,<br>Not Just the Output Artifact</h2>
          <p class="hero-subtitle">
            An autonomous AI evaluation system that reconstructs and grades <em>how</em> engineers navigate technical ambiguity — decomposing problem planning, debugging entropy, external attribution veracity, and iteration dynamics from continuous screen telemetry.
          </p>
          <div class="hero-cycle">
            Evaluates <span class="cycle-word" id="cycleWord">${CYCLE_WORDS[0]}</span>
          </div>
          <div class="hero-actions" style="position:relative;">
            <a href="#demo" class="btn btn-primary">
              ${doodle('play', 16)} Execute Interactive Simulation
            </a>
            <a href="${REPO_URL}" target="_blank" rel="noopener" class="btn btn-secondary">
              ${doodle('code', 16)} Inspect System Architecture
            </a>
            <div class="handwritten-note hero-note">
              ${doodle('curvedArrowRight', 24)} <span>Simulate 5 decoupled passes!</span>
            </div>
          </div>

          <!-- Key metrics strip — Production Telemetry -->
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-num">88<span class="hero-stat-unit">%</span></div>
              <div class="hero-stat-label">Token Compression</div>
            </div>
            <div class="hero-stat-sep"></div>
            <div class="hero-stat">
              <div class="hero-stat-num">5</div>
              <div class="hero-stat-label">Orthogonal Passes</div>
            </div>
            <div class="hero-stat-sep"></div>
            <div class="hero-stat">
              <div class="hero-stat-num">4.2<span class="hero-stat-unit">K</span></div>
              <div class="hero-stat-label">Tokens / 45-Min Stream</div>
            </div>
            <div class="hero-stat-sep"></div>
            <div class="hero-stat">
              <div class="hero-stat-num">99<span class="hero-stat-unit">%</span></div>
              <div class="hero-stat-label">Cost Reduction vs Static</div>
            </div>
          </div>
          <div class="handwritten-note" style="margin-top: 16px; justify-content: center; color: var(--accent); font-size: 18px;">
            ${doodle('pencil', 16)} <span>31-min screen recording distilled into 57,226 tokens!</span>
          </div>

          <!-- Product sneak peek — Expanded 3-Column Evaluation Deck -->
          <div class="hero-preview-wrapper reveal-scale" style="position:relative; width:100%; max-width:1200px; margin: 48px auto 0;">
            <div class="washi-tape sage left"></div>
            <div class="washi-tape yellow right"></div>
            <div class="paperclip-holder">${doodle('paperclip', 28)}</div>
            <div class="handwritten-callout-top">
              ${doodle('pencil', 16)} <span>Evaluator Telemetry Deck (CIFAR-10 PyTorch)</span>
            </div>

            <div class="hero-preview">
              <div class="preview-header">
                <div class="preview-dots"><span></span><span></span><span></span></div>
                <div class="preview-title">${doodle('paperclip', 14)} telemetry://cifar10-eval/session_45m.json — calibrated process scorecard</div>
              </div>
              <div class="preview-body widescreen">
                <!-- Col 1: Overall Score & Verification Verdict -->
                <div class="preview-left">
                  <div class="preview-score-ring">
                    <svg viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-elevated)" stroke-width="7"/>
                      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#previewGradGreen)" stroke-width="7"
                        stroke-linecap="round" stroke-dasharray="326.73" stroke-dashoffset="72"
                        transform="rotate(-90 60 60)"/>
                      <defs>
                        <linearGradient id="previewGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#0F3323"/>
                          <stop offset="50%" stop-color="#1E513A"/>
                          <stop offset="100%" stop-color="#40916C"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div class="preview-score-text">
                      <span class="preview-score-num">7.8</span>
                      <span class="preview-score-of">/10</span>
                    </div>
                  </div>
                  <div class="preview-verdict">${doodle('checkDouble', 13)} VERIFIED ORIGINAL PROCESS</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:10px; font-weight:500;">
                    45m multimodal trajectory · 5 orthogonal passes
                  </div>
                </div>

                <!-- Col 2: Dimensional Vector Breakdown -->
                <div class="preview-center">
                  <div class="preview-col-title">${doodle('clipboard', 14)} Dimensional Vector Breakdown</div>
                  <div class="preview-dim">
                    <div class="preview-dim-row"><span>Macro Approach Strategy</span><span class="preview-dim-score">8.5</span></div>
                    <div class="preview-dim-bar"><div class="preview-dim-fill" style="width:85%"></div></div>
                  </div>
                  <div class="preview-dim">
                    <div class="preview-dim-row"><span>Debugging Stack Maturity</span><span class="preview-dim-score">7.5</span></div>
                    <div class="preview-dim-bar"><div class="preview-dim-fill" style="width:75%"></div></div>
                  </div>
                  <div class="preview-dim">
                    <div class="preview-dim-row"><span>Attribution & Tooling Veracity</span><span class="preview-dim-score">7.0</span></div>
                    <div class="preview-dim-bar"><div class="preview-dim-fill" style="width:70%"></div></div>
                  </div>
                  <div class="preview-dim">
                    <div class="preview-dim-row"><span>Iterative Code Mutation</span><span class="preview-dim-score">8.0</span></div>
                    <div class="preview-dim-bar"><div class="preview-dim-fill" style="width:80%"></div></div>
                  </div>
                  <div class="preview-dim">
                    <div class="preview-dim-row"><span>Phase Allocation Pacing</span><span class="preview-dim-score">7.5</span></div>
                    <div class="preview-dim-bar"><div class="preview-dim-fill" style="width:75%"></div></div>
                  </div>
                </div>

                <!-- Col 3: Grounded Temporal Evidence Feed -->
                <div class="preview-right">
                  <div class="preview-col-title">${doodle('search', 14)} Grounded Temporal Evidence Vector</div>
                  <div class="preview-evidence-list">
                    <div class="preview-ev">
                      <span class="preview-ev-ts">02:30</span>
                      <span>Explicit channel dimension sizing sketched prior to Tensor initialization</span>
                    </div>
                    <div class="preview-ev">
                      <span class="preview-ev-ts">12:45</span>
                      <span>Targeted PyTorch torchvision docs query for normalization affine params</span>
                    </div>
                    <div class="preview-ev">
                      <span class="preview-ev-ts">18:20</span>
                      <span>Runtime mismatch trapped systematically via shape assertions (4m recovery)</span>
                    </div>
                    <div class="preview-ev">
                      <span class="preview-ev-ts">28:00</span>
                      <span>Controlled ablation (V1 → V2 with BatchNorm yielding +3.1% val gain)</span>
                    </div>
                    <div class="preview-ev">
                      <span class="preview-ev-ts">42:00</span>
                      <span>Post-convergence per-class error distribution & confusion matrix review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    let idx = 0;
    const el = document.getElementById('cycleWord');
    if (!el) return;

    setInterval(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => {
        idx = (idx + 1) % CYCLE_WORDS.length;
        el.textContent = CYCLE_WORDS[idx];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 280);
    }, 2400);
  },
};
