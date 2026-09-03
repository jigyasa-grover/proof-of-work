/** Problem Section — The Inspection Paradox in technical competency evaluation. */
import { doodle } from '../lib/doodles.js';

export const Problem = {
  render() {
    return `
      <section id="problem">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-label">${doodle('search', 14)} The Inspection Paradox</div>
            <h2 class="section-title">Identical Artifacts.<br><span class="text-gradient">Orthogonal Cognitive Trajectories.</span></h2>
            <p class="section-desc">
              When generative synthesizers achieve high pass@k on terminal unit tests, output-only assessment ($Y = f(X)$) becomes degenerate. The true discriminative signal resides in the continuous latent problem-solving trajectory $\\mathcal{T}$.
            </p>
          </div>

          <div class="problem-grid">
            <div class="student-card student-a card notebook-ruled-page reveal-left reveal-delay-1" style="position:relative;">
              <div class="washi-tape sage center"></div>
              <div class="paperclip-holder">${doodle('paperclip', 26)}</div>
              <div class="stamp-badge grade-a-stamp">${doodle('gradeA', 36)}</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <div class="student-label" style="color:var(--green); font-weight:800; display:flex; align-items:center; gap:6px;">
                  ${doodle('pencil', 16)} Candidate A <span class="tag-badge green">Verified Mastery</span>
                </div>
                <div class="handwritten-tag green-tag">Hypothesis-Driven</div>
              </div>
              
              <div class="student-output">
                <span class="check">${doodle('checkDouble', 16)}</span>
                <span>PyTorch ConvNet — <strong>87.2% Val Accuracy</strong> — Unit Tests: 10/10</span>
              </div>
              <ul class="student-traits">
                <li><span class="trait-icon">${doodle('pencil', 14)}</span> <strong>Pre-computation planning:</strong> Explicitly calculated receptive fields and feature map dimensions before instantiation.</li>
                <li><span class="trait-icon">${doodle('search', 14)}</span> <strong>Deterministic fault isolation:</strong> Trapped CUDA dimension mismatch via granular <code>print(x.shape)</code> assertions.</li>
                <li><span class="trait-icon">${doodle('code', 14)}</span> <strong>Critical AI attribution:</strong> Queried LLM for data augmentation transforms, modified hyperparameters, verified tensor shapes.</li>
                <li><span class="trait-icon">${doodle('trendUp', 14)}</span> <strong>Controlled ablation cycles:</strong> Systematically compared loss trajectories across V1 (baseline) → V2 (+BatchNorm) → V3 (+Aug).</li>
                <li><span class="trait-icon">${doodle('flask', 14)}</span> <strong>Generalization audit:</strong> Generated per-class confusion matrices to analyze classification boundaries on hard edge classes.</li>
              </ul>
            </div>

            <div class="student-card student-b card reveal-right reveal-delay-2" style="position:relative;">
              <div class="washi-tape yellow center"></div>
              <div class="stamp-badge review-stamp">Needs Audit</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <div class="student-label" style="color:var(--red); font-weight:800; display:flex; align-items:center; gap:6px;">
                  ${doodle('clipboard', 16)} Candidate B <span class="tag-badge red">Stochastic Output</span>
                </div>
                <div class="handwritten-tag red-tag">Blind Prompting</div>
              </div>

              <div class="student-output">
                <span class="check" style="color:var(--red);">${doodle('checkDouble', 16)}</span>
                <span>PyTorch ConvNet — <strong>87.2% Val Accuracy</strong> — Unit Tests: 10/10</span>
              </div>
              <ul class="student-traits">
                <li><span class="trait-icon" style="color:var(--red);">✕</span> <strong>Zero architectural decomposition:</strong> Blindly copy-pasted monolithic model definitions from unverified web sources.</li>
                <li><span class="trait-icon" style="color:var(--red);">✕</span> <strong>Stochastic error recovery:</strong> Randomly edited kernel strides and padding until the CUDA crash ceased.</li>
                <li><span class="trait-icon" style="color:var(--red);">✕</span> <strong>Uninspected code injection:</strong> Repeatedly prompted external LLM with "fix my code", applying diffs without reading.</li>
                <li><span class="trait-icon" style="color:var(--red);">✕</span> <strong>No empirical ablation:</strong> Single-pass execution; stopped experimentation at the first random seed crossing threshold.</li>
                <li><span class="trait-icon" style="color:var(--red);">✕</span> <strong>Absence of model validation:</strong> Skipped validation loss curve inspection and confusion matrix error analysis.</li>
              </ul>
            </div>
          </div>
          
          <div class="handwritten-note" style="margin-top:20px; justify-content:center; color:var(--accent); font-size:19px;">
            ${doodle('curvedArrowDown', 24)} <span>Same final score (87.2%), yet completely orthogonal engineering trajectories!</span>
          </div>

          <div class="problem-punchline reveal" style="position:relative;">
            <div class="handwritten-margin-note">
              ${doodle('curvedArrowDown', 24)} <span>The Fundamental Failure Mode of Output Rubrics</span>
            </div>
            Downstream test suites evaluate them as <em>statistically identical</em>. Same code snippet. Same test accuracy.<br>
            <strong class="text-gradient">Proof of Work</strong> inspects the <em>latent problem-solving trajectory</em> — providing educators and engineering leaders with verified cognitive telemetry.
          </div>
        </div>
      </section>
    `;
  },
};
