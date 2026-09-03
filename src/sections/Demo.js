/** Demo Section — Interactive analysis pipeline with live results. */

import { PIPELINE_STEPS, DIMENSIONS, SAMPLE_RESULTS, DEFAULT_VIDEO_URL } from '../data/config.js';
import { isApiConfigured } from '../services/gemini.js';
import { animateCounter } from '../lib/animate.js';
import { doodle } from '../lib/doodles.js';

export const Demo = {
  render() {
    const apiMode = isApiConfigured();
    const r = SAMPLE_RESULTS;

    const stepsHtml = PIPELINE_STEPS.map((s, i) => `
      <div class="step-pill" id="step-${i}">
        <div class="step-pill-num">${i + 1}</div>
        <div class="step-pill-name">${s.name}</div>
        <div class="step-pill-status">Pending</div>
        <div class="step-pill-bar"></div>
      </div>
    `).join('');

    const videoInput = apiMode ? `
      <div class="api-mode-label">API Mode — Gemini key detected</div>
      <div class="video-input-group">
        <input type="text" class="video-input" id="videoUrlInput"
          value="${DEFAULT_VIDEO_URL}"
          placeholder="Paste a YouTube URL (e.g. https://youtube.com/watch?v=...)" />
      </div>
    ` : '';

    const scoreCardHtml = `
      <div class="card notebook-ruled-page reveal" id="scoreCard" style="position:relative;">
        <div class="washi-tape sage center"></div>
        <div class="paperclip-holder">${doodle('paperclip', 26)}</div>
        <div class="card-header">
          <div class="card-title">${doodle('clipboard', 16)} Overall Process Score</div>
          <span class="badge badge-emerald">Verified Original</span>
        </div>
        <div class="score-ring-wrap">
          <div class="score-ring">
            <svg viewBox="0 0 180 180">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#1B4332" />
                  <stop offset="50%" stop-color="#2D6A4F" />
                  <stop offset="100%" stop-color="#52B788" />
                </linearGradient>
              </defs>
              <circle class="ring-bg" cx="90" cy="90" r="80" />
              <circle class="ring-fill" id="scoreRing" cx="90" cy="90" r="80" />
            </svg>
            <div class="score-inner">
              <div class="score-num" id="scoreNum">0</div>
              <div class="score-of">/ 10</div>
            </div>
          </div>
          <div class="score-verdict">${doodle('checkDouble', 14)} ${r.verdict}</div>
        </div>
        <div class="handwritten-note" style="margin-top:12px; justify-content:center; color:var(--accent); font-size:18px;">
          ${doodle('pencil', 16)} <span>Every score backed by timestamped video frames!</span>
        </div>
      </div>
    `;

    const dimensionsHtml = DIMENSIONS.map((d, i) => {
      const data = r.dimensions[i];
      return `
        <div class="dimension">
          <div class="dim-header">
            <div class="dim-name" style="display:flex; align-items:center; gap:6px;">${d.icon ? doodle(d.icon, 16) : ''} ${d.name} <span class="dim-weight">(${d.weight}%)</span></div>
            <div class="dim-score" style="color:${data.color}">${data.score.toFixed(1)}</div>
          </div>
          <div class="dim-bar"><div class="dim-fill" style="background:${data.gradient}" data-width="${data.score * 10}"></div></div>
          <div class="dim-rating">${data.rating}</div>
        </div>
      `;
    }).join('');

    let left = 0;
    const timelineSegs = r.timeline.map(t => {
      const seg = `<div class="tl-seg" style="left:${left}%;width:${t.width}%;background:${t.color}"><span>${t.label}</span></div>`;
      left += t.width;
      return seg;
    }).join('');

    const legendHtml = r.timeline.map(
      t => `<div class="tl-legend-item"><div class="tl-legend-dot" style="background:${t.color}"></div>${t.label} (${t.width}%)</div>`,
    ).join('');

    const evidenceHtml = r.evidence.map(e => `
      <div class="evidence-item ${e.type}">
        <div class="ev-ts">${e.ts}</div>
        <div class="ev-content">
          <strong>${e.title}</strong>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join('');

    const feedbackHtml = (items, color) => items.map(
      s => `<div class="fb-item"><div class="fb-dot" style="background:${color === 'emerald-400' ? 'var(--green)' : 'var(--red)'}"></div><span>${s}</span></div>`,
    ).join('');

    return `
      <section id="demo">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-label">Interactive Demo</div>
            <h2 class="section-title">See It <span class="text-gradient">In Action</span></h2>
            <p class="section-desc">Sample results from Gemini analyzing a candidate's screen recording — designing, debugging, and training a PyTorch ConvNet on CIFAR-10.</p>
          </div>

          <!-- Scenario -->
          <div class="demo-scenario reveal">
            <div class="demo-scenario-header">
              <div class="demo-scenario-title">Real Multimodal Telemetry Results</div>
              <span class="badge badge-violet">${r.scenario.course}</span>
            </div>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.65">
              A ${r.scenario.duration} continuous screen recording of an engineer designing, debugging, and training a
              <strong>${r.scenario.title}</strong> using <strong>${r.scenario.framework}</strong>.
              The objective: design custom convolutional layers, resolve tensor dimensions, construct data augmentation pipelines, and optimize validation loss.
              Target achieved: <strong style="color:var(--green)">${r.scenario.result}</strong>.
              Source video stream: <a href="${r.videoUrl}" target="_blank" rel="noopener" style="font-weight:600; text-decoration:underline; color:var(--accent);">${r.videoUrl}</a>
            </p>
            <div class="demo-meta">
              <div class="demo-meta-item"><div class="meta-label">Assignment</div><div class="meta-value">${r.scenario.title}</div></div>
              <div class="demo-meta-item"><div class="meta-label">Duration</div><div class="meta-value">${r.scenario.duration}</div></div>
              <div class="demo-meta-item"><div class="meta-label">Framework</div><div class="meta-value">${r.scenario.framework}</div></div>
              <div class="demo-meta-item"><div class="meta-label">Result</div><div class="meta-value" style="color:var(--green)">${r.scenario.result}</div></div>
            </div>
          </div>

          <!-- Pipeline -->
          <div class="pipeline-card reveal">
            <div class="pipeline-header">
              <div class="pipeline-title">Multi-Pass Analysis Pipeline</div>
              <div class="pipeline-status badge-sky" id="pipelineStatus">Ready</div>
            </div>
            ${videoInput}
            <div class="steps-row">${stepsHtml}</div>

            <!-- Live reasoning terminal -->
            <div class="reasoning-terminal" id="reasoningTerminal">
              <div class="terminal-header">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
                <span class="badge">gemini-3.7-flash — agentic reasoning</span>
              </div>
              <div class="terminal-body" id="terminalBody"></div>
            </div>

            <!-- Token savings counter -->
            <div class="token-compare" id="tokenCompare">
              <div class="token-col static-col">
                <div class="token-mode">Static Processing</div>
                <div class="token-count" id="staticTokens">0</div>
                <div class="token-unit">tokens</div>
              </div>
              <div class="token-vs">
                <div class="token-savings" id="tokenSavings">0%</div>
                <div class="token-savings-label">saved</div>
              </div>
              <div class="token-col agentic-col">
                <div class="token-mode">Agentic Processing</div>
                <div class="token-count" id="agenticTokens">0</div>
                <div class="token-unit">tokens</div>
              </div>
            </div>

            <div class="demo-cta">
              <button class="btn btn-primary" id="analyzeBtn">
                ${apiMode ? 'Run Real Analysis →' : 'Run Process Analysis →'}
              </button>
            </div>
          </div>

          <!-- Results -->
          <div class="results-container" id="resultsContainer">
            <div class="results-grid">
              ${scoreCardHtml}
              <div class="card reveal reveal-delay-1" id="dimCard">
                <div class="card-header"><div class="card-title">Dimension Breakdown</div></div>
                ${dimensionsHtml}
              </div>
              <div class="card results-full reveal reveal-delay-2" id="timelineCard">
                <div class="card-header">
                  <div class="card-title">Process Timeline</div>
                  <span style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono)">${r.scenario.duration} total</span>
                </div>
                <div class="timeline-bar">${timelineSegs}</div>
                <div class="tl-legend">${legendHtml}</div>
              </div>
              <div class="card reveal reveal-delay-3" id="evidenceCard">
                <div class="card-header"><div class="card-title">Key Evidence</div></div>
                <div class="evidence-list">${evidenceHtml}</div>
              </div>
              <div class="card reveal reveal-delay-4" id="feedbackCard">
                <div class="card-header"><div class="card-title">Feedback</div></div>
                <div class="feedback-cols">
                  <div class="feedback-section">
                    <h3><span style="color:var(--green)">✓</span> Strengths</h3>
                    ${feedbackHtml(r.strengths, 'emerald-400')}
                  </div>
                  <div class="feedback-section">
                    <h3><span style="color:var(--red)">◆</span> Improvements</h3>
                    ${feedbackHtml(r.improvements, 'amber-400')}
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
    document.getElementById('analyzeBtn')?.addEventListener('click', startAnalysis);
  },
};

