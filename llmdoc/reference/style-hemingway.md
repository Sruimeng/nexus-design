---
id: style-hemingway
type: reference
related_ids: [constitution, forbidden-patterns]
---

# Hemingway Style Protocol

## Iceberg Principle

**Surface (Visible Code):**
```typescript
interface Props {
  variant: 'solid' | 'hollow';
  disabled?: boolean;
}

const Component = ({ variant, disabled }: Props) => {
  if (disabled) return <DisabledState />;
  return <ActiveState variant={variant} />;
};
```

**Beneath (Implicit):**
- Type system encodes business rules
- Early returns encode state machine
- Function names encode behavior
- NO comments explaining what code does

**Constraints:**
- Types define intent, comments are failure
- If code needs explanation, refactor it
- Show through structure, not prose

## Comment Policy

### Forbidden

```typescript
// BAD: "what" comments
const items = data.map(x => x.id); // loop through items
if (disabled) return null; // early return for disabled state
```

### Acceptable

```typescript
// Edge case: Radix requires string IDs for a11y
const id = String(numericId);

// Workaround: UnoCSS doesn't support dynamic classes
const className = variant === 'solid' ? SolidStyle : HollowStyle;

// TODO: Extract to hook after React 19 migration
useEffect(() => { ... });
```

**Rules:**
- WHY, not WHAT
- Edge cases and workarounds only
- Chinese acceptable for domain-specific terms: `// 模型上传器的拖拽区域`
- NO comments that duplicate type signatures

### Spaced Comments

```typescript
// CORRECT (spaced-comment eslint rule)
// This is proper

//WRONG (no space)
//This will error
```

## Naming

### Good

```typescript
Button
IconButton
ModelUploader
handleClick
isDisabled
```

### Bad

```typescript
AbstractButtonComponent
ButtonManager
ButtonImpl
IButtonProps
TButtonVariant
btnClickHandler
```

**Rules:**
- Simple nouns for things
- Verbs for actions (`handle`, `fetch`, `toggle`)
- NO prefixes: `Abstract`, `Base`, `I`, `T`
- NO suffixes: `Impl`, `Manager`, `Service`, `Component`
- NO abbreviations: `btn`, `img`, `msg`

## Structure

### Newspaper Style

```typescript
// 1. Type definitions (headline)
interface Props {
  variant: 'solid' | 'hollow';
}

// 2. Constants (subheading)
const BaseStyle = '...';

// 3. Main logic (lede)
const Component = ({ variant }: Props) => {
  return <Element />;
};

// 4. Exports (byline)
export { Component };
```

**Rules:**
- Most important at top
- Reader can stop at any point and understand
- NO scrolling to find types
- NO exports scattered throughout

### Early Returns

```typescript
// GOOD
const Component = ({ disabled, loading, data }: Props) => {
  if (disabled) return <Disabled />;
  if (loading) return <Loading />;
  if (!data) return null;

  return <Content data={data} />;
};

// BAD (nested)
const Component = ({ disabled, loading, data }: Props) => {
  return disabled ? (
    <Disabled />
  ) : loading ? (
    <Loading />
  ) : data ? (
    <Content data={data} />
  ) : null;
};
```

**Constraints:**
- Max nesting depth: 3-4 levels
- Prefer guard clauses
- Ternaries only for simple assignments

### Variable Extraction

```typescript
// GOOD
const Component = ({ variant, size, disabled }: Props) => {
  const styleClass = disabled ? DisabledStyle : VariantStyle[variant];
  const sizeClass = SizeMap[size];

  return <Button className={cn(BaseStyle, styleClass, sizeClass)} />;
};

// BAD (logic in JSX)
const Component = ({ variant, size, disabled }: Props) => {
  return (
    <Button
      className={cn(
        BaseStyle,
        disabled ? DisabledStyle : VariantStyle[variant],
        SizeMap[size]
      )}
    />
  );
};
```

**Rules:**
- Complex expressions → named variables
- Magic numbers → named constants
- Inline only trivial operations

## Terseness

### Code Density

```typescript
// GOOD (dense)
const Button = ({ variant = 'solid', size = 'large', ...props }: Props) => {
  const Comp = props.asChild ? Slot : 'button';
  const style = variant === 'hollow' ? HollowStyle : SolidStyle;
  return <Comp className={cn(BaseStyle, style)} {...props} />;
};

// BAD (verbose)
const Button = (props: Props) => {
  const variant = props.variant || 'solid';
  const size = props.size || 'large';
  const restProps = { ...props };
  delete restProps.variant;
  delete restProps.size;

  let Component;
  if (props.asChild) {
    Component = Slot;
  } else {
    Component = 'button';
  }

  let styleClass;
  if (variant === 'hollow') {
    styleClass = HollowStyle;
  } else {
    styleClass = SolidStyle;
  }

  return <Component className={cn(BaseStyle, styleClass)} {...restProps} />;
};
```

**Rules:**
- Destructure with defaults
- Use ternaries for assignment
- NO unnecessary intermediate variables
- NO verbose if-chains for simple logic

### Type Inference

```typescript
// GOOD
const items = data.map(x => x.id);
const [count, setCount] = useState(0);

// BAD
const items: number[] = data.map((x: Item): number => x.id);
const [count, setCount] = useState<number>(0);
```

**Rules:**
- Let TypeScript infer when obvious
- Annotate function parameters, not return types (unless recursive)
- Annotate only when inference fails or is ambiguous

## High Signal, Low Noise

### Signal

```typescript
interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'hollow';
}
```

This tells:
- It's a button wrapper
- Has two visual variants
- Accepts all button props

### Noise

```typescript
/**
 * Button Component
 *
 * This is a reusable button component that wraps the native HTML button element.
 * It supports multiple visual variants and sizes.
 *
 * @param {Props} props - The component props
 * @param {string} props.variant - The visual style variant
 * @returns {JSX.Element} The rendered button element
 */
```

This tells:
- Nothing the types don't already say
- Nothing the name doesn't convey

**Rules:**
- Delete any prose that duplicates types
- Delete any explanation of standard patterns
- Keep only non-obvious rationale

## Negative Constraints

**Forbidden:**
- Comments explaining what loops do
- Function names like `processData`, `handleStuff`
- Nesting >4 levels deep
- Magic numbers without names
- Logic in JSX return statements
- Verbose intermediate variables for single use
- Type annotations TypeScript can infer
- JSDoc for components (types are self-documenting)
- "Introduction" or "Overview" comments
- ASCII art or decorative comments
