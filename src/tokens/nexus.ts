const obsidian = {
  100: '#020617',
  200: '#0F172A',
  300: '#1E293B',
} as const;

const steel = {
  100: '#CBD5E1',
  200: '#E2E8F0',
  300: '#F1F5F9',
} as const;

const mist = {
  100: '#E2E8F0',
  200: '#F1F5F9',
  300: '#FFFFFF',
} as const;

const core = {
  blue: '#3B82F6',
} as const;

const status = {
  error: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',
} as const;

const surface = {
  primary: obsidian[100],
  secondary: steel[100],
  dim: steel[200],
  hover: steel[300],
} as const;

const border = {
  subtle: mist[100],
  dim: steel[300],
  focus: core.blue,
} as const;

const text = {
  primary: '#FFFFFF',
  secondary: '#CBD5E1',
  disabled: '#64748B',
  accent: core.blue,
} as const;

const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

const duration = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export { border, core, duration, easing, mist, obsidian, status, steel, surface, text };
