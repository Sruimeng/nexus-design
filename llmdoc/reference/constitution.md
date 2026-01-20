---
id: constitution
type: reference
related_ids: [style-hemingway, forbidden-patterns]
---

# Technical Constitution

## TypeScript Rules

```typescript
// tsconfig.json enforcement
{
  strict: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  noFallthroughCasesInSwitch: true,
  verbatimModuleSyntax: true,
  forceConsistentCasingInFileNames: true
}
```

**Constraints:**
- NO `any` without explicit suppression comment
- NO unused imports (verbatimModuleSyntax enforced)
- NO inconsistent casing in file paths
- Type imports MUST use `import type`

## React Patterns

### Component Definition

```typescript
// Standard
interface Props extends React.ComponentProps<typeof Base> {
  variant?: 'solid' | 'hollow' | 'plain';
}

const Component = React.forwardRef<HTMLElement, Props>(
  ({ variant = 'solid', ...props }, ref) => {
    return <Element ref={ref} {...props} />;
  }
);
Component.displayName = 'Component';
```

**Constraints:**
- NO `React.FC` for components needing refs
- NO inline prop types
- NO missing displayName on forwardRef
- Props MUST extend base component when wrapping

### Radix UI Wrapping

```typescript
// Pattern: Always wrap, never re-export
import * as RadixPrimitive from '@radix-ui/react-primitive';

const Wrapper = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadixPrimitive.Root ref={ref} className={cn(baseStyle, className)} {...props} />
));
```

**Constraints:**
- NO direct Radix exports
- MUST use `ElementRef` and `ComponentPropsWithoutRef`
- MUST preserve ref forwarding
- MUST apply base styles via `cn()`

### Compound Components

```typescript
// Dialog.tsx
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = React.forwardRef<...>(...);

export { Dialog, DialogTrigger, DialogContent };

// Usage
<Dialog>
  <DialogTrigger />
  <DialogContent />
</Dialog>
```

**Constraints:**
- Root component = Radix primitive (unmodified)
- Leaf components = forwardRef wrappers with styles
- NO nested object exports (`Dialog.Content`)

## UnoCSS System

### Style Constants

```typescript
const BaseStyle = 'flex items-center justify-center rounded-25 box-border';
const VariantStyle = {
  solid: 'bg-core-blue/20 hover:bg-core-blue/30 border border-core-blue/50 text-white',
  hollow: 'border border-white/20 text-slate-200 hover:bg-white/10',
};
```

**Constraints:**
- NO Tailwind classes
- NO inline style objects
- Style strings MUST be constants at top of file
- Conditional styles via object lookup or if-chains

### Theme Integration

```typescript
// Access theme colors via UnoCSS
'bg-obsidian-100 text-white border-white/10'

// NOT via CSS variables
style={{ color: 'var(--core-blue)' }} // FORBIDDEN
```

**Constraints:**
- Theme colors defined in `src/theme.ts`
- NO CSS-in-JS (emotion, styled-components)
- NO custom CSS files (except style.scss for global)

### Custom Utilities

```typescript
// theme.ts extension
animation: {
  keyframes: {
    'scroll-loop': '{0% { ... } 100% { ... }}'
  }
}

// Usage
'animate-scroll-loop'
```

**Constraints:**
- Custom animations in `theme.ts`
- NO @keyframes in CSS files
- NO runtime style injection

## File Organization

```
src/
  ui/              # Radix wrappers (primitives)
  components/      # Composite components
  utils/           # Pure functions (cn, config)
  theme.ts         # UnoCSS theme extension
```

**Constraints:**
- ui/ = atomic, wraps Radix
- components/ = composed from ui/
- NO utils in component files
- NO cross-folder deep imports (use index.ts)

## Import Order

```typescript
// External
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

// Internal absolute
import { cn } from '@/utils';
import { Button } from '@/ui';

// Internal relative
import { Icon } from '../icon';

// Types (at end if used only in types)
import type { Theme } from 'unocss/preset-mini';
```

**Constraints:**
- ESLint rule: `@typescript-eslint/consistent-type-imports`
- NO mixed default/named imports from same source
- NO relative imports crossing folder boundaries

## Naming Conventions

### Files
- Components: `kebab-case/index.tsx`
- Utils: `utils.ts`, `config.ts`
- Types: Inline in component file

### Components
- Simple nouns: `Button`, `Icon`, `Dialog`
- Compound: `IconButton`, `ModelUploader`
- NO: `AbstractButton`, `ButtonManager`, `ButtonImpl`

### Props
- Interface name: `Props` (not `ButtonProps` inside Button.tsx)
- Variants: String unions (`'solid' | 'hollow'`)
- Booleans: `disabled`, `asChild` (no `is-` prefix)

**Constraints:**
- NO verbose prefixes/suffixes inside component scope
- NO Hungarian notation
- NO generic names (`data`, `info`, `manager`)

## Negative Constraints

**Forbidden Patterns:**
- NO prop-types library (use TypeScript)
- NO class components (hooks only)
- NO default exports for components (named only)
- NO barrel exports of types (export at definition)
- NO `React.ReactNode` children (use `React.ComponentProps`)
- NO mutation of props/state
- NO deep nesting (>4 levels)
- NO logic in return statements (extract to variables)
