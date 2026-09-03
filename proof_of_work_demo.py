# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "google-genai>=1.0.0",
#     "pydantic>=2.0.0",
# ]
# ///
# -*- coding: utf-8 -*-
"""
Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant
===================================================================================================
Autonomous multi-pass video evaluation pipeline powered by Gemini Agentic Video models.
Reconstructs and grades problem-solving trajectories from developer screen telemetry.

Usage:
    uv run proof_of_work_demo.py --video <path_or_youtube_url>
    python proof_of_work_demo.py --video <path_or_youtube_url> [--api-key <key>]
"""

import argparse
import json
import os
import sys
import time
import textwrap
import logging
from typing import Optional, List, Dict, Any

from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from google.genai.errors import APIError

# ──────────────────────────────────────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────────────────────────────────────

# Configure robust logging for Senior Staff engineering standards
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

# Updated to current production Agentic Video Understanding model
MODEL_ID = "gemini-3.7-flash"

# ──────────────────────────────────────────────────────────────────────────────
# Pydantic Schemas for Structured JSON Output
# ──────────────────────────────────────────────────────────────────────────────

class TimelinePhase(BaseModel):
    phase_name: str = Field(description="Name of the phase, e.g., 'Planning', 'Debugging'")
    start_time: str = Field(description="Approximate start timestamp")
    end_time: str = Field(description="Approximate end timestamp")
    description: str = Field(description="What the student did during this phase")
    time_percentage: int = Field(description="Percentage of total time spent in this phase")

class ProcessTimelineResult(BaseModel):
    phases: List[TimelinePhase]
    read_problem_fully: bool = Field(description="Did they read the problem fully before coding?")
    planned_before_coding: bool = Field(description="Did they plan or jump straight into code?")
    tested_solution: bool = Field(description="Did they test their solution?")
    refactored_code: bool = Field(description="Did they refactor or just stop at 'it works'?")

class DebuggingIssue(BaseModel):
    timestamp: str = Field(description="Timestamp of when the error appeared")
    issue_description: str = Field(description="What the error/issue was")
    student_reaction: str = Field(description="Detailed reaction of the student")
    resolution_time: str = Field(description="How long it took to resolve")
    was_fix_correct: bool = Field(description="Was the fix correct?")

class DebuggingAnalysisResult(BaseModel):
    issues: List[DebuggingIssue]
    overall_maturity: str = Field(description="Expert / Proficient / Developing / Novice")
    evidence: str = Field(description="Specific evidence for the maturity rating")

class ResourceUsage(BaseModel):
    resource_type: str = Field(description="Type of resource (e.g., Documentation, AI, StackOverflow)")
    duration: str = Field(description="How long they spent on it")
    behavior: str = Field(description="Did they copy-paste, read and adapt, evaluate critically, etc?")

class ResourceUsageResult(BaseModel):
    resources: List[ResourceUsage]
    copy_paste_patterns: str = Field(description="Analysis of copy-paste behavior")
    originality_rating: str = Field(description="Original Work / AI-Assisted (Appropriate) / Heavy Borrowing / Suspected Copy-Paste")
    evidence: str = Field(description="Timestamped evidence")

class CodeQualityResult(BaseModel):
    code_evolution: str = Field(description="Did code get cleaner? Any refactoring?")
    naming_and_style: str = Field(description="Variable naming and coding style consistency")
    thinking_indicators: str = Field(description="Moments paused to think, pseudocode, etc.")
    testing_behavior: str = Field(description="Incremental testing, edge cases, etc.")
    iteration_quality: str = Field(description="Highly Iterative / Moderately Iterative / Single-Pass / No Testing")
    evidence: str = Field(description="Timestamped evidence")

class ScorecardDimension(BaseModel):
    rating: str = Field(description="Categorical rating for this dimension")
    evidence: str = Field(description="Key observations with timestamps")
    score: int = Field(description="Score out of 10")

class FinalScorecardResult(BaseModel):
    approach_strategy: ScorecardDimension
    debugging_maturity: ScorecardDimension
    resource_usage: ScorecardDimension
    code_iteration_quality: ScorecardDimension
    time_management: ScorecardDimension
    overall_score: float = Field(description="Weighted average score out of 10")
    process_verdict: str = Field(description="Verified Original Process / Needs Review / Flagged")
    key_strengths: List[str]
    areas_for_improvement: List[str]
    recommendations: List[str]


