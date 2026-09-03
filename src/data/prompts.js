/** Analysis Prompts — The five passes sent to Gemini. */
export const PROMPTS = {
  process_timeline: {
    name: 'Process Timeline & Phases',
    prompt: `You are an expert coding instructor analyzing a student's screen recording
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

Format as a structured timeline with timestamps.`,
  },

  debugging_analysis: {
    name: 'Debugging & Error Handling',
    prompt: `You are an expert coding instructor analyzing a student's screen recording.

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
Provide specific evidence for your rating.`,
  },

  resource_usage: {
    name: 'Resource Usage & Originality',
    prompt: `You are an expert coding instructor analyzing a student's screen recording.

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
Provide timestamped evidence.`,
  },

  code_quality: {
    name: 'Code Quality & Iteration',
    prompt: `You are an expert coding instructor analyzing a student's screen recording.

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
Provide timestamped evidence.`,
  },

  scorecard: {
    name: 'Final Process Scorecard',
    prompt: `You are an expert coding instructor creating a FINAL PROCESS SCORECARD
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
- [Specific next steps for the student]`,
  },
};
