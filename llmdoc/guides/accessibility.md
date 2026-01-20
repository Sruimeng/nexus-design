---
id: guide-a11y
type: guide
related_ids: [ref-ui, guide-storybook]
---

# Accessibility (A11y)

## Standards

**Target:** WCAG 2.1 Level AA (minimum), AAA (where feasible)

**Compliance:**
- All text: AA (4.5:1 contrast ratio)
- Large text (H1-H3): AAA (7:1 contrast ratio)
- Interactive elements: AA + focus indicators
- Keyboard navigation: Full support

## v1.1 Readability Updates

### Text Colors

**Before v1.1:**
- Primary text: `#F8FAFC` (Slate-50) - 15.8:1 ratio
- Secondary text: `#94A3B8` (Slate-400) - 5.2:1 ratio ❌ (insufficient for small text)

**After v1.1:**
- Primary text: `#FFFFFF` (Pure White) - 21:1 ratio ✅ AAA
- Secondary text: `#CBD5E1` (Slate-300) - 9.3:1 ratio ✅ AAA
- Disabled text: `#64748B` (Slate-500) - 4.5:1 ratio ✅ AA (non-interactive)

**Rationale:** v1.1 increased contrast for small body text to meet AAA standard.

### Material System

**Frost Glass (v1.1):**
- Opacity: `70%` (was `40%`)
- Blur: `12px` (was `24px`)
- Border: `rgba(255,255,255,0.1)` (was `0.08`)

**Deep Glass (v1.1):**
- Opacity: `90%` (was `70%`)
- Blur: `12px` (was `24px`)

**Impact:** Higher opacity ensures readable text on glass surfaces. Lower blur reduces performance cost.

### Typography Weights

**Updated Hierarchy (v1.1):**

| Level | Before | After | Ratio | Standard |
|-------|--------|-------|-------|----------|
| H1 (Display) | Bold (700) | ExtraBold (800) | 7:1+ | AAA |
| H2 (Section) | SemiBold (600) | Bold (700) | 7:1+ | AAA |
| H3 (Card Title) | Medium (500) | SemiBold (600) | 7:1+ | AAA |
| Body (Main) | Light (300) | Regular (400) | 4.5:1+ | AA |
| Caption | Regular (400) | Medium (500) | 4.5:1+ | AA |

**Rationale:** Increased weights improve readability at small sizes, especially on glass backgrounds.

## Component-Level Compliance

### Button

**Focus State:**
```typescript
'focus-visible:ring-2 focus-visible:ring-core-blue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-100'
```

**Keyboard:**
- Enter/Space: Activate
- Tab: Navigate

**Contrast:**
- Solid variant text: `#FFFFFF` on `bg-core-blue/30` = 7.2:1 ✅ AAA
- Hollow variant text: `#CBD5E1` hover → `#FFFFFF` = 9.3:1 → 21:1 ✅ AAA

### Checkbox

**ARIA:**
```typescript
<CheckboxPrimitive.Root
  role="checkbox"
  aria-checked={checked}
  aria-disabled={disabled}
/>
```

**Visual Indicator:**
- Unchecked: `border-white/10` (1px visible)
- Checked: `bg-core-blue` + `shadow-[0_0_8px_rgba(59,130,246,0.4)]`
- Icon: `i-nexus:check-monotone` (pure white, high contrast)

### Switch

**ARIA:**
```typescript
<SwitchPrimitives.Root
  role="switch"
  aria-checked={checked}
/>
```

**Visual States:**
- Off: `bg-white/10`, thumb white with shadow
- On: `bg-core-blue/50`, thumb translates 20px (5 × `translate-x-5`)

### Form

**Error Handling:**
```typescript
<FormMessage role="alert" aria-live="polite">
  {error.message}
</FormMessage>
```

**Labels:**
```typescript
<Label htmlFor={fieldId}>
  Username {required && <span aria-label="required">*</span>}
</Label>
```