# ──────────────────────────────────────────────────────────────────────────────
# Pass Configurations
# ──────────────────────────────────────────────────────────────────────────────

ANALYSIS_PASSES = {
    "process_timeline": {
        "name": "Process Timeline & Phases",
        "prompt": "Identify the PHASES of their problem-solving process. Provide a structured timeline.",
        "schema": ProcessTimelineResult
    },
    "debugging_analysis": {
        "name": "Debugging & Error Handling",
        "prompt": "Focus ONLY on moments where errors, bugs, or unexpected behavior occurred. Rate overall debugging maturity.",
        "schema": DebuggingAnalysisResult
    },
    "resource_usage": {
        "name": "Resource Usage & Originality",
        "prompt": "Track ALL external resource usage throughout the recording. Rate originality.",
        "schema": ResourceUsageResult
    },
    "code_quality": {
        "name": "Code Quality & Iteration",
        "prompt": "Evaluate the quality of their coding process, code evolution, and testing behavior.",
        "schema": CodeQualityResult
    },
    "scorecard": {
        "name": "Final Process Scorecard",
        "prompt": "Based on your complete analysis, produce a structured final process scorecard.",
        "schema": FinalScorecardResult
    },
}

# ──────────────────────────────────────────────────────────────────────────────
# Core Analysis Engine
# ──────────────────────────────────────────────────────────────────────────────

def create_client(api_key: str) -> genai.Client:
    """Initialize the Gemini client."""
    return genai.Client(api_key=api_key)


def upload_video(client: genai.Client, video_path: str) -> Any:
    """Upload a local video file and wait for processing."""
    logger.info(f"Uploading video: {video_path}")
    
    try:
        video_file = client.files.upload(file=video_path)
        while video_file.state == "PROCESSING":
            logger.info("Waiting for video processing...")
            time.sleep(10)
            video_file = client.files.get(name=video_file.name)

        if video_file.state == "FAILED":
            logger.error(f"Video processing failed: {video_file.state}")
            raise ValueError(f"Video processing failed: {video_file.state}")

        logger.info(f"Video ready: {video_file.uri}")
        return video_file
    except Exception as e:
        logger.error(f"Failed to upload video: {e}")
        raise


def build_video_input(video_source: str, video_file: Optional[Any] = None) -> types.Part:
    """Build the video input Part for the API with agentic processing."""
    if video_source.startswith(("http://", "https://")):
        return types.Part(
            file_data=types.FileData(file_uri=video_source, mime_type="video/*"),
            media_processing="AGENTIC",
        )
    elif video_file:
        return types.Part(
            file_data=types.FileData(file_uri=video_file.uri, mime_type=video_file.mime_type),
            media_processing="AGENTIC",
        )
    else:
        logger.error("For local files, video_file must be provided.")
        raise ValueError("For local files, video_file must be provided.")


def run_analysis_pass(
    client: genai.Client,
    video_input: Dict[str, Any],
    pass_key: str,
    pass_config: Dict[str, Any],
    model: str = MODEL_ID,
    max_retries: int = 3
) -> Dict[str, Any]:
    """Run a single analysis pass using agentic video understanding with structured JSON output."""
    logger.info("-" * 60)
    logger.info(f"Running: {pass_config['name']}")
    logger.info("-" * 60)

    for attempt in range(1, max_retries + 1):
        try:
            result = client.models.generate_content(
                model=model,
                contents=[
                    video_input,
                    pass_config["prompt"],
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=pass_config["schema"],
                    temperature=0.2,
                )
            )

            usage = result.usage_metadata
            logger.info(f"Tokens — Input: {usage.prompt_token_count:,} | "
                        f"Output: {usage.candidates_token_count:,} | "
                        f"Total: {usage.total_token_count:,}")

            return {
                "pass": pass_key,
                "name": pass_config["name"],
                "output": json.loads(result.text),
                "tokens": {
                    "input": usage.prompt_token_count,
                    "output": usage.candidates_token_count,
                    "total": usage.total_token_count,
                },
            }
        except APIError as e:
            logger.warning(f"API Error on attempt {attempt}/{max_retries}: {e}")
            if attempt == max_retries:
                logger.error("Max retries reached. Pass failed.")
                raise
            time.sleep(2 ** attempt)  # Exponential backoff
        except Exception as e:
            logger.error(f"Unexpected error during generation: {e}")
            raise


