import { merge } from 'lodash-es';
import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import { theme } from './src/theme';

const pf = <T>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
};

const cache = {
  data: null,
};
const CDNBaseURL =
  'https://salist.zeabur.app/d/quark/icon/nexus.json?sign=CgYgXfmvepax2dP6MrxxEVn596hP10vfeafvIZgCrJw=:0';

const { promise, resolve } = pf<void>();

const fetchIconSet = async () => {
  const data = await fetch(CDNBaseURL).then((res) => res.json());
  cache.data = data;
  resolve();
};

fetchIconSet();

export const createConfig = () =>
  defineConfig({
    presets: [
      presetWind3(),
      presetAnimations(),
      presetIcons({
        autoInstall: false,
        collections: {
          nexus: async () => {
            await promise;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return cache.data as any;
          },
        },
      }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
    extendTheme: (origin) => {
      return merge(origin, theme);
    },
    shortcuts: {
      'backdrop-blur-10': 'backdrop-filter backdrop-blur-10px',
      'backdrop-blur-12': 'backdrop-filter backdrop-blur-[12px]',
      'backdrop-blur-20': 'backdrop-filter backdrop-blur-20px',
      'backdrop-blur-24': 'backdrop-filter backdrop-blur-[24px]',
      'ease-smooth': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
      'ease-spring': 'ease-[cubic-bezier(0.34,1.56,0.64,1)]',
      'ease-out-expo': 'ease-[cubic-bezier(0.19,1,0.22,1)]',
      'ease-in-expo': 'ease-[cubic-bezier(0.95,0.05,0.795,0.035)]',
      'duration-fast': 'transition-duration-150',
      'duration-base': 'transition-duration-200',
      'duration-slow': 'transition-duration-300',
      'duration-slower': 'transition-duration-500',
      'text-h1': 'text-8 font-800 leading-[1.2] tracking-[-0.02em]',
      'text-h2': 'text-6 font-700 leading-[1.3] tracking-[-0.01em]',
      'text-h3': 'text-[1.125rem] font-600 leading-[1.4]',
      'text-body': 'text-4 font-400 leading-[1.6]',
      'text-caption': 'text-[0.875rem] font-500 leading-[1.5] tracking-[0.02em]',
      'text-mono': 'text-[0.875rem] font-400 leading-[1.6] font-mono',
    },
    safelist: [
      'bg-obsidian-100',
      'bg-obsidian-200',
      'bg-obsidian-300',
      'bg-steel-100',
      'bg-steel-200',
      'bg-steel-300',
      'bg-mist-100',
      'bg-mist-200',
      'bg-mist-300',
      'bg-mist-400',
      'text-obsidian-100',
      'text-steel-100',
      'text-mist-100',
      'text-mist-200',
      'text-mist-300',
      'text-mist-400',
      'text-text-primary',
      'text-text-secondary',
      'text-text-disabled',
      'text-text-accent',
      'bg-surface-primary',
      'bg-surface-secondary',
      'bg-surface-dim',
      'bg-surface-hover',
      'border-border-subtle',
      'border-border-dim',
      'border-border-focus',
      'bg-core-blue',
      'text-core-blue',
      'bg-accent-gold',
      'text-accent-gold',
      'border-accent-gold',
      'bg-accent-goldLight',
      'text-accent-goldLight',
      'border-accent-goldLight',
      'bg-status-error',
      'text-status-error',
      'border-status-error',
      'bg-status-success',
      'text-status-success',
      'bg-status-warning',
      'text-status-warning',
      'backdrop-blur-10',
      'backdrop-blur-12',
      'backdrop-blur-20',
      'backdrop-blur-24',
      'ease-smooth',
      'ease-spring',
      'ease-out-expo',
      'ease-in-expo',
      'duration-fast',
      'duration-base',
      'duration-slow',
      'duration-slower',
      'text-h1',
      'text-h2',
      'text-h3',
      'text-body',
      'text-caption',
      'text-mono',
    ],
  });

export default createConfig();
