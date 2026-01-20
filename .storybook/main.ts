import type { StorybookConfig } from '@storybook/react-vite';
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
import UnoCSS from 'unocss/vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { theme } from '../src/theme';

const unoConfig = defineConfig({
  presets: [presetWind3(), presetAnimations(), presetIcons({ autoInstall: true })],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  extendTheme: (origin) => merge(origin, theme),
  shortcuts: {
    'backdrop-blur-10': 'backdrop-filter backdrop-blur-10px',
    'backdrop-blur-20': 'backdrop-filter backdrop-blur-20px',
    'ease-smooth': 'transition-timing-function-[cubic-bezier(0.4,0,0.2,1)]',
    'ease-spring': 'transition-timing-function-[cubic-bezier(0.34,1.56,0.64,1)]',
    'duration-fast': 'transition-duration-150',
    'duration-base': 'transition-duration-200',
    'duration-slow': 'transition-duration-300',
    'duration-slower': 'transition-duration-500',
  },
});

const config: StorybookConfig = {
  stories: ['../demo/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [UnoCSS(unoConfig), tsconfigPaths()],
    });
  },
};

export default config;
