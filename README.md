# Nexus Design System

A modern React component library built with Radix UI primitives and UnoCSS.

[中文文档](./README_CN.md) | [API Reference](./docs/api-reference.md)

## Features

- **Radix UI Primitives** - Accessible, unstyled components as foundation
- **UnoCSS Styling** - Atomic CSS with custom theme tokens
- **TypeScript** - Full type safety with strict mode
- **Dark Theme** - Obsidian-based dark mode design
- **Glass Effects** - Frosted glass materials (FrostGlass, DeepGlass)
- **Compound Components** - Flexible composition patterns

## Installation

```bash
pnpm add @sruim/nexus-design
```

**Peer Dependencies:**

```bash
pnpm add react react-dom
```

## Quick Start

### 1. Configure UnoCSS

```typescript
// uno.config.ts
import { theme } from '@sruim/nexus-design/theme';
import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  theme,
});
```

### 2. Import Styles

```typescript
// main.tsx
import '@sruim/nexus-design/style.css';
```

### 3. Setup Dialoger

Required for imperative dialog APIs (`Dialog.show`, `Confirm.show`):

```tsx
import { Dialoger } from '@sruim/nexus-design/ui';

function App() {
  return (
    <>
      <YourApp />
      <Dialoger />
    </>
  );
}
```

### 4. Use Components

```tsx
import { Button, Dialog, Select } from '@sruim/nexus-design/ui';
import { IconButton } from '@sruim/nexus-design/components';

function Example() {
  return (
    <div>
      <Button variant="solid">Click Me</Button>
      <IconButton icon="i-nexus:download" text="Download" />
    </div>
  );
}
```

## Import Paths

| Path | Description |
|------|-------------|
| `@sruim/nexus-design` | All exports |
| `@sruim/nexus-design/ui` | UI primitives (Button, Dialog, Select...) |
| `@sruim/nexus-design/components` | Composite components (Icon, IconButton...) |
| `@sruim/nexus-design/utils` | Utilities (cn, sleep, copy...) |
| `@sruim/nexus-design/theme` | UnoCSS theme configuration |
| `@sruim/nexus-design/style.css` | Global styles |

## Components

### UI Primitives

| Component | Description |
|-----------|-------------|
| `Button` | Primary button with solid/hollow/plain variants |
| `Dialog` | Modal dialog with imperative API |
| `Confirm` | Confirmation dialog |
| `Select` | Dropdown select |
| `Tabs` | Tab navigation |
| `Popover` | Floating popover |
| `Tooltip` | Hover tooltip |
| `Checkbox` | Checkbox input |
| `Switch` | Toggle switch |
| `Slider` | Range slider with optional input |
| `Progress` | Progress bar |
| `Toggle` | Toggle button |
| `ToggleGroup` | Toggle button group |
| `Avatar` | User avatar |
| `Badge` | Notification badge |
| `Drawer` | Bottom sheet drawer |
| `Form` | Form with Zod validation |

### Composite Components

| Component | Description |
|-----------|-------------|
| `Icon` | UnoCSS icon wrapper |
| `IconButton` | Button with icon |
| `ImgUploader` | Image upload component |
| `ImgViewer` | Image viewer |
| `ModelUploader` | 3D model upload |
| `Tree` | Tree view |
| `Loading` | Loading indicator |
| `Loadable` | Async content wrapper |

## Theme Tokens

### Colors

```tsx
// Dark backgrounds
bg-obsidian-100  // #020617
bg-obsidian-200  // #0F172A
bg-obsidian-300  // #1E293B

// Primary accent
bg-core-blue     // #3B82F6

// Status
text-status-error    // #F43F5E
text-status-success  // #10B981
text-status-warning  // #F59E0B

// Text
text-text-primary    // #FFFFFF
text-text-secondary  // #CBD5E1
text-text-disabled   // #64748B
```

### Glass Materials

```tsx
import { FrostGlass, DeepGlass } from '@sruim/nexus-design/tokens/materials';

// FrostGlass: backdrop-blur-12 bg-slate-900/70 border border-white/10
// DeepGlass: backdrop-blur-12 bg-slate-950/90
```

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Build library
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Tech Stack

- React 19
- TypeScript 5.8
- Radix UI
- UnoCSS
- Vite
- Storybook
- Zod + React Hook Form

## License

MIT
