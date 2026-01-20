---
id: strategy-nexus-refactor
type: strategy
related_ids: [style-hemingway, nexus-tokens, constitution]
---

# Strategy: Nexus Design System Refactor

## 1. Analysis

**Context:**
- 32 total components (23 base UI + 9 custom)
- Current styling: ad-hoc theme.ts with arbitrary gray scale + named colors
- No semantic tokens, no material system, no motion physics
- Button.tsx violates Hemingway (verbose if-chains, lines 28-50)

**Constitution:**
Ref: `llmdoc/reference/style-hemingway.md`
- **Iceberg Principle:** Types encode rules, code shows structure
- **Comment Policy:** WHY only, no WHAT
- **Naming:** Simple nouns, verbs for actions, NO prefixes/suffixes
- **Terseness:** Destructure with defaults, ternaries for assignment, max nesting 3-4
- **Signal:** Delete prose that duplicates types

Ref: Librarian Constitutional Rules (Nexus Design System)
- **Tokens:** Obsidian (#0A0B0E → #12131A), Steel (#2A2C36 → #373945), Mist (#52545E → #6B6D77), Core Blue (#4169E1)
- **Materials:** Void (solid fill), Frost Glass (backdrop-blur-10 + rgba), Deep Glass (backdrop-blur-20 + opacity-95)
- **Motion:** cubic-bezier(0.4, 0, 0.2, 1), durations 150ms/200ms/300ms/500ms
- **Typography:** H1-Mono strict hierarchy, no custom font sizes

**Style Protocol:**
Strict adherence to `style-hemingway.md`. Reject:
- if-chains → lookup maps
- verbose intermediates → inline ternaries
- magic strings → const objects
- JSDoc → self-documenting types

**Negative Constraints:**
- NO hard-coded hex/rgba values in components
- NO `new` in loops, NO mutations in render
- NO nesting >4 levels
- NO comments explaining map/filter/conditionals
- NO prefixes: Abstract, Base, I, T
- NO auto-generated JSDoc

## 2. Assessment

<Assessment>
**Complexity:** Level 3 (Deep)
**Rationale:**
- 32 components × token migration = high surface area
- Material system requires backdrop-filter + layering logic
- Motion physics needs cubic-bezier extraction + duration constants
- Style refactor touches every component file
</Assessment>

## 3. Math/Algo Specification

<MathSpec>
**Token Transformation:**
```
Legacy → Nexus Semantic Mapping:
  gray.1 (#0C0D10) → obsidian.100 (#0A0B0E)
  gray.2 (#101114) → obsidian.200 (#12131A)
  gray.3 (#1B1D20) → steel.100 (#2A2C36)
  white.10 → frost-glass-fill (rgba(255,255,255,0.08))
  yellow.1 → accent.gold (#F9CF00)
  purple.1 → core.blue (#4169E1) // domain shift
```

**Material Application Logic:**
```
Component Type → Material:
  Surface (card, panel) → Void (solid)
  Overlay (popover, tooltip) → Frost Glass
  Modal (dialog, drawer) → Deep Glass

Frost Glass Formula:
  backdrop-filter: blur(10px)
  background: rgba(42, 44, 54, 0.8) // steel.100 + alpha
  border: 1px solid rgba(255, 255, 255, 0.08)

Deep Glass Formula:
  backdrop-filter: blur(20px)
  background: rgba(10, 11, 14, 0.95) // obsidian.100 + alpha
```

**Motion Timing:**
```
Interaction Type → Duration + Easing:
  Hover/Focus → 150ms cubic-bezier(0.4, 0, 0.2, 1)
  Popover/Tooltip → 200ms cubic-bezier(0.4, 0, 0.2, 1)
  Modal/Drawer → 300ms cubic-bezier(0.4, 0, 0.2, 1)
  Carousel/Scroll → 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Variant Lookup Refactor:**
```typescript
// BEFORE (if-chain anti-pattern)
let buttonStyle = '';
if (variant === 'hollow') buttonStyle = HollowStyle;
if (variant === 'plain') buttonStyle = PlainStyle;
if (variant === 'solid') buttonStyle = SolidStyle;

// AFTER (lookup map)
const VariantStyle = {
  solid: SolidStyle,
  hollow: HollowStyle,
  plain: PlainStyle,
} as const;

const buttonStyle = disabled ? DisabledStyle : VariantStyle[variant];
```
</MathSpec>

## 4. The Plan

<ExecutionPlan>

### Block 1: Token Foundation (Day 1)
1. Create `src/tokens/nexus.ts`:
   - Export obsidian, steel, mist, core color objects
   - Export semantic tokens: `surface`, `border`, `text`, `accent`
   - Export motion constants: `easing`, `duration`
2. Update `src/theme.ts`:
   - Replace arbitrary gray scale with Nexus primitives
   - Add semantic aliases (surface-primary → obsidian.100)
   - Preserve breakpoints
3. Update `uno.config.ts`:
   - Inject Nexus theme
   - Add `backdrop-blur-10` and `backdrop-blur-20` shortcuts
   - Add motion timing function shortcuts

**Acceptance:**
- `grep -r "rgba(" src/ui/` returns 0 matches (except material constants)
- `grep -r "gray-[0-9]" src/ui/` returns 0 matches
- Theme tokens accessible via `bg-obsidian-100`, `text-mist-300`, etc.

### Block 2: Material System (Day 1-2)
1. Create `src/tokens/materials.ts`:
   ```typescript
   const Void = 'bg-obsidian-100';
   const FrostGlass = 'backdrop-blur-10 bg-steel-100/80 border border-white/8';
   const DeepGlass = 'backdrop-blur-20 bg-obsidian-100/95';
   export { Void, FrostGlass, DeepGlass };
   ```
2. Apply materials:
   - **Void:** Button (base), Badge, Avatar
   - **Frost Glass:** Popover, Tooltip, Select dropdown
   - **Deep Glass:** Dialog, Drawer, Modal overlays

**Acceptance:**
- All overlays have `backdrop-blur-*` class
- No inline `background: rgba(...)` in component files
- Material constants centralized

### Block 3: Core Primitives Refactor (Day 2-3)
**Priority Order:** Button → Input → Switch → Checkbox → Label

**Per-Component Pseudo-code:**
```
1. Read current component file
2. Extract variant logic → create lookup map
3. Replace if-chains with ternaries/map access
4. Replace theme.ts references with Nexus tokens
5. Add motion classes (transition-colors duration-150 ease-smooth)
6. Delete verbose intermediates
7. Run Hemingway audit:
   - Max 60 lines for Button-level components
   - Max 3 levels nesting
   - Zero "what" comments
```

**Button.tsx Specific:**
```typescript
// Token Migration
- HollowStyle: border-yellow-1 → border-accent-gold
- SolidStyle: design-button-gradient-background → Preserve (custom gradient)
- PlainStyle: bg-white-5 → bg-frost-glass-fill
- DisabledStyle: bg-white-5 text-gray-400 → bg-surface-dim text-text-disabled

// Logic Compression (Lines 28-50 → 8 lines)
const SizeMap = {
  small: 'h-6 text-2.5',
  middle: 'h-8 text-3',
  large: 'w-56 h-10 text-3.5',
} as const;

const style = disabled ? DisabledStyle : VariantStyle[variant];
const sizeClass = SizeMap[size];

return <Comp className={cn(BaseStyle, style, sizeClass, className)} {...props} />;
```

**Acceptance:**
- All primitives use Nexus semantic tokens
- Button.tsx ≤ 60 lines, Input.tsx ≤ 70 lines
- No if-chains for variant/size logic
- All transitions use motion constants

### Block 4: Container Components (Day 3-4)
**Priority Order:** Dialog → Drawer → Popover → Tooltip

**Dialog/Drawer Requirements:**
1. Apply Deep Glass to overlay (`DialogOverlay`, `DrawerOverlay`)
2. Apply Frost Glass to content panel
3. Motion: `duration-300 ease-smooth` for enter/exit
4. Border: `border-border-subtle` (mist.100 equivalent)

**Popover/Tooltip Requirements:**
1. Apply Frost Glass to content
2. Motion: `duration-200 ease-smooth`
3. Arrow: match Frost Glass fill

**Acceptance:**
- All modals block backdrop with Deep Glass
- All floating elements use Frost Glass
- Animation durations match motion spec (300ms modal, 200ms popover)

### Block 5: Complex Components (Day 4-5)
**Priority Order:** Form → Table → Carousel → Tree → Masonry

**Form Special Case:**
- Input wrapper inherits Input primitive tokens
- Error state: `border-status-error text-status-error`
- Label uses `text-text-secondary` (mist.200)

**Table Requirements:**
1. Header: `bg-surface-secondary` (steel.100)
2. Row hover: `hover:bg-surface-hover` (steel.200)
3. Border: `border-border-dim` (steel.300)

**Carousel/Tree:**
- Controls: inherit Button tokens
- Track/Rail: `bg-surface-dim`
- Active indicator: `bg-core-blue`

**Acceptance:**
- No component-specific color definitions
- All colors reference semantic tokens
- Complex logic <80 lines per component

### Block 6: Custom Components Migration (Day 5-6)
**Priority Order:** ImgUploader → ModelUploader → ImgViewer → Tree → Loading

**Pattern:**
1. Audit for direct theme.ts usage
2. Replace with Nexus semantics
3. Apply material system (e.g., ImgUploader drag zone → Frost Glass)
4. Compress verbose logic (see Hemingway audit rules)

**Loading Component:**
- Use motion constants for animation timing
- Apply Void or Frost Glass depending on context

**Acceptance:**
- Custom components match base UI token usage
- No divergent color schemes
- Motion timing unified

### Block 7: Motion System Integration (Day 6)
1. Create `src/tokens/motion.ts`:
   ```typescript
   const Easing = {
     smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
     spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
   } as const;

   const Duration = {
     fast: '150ms',
     base: '200ms',
     slow: '300ms',
     slower: '500ms',
   } as const;
   ```
2. Add UnoCSS shortcuts:
   ```typescript
   'ease-smooth': { 'transition-timing-function': Easing.smooth },
   'duration-fast': { 'transition-duration': Duration.fast },
   ```
3. Global replacements:
   - `transition` → `transition-colors duration-fast ease-smooth`
   - Radix animations → apply duration classes

**Acceptance:**
- Zero inline `transition: ...` CSS
- All timing functions use constants
- Consistent animation feel across all components

### Block 8: Style Enforcement Audit (Day 7)
**Automated Checks:**
1. `grep -r "rgba(" src/ --exclude-dir=tokens` → 0 matches
2. `grep -r "gray-[0-9]" src/ --exclude-dir=theme.ts` → 0 matches
3. `grep -r "// loop" src/` → 0 matches
4. `grep -r "// return" src/` → 0 matches

**Manual Review:**
1. Open random component file
2. Check:
   - Nesting depth ≤ 4
   - No verbose intermediates (see Button lines 28-41 anti-pattern)
   - Types at top, exports at bottom
   - Early returns for guards
3. Repeat for 10 components

**Acceptance:**
- 100% automated checks pass
- Manual review: 9/10 components pass Hemingway audit
- Identified violations documented in `llmdoc/agent/debt-*.md`

</ExecutionPlan>

## 5. Quality Gates

### Pre-Commit Hooks
```bash
# .husky/pre-commit additions
pnpm lint                          # ESLint spaced-comment enforcement
pnpm audit:tokens                  # Custom script: detect hard-coded colors
pnpm audit:hemingway               # Custom script: detect verbose patterns
```

### Token Enforcement Script
```typescript
// scripts/audit-tokens.ts
const forbidden = [
  /rgba\(\d+,\s*\d+,\s*\d+/,      // Direct rgba()
  /bg-gray-[0-9]/,                 // Legacy gray scale
  /#[0-9A-Fa-f]{6}/,              // Hex colors
];

for (const file of componentFiles) {
  const content = readFileSync(file);
  for (const pattern of forbidden) {
    if (pattern.test(content)) {
      throw new Error(`Token violation in ${file}`);
    }
  }
}
```

### Hemingway Compliance Script
```typescript
// scripts/audit-hemingway.ts
const antiPatterns = [
  { pattern: /\/\/\s*(loop|iterate|return|if|check)/i, error: 'WHAT comment' },
  { pattern: /let\s+\w+\s*=\s*['"']''["'];/, error: 'Empty string init' },
  { pattern: /if\s*\([^)]+\)\s*{\s*if/, error: 'Nested if depth' },
];

// Line count limits
const limits = {
  'button.tsx': 60,
  'input.tsx': 70,
  'dialog/*.tsx': 80,
};
```

### Acceptance Criteria (Final Gate)
- [ ] All 32 components use Nexus semantic tokens
- [ ] Zero hard-coded colors in component files
- [ ] Material system applied (12+ components use Frost/Deep Glass)
- [ ] Motion constants unified (4 durations, 2 easing functions)
- [ ] Button.tsx ≤ 60 lines (current: 68 lines)
- [ ] Automated audits pass in CI
- [ ] Manual Hemingway review: 90% pass rate
- [ ] No regressions in visual rendering (screenshot diff tests)

## 6. Risk Mitigation

**Risk 1: Breaking Radix Compatibility**
- Mitigation: Test Dialog, Popover, Select after material changes
- Radix portals may interfere with backdrop-blur

**Risk 2: UnoCSS Dynamic Class Purging**
- Mitigation: Safelist all Nexus tokens in `uno.config.ts`
- Use const objects for variants (tree-shakable)

**Risk 3: Performance (Backdrop-Blur)**
- Mitigation: Apply Deep Glass only to modals (low frequency)
- Benchmark: measure FPS during Dialog open/close

**Risk 4: Theme.ts Breaking Changes**
- Mitigation: Keep legacy aliases during migration
- Delete after Block 8 confirmation

## 7. Migration Pseudo-Code

```typescript
// High-level transformation algorithm
for (const component of allComponents) {
  // Phase 1: Token substitution
  const tokens = extractColorUsage(component);
  for (const token of tokens) {
    const nexusToken = mapLegacyToNexus(token);
    replaceInFile(component, token, nexusToken);
  }

  // Phase 2: Style compression
  const ifChains = detectIfChains(component);
  for (const chain of ifChains) {
    const lookupMap = convertToMap(chain);
    replaceInFile(component, chain, lookupMap);
  }

  // Phase 3: Material application
  const componentType = classifyComponent(component);
  const material = materialMap[componentType];
  if (material) applyMaterial(component, material);

  // Phase 4: Motion integration
  replaceTransitions(component, motionConstants);

  // Phase 5: Hemingway audit
  const violations = auditHemingway(component);
  if (violations.length > 0) flagForReview(component, violations);
}
```

## 8. Definition of Done

**Per-Component:**
- Uses only Nexus semantic tokens
- No if-chains for variant/size logic
- Passes Hemingway line count limit
- Has motion constants applied
- Nesting depth ≤ 4 levels

**System-Wide:**
- `pnpm audit:tokens` exits 0
- `pnpm audit:hemingway` <10% violation rate
- Visual regression tests pass
- Bundle size delta <5kb
- No TypeScript errors

**Documentation:**
- Token migration map in `llmdoc/guides/token-migration.md`
- Material usage guide in `llmdoc/guides/material-system.md`
- Component refactor notes in `llmdoc/agent/refactor-*.md`

---

**Estimated Effort:** 7 days (56 hours)
**Blockers:** None (all constitutional rules provided)
**Dependencies:** Librarian token spec, Hemingway style guide
