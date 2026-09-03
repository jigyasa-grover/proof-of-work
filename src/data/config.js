/** Application Constants & Canonical Metadata. */
export const PROJECT_TITLE = 'Proof of Work';
export const PROJECT_SUBTITLE = 'Agentic Video Understanding with Gemini as Your AI Teaching Assistant';
export const PROJECT_TAGLINE = 'Agentic Video Understanding with Gemini as Your AI Teaching Assistant';

/** Model identifier for Gemini API calls. */
export const MODEL_ID = 'gemini-3.7-flash';

/** GitHub repository URL. */
export const REPO_URL = 'https://github.com/jigyasa-grover/proof-of-work';

/** Navigation links rendered in the top bar. */
export const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'How It Works', href: '#how' },
  { label: 'Demo', href: '#demo' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Efficiency', href: '#efficiency' },
  { label: 'Use Cases', href: '#usecases' },
];

/** Official Google Launch & Announcement Links. */
export const LAUNCH_LINKS = {
  blog: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/',
  aiStudio: 'https://ai.google.dev',
  deepmind: 'https://deepmind.google/technologies/gemini/',
  developers: 'https://developers.google.com',
};

/** Words that cycle in the hero section. */
export const CYCLE_WORDS = [
  'how they debug',
  'how they plan',
  'how they iterate',
  'how they research',
  'how they think',
];

/** The five analysis dimensions with their metadata. */
export const DIMENSIONS = [
  { key: 'approach',  name: 'Approach Strategy',  weight: 25, icon: 'compass' },
  { key: 'debugging', name: 'Debugging Maturity',  weight: 25, icon: 'search' },
  { key: 'resources', name: 'Resource Usage',      weight: 20, icon: 'book' },
  { key: 'iteration', name: 'Code Iteration',      weight: 15, icon: 'code' },
  { key: 'time',      name: 'Time Management',     weight: 15, icon: 'clipboard' },
];

/** Analysis pipeline steps shown during the demo animation. */
export const PIPELINE_STEPS = [
  { name: 'Process Timeline',   key: 'process_timeline' },
  { name: 'Debugging Analysis', key: 'debugging_analysis' },
  { name: 'Resource Usage',     key: 'resource_usage' },
  { name: 'Code Quality',       key: 'code_quality' },
  { name: 'Final Scorecard',    key: 'scorecard' },
];

export const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=3zT_QtIupkE';

/** Sample results — ML assignment scenario (CNN image classifier).
 *  Scenario matches an AI/ML course context, authentic to the
 *  author's background as a Google Developer Expert in ML.
 */
export const SAMPLE_RESULTS = {
  scenario: {
    title: 'PyTorch ConvNet on CIFAR-10',
    course: 'Applied Deep Learning Practicum',
    duration: '45:00',
    framework: 'PyTorch / torchvision / CUDA / matplotlib',
    result: '87.2% validation accuracy (10/10 tests passed)',
  },
  videoUrl: 'https://www.youtube.com/watch?v=3zT_QtIupkE',
  overallScore: 7.8,
  verdict: 'Verified Original Process',
  dimensions: [
    { score: 8.5, rating: 'Structured — Sketched 3-block CNN architecture on paper before coding, planned data pipeline first', gradient: 'var(--accent)', color: 'var(--accent)' },
    { score: 7.5, rating: 'Proficient — Read CUDA error message, added tensor.shape checks, isolated dimension mismatch systematically', gradient: 'var(--accent)', color: 'var(--accent)' },
    { score: 7.0, rating: 'Balanced — Consulted PyTorch docs for augmentation transforms, adapted suggestions to fit dataset', gradient: 'var(--accent)', color: 'var(--accent)' },
    { score: 8.0, rating: 'Highly Iterative — Three model versions (V1 → V2 with BatchNorm → V3 with augmentation), compared loss curves', gradient: 'var(--accent)', color: 'var(--accent)' },
    { score: 7.5, rating: 'Efficient — Completed training, evaluation, and ablation within the 1-hour session', gradient: 'var(--accent)', color: 'var(--accent)' },
  ],
  timeline: [
    { label: 'Data & Architecture',  width: 18, color: '#818CF8' },
    { label: 'Training V1 & V2',     width: 30, color: '#A78BFA' },
    { label: 'Debugging & Shapes',   width: 20, color: '#FB7185' },
    { label: 'V3 + Augmentation',    width: 18, color: '#34D399' },
    { label: 'Evaluation & Plots',   width: 14, color: '#FBBF24' },
  ],
  evidence: [
    { ts: '02:30', type: 'positive', title: 'Architecture sketch before coding', desc: 'Drew CNN architecture on paper: 3 conv blocks → flatten → 2 FC layers. Annotated kernel sizes and channel dimensions.' },
    { ts: '12:45', type: 'positive', title: 'Data augmentation pipeline', desc: 'Built torchvision.transforms pipeline with RandomHorizontalFlip, RandomCrop(32, padding=4), and ColorJitter — understood each transform\'s purpose.' },
    { ts: '18:20', type: 'warning',  title: 'Tensor dimension mismatch', desc: 'Hit RuntimeError on flatten layer. Used print(x.shape) at each layer to trace dimensions — resolved in 4 minutes.' },
    { ts: '28:00', type: 'positive', title: 'V2 with BatchNorm comparison', desc: 'Added BatchNorm2d after each conv layer, retrained, and compared validation loss curves side-by-side — 3% improvement noted.' },
    { ts: '42:00', type: 'positive', title: 'Per-class accuracy analysis', desc: 'Plotted confusion matrix with matplotlib, identified car/truck confusion, noted potential fix with deeper network.' },
  ],
  strengths: [
    'Excellent experimental methodology — compared loss curves across three model versions',
    'Strong data-centric thinking — built augmentation pipeline with understanding, not copy-paste',
    'Systematic debugging — used shape checks to isolate tensor dimension errors',
    'Critical evaluation — analyzed per-class accuracy, identified model weaknesses',
  ],
  improvements: [
    'Try learning rate scheduling (CosineAnnealing or ReduceLROnPlateau) for better convergence',
    'Add regularization (dropout, weight decay) to reduce the train/val accuracy gap',
    'Run more epochs with early stopping to potentially push accuracy beyond 90%',
  ],
  tokenUsage: { agentic: '~4.2K', static: '~400K+' },
};
