import { type Theme } from 'unocss/preset-mini';
import { border, core, mist, obsidian, status, steel, surface, text } from './tokens/nexus';

export const theme: Theme = {
  colors: {
    background: 'var(--color-bg)',
    foreground: 'var(--color-text)',
    obsidian,
    steel,
    mist,
    core,
    status,
    surface,
    border,
    text,
    black: {
      DEFAULT: 'rgba(0, 0, 0, 1)',
      0: 'rgba(0, 0, 0, 0)',
      5: 'rgba(0, 0, 0, 0.05)',
      10: 'rgba(0, 0, 0, 0.1)',
      20: 'rgba(0, 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      40: 'rgba(0, 0, 0, 0.4)',
      60: 'rgba(0, 0, 0, 0.6)',
      80: 'rgba(0, 0, 0, 0.8)',
    },
    white: {
      DEFAULT: 'rgba(255, 255, 255, 1)',
      5: 'rgba(255, 255, 255, 0.05)',
      10: 'rgba(255, 255, 255, 0.1)',
      20: 'rgba(255, 255, 255, 0.2)',
      30: 'rgba(255, 255, 255, 0.3)',
      40: 'rgba(255, 255, 255, 0.4)',
      60: 'rgba(255, 255, 255, 0.6)',
      80: 'rgba(255, 255, 255, 0.8)',
    },
    gray: {
      1: 'var(--color-bg)',
      2: 'var(--color-bg-secondary)',
      3: 'var(--color-surface)',
      50: 'rgba(250, 250, 250, 1)',
      100: 'rgba(242, 242, 242, 1)',
      200: 'rgba(229, 229, 229, 1)',
      300: 'rgba(204, 204, 204, 1)',
      400: 'rgba(153, 153, 153, 1)',
      500: 'rgba(102, 102, 102, 1)',
      600: 'rgba(68, 68, 68, 1)',
      700: 'rgba(64, 64, 64, 1)',
      800: 'rgba(38, 38, 38, 1)',
      900: 'rgba(23, 23, 23, 1)',
      950: 'rgba(10, 10, 10, 1)',
    },
    purple: {
      1: 'rgba(80, 59, 227, 1)',
      2: 'rgba(167, 155, 236, 1)',
      10: 'rgba(80, 59, 227, 0.1)',
      20: 'rgba(80, 59, 227, 0.2)',
      60: 'rgba(80, 59, 227, 0.6)',
    },
    red: {
      DEFAULT: 'rgba(255, 62, 62, 1)',
      15: 'rgba(255, 62, 62, 0.15)',
    },
    blue: {
      1: 'rgba(251, 146, 60, 1)',
      2: 'rgba(249, 115, 22, 1)',
    },
    green: {
      1: 'rgba(63, 221, 120, 1)',
      2: 'rgba(18, 27, 25, 1)',
      3: 'rgba(23, 46, 35, 1)',
    },
    pink: {
      1: 'rgba(219, 181, 226, 1)',
      2: 'rgba(251, 35, 194, 1)',
    },
  },
  breakpoints: {
    fhd: '1900px',
  },
  animation: {
    keyframes: {
      'scroll-loop': '{0% { transform: translateX(100%); } 100% { transform: translateX(-100%); }}',
    },
    durations: {
      'scroll-loop': '10s',
    },
    counts: {
      'scroll-loop': 'infinite',
    },
    timingFns: {
      'scroll-loop': 'linear',
    },
  },
};