/* ── Reasoning trace lines (simulated think→tool→observe loop) ── */
const REASONING_TRACE = [
  { type: 'think',   text: 'Analyzing PyTorch ConvNet (CIFAR-10) multimodal stream... reconstructing state-machine trajectory.' },
  { type: 'tool',    text: 'get_transcript() → 5,842 tokens extracted across audio stream' },
  { type: 'observe', text: 'Transcript indexed: Conv2d, BatchNorm2d, CIFAR-10, torchvision transforms, loss curves' },
  { type: 'think',   text: 'Pass 1: Identifying macro-temporal phase boundaries and planning behavior...' },
  { type: 'tool',    text: 'get_frames(start=140, end=180, fps=2) → 80 visual frames' },
  { type: 'observe', text: '[02:30] Paper sketch: 3 conv blocks → flatten → 2 FC layers. Kernel sizes & strides annotated.' },
  { type: 'think',   text: 'Pass 2: Scanning for runtime exceptions and error recovery entropy...' },
  { type: 'tool',    text: 'get_frames(start=1090, end=1140, fps=3) → 150 visual frames' },
  { type: 'observe', text: '[18:20] RuntimeError: mat1 and mat2 shapes cannot be multiplied. Injected print(x.shape).' },
  { type: 'tool',    text: 'get_audio(start=1140, end=1200) → Audio waveform' },
  { type: 'observe', text: '[18:50] "Stride reduces spatial resolution to 4x4, not 8x8" — systematically resolved in 4m.' },
  { type: 'think',   text: 'Pass 3 & 4: Auditing external tool attribution and iterative code mutation (∂Q/∂t)...' },
  { type: 'tool',    text: 'get_frames(start=1680, end=1740, fps=2) → 120 visual frames' },
  { type: 'observe', text: '[28:00] V2 BatchNorm2d ablation. Side-by-side validation loss curves in matplotlib (+3.1% gain).' },
  { type: 'think',   text: 'Pass 5: Synthesizing multi-criteria calibrated process scorecard... Aggregate: 7.8 / 10 (VERIFIED)' },
];

