import UnoCSS from '@unocss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { envOnlyMacros } from 'vite-env-only';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dependencies, peerDependencies } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    envOnlyMacros(),
    dts({ tsconfigPath: './tsconfig.build.json', outDir: 'dist', insertTypesEntry: true }),
  ],
  css: {
    postcss: {
      plugins: [UnoCSS()],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      cssFileName: 'style',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        'react-dom/client',
        '@hookform/resolvers/zod',
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        esModule: true,
      },
    },
    emptyOutDir: true,
  },
});
