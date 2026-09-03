# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "google-genai>=1.0.0",
#     "python-dotenv>=1.0.0",
# ]
# ///
# -*- coding: utf-8 -*-
"""
Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant
===================================================================================================
Analyzes a video (YouTube URL or local file) using Gemini's agentic video
understanding to evaluate the problem-solving PROCESS of someone working
through a technical challenge.

Runs a configurable multi-pass analysis pipeline and outputs a structured
Process Scorecard with timestamped evidence.

Usage:
    uv run analyze_video.py --video <path_or_youtube_url>
    uv run analyze_video.py --video <url> --passes scorecard debugging_analysis
    uv run analyze_video.py --video <url> --json
    uv run analyze_video.py --video <url> --output results.json

Exit Codes:
    0 — Success
    1 — Missing API key
    2 — Video upload/processing error
    3 — API error during analysis
"""

import argparse
import json
import os
import sys
import textwrap
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai


# ──────────────────────────────────────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────────────────────────────────────

MODEL_ID = "models/gemini-3.7-flash"

ANALYSIS_PASSES = {
    "process_timeline": {
        "name": "Process Timeline & Phases",
        "prompt": textwrap.dedent("""\
            You are an expert coding instructor analyzing a student's screen recording
            of them solving a programming challenge.

            Identify the PHASES of their problem-solving process. For each phase, provide:
            1. Phase name (e.g., "Reading the problem", "Planning/pseudocode",
               "Initial implementation", "Debugging", "Testing", "Refactoring", "Final review")
            2. Approximate start and end timestamps
            3. What the student did during this phase
            4. How long they spent (as percentage of total time)

            Also note:
            - Did they read/understand the problem fully before coding?
            - Did they plan or jump straight into code?
            - Did they test their solution?
            - Did they refactor or just stop at "it works"?

            Format as a structured timeline with timestamps.
        """),
    },
    "debugging_analysis": {
        "name": "Debugging & Error Handling",
        "prompt": textwrap.dedent("""\
            You are an expert coding instructor analyzing a student's screen recording.

            Focus ONLY on moments where errors, bugs, or unexpected behavior occurred.
            For each error/issue encountered:

            1. Timestamp of when the error appeared
            2. What the error/issue was (if visible)
            3. How the student reacted:
               - Did they READ the error message carefully?
               - Did they form a hypothesis about the cause?
               - Did they add debugging statements (print, console.log, breakpoints)?
               - Did they immediately Google/search without thinking first?
               - Did they use trial-and-error (random changes until it works)?
               - Did they systematically isolate the issue?
            4. How long it took to resolve
            5. Was the fix correct, or did it introduce new issues?

            Rate overall debugging maturity: Expert / Proficient / Developing / Novice
            Provide specific evidence for your rating.
        """),
    },
    "resource_usage": {
        "name": "Resource Usage & Originality",
        "prompt": textwrap.dedent("""\
            You are an expert coding instructor analyzing a student's screen recording.

            Track ALL external resource usage throughout the recording:

            1. Tab switches / browser usage:
               - What sites did they visit? (documentation, Stack Overflow, AI assistants,
                 GitHub, tutorial sites, solution repositories)
               - How long did they spend on each?
               - Did they copy-paste code directly, or read and adapt?

            2. AI tool usage (Gemini, code assistants, etc.):
               - Did they use AI assistance? When?
               - Did they critically evaluate AI suggestions or blindly accept them?
               - Did they modify AI-generated code to fit their approach?

            3. Copy-paste patterns:
               - Any large blocks of code that appeared suddenly (not typed)?
               - Did pasted code integrate naturally or look foreign to their style?

            4. Documentation usage:
               - Did they reference official docs? Language references?
               - Was doc usage targeted (looking up specific APIs) or aimless browsing?

            Rate originality: Original Work / AI-Assisted (Appropriate) /
                             Heavy Borrowing / Suspected Copy-Paste
            Provide timestamped evidence.
        """),
    },
    "code_quality": {
        "name": "Code Quality & Iteration",
        "prompt": textwrap.dedent("""\
            You are an expert coding instructor analyzing a student's screen recording.

            Evaluate the quality of their coding process:

            1. Code evolution:
               - Did the code get cleaner over time or messier?
               - Any refactoring moments? (renaming variables, extracting functions,
                 improving structure)
               - Did they go back and improve earlier code after learning something?

            2. Naming & style:
               - Are variable/function names meaningful or arbitrary (x, temp, foo)?
               - Consistent coding style?

            3. Thinking indicators:
               - Moments where they paused to think (cursor idle, reading code)
               - Comments written to organize thoughts
               - Pseudocode or TODO notes

            4. Testing behavior:
               - Did they run the code incrementally or only at the end?
               - Did they test edge cases?
               - Did they verify correctness of intermediate steps?

            Rate iteration quality: Highly Iterative / Moderately Iterative /
                                   Single-Pass / No Testing
            Provide timestamped evidence.
        """),
    },
    "scorecard": {
        "name": "Final Process Scorecard",
        "prompt": textwrap.dedent("""\
            You are an expert coding instructor creating a FINAL PROCESS SCORECARD
            for a student's screen recording of solving a programming challenge.

            Based on your complete analysis of the video, produce a structured scorecard:

            ## Process Scorecard

            ### 1. Approach Strategy (weight: 25%)
            - Rating: [Structured / Partially Structured / Ad Hoc]
            - Evidence: [Key observations with timestamps]
            - Score: [1-10]

            ### 2. Debugging Maturity (weight: 25%)
            - Rating: [Expert / Proficient / Developing / Novice]
            - Evidence: [Key observations with timestamps]
            - Score: [1-10]

            ### 3. Resource Usage (weight: 20%)
            - Rating: [Balanced / Over-reliant on AI / Under-resourced / Copy-Paste]
            - Evidence: [Key observations with timestamps]
            - Score: [1-10]

            ### 4. Code Iteration & Quality (weight: 15%)
            - Rating: [Highly Iterative / Moderate / Single-Pass / No Testing]
            - Evidence: [Key observations with timestamps]
            - Score: [1-10]

            ### 5. Time Management (weight: 15%)
            - Rating: [Efficient / Adequate / Inefficient / Poor]
            - Evidence: [Time distribution across phases]
            - Score: [1-10]

            ### Overall Process Score: [Weighted average /10]
            ### Process Verdict: [Verified Original Process / Needs Review / Flagged]

            ### Key Strengths:
            - [Bullet points]

            ### Areas for Improvement:
            - [Bullet points]

            ### Recommendations:
            - [Specific next steps for the student]
        """),
    },
}


