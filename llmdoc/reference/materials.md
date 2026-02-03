---
id: nexus-materials
type: reference
related_ids: [nexus-tokens, data-models, ui]
---

# Nexus Materials

**Location:** `src/tokens/materials.ts`

## The Void

Pure background. No blur. No transparency.

```typescript
const Void = 'bg-background';
```

**Usage:**
- App root (`<body>`)
- Top-level containers
- Full-screen overlays

## FrostGlass

Standard elevated surface.

```typescript
const FrostGlass = 'paper-card backdrop-blur-10';
```

**Specs:**
- Backdrop blur: 10px
- Background: `paper-card` (maps to surface with transparency)
- Use case: Cards, panels, sidebars

**CSS Variable Chain:**
- `--color-surface` -> `paper-card` -> `FrostGlass`

## DeepGlass

High-contrast elevated surface.

```typescript
const DeepGlass = 'backdrop-blur-6 bg-[rgba(43,36,28,0.45)]';
```

**Specs:**
- Backdrop blur: 6px
- Background: `rgba(43,36,28,0.45)` (dark warm tint)
- Use case: Modals, dropdowns, floating controls

## Material Selection Logic

| Context | Material | Rationale |
|--------|----------|-----------|
| App background | Void | Zero overhead, no blur |
| Cards/Panels | FrostGlass | Standard elevation, readable on all backgrounds |
| Modals/Dropdowns | DeepGlass | Higher contrast, distinct separation |

## Implementation Pattern

```typescript
import { FrostGlass, DeepGlass, Void } from '@/tokens/materials';

// Card
<div className={FrostGlass}>...</div>

// Modal
<div className={DeepGlass}>...</div>

// Root
<div className={Void}>...</div>
```
