<p align="center">
  <img src="https://img.shields.io/badge/Gemini-Agentic%20Video%20Understanding-15432E?style=for-the-badge&logo=google&logoColor=white" alt="Gemini Agentic Video Understanding"/>
  <img src="https://img.shields.io/badge/Built%20With-Vite%20%26%20Vanilla%20JS-15432E?style=for-the-badge&logo=vite&logoColor=white" alt="Built with Vite"/>
  <img src="https://img.shields.io/badge/License-Apache%202.0-34D399?style=for-the-badge" alt="License"/>
</p>

# Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant

> Verify the process, not just the final output!

An AI-powered evaluation system that watches screen recordings to grade *how* engineers actually solve problems — analyzing their planning, debugging approach, use of external resources, and code iteration patterns.

[Why This Matters](#why-this-matters) · [Agentic Traversal](#agentic-multimodal-traversal) · [Architecture](#multi-pass-systems-architecture) · [Scorecard](#calibrated-scorecard) · [Quickstart](#quickstart) · [Agent Skill](#antigravity-agent-skill) · [Read the Blog](./blog.md)

<p align="center">
  <img src="./image.png" alt="Proof of Work: Agentic Video Understanding with Gemini as your AI Teaching Assistant" width="100%"/>
</p>
---

## Why This Matters

In the age of one-click code generation and instant AI autocomplete, **shipping working code has never been easier — and never meant less.** As a simple example: while teaching a deep learning class, two students submit the same PyTorch classifier with identical accuracy and passing tests. One methodically planned the architecture, traced tensor dimensions, and ran careful ablations — the other blindly copy-pasted from ChatGPT until it ran.

**The output is the same. The engineering temperament is not.**

Traditional assessment stops at the artifact: *does the code work?* But in a world of shortcuts, the real signal lives in the *process* — the planning instinct, the debugging discipline, the intellectual honesty to verify rather than vibe-check. These are the qualities that separate engineers who can navigate novel ambiguity from those who collapse without a template.

**Proof of Work** reconstructs the full problem-solving trajectory from continuous screen recordings — grading *how* someone thinks through a challenge, not just what they ship.

- *[Read the blog](./blog.md) for a deeper dive into the architecture, benchmarks, and prompt design.*
- *Try it out* — [Launch the interactive demo](https://jigyasa-grover.github.io/proof-of-work/) and click **"Run Process Analysis"** to watch the 5-pass pipeline evaluate a real 45-minute PyTorch session in real time.

---

## Agentic Multimodal Traversal

Traditional video processing extracts **every frame** at a fixed rate (1 FPS) and dumps them all into context — burning **over 2.7 million tokens** for a 31-minute recording and overwhelming the model's attention.

Gemini's [**agentic video understanding**](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/) takes a different approach — the model **navigates the video timeline on its own**, using built-in tools (`get_transcript`, `get_frames`, `get_audio`) in a **think → tool → observe** loop:

```
┌─────────────────────────────────────┐
│        REASONING ENGINE             │
│       (Gemini 3.7 Flash)            │
└──────────────┬──────────────────────┘
               │  Tool Call Emit
               ▼
┌─────────────────────────────────────┐
│      NATIVE TOOL EXECUTOR           │
│  • get_transcript()                 │
│  • get_frames(start, end, fps)      │
│  • get_audio(start, end)            │
└──────────────┬──────────────────────┘
               │  Tool Observation
               ▼
       ┌───────────────┐
       │  Back to RE   │──→ (next think → tool → observe cycle)
       └───────────────┘
```

### Real-World Performance

| System Parameter | Static Processing (1 FPS) | Proof of Work (Agentic) | Measured Gain |
|:---|:---|:---|:---|
| **Token Ingestion** | 2,697,000 tokens | **57,226 tokens** | **97.9% reduction** |
| **Per-Evaluation Cost** | ~$0.526 | **~$0.011** | **97.9% cheaper** |
| **Passes** | 1 monolithic prompt | **5 focused passes** | Better signal quality |

---

## Multi-Pass Systems Architecture

Instead of asking one prompt to evaluate everything at once (which degrades quality), Proof of Work splits the analysis into **5 focused passes**:

```
┌───────────────────────────────────────────────────────────────────────┐
│                        SCREEN RECORDING INPUT                         │
│      Continuous capture stream (30-60 min @ 1080p, variable FPS)      │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│            GEMINI 3.7 FLASH — Agentic Video Understanding             │
│                                                                       │
│  get_transcript()  · get_frames(start, end, fps)  · get_audio(s, e)   │
└─────────┬───────────────────────┬───────────────────────┬─────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│ Pass 1: Timeline   │  │ Pass 2: Debug      │  │ Pass 3: Resource   │
│ & Planning         │  │ Behavior           │  │ Usage              │
│                    │  │                    │  │                    │
│ Did they plan      │  │ How they handle    │  │ Docs vs. blind     │
│ before coding?     │  │ errors             │  │ copy-paste         │
└─────────┬──────────┘  └─────────┬──────────┘  └─────────┬──────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
┌───────────────────────────────────────────────────────────────────────┐
│  Pass 4: Code Iteration                                               │
│  Refactoring, testing, version improvements                           │
│                                                                       │
│  Pass 5: Final Scorecard                                              │
│  Combine all evidence into a scored rubric with timestamps            │
└───────────────────────────────────────────────────────────────────────┘
```

### Scoring Dimensions

| Dimension | Weight | What It Measures |
|:---|:---:|:---|
| **Approach Strategy** | **25%** | Did they plan before coding? Sketch architectures, calculate dimensions, decompose the problem? |
| **Debugging Maturity** | **25%** | How do they respond to errors? Systematic diagnosis vs. random guessing? |
| **Resource Usage** | **20%** | Do they read docs and verify AI suggestions, or blindly paste code without understanding it? |
| **Code Iteration** | **15%** | Do they iterate and improve (e.g., adding BatchNorm, comparing loss curves), or stop at the first version? |
| **Time Management** | **15%** | Is time well-distributed across planning, building, debugging, and testing? |

---

## Calibrated Scorecard

> ### CALIBRATED PROCESS SCORECARD
> **Overall Score:** 7.8 / 10  
> **Verdict:** VERIFIED ORIGINAL PROCESS
> 
> | Dimension | Score | Visualization | Assessment |
> | :--- | :---: | :--- | :--- |
> | **Approach Strategy** | 8.5 | `████████████████░░` | Structured (3-Block ConvNet Sketched First) |
> | **Debugging Maturity** | 7.5 | `██████████████░░░░` | Proficient (CUDA Shape Mismatch Traced) |
> | **Resource Usage** | 7.0 | `█████████████░░░░░` | Balanced (PyTorch Transforms Adapted) |
> | **Code Iteration** | 8.0 | `███████████████░░░` | Highly Iterative (V1→V2 BatchNorm Ablation) |
> | **Time Management** | 7.5 | `██████████████░░░░` | Efficient (Pacing Maintained Throughout) |
> 
> **Timestamped Evidence:**
> - `[02:30]` Sketched 3-block ConvNet layer dimensions on paper before writing code
> - `[12:45]` Constructed torchvision.transforms data augmentation pipeline (Flip, Crop, Jitter)
> - `[18:20]` Trapped flatten RuntimeError via print(x.shape); resolved dimension in 4m
> - `[28:00]` Controlled ablation: V1 → V2 with BatchNorm2d (+3.1% validation accuracy gain)
> - `[42:00]` Evaluated per-class confusion matrix and boundary cases with matplotlib

---

## Quickstart

### Prerequisites

- **Node.js** ≥ 18 (for the frontend evaluation deck)
- **Python** ≥ 3.10 / `uv` (for CLI analysis engine)
- **Gemini API Key** — Available via [Google AI Studio](https://ai.google.dev)

### 1. Clone the Repository

```bash
git clone https://github.com/jigyasa-grover/proof-of-work.git
cd proof-of-work
```

### 2. Run the Interactive Dashboard

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

Open **`http://localhost:3000`** to explore the interactive dashboard.

### 3. Run the CLI Multi-Pass Engine

```bash
# Analyze a screen recording via the CLI script (using uv)
uv run proof_of_work_demo.py --video https://www.youtube.com/watch?v=3zT_QtIupkE

# Run specific passes with JSON output and custom model selection
uv run proof_of_work_demo.py --video recording.mp4 --passes debugging_analysis scorecard --model gemini-3.7-flash --output scorecard.json
```

---

## Antigravity Agent Skill

This repository packages the entire multi-pass video evaluation pipeline as a native **Google Antigravity Agent Skill** under [`.agents/skills/proof_of_work/`](./.agents/skills/proof_of_work/).

### Skill Architecture

The skill conforms to the official Antigravity customization specification:

```
.agents/skills/proof_of_work/
├── SKILL.md                          # YAML metadata frontmatter, activation triggers & instructions
├── scripts/
│   └── analyze_video.py             # Standalone Python CLI runner (PEP 723 uv isolated)
└── references/
    └── analysis_passes.md           # Formal 5-pass dimensional rubrics & calibration criteria
```

### Using It in the IDE

When using the **Google Antigravity IDE** or the `agy` CLI, the skill is automatically discovered from `.agents/skills/`. Just ask in natural language:

> *"Evaluate this applicant's problem-solving process from their screen recording: https://www.youtube.com/watch?v=3zT_QtIupkE"*

> *"Run a debugging analysis pass on candidate_recording.mp4 to inspect how they isolated tensor dimension errors."*

### Direct CLI Execution via `uv`

The skill can also be run directly as a standalone utility without entering an agent session:

```bash
# Full 5-pass evaluation (auto-resolves dependencies via uv)
uv run .agents/skills/proof_of_work/scripts/analyze_video.py \
  --video "https://www.youtube.com/watch?v=3zT_QtIupkE"

# Focused analysis on specific passes with JSON output
uv run .agents/skills/proof_of_work/scripts/analyze_video.py \
  --video "practicum_session.mp4" \
  --passes debugging_analysis scorecard \
  --json \
  --output scorecard.json
```

## Project Structure

```
proof-of-work/
│
├── .agents/skills/             # ── Antigravity Agent Skill Definition ──
│   └── proof_of_work/
│       ├── SKILL.md            # Agent skill prompt specifications & YAML metadata
│       ├── scripts/            # Standalone CLI analyzer script (uv isolated)
│       └── references/         # Formal dimensional rubrics & calibration standards
│
├── src/                        # ── Frontend Evaluation Dashboard ──
│   ├── main.js                 # App orchestration, ScrollSpy, & progress physics
│   ├── sections/               # Modular components (Hero, Problem, Architecture, Demo, etc.)
│   ├── styles/                 # Notebook design tokens & graph paper styles
│   ├── services/               # Gemini multimodal REST client
│   └── data/                   # Calibrated telemetry & prompt definitions
│
├── blog.md                     # Technical whitepaper & mathematical formulation
├── proof_of_work_demo.py      # Standalone Python CLI engine
├── package.json                # Project configuration
└── vite.config.js              # Vite build setup
```

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
