---
id: strategy-api-docs
type: strategy
related_ids: [constitution, style-hemingway, ui]
---

# Strategy: API Documentation

## 1. Analysis

**Context:**
- Package: `@sruim/nexus-design@0.0.1`
- 24 UI components (Radix wrappers)
- 9 Business components (composite)
- Theme system with Nexus tokens
- Utility functions for common operations
- No existing API documentation

**Constitution:** (Ref: `constitution`)
- TypeScript strict mode
- Named exports only
- React.forwardRef with displayName
- UnoCSS only, no Tailwind/inline styles
- Radix wrapping pattern for primitives

**Style Protocol:** Strict Adherence to `llmdoc/reference/style-hemingway.md` (Iceberg Principle, No Fluff).

**Negative Constraints:**
- NO verbose JSDoc blocks
- NO "Introduction" or "Overview" sections
- NO duplicate type information in prose
- NO inline code examples longer than 10 lines
- NO explanation of standard React patterns

## 2. Assessment

<Assessment>
**Complexity:** Level 2
</Assessment>

Rationale: Documentation task. No math/physics. Requires systematic extraction of Props interfaces and usage patterns.

## 3. Documentation Specification

<MathSpec>
*Documentation structure formula:*

```
Doc(Component) = {
  Import: string,
  Props: Interface,
  Variants?: Record<string, string>,
  Example: JSX (max 10 lines)
}

Doc(Theme) = {
  Tokens: Record<TokenGroup, Record<string, string>>,
  Usage: UnoCSS class pattern
}

Doc(Utility) = {
  Signature: TypeScript,
  Returns: Type
}
```
</MathSpec>

## 4. The Plan

<ExecutionPlan>

**Block 1: Setup Documentation**
1. Create `docs/` directory structure
2. Write `docs/index.md` - entry point with install/setup
3. Write `docs/quick-start.md` - minimal working example

**Block 2: UI Components Reference**
1. Extract Props interface from each component in `src/ui/`
2. Document in `docs/ui/[component].md` format:
   - Import statement
   - Props table (Name | Type | Default | Description)
   - Variants (if applicable)
   - Minimal example
3. Components to document:
   - Avatar, Badge, Button, Carousel, Checkbox
   - Collapsible, Dialog, Drawer, Form, InputOTP
   - Label, Masonry, Popover, Progress, Select
   - Slider, SnapInput, Sonner (Toaster), Switch
   - Table, Tabs, Toggle, ToggleGroup, Tooltip

**Block 3: Business Components Reference**
1. Extract Props from `src/components/`
2. Document in `docs/components/[component].md`:
   - Icon, IconButton, CreditsButton
   - Tree, ImgUploader, ImgViewer
   - ModelUploader, Loading, Loadable

**Block 4: Theme System**
1. Document `docs/theme/tokens.md`:
   - Color tokens (obsidian, steel, mist, core, status)
   - Surface tokens (surface, border, text)
   - Animation tokens (easing, duration)
2. Document `docs/theme/materials.md`:
   - FrostGlass, DeepGlass patterns
   - UnoCSS class combinations

**Block 5: Utilities Reference**
1. Document `docs/utils.md`:
   - `cn(...inputs)` - class merging
   - `isMobileDevice(ua)` - UA detection
   - `sleep(ms)` - async delay
   - `jump(url, blank?)` - navigation
   - `download(url, name?)` - file download
   - `copy(text, toast)` - clipboard
   - `getSuffix(file)` - extension extraction
   - `checkSize(file, size?)` - size validation
   - `checkType(file, type)` - type validation

**Block 6: TypeScript Integration**
1. Document `docs/typescript.md`:
   - Type imports pattern
   - Extending component props
   - Theme type augmentation

</ExecutionPlan>

## 5. File Structure

```
docs/
  index.md              # Install, pnpm, UnoCSS config
  quick-start.md        # Minimal example
  ui/
    button.md
    dialog.md
    ... (24 files)
  components/
    icon.md
    ... (9 files)
  theme/
    tokens.md
    materials.md
  utils.md
  typescript.md
```

## 6. Props Table Format

```markdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'solid' \| 'hollow' \| 'plain'` | `'solid'` | Visual style |
| size | `'small' \| 'middle' \| 'large'` | `'large'` | Button size |
| asChild | `boolean` | `false` | Render as Slot |
| disabled | `boolean` | - | Disable interaction |
```

## 7. Example Format

```tsx
import { Button } from '@sruim/nexus-design';

<Button variant="solid" size="large">
  Submit
</Button>
```

## 8. Worker Instructions

**For each component:**
1. Read source file
2. Extract `interface Props` or `type Props`
3. Identify style constants (variants, sizes)
4. Write Props table
5. Write minimal example (max 10 lines)

**Style enforcement:**
- No prose explaining what props do if type is self-documenting
- Description column only for non-obvious behavior
- Chinese acceptable for domain terms
