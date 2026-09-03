# Analysis Passes — Detailed Reference

This document provides detailed descriptions of each of the 5 analysis passes
in the Proof of Work pipeline. The agent reads this only when the user asks
about scoring methodology or pass details.

---

## Pass 1: Process Timeline & Phases (`process_timeline`)

**Weight**: 25% of final score
**Rating Scale**: Structured / Partially Structured / Ad Hoc

Identifies the PHASES of the student's problem-solving process:
- Phase name (Reading, Planning, Implementation, Debugging, Testing, Refactoring, Review)
- Approximate start/end timestamps
- What the student did during each phase
- Time spent per phase (as percentage of total)

**Key Indicators**:
- Did they read/understand the problem fully before coding?
- Did they plan (pseudocode, architecture sketch) or jump straight into code?
- Did they test their solution?
- Did they refactor or stop at "it works"?

---

## Pass 2: Debugging & Error Handling (`debugging_analysis`)

**Weight**: 25% of final score
**Rating Scale**: Expert / Proficient / Developing / Novice

Focuses on moments where errors, bugs, or unexpected behavior occurred:
- Timestamp of each error
- What the error/issue was
- Student's reaction pattern:
  - Read error message carefully?
  - Formed hypothesis about cause?
  - Added debugging statements?
  - Immediately searched without thinking?
  - Used trial-and-error?
  - Systematically isolated the issue?
- Time to resolve
- Whether the fix was correct or introduced new issues

---

## Pass 3: Resource Usage & Originality (`resource_usage`)

**Weight**: 20% of final score
**Rating Scale**: Original Work / AI-Assisted (Appropriate) / Heavy Borrowing / Suspected Copy-Paste

Tracks ALL external resource usage:
- **Tab switches**: Sites visited, time spent, copy-paste vs. read-and-adapt
- **AI tool usage**: When used, critically evaluated vs. blindly accepted, modified to fit approach
- **Copy-paste patterns**: Large code blocks appearing suddenly, integration quality
- **Documentation**: Official docs, targeted lookup vs. aimless browsing

---

## Pass 4: Code Quality & Iteration (`code_quality`)

**Weight**: 15% of final score
**Rating Scale**: Highly Iterative / Moderately Iterative / Single-Pass / No Testing

Evaluates:
- **Code evolution**: Cleaner over time or messier? Refactoring moments?
- **Naming & style**: Meaningful names vs. arbitrary (x, temp, foo), consistency
- **Thinking indicators**: Pauses to think, comments for organizing thoughts, pseudocode/TODOs
- **Testing behavior**: Incremental runs vs. end-only, edge cases, intermediate verification

---

## Pass 5: Final Process Scorecard (`scorecard`)

**Weight**: Synthesis pass (produces the final weighted scorecard)

Produces a structured scorecard combining all dimensions:
- Per-dimension rating + evidence + score (1–10)
- **Overall Process Score**: Weighted average out of 10
- **Process Verdict**: Verified Original Process / Needs Review / Flagged
- Key Strengths (bullet points)
- Areas for Improvement (bullet points)
- Recommendations (specific next steps)

### Scoring Weights

| Dimension | Weight |
|-----------|--------|
| Approach Strategy | 25% |
| Debugging Maturity | 25% |
| Resource Usage | 20% |
| Code Iteration & Quality | 15% |
| Time Management | 15% |
