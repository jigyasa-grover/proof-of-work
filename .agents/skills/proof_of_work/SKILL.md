---
name: proof-of-work-video-analysis
description: >-
  Analyze a video (YouTube URL or local file) of someone solving a technical
  challenge using the Proof of Work multi-pass pipeline. Evaluates the
  problem-solving PROCESS — debugging maturity, planning, resource usage, code
  iteration, and time management — not just the final output. Use when the user
  asks to analyze a coding video, evaluate a student's screen recording, assess
  someone's problem-solving process from a video, or generate a Process Scorecard.
  Do not use for general video summarization or non-technical video content.
---

# Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant

Runs a multi-pass agentic video analysis pipeline using Gemini to evaluate how
someone solves a technical challenge. Produces a **Process Scorecard** with
timestamped evidence across 5 dimensions.

## Prerequisites

1.  **`uv`**: Read the `uv` skill and follow its Setup instructions to ensure
    `uv` is installed and on PATH.
2.  **`GEMINI_API_KEY`**: Read the `credentials` skill and use its Safe
    Verification protocol to check for `GEMINI_API_KEY` in `~/.env`. If missing,
    prompt the user to add it. They can obtain one at
    [ai.google.dev](https://ai.google.dev).

## Overview

The Proof of Work pipeline sends **5 independent analysis passes** to Gemini's
agentic video understanding model. Each pass has a specialized prompt that
instructs the model to navigate the video timeline and evaluate a specific
dimension of the student's process:

| Pass | Dimension | Weight |
|------|-----------|--------|
| `process_timeline` | Approach Strategy — planning, phases, time distribution | 25% |
| `debugging_analysis` | Debugging Maturity — error reading, hypothesis formation | 25% |
| `resource_usage` | Resource Usage — AI tools, copy-paste, documentation | 20% |
| `code_quality` | Code Iteration — refactoring, naming, incremental testing | 15% |
| `scorecard` | Final Scorecard — weighted synthesis with verdict | 15% |

For detailed pass descriptions and scoring rubrics, see
[analysis_passes.md](./references/analysis_passes.md).

## Core Rules

-   **Use the Wrapper Script**: ALWAYS execute the provided
    [analyze_video.py](./scripts/analyze_video.py) script. Do NOT try to call
    the Gemini API directly or recreate the analysis logic.
-   **Credential Safety**: Never read, print, or echo the API key. The script
    loads it automatically from `~/.env`.
-   **Present Results as Artifact**: Always present the analysis output as a
    structured markdown artifact titled "Process Scorecard — [video title or URL]".

## Usage

### Full Analysis (Default — All 5 Passes)

```bash
uv run <path-to-skill>/scripts/analyze_video.py --video "<VIDEO_URL_OR_PATH>"
```

### Specific Passes Only

```bash
uv run <path-to-skill>/scripts/analyze_video.py --video "<VIDEO_URL_OR_PATH>" --passes scorecard debugging_analysis
```

### JSON Output (For Programmatic Parsing)

```bash
uv run <path-to-skill>/scripts/analyze_video.py --video "<VIDEO_URL_OR_PATH>" --json
```

### Save Results to File

```bash
uv run <path-to-skill>/scripts/analyze_video.py --video "<VIDEO_URL_OR_PATH>" --output results.json
```

Replace `<path-to-skill>` with the resolved absolute path to this skill
directory (the directory containing this `SKILL.md` file).

## Available Passes

The `--passes` flag accepts any combination of:
-   `process_timeline` — Phase identification and time distribution
-   `debugging_analysis` — Error handling and debugging behavior
-   `resource_usage` — External resource and AI tool usage patterns
-   `code_quality` — Code evolution, naming, and testing behavior
-   `scorecard` — Final weighted scorecard with verdict and recommendations

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Missing API key |
| `2` | Video upload/processing error |
| `3` | API error during analysis |

## Interpreting Results

When presenting results to the user:

1.  **Lead with the Overall Score and Verdict** from the scorecard pass
2.  **Highlight key timestamped evidence** — these are the moments that matter
3.  **Call out the delta column** in any before/after comparisons
4.  **Include token usage** — it demonstrates the efficiency of agentic processing
5.  If the user only ran a subset of passes, note which passes were skipped and
    offer to run them