def run_full_analysis(
    client: genai.Client,
    video_source: str,
    passes: Optional[List[str]] = None,
    model: str = MODEL_ID,
) -> Dict[str, Any]:
    """Run the full multi-pass 'Proof of Work' analysis."""
    logger.info("=" * 60)
    logger.info("SHOW YOUR WORK — Process Verification")
    logger.info("=" * 60)
    logger.info(f"Video: {video_source} | Model: {model}")

    video_file = None
    if not video_source.startswith(("http://", "https://")):
        video_file = upload_video(client, video_source)

    video_input = build_video_input(video_source, video_file)

    if passes is None:
        passes = list(ANALYSIS_PASSES.keys())

    results = []
    total_tokens = 0

    for pass_key in passes:
        if pass_key not in ANALYSIS_PASSES:
            logger.warning(f"Unknown pass: {pass_key}, skipping.")
            continue

        pass_result = run_analysis_pass(
            client, video_input, pass_key, ANALYSIS_PASSES[pass_key], model=model
        )
        results.append(pass_result)
        total_tokens += pass_result["tokens"]["total"]

    return {
        "video_source": video_source,
        "analysis_passes": results,
        "total_tokens_used": total_tokens,
        "pass_count": len(results),
    }


def print_report(report: Dict[str, Any]):
    """Pretty-print the analysis report."""
    logger.info("\n╔" + "═" * 58 + "╗")
    logger.info("║" + "PROCESS VERIFICATION REPORT".center(58) + "║")
    logger.info("╠" + "═" * 58 + "╣")

    for pass_result in report["analysis_passes"]:
        logger.info(f"\n{'━' * 60}")
        logger.info(f"  {pass_result['name']}")
        logger.info(f"{'━' * 60}")
        # Pretty print JSON output
        logger.info(json.dumps(pass_result["output"], indent=2))

    logger.info(f"\n{'━' * 60}")
    logger.info("  Token Usage Summary")
    logger.info(f"{'━' * 60}")
    for pass_result in report["analysis_passes"]:
        t = pass_result["tokens"]
        logger.info(f"  {pass_result['name']}: {t['total']:,} tokens")
    logger.info(f"  {'─' * 40}")
    logger.info(f"  TOTAL: {report['total_tokens_used']:,} tokens")
    logger.info(f"  Passes run: {report['pass_count']}")
    logger.info("\n╚" + "═" * 58 + "╝")


# ──────────────────────────────────────────────────────────────────────────────
# CLI Entry Point
# ──────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Proof of Work: Agentic Video Understanding with Gemini as Your AI Teaching Assistant",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""\
            Examples:
              # Analyze a local screen recording
              python proof_of_work_demo.py --video recording.mp4

              # Save results to JSON
              python proof_of_work_demo.py --video recording.mp4 --output results.json
        """),
    )

    parser.add_argument(
        "--video", required=True,
        help="Path to local video file or YouTube URL",
    )
    parser.add_argument(
        "--model", default=os.environ.get("GEMINI_MODEL", MODEL_ID),
        help=f"Gemini Model ID (default: {MODEL_ID})",
    )
    parser.add_argument(
        "--api-key", default=os.environ.get("GEMINI_API_KEY"),
        help="Gemini API key (default: $GEMINI_API_KEY env var)",
    )
    parser.add_argument(
        "--passes", nargs="*", default=None,
        choices=list(ANALYSIS_PASSES.keys()),
        help="Specific analysis passes to run (default: all)",
    )
    parser.add_argument(
        "--output", default=None,
        help="Save JSON results to this file",
    )

    args = parser.parse_args()

    if not args.api_key:
        logger.error("No API key. Set GEMINI_API_KEY or use --api-key.")
        sys.exit(1)

    try:
        client = create_client(args.api_key)
        report = run_full_analysis(client, args.video, args.passes, model=args.model)
        print_report(report)

        if args.output:
            with open(args.output, "w") as f:
                json.dump(report, f, indent=2)
            logger.info(f"\nResults saved to: {args.output}")
            
    except KeyboardInterrupt:
        logger.warning("\nAnalysis interrupted by user.")
        sys.exit(130)
    except Exception as e:
        logger.critical(f"Analysis failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
