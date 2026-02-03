const obsidian = {
  100: 'var(--color-bg)',
  200: 'var(--color-bg-secondary)',
  300: 'var(--color-surface)',
} as const;

const steel = {
  100: 'var(--color-border)',
  200: 'var(--color-border-subtle)',
  300: 'var(--color-surface-hover)',
} as const;

const mist = {
  100: 'var(--color-surface)',
  200: 'var(--color-surface-elevated)',
  300: 'var(--color-bg-secondary)',
} as const;

const core = {
  blue: '#FB923C',
} as const;

const status = {
  error: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',
} as const;

const surface = {
  primary: 'var(--color-surface)',
  secondary: 'var(--color-surface-elevated)',
  dim: 'var(--color-bg-secondary)',
  hover: 'var(--color-surface-hover)',
} as const;

const border = {
  subtle: 'var(--color-border-subtle)',
  dim: 'var(--color-border)',
  focus: core.blue,
} as const;

const text = {
  primary: 'var(--color-text)',
  secondary: 'var(--color-text-secondary)',
  disabled: 'var(--color-text-muted)',
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