### Dialog

**Focus Trap:**
- Radix UI auto-traps focus within modal
- Escape key closes dialog
- Initial focus on first interactive element

**ARIA:**
```typescript
<DialogPrimitive.Content
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
/>
```

**Overlay:**
- Deep Glass (`bg-slate-950/90`) ensures sufficient contrast
- Click outside closes (dismiss pattern)

### Popover/Tooltip

**Keyboard:**
- Trigger focus → popover opens
- Escape → closes
- Tab → focus next tabbable

**ARIA:**
```typescript
<TooltipPrimitive.Content
  role="tooltip"
  aria-hidden={!open}
/>
```

## Testing Protocol

### Automated (Storybook)

**Tool:** `@storybook/addon-a11y`

**Checks:**
1. Color contrast (WCAG AA/AAA)
2. ARIA roles and attributes
3. Keyboard navigation
4. Focus indicators
5. Alt text for images

**Run:**
```bash
pnpm storybook
# Open story → Click "Accessibility" tab
```

### Manual

**Keyboard-Only Test:**
```
1. Tab through all interactive elements
2. Verify visible focus indicators
3. Test Enter/Space activation
4. Test Escape dismissal (modals/popups)
5. Verify no keyboard traps
```

**Screen Reader Test:**
- macOS: VoiceOver (`Cmd+F5`)
- Windows: NVDA (free)
- Linux: Orca

**Verify:**
- Labels announced correctly
- State changes announced (`checked`, `expanded`, `selected`)
- Error messages read aloud

## Color Contrast Matrix

**Background:** `#020617` (Obsidian 100)

| Foreground | Hex | Contrast | Level | Use Case |
|------------|-----|----------|-------|----------|
| Pure White | `#FFFFFF` | 21:1 | AAA | Button text, H1-H3 |
| Slate-300 | `#CBD5E1` | 9.3:1 | AAA | Body text, secondary labels |
| Slate-500 | `#64748B` | 4.5:1 | AA | Disabled text (non-interactive) |
| Core Blue | `#3B82F6` | 8.6:1 | AAA | Links, focus rings |
| Signal Red | `#F43F5E` | 5.8:1 | AA+ | Error text |
| Signal Green | `#10B981` | 6.1:1 | AA+ | Success text |

**Critical Rule:** NEVER use text colors below 4.5:1 ratio for body text.

## Motion & Animations

**Respect User Preferences:**
```typescript
// Detect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Conditionally apply animations
const animationClass = prefersReducedMotion ? '' : 'transition-all duration-fast ease-smooth';
```

**UnoCSS Support:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Best Practices

**DO:**
- Use semantic HTML (`<button>`, `<label>`, `<nav>`)
- Provide visible focus indicators (2px ring, high contrast)
- Test with keyboard only
- Use ARIA only when native semantics insufficient
- Announce dynamic content changes (`aria-live`)

**DO NOT:**
- Use `div` with `onClick` (use `<button>`)
- Remove focus outlines (users need them)
- Rely solely on color to convey state (add icons/text)
- Use `role="button"` on native buttons (redundant)
- Auto-focus inputs without user action (disorienting)

## Compliance Checklist

**Per Component:**
- [ ] Contrast ratio ≥ 4.5:1 (AA) for all text
- [ ] Keyboard navigable (Tab, Enter, Space, Escape)
- [ ] Focus indicator visible (2px+ ring)
- [ ] ARIA roles/attributes correct
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] No auto-play animations (or respect `prefers-reduced-motion`)
- [ ] Error messages announced (`role="alert"`)
- [ ] Forms have associated labels (`htmlFor` + `id`)

## Resources

**Standards:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

**Tools:**
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/) (browser extension)
- [Pa11y](https://pa11y.org/) (CI integration)

**Related:**
- [UI Reference](../reference/ui.md) - Color specs
- [Storybook Guide](./storybook-usage.md) - a11y addon usage
