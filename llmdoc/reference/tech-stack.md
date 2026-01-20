---
id: tech-stack
type: reference
related_ids: [build-config, dependencies]
---

# Tech Stack

## Package Identity

```typescript
type Package = {
  name: "@sruim/nexus-design";
  version: "0.0.27";
  type: "module";
  format: "es";
};
```

## Build Chain

```typescript
type BuildConfig = {
  compiler: "TypeScript 5.8.3";
  bundler: "Vite 6.3.5";
  target: "esnext";
  minify: false;
  output: "preserveModules"; // Maintains src structure
};
```

**Build Command:**
```bash
tsc -p tsconfig.build.json && vite build
```

## Core Dependencies

### UI Framework
```typescript
type UICore = {
  react: "^19.1.0"; // Peer
  "react-dom": "^19.0.0"; // Peer
  radix: {
    primitives: 17; // avatar, checkbox, dialog, etc.
    headless: true;
    a11y: true;
  };
};
```

### Styling System
```typescript
type StyleStack = {
  atomic: "UnoCSS 66.2.3";
  presets: ["unocss-preset-shadcn", "unocss-preset-animations"];
  reset: "@unocss/reset";
  preprocessor: "sass-embedded 1.89.2";
  utils: ["class-variance-authority", "clsx", "tailwind-merge"];
};
```

### Form & Validation
```typescript
type FormStack = {
  manager: "react-hook-form 7.54.2";
  resolver: "@hookform/resolvers 4.1.3";
  schema: "zod 3.25.67";
};
```

### Data & Interaction
```typescript
type Utilities = {
  table: "@tanstack/react-table 8.21.2";
  carousel: "embla-carousel-react 8.5.2";
  autoplay: "embla-carousel-autoplay 8.6.0";
  drawer: "vaul 1.1.2";
  toast: "sonner 2.0.1";
  otp: "input-otp 1.4.2";
  lodash: "lodash-es 4.17.21";
};
```

### Dev Tools
```typescript
type DevTools = {
  storybook: "10.1.11";
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"];
  framework: "@storybook/react-vite";
  vitest: "4.0.17";
  playwright: "1.57.0";
};
```

## Build Plugins

```typescript
type VitePlugins = [
  "@vitejs/plugin-react", // JSX transform
  "vite-tsconfig-paths", // Path alias resolver
  "vite-env-only", // Server-only macros
  "vite-plugin-dts", // Type declaration generation
  "@unocss/postcss", // CSS atomic engine
];
```

## Code Quality

```typescript
type Linters = {
  js: "ESLint 9.29";
  css: "Stylelint 16.23";
  formatter: "Prettier 3.5.3";
  precommit: "Husky 9.1.7 + lint-staged 15.4.3";
};
```

## TypeScript Config

```typescript
type TSConfig = {
  target: "ES2020";
  module: "ES2020";
  moduleResolution: "bundler";
  jsx: "react-jsx";
  strict: true;
  verbatimModuleSyntax: true; // No implicit type-only imports
  paths: {
    "@/*": ["./src/*"];
    "@assets/*": ["./assets/*"];
  };
};
```

## Export Map

```typescript
type Exports = {
  ".": "./dist/index.js"; // Main entry
  "./components": "./dist/components/index.js";
  "./ui": "./dist/ui/index.js";
  "./utils": "./dist/utils/index.js";
  "./theme": "./dist/theme.js";
  "./ui/*": "./dist/ui/*.js"; // Direct file access
  "./components/*": "./dist/components/*.js";
  "./style.css": "./dist/style.css"; // Global styles
};
```

## Runtime Constraints

```typescript
type Requirements = {
  node: ">=20.0.0";
  pnpm: ">=9.6.0";
  react: ">=18.0.0"; // Peer dependency
};
```

## Negative Constraints

- **NO CommonJS**: Pure ESM package (`type: "module"`)
- **NO Minification**: Preserves source for consuming bundlers
- **NO Bundling**: `preserveModules: true` maintains tree-shaking
- **NO Default Exports**: Explicit named exports only
- **NO Auto-Imports**: Verbatim module syntax enforced