# ──────────────────────────────────────────────────────────────────────────────
# Credential Loading
# ──────────────────────────────────────────────────────────────────────────────

def load_api_key() -> str | None:
    """Load GEMINI_API_KEY from ~/.env without exposing it."""
    env_path = Path.home() / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    # Also check project-level .env
    load_dotenv(override=False)
    return os.environ.get("GEMINI_API_KEY")


# ──────────────────────────────────────────────────────────────────────────────
# Core Analysis Engine
# ──────────────────────────────────────────────────────────────────────────────

def create_client(api_key: str) -> genai.Client:
    """Initialize the Gemini client."""
    return genai.Client(api_key=api_key)


def upload_video(client: genai.Client, video_path: str):
    """Upload a local video file and wait for processing."""
    print(f"\nUploading video: {video_path}", file=sys.stderr)
    video_file = client.files.upload(file=video_path)

    while video_file.state == "PROCESSING":
        print("  Waiting for video processing...", file=sys.stderr)
        time.sleep(10)
        video_file = client.files.get(name=video_file.name)

    if video_file.state == "FAILED":
        raise ValueError(f"Video processing failed: {video_file.state}")

    print(f"  Video ready: {video_file.uri}", file=sys.stderr)
    return video_file


def build_video_input(video_source: str, video_file=None) -> dict:
    """Build the video input dict for the API."""
    if video_source.startswith(("http://", "https://")):
        return {"type": "video", "uri": video_source}
    elif video_file:
        return {
            "type": "video",
            "uri": video_file.uri,
            "mime_type": video_file.mime_type,
        }
    else:
        raise ValueError("For local files, video_file must be provided.")


def run_analysis_pass(
    client: genai.Client,
    video_input: dict,
    pass_key: str,
    pass_config: dict,
) -> dict:
    """Run a single analysis pass using agentic video understanding."""
    print(f"\n{'─' * 60}", file=sys.stderr)
    print(f"  Running: {pass_config['name']}", file=sys.stderr)
    print(f"{'─' * 60}", file=sys.stderr)

    result = client.interactions.create(
        model=MODEL_ID,
        input=[
            video_input,
            {"type": "text", "text": pass_config["prompt"]},
        ],
    )

    usage = result.usage
    print(
        f"  Tokens — Input: {usage.total_input_tokens:,} | "
        f"Output: {usage.total_output_tokens:,} | "
        f"Total: {usage.total_tokens:,}",
        file=sys.stderr,
    )

    return {
        "pass": pass_key,
        "name": pass_config["name"],
        "output": result.output_text,
        "tokens": {
            "input": usage.total_input_tokens,
            "output": usage.total_output_tokens,
            "total": usage.total_tokens,
        },
    }