let running = false;

function startAnalysis() {
  if (running) return;
  running = true;

  const btn = document.getElementById('analyzeBtn');
  const status = document.getElementById('pipelineStatus');
  const terminal = document.getElementById('terminalBody');
  const tokenCompare = document.getElementById('tokenCompare');

  btn.disabled = true;
  btn.innerHTML = '<span class="btn-icon">⏳</span> Analyzing video…';
  status.textContent = 'Analyzing…';
  status.className = 'pipeline-status badge-amber';
  terminal.innerHTML = '';
  tokenCompare.classList.add('visible');

  // Start token counters
  animateTokens();

  // Pipeline step animation
  const ids = PIPELINE_STEPS.map((_, i) => `step-${i}`);
  const durations = [1800, 2200, 2000, 1600, 2400];
  let delay = 300;

  ids.forEach((id, i) => {
    setTimeout(() => {
      if (i > 0) {
        const prev = document.getElementById(ids[i - 1]);
        prev.classList.remove('active');
        prev.classList.add('completed');
        prev.querySelector('.step-pill-status').textContent = 'Complete';
      }
      document.getElementById(id).classList.add('active');
      document.getElementById(id).querySelector('.step-pill-status').textContent = 'Analyzing…';
    }, delay);
    delay += durations[i];
  });

  // Reasoning terminal typing
  REASONING_TRACE.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = `terminal-line ${line.type}`;
      const prefix = line.type === 'think' ? '›' : line.type === 'tool' ? '$' : '~';
      el.innerHTML = `<span class="terminal-prefix">${prefix}</span> ${line.text}`;
      terminal.appendChild(el);
      terminal.scrollTop = terminal.scrollHeight;
    }, 400 + i * 650);
  });

  // Complete
  setTimeout(() => {
    const last = document.getElementById(ids[ids.length - 1]);
    last.classList.remove('active');
    last.classList.add('completed');
    last.querySelector('.step-pill-status').textContent = 'Complete';
    status.textContent = 'Complete';
    status.className = 'pipeline-status badge-emerald';
    btn.innerHTML = 'Analysis Complete';
    revealResults();
  }, delay);
}

function animateTokens() {
  const staticEl = document.getElementById('staticTokens');
  const agenticEl = document.getElementById('agenticTokens');
  const savingsEl = document.getElementById('tokenSavings');
  const staticTarget = 2697000;
  const agenticTarget = 57226;
  const duration = 8000;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const s = Math.round(staticTarget * eased);
    const a = Math.round(agenticTarget * eased);
    staticEl.textContent = s.toLocaleString();
    agenticEl.textContent = a.toLocaleString();
    const pct = s > 0 ? Math.round((1 - a / s) * 100) : 0;
    savingsEl.textContent = pct + '%';
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function revealResults() {
  const container = document.getElementById('resultsContainer');
  container.classList.add('visible');

  const cards = container.querySelectorAll('.reveal');
  let d = 150;
  cards.forEach(card => {
    setTimeout(() => card.classList.add('visible'), d);
    d += 180;
  });

  setTimeout(() => {
    const ring = document.getElementById('scoreRing');
    const circumference = 2 * Math.PI * 80;
    ring.style.strokeDashoffset = circumference * (1 - SAMPLE_RESULTS.overallScore / 10);
    animateCounter(document.getElementById('scoreNum'), 0, SAMPLE_RESULTS.overallScore, 2000);
  }, 500);

  setTimeout(() => {
    document.querySelectorAll('.dim-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 900);
}
