/**
 * @fileoverview Gemini API Service — Agentic video understanding wrapper.
 * Provides robust error handling, exponential backoff retries, and comprehensive typing.
 */

const API_KEY = import.meta.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Checks whether a valid Gemini API key is configured.
 * When false, the demo runs in simulation mode with sample data.
 * @returns {boolean} True if a real API key is present.
 */
export function isApiConfigured() {
  return Boolean(API_KEY && API_KEY !== 'your-api-key-here');
}

/**
 * Utility function to introduce a delay for exponential backoff.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Represents the usage metadata returned by the Gemini API.
 * @typedef {Object} UsageMetadata
 * @property {number} promptTokenCount - Tokens used in the prompt.
 * @property {number} candidatesTokenCount - Tokens generated in the response.
 * @property {number} totalTokenCount - Total tokens consumed.
 */

/**
 * Represents the standard response from the analyzeVideo function.
 * @typedef {Object} AnalyzeResponse
 * @property {string} text - The generated text output.
 * @property {UsageMetadata} usage - Token usage statistics.
 */

/**
 * Analyze a video with a given prompt using the Gemini API.
 * Includes automatic exponential backoff for rate limits.
 *
 * @param {string} model - Model ID (e.g., 'gemini-3.7-flash').
 * @param {string} videoUri - YouTube URL or uploaded file URI.
 * @param {string} prompt - Analysis prompt text.
 * @param {number} [maxRetries=3] - Maximum number of retries upon API failure.
 * @returns {Promise<AnalyzeResponse>}
 * @throws {Error} If the API key is missing or max retries are exceeded.
 */
export async function analyzeVideo(model, videoUri, prompt, maxRetries = 3) {
  if (!isApiConfigured()) {
    throw new Error('Gemini API key not configured. Add GEMINI_API_KEY to .env');
  }

  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch(
        `${BASE_URL}/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `Video URL: ${videoUri}\n\n${prompt}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2, // Low temperature for deterministic analysis
              maxOutputTokens: 8192,
              media_processing: "AGENTIC"
            },
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        
        // Throw specific error to be caught by the retry block
        const errorMessage = error?.error?.message || `Gemini API error: ${response.status}`;
        
        if (response.status === 429 || response.status >= 500) {
            throw new Error(`Retryable: ${errorMessage}`);
        } else {
            // Non-retryable errors (e.g. 400 Bad Request, 401 Unauthorized)
            throw new Error(`Fatal: ${errorMessage}`);
        }
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const usage = data.usageMetadata ?? {};

      return { text, usage };
      
    } catch (err) {
      attempt++;
      console.warn(`[Gemini API] Attempt ${attempt} failed: ${err.message}`);
      
      if (err.message.startsWith('Fatal:') || attempt >= maxRetries) {
        throw new Error(err.message.replace(/^(Fatal:|Retryable:)\s*/, ''));
      }
      
      // Exponential backoff: 2s, 4s, 8s...
      const backoffMs = Math.pow(2, attempt) * 1000;
      console.log(`[Gemini API] Retrying in ${backoffMs}ms...`);
      await delay(backoffMs);
    }
  }
}

/**
 * Represents the result of a single analysis pass.
 * @typedef {Object} PassResult
 * @property {string} key - The unique identifier of the pass.
 * @property {string} name - The human-readable name of the pass.
 * @property {string} text - The generated output or error message.
 * @property {UsageMetadata|{}} usage - Token usage, or empty if failed.
 */

/**
 * Run a full multi-pass analysis on a video sequentially to manage context and dependencies.
 *
 * @param {string} model - Model ID (e.g., 'gemini-3.7-flash').
 * @param {string} videoUri - Video source.
 * @param {Record<string, {name: string, prompt: string}>} passes - Pass configurations.
 * @param {(passKey: string, status: 'running'|'done'|'error') => void} [onProgress] - Optional progress callback.
 * @returns {Promise<Array<PassResult>>} A promise that resolves to an array of pass results.
 */
export async function runMultiPassAnalysis(model, videoUri, passes, onProgress) {
  const results = [];

  for (const [key, config] of Object.entries(passes)) {
    onProgress?.(key, 'running');
    try {
      const result = await analyzeVideo(model, videoUri, config.prompt);
      results.push({ key, name: config.name, ...result });
      onProgress?.(key, 'done');
    } catch (err) {
      console.error(`[Gemini API] Pass '${key}' failed completely:`, err);
      // Fail gracefully so subsequent passes can still attempt execution
      results.push({ key, name: config.name, text: `Error: ${err.message}`, usage: {} });
      onProgress?.(key, 'error');
    }
  }

  return results;
}