def run_full_analysis(
    client: genai.Client,
    video_source: str,
    passes: list[str] | None = None,
) -> dict:
    """Run the multi-pass Proof of Work analysis."""
    print("=" * 60, file=sys.stderr)
    print("  PROOF OF WORK — Process Verification", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    print(f"  Video: {video_source}", file=sys.stderr)

    # Upload if local file
    video_file = None
    if not video_source.startswith(("http://", "https://")):
        if not os.path.exists(video_source):
            print(f"Error: File not found: {video_source}", file=sys.stderr)
            sys.exit(2)
        video_file = upload_video(client, video_source)

    video_input = build_video_input(video_source, video_file)

    # Determine which passes to run
    if passes is None:
        passes = list(ANALYSIS_PASSES.keys())

    results = []
    total_tokens = 0

    for pass_key in passes:
        if pass_key not in ANALYSIS_PASSES:
            print(f"  Warning: Unknown pass '{pass_key}', skipping.", file=sys.stderr)
            continue

        try:
            pass_result = run_analysis_pass(
                client, video_input, pass_key, ANALYSIS_PASSES[pass_key]
            )
            results.append(pass_result)
            total_tokens += pass_result["tokens"]["total"]
        except Exception as e:
            print(f"  Error in pass '{pass_key}': {e}", file=sys.stderr)
            sys.exit(3)

    return {
        "video_source": video_source,
        "analysis_passes": results,
        "total_tokens_used": total_tokens,
        "pass_count": len(results),
    }


# ──────────────────────────────────────────────────────────────────────────────
# Output Formatting
# ──────────────────────────────────────────────────────────────────────────────

def print_report_human(report: dict):
    """Pretty-print the analysis report in human-readable format."""
    print()
    print("=" * 60)
    print("  PROCESS VERIFICATION REPORT")
    print("=" * 60)

    for pass_result in report["analysis_passes"]:
        print(f"\n{'━' * 60}")
        print(f"  {pass_result['name']}")
        print(f"{'━' * 60}")
        print(pass_result["output"])

    print(f"\n{'━' * 60}")
    print("  Token Usage Summary")
    print(f"{'━' * 60}")
    for pass_result in report["analysis_passes"]:
        t = pass_result["tokens"]
        print(f"  {pass_result['name']}: {t['total']:,} tokens")
    print(f"  {'─' * 40}")
    print(f"  TOTAL: {report['total_tokens_used']:,} tokens")
    print(f"  Passes run: {report['pass_count']}")
    print()


# ──────────────────────────────────────────────────────────────────────────────
# CLI Entry Point
# ──────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""\
            Examples:
              # Analyze a YouTube coding video
              uv run analyze_video.py --video https://youtube.com/watch?v=...

              # Analyze a local screen recording
              uv run analyze_video.py --video recording.mp4

              # Run only the scorecard pass
              uv run analyze_video.py --video recording.mp4 --passes scorecard

              # Output as JSON
              uv run analyze_video.py --video recording.mp4 --json

              # Save results
              uv run analyze_video.py --video recording.mp4 --output results.json
        """),
    )

    parser.add_argument(
        "--video", required=True,
        help="Path to local video file or YouTube URL",
    )
    parser.add_argument(
        "--passes", nargs="*", default=None,
        choices=list(ANALYSIS_PASSES.keys()),
        help="Specific analysis passes to run (default: all)",
    )
    parser.add_argument(
        "--json", action="store_true", dest="json_output",
        help="Output results as JSON to stdout",
    )
    parser.add_argument(
        "--output", default=None,
        help="Save JSON results to this file path",
    )

    args = parser.parse_args()

    # Load API key securely
    api_key = load_api_key()
    if not api_key:
        print(
            "Error: GEMINI_API_KEY not found. "
            "Add it to ~/.env or set the environment variable.",
            file=sys.stderr,
        )
        sys.exit(1)

    # Run analysis
    client = create_client(api_key)

    try:
        report = run_full_analysis(client, args.video, args.passes)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(2)

    # Output results
    if args.json_output:
        json.dump(report, sys.stdout, indent=2)
        print()
    else:
        print_report_human(report)

    if args.output:
        with open(args.output, "w") as f:
            json.dump(report, f, indent=2)
        print(f"Results saved to: {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
