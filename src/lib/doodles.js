/** Hand-drawn SVG Doodles & Notebook Sketches.
 *  Whiteboard and paper sketch illustrations with organic paths and stroke-based styling.
 */

const svg = (inner, size = 24, className = 'doodle-icon') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${className}">${inner}</svg>`;

export const DOODLES = {
  // ── Core Flow Doodles ──
  record: svg(`
    <rect x="3" y="4" width="18" height="13" rx="2" ry="2"/>
    <path d="M8 20 h8"/>
    <path d="M12 17 v3"/>
    <circle cx="12" cy="10.5" r="3.2"/>
    <circle cx="12" cy="10.5" r="1.2" fill="currentColor"/>
    <path d="M5 7 h2" stroke-width="1.2"/>
  `),

  upload: svg(`
    <path d="M12 16 V5"/>
    <path d="M7.5 9.5 l4.5-4.5 4.5 4.5"/>
    <path d="M20 16.5 c0 2.2-1.8 3.5-4.5 3.5 H8.5 c-2.5 0-4.5-1.5-4.5-3.5"/>
    <path d="M4 16.5 c0-3 2-5 5-5.5"/>
    <path d="M20 16.5 c0-3-2-5-5-5.5"/>
    <path d="M9 11 c0-3 1.5-5.5 3-5.5 s3 2.5 3 5.5"/>
  `),

  analyze: svg(`
    <path d="M12 2 C7 2 3 6 3 11 c0 3.5 2 6.5 5 8"/>
    <path d="M21 11 c0-3.5-2-6.5-5-8"/>
    <path d="M12 2 c2 0 4 1.5 5 3"/>
    <path d="M9 22 l1-4 4 1 1-4"/>
    <circle cx="12" cy="11" r="3"/>
    <path d="M12 8.5 v2.5 h2.5"/>
  `),

  score: svg(`
    <path d="M9 3 H5 a2 2 0 0 0-2 2 v14 a2 2 0 0 0 2 2 h14 a2 2 0 0 0 2-2 V5 a2 2 0 0 0-2-2 h-4"/>
    <path d="M9 3 c0-1 1-2 3-2 s3 1 3 2"/>
    <path d="M8 11.5 l2.5 2.5 5-6"/>
    <path d="M8 16.5 h8"/>
  `),

  // ── Architecture Passes ──
  compass: svg(`
    <circle cx="12" cy="12" r="9"/>
    <path d="M16.5 7.5 l-2.2 5.5-5.3 2 2.2-5.5z" fill="currentColor" opacity="0.15"/>
    <path d="M16.5 7.5 l-2.2 5.5-5.3 2 2.2-5.5z"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  `),

  search: svg(`
    <circle cx="10" cy="10" r="6.5"/>
    <path d="M15 15 l5.5 5.5"/>
    <path d="M8 7.5 c1.2-1 2.8-1 3.8 0"/>
  `),

  book: svg(`
    <path d="M4 4.5 h4.5 c2 0 3.5 1 3.5 3 c0-2 1.5-3 3.5-3 H20"/>
    <path d="M4 4.5 v13.5 h4.5 c2 0 3.5 1 3.5 3 c0-2 1.5-3 3.5-3 H20 V4.5"/>
    <path d="M12 7.5 v13.5"/>
    <path d="M6 8.5 h2.5"/>
  `),

  code: svg(`
    <path d="M8 7 l-4.5 5 4.5 5"/>
    <path d="M16 7 l4.5 5-4.5 5"/>
    <path d="M14 4.5 l-4 15"/>
  `),

  clipboard: svg(`
    <path d="M9 3 H5 a2 2 0 0 0-2 2 v14 a2 2 0 0 0 2 2 h14 a2 2 0 0 0 2-2 V5 a2 2 0 0 0-2-2 h-4"/>
    <path d="M9 3 c0-1 1-2 3-2 s3 1 3 2"/>
    <path d="M7 11 h5"/>
    <path d="M7 15 h7"/>
    <path d="M7 8 h10"/>
  `),

  // ── Use Cases ──
  gradCap: svg(`
    <path d="M2 9.5 l10-5 10 5-10 5z"/>
    <path d="M6 11.5 v5 c0 2 3 3 6 3 s6-1 6-3 v-5"/>
    <path d="M22 9.5 v6.5"/>
    <circle cx="22" cy="16.5" r="1.2" fill="currentColor"/>
  `),

  building: svg(`
    <path d="M5 21 V7 l7-4 7 4 v14"/>
    <path d="M9 9.5 h2 v2.5 H9z"/>
    <path d="M13 9.5 h2 v2.5 h-2z"/>
    <path d="M9 14.5 h2 v2.5 H9z"/>
    <path d="M13 14.5 h2 v2.5 h-2z"/>
    <path d="M10 21 v-3 h4 v3"/>
  `),

  document: svg(`
    <path d="M14 3 H6 a2 2 0 0 0-2 2 v14 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V7z"/>
    <path d="M14 3 v4 h4"/>
    <path d="M8 12.5 h8"/>
    <path d="M8 16.5 h5"/>
  `),

  flask: svg(`
    <path d="M9 3 h6"/>
    <path d="M10 3 v5.5 l-5.2 8.5 c-.8 1.3.2 3 1.7 3 h11 c1.5 0 2.5-1.7 1.7-3 l-5.2-8.5 V3"/>
    <path d="M7.5 16 h9" stroke-dasharray="2 2"/>
    <circle cx="10" cy="14" r="1" fill="currentColor"/>
    <circle cx="13.5" cy="15.5" r="0.8" fill="currentColor"/>
  `),

  users: svg(`
    <circle cx="9" cy="7" r="3"/>
    <path d="M3 20.5 c0-3.5 2.5-6.5 6-6.5"/>
    <circle cx="17" cy="9" r="2.5"/>
    <path d="M21 20.5 c0-3-2-5.5-4.5-5.5"/>
    <path d="M13 14 c.8-.3 1.7-.5 2.5-.5"/>
  `),

  trendUp: svg(`
    <path d="M3 19.5 L9 13.5 l4 4 7.5-9.5"/>
    <path d="M16.5 8 h4 v4"/>
  `),

  // ── Sketch & Annotation Doodles ──
  sparkle: svg(`
    <path d="M12 2 l1.5 5.5 L19 9 l-5.5 1.5 L12 16 l-1.5-5.5 L5 9 l5.5-1.5z"/>
    <path d="M18 14 l0.8 2.2 2.2 0.8-2.2 0.8-0.8 2.2-0.8-2.2-2.2-0.8 2.2-0.8z"/>
  `),

  sparkleGroup: svg(`
    <path d="M8 3 l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>
    <path d="M18 10 l1.2 3.8 3.8 1.2-3.8 1.2L18 20l-1.2-3.8-3.8-1.2 3.8-1.2z"/>
    <path d="M6 16 l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>
  `, 26),

  pencil: svg(`
    <path d="M18.5 2.5 a2.1 2.1 0 0 1 3 3 L7 20 l-4 1 1-4 14.5-14.5z"/>
    <path d="M15 6 l3 3"/>
  `),

  lightbulb: svg(`
    <path d="M9 18 h6"/>
    <path d="M10 21 h4"/>
    <path d="M12 2 c-4 0-7 3-7 7 0 2.5 1.5 4.5 3.5 5.5 V18 h7 v-3.5 C17.5 13.5 19 11.5 19 9 c0-4-3-7-7-7z"/>
    <path d="M12 2 v1.5" stroke-width="2"/>
    <path d="M5 5 l1 1" stroke-width="1.5"/>
    <path d="M19 5 l-1 1" stroke-width="1.5"/>
  `),

  curvedArrowRight: svg(`
    <path d="M4 17 C8 17 14 15 18 8"/>
    <path d="M14 6 l5 2-2 5"/>
  `, 28),

  curvedArrowDown: svg(`
    <path d="M6 4 C6 10 10 15 17 17"/>
    <path d="M14 20 l4-3-4-3"/>
  `, 28),

  curvedArrowLeft: svg(`
    <path d="M20 17 C16 17 10 15 6 8"/>
    <path d="M10 6 l-5 2 2 5"/>
  `, 28),

  circleSketch: svg(`
    <path d="M12 3 C6.5 3 3 7.5 3 12.5 c0 5.5 4.5 9 9.5 9 4.5 0 8.5-3.5 8.5-8.5 C21 7 16.5 2.5 11 3.5"/>
  `, 28),

  starDoodle: svg(`
    <path d="M12 2.5 l2.8 6 6.2.7-4.6 4.3 1.2 6.3-5.6-3.1-5.6 3.1 1.2-6.3L3 9.2l6.2-.7z"/>
  `, 20),

  checkDouble: svg(`
    <path d="M4 12.5 l4 4 9-10"/>
    <path d="M9 12.5 l3 3 7-8"/>
  `),

  paperclip: svg(`
    <path d="M13.5 6.5 l-6.5 6.5 a4 4 0 0 0 5.6 5.6 l7.5-7.5 a2.5 2.5 0 0 0-3.5-3.5 L9 15 a1 1 0 0 0 1.4 1.4 l6-6"/>
  `),

  tagSketch: svg(`
    <path d="M20.5 13.5 L12 21.5 L3.5 13 L12 4.5 h8.5 v9z"/>
    <circle cx="16.5" cy="8.5" r="1.5" fill="currentColor"/>
  `),

  gradeA: svg(`
    <circle cx="12" cy="12" r="9.5" stroke-dasharray="2 1"/>
    <path d="M7.5 16 L11 7.5 L14.5 16"/>
    <path d="M8.5 13.5 h5"/>
    <path d="M17 9.5 v3"/>
    <path d="M15.5 11 h3"/>
  `, 28),

  coffee: svg(`
    <path d="M4 8 h12 v8 a4 4 0 0 1-4 4 H8 a4 4 0 0 1-4-4 V8z"/>
    <path d="M16 10 h2 a2.5 2.5 0 0 1 0 5 h-2"/>
    <path d="M7 3 c0 1.5 1 2 1 3"/>
    <path d="M11 3 c0 1.5 1 2 1 3"/>
  `),

  play: svg(`
    <circle cx="12" cy="12" r="9"/>
    <path d="M10 8.5 l6 3.5-6 3.5z" fill="currentColor" opacity="0.2"/>
    <path d="M10 8.5 l6 3.5-6 3.5z"/>
  `),
};

/** Get a doodle SVG string by name, with optional size override. */
export function doodle(name, size, className) {
  if (!DOODLES[name]) return '';
  let str = DOODLES[name];
  if (size) {
    str = str.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
  }
  if (className) {
    str = str.replace(/class="[^"]*"/, `class="${className}"`);
  }
  return str;
}
