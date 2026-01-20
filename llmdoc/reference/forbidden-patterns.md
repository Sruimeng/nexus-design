---
id: forbidden-patterns
type: reference
related_ids: [constitution, style-hemingway]
---

# Forbidden Patterns

## Naming

### ❌ Verbose Naming

```typescript
// FORBIDDEN
abstract class AbstractButtonComponentBase { }
class ButtonManagerServiceImpl { }
interface IButtonProps { }
type TButtonVariant = string;
const handleButtonClickEvent = () => {};

// CORRECT
class Button { }
interface Props { }
type Variant = 'solid' | 'hollow';
const handleClick = () => {};
```

**Rule:** NO Abstract, Base, Manager, Service, Impl, I, T prefixes/suffixes.

### ❌ Abbreviations

```typescript
// FORBIDDEN
const btn = <Button />;
const msg = 'Hello';
const cfg = loadConfig();

// CORRECT
const button = <Button />;
const message = 'Hello';
const config = loadConfig();
```

**Rule:** NO abbreviations except universally understood (ID, URL, API).

### ❌ Generic Names

```typescript
// FORBIDDEN
const data = fetchUser();
const info = getDetails();
const manager = new UploadManager();

// CORRECT
const user = fetchUser();
const details = getDetails();
const uploader = new Uploader();
```

**Rule:** Names must convey specific purpose.

## Nesting

### ❌ Deep Nesting (>4 levels)

```typescript
// FORBIDDEN
const Component = () => {
  return (
    <div>
      {data.map(item => (
        <div>
          {item.children.map(child => (
            <div>
              {child.active ? (
                <span>{child.name}</span>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// CORRECT
const ChildItem = ({ child }: { child: Child }) => {
  if (!child.active) return null;
  return <span>{child.name}</span>;
};

const ItemGroup = ({ item }: { item: Item }) => (
  <div>
    {item.children.map(child => <ChildItem key={child.id} child={child} />)}
  </div>
);

const Component = ({ data }: Props) => (
  <div>
    {data.map(item => <ItemGroup key={item.id} item={item} />)}
  </div>
);
```

**Rule:** Extract components when nesting exceeds 3-4 levels.

### ❌ Nested Ternaries

```typescript
// FORBIDDEN
const status = loading ? 'Loading...' : error ? 'Error!' : data ? 'Success' : 'Empty';

// CORRECT
const getStatus = () => {
  if (loading) return 'Loading...';
  if (error) return 'Error!';
  if (data) return 'Success';
  return 'Empty';
};
const status = getStatus();
```

**Rule:** Max 1 level of ternary. Use if-chains or lookup objects.

## TypeScript

### ❌ prop-types Library

```typescript
// FORBIDDEN
import PropTypes from 'prop-types';

Component.propTypes = {
  variant: PropTypes.oneOf(['solid', 'hollow']),
};

// CORRECT
interface Props {
  variant: 'solid' | 'hollow';
}
```

**Rule:** NO prop-types. Use TypeScript interfaces.

### ❌ Explicit any

```typescript
// FORBIDDEN
const data: any = fetchData();
const handler = (e: any) => {};

// CORRECT
const data = fetchData(); // Infer or type fetchData return
const handler = (e: React.MouseEvent<HTMLButtonElement>) => {};

// If truly unavoidable
const data: any = fetchData(); // TODO: Type the API response
```

**Rule:** NO `any` without suppression comment explaining why.

### ❌ Inconsistent Type Imports

```typescript
// FORBIDDEN
import { Theme } from 'unocss/preset-mini';
import React from 'react';

// CORRECT
import type { Theme } from 'unocss/preset-mini';
import * as React from 'react';
```

**Rule:** Type-only imports use `import type` (enforced by ESLint).

## React

### ❌ Class Components

```typescript
// FORBIDDEN
class Button extends React.Component<Props> {
  render() {
    return <button {...this.props} />;
  }
}

// CORRECT
const Button = (props: Props) => {
  return <button {...props} />;
};
```

**Rule:** NO class components. Hooks only.

### ❌ React.FC for Refs

```typescript
// FORBIDDEN
const Button: React.FC<Props> = ({ children }) => {
  return <button>{children}</button>;
};

// CORRECT
const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children }, ref) => {
    return <button ref={ref}>{children}</button>;
  }
);
```

**Rule:** Use `React.forwardRef` for components wrapping DOM elements.

### ❌ Missing displayName

```typescript
// FORBIDDEN
const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => <button ref={ref} {...props} />
);

// CORRECT
const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => <button ref={ref} {...props} />
);
Button.displayName = 'Button';
```

**Rule:** ALWAYS set displayName on forwardRef components.

### ❌ Direct Radix Exports

```typescript
// FORBIDDEN (from ui/dialog/index.tsx)
export { Root as Dialog } from '@radix-ui/react-dialog';

// CORRECT
import * as DialogPrimitive from '@radix-ui/react-dialog';
const Dialog = DialogPrimitive.Root;
export { Dialog };
```

**Rule:** Import Radix as namespace, re-export primitives explicitly.

## Styling

### ❌ Tailwind Classes

```typescript
// FORBIDDEN
<button className="bg-blue-500 text-white px-4 py-2" />

// CORRECT
<button className="bg-core-blue/20 text-white border-core-blue/50" />
```

**Rule:** NO Tailwind color names. Use theme colors only.

### ❌ Inline Styles

```typescript
// FORBIDDEN
<button style={{ color: 'red', fontSize: 16 }} />

// CORRECT
const ErrorStyle = 'text-red text-4';
<button className={ErrorStyle} />
```

**Rule:** NO inline style objects. Use UnoCSS classes.

### ❌ CSS-in-JS

```typescript
// FORBIDDEN
import styled from 'styled-components';
const Button = styled.button`
  background: #3B82F6;
`;

// CORRECT
const ButtonStyle = 'bg-core-blue/20';
<button className={ButtonStyle} />
```

**Rule:** NO emotion, styled-components, or CSS-in-JS libraries.

### ❌ Custom CSS Files per Component

```typescript
// FORBIDDEN
// button.css
.button { background: #3B82F6; }

// button.tsx
import './button.css';

// CORRECT
const ButtonStyle = 'bg-core-blue/20';
```

**Rule:** NO component-level CSS files. Use UnoCSS or global style.scss.

## File Organization

### ❌ Deep Imports Across Folders

```typescript
// FORBIDDEN (from src/components/foo/bar.tsx)
import { utils } from '../../../ui/button/utils';

// CORRECT
import { utils } from '@/ui/button';
```

**Rule:** Use absolute imports with `@/` alias for cross-folder imports.

### ❌ Barrel Exports of Types

```typescript
// FORBIDDEN (from ui/index.ts)
export type { ButtonProps } from './button';

// CORRECT (from ui/button.tsx)
export interface Props { }
export const Button = (props: Props) => {};
```

**Rule:** Export types at definition site, not via barrel.

### ❌ Default Exports

```typescript
// FORBIDDEN
export default function Button() { }

// CORRECT
export const Button = () => { };
```

**Rule:** Named exports only for components and utilities.

## Comments

### ❌ "What" Comments

```typescript
// FORBIDDEN
const items = data.map(x => x.id); // loop through data and get IDs
if (disabled) return null; // return early if disabled
setCount(count + 1); // increment count

// CORRECT (no comments, code is self-explanatory)
const items = data.map(x => x.id);
if (disabled) return null;
setCount(count + 1);
```

**Rule:** NO comments explaining what code does. Refactor if unclear.

### ❌ JSDoc for Components

```typescript
// FORBIDDEN
/**
 * Button component
 * @param {Props} props - The component props
 * @returns {JSX.Element}
 */
const Button = (props: Props) => <button {...props} />;

// CORRECT (types are self-documenting)
const Button = (props: Props) => <button {...props} />;
```

**Rule:** NO JSDoc for components. Types document the API.

### ❌ Unspaced Comments

```typescript
// FORBIDDEN
//This is wrong
/*This too*/

// CORRECT
// This is right
/* This too */
```

**Rule:** `spaced-comment` ESLint rule enforced.

## Logic

### ❌ Logic in JSX

```typescript
// FORBIDDEN
return (
  <Button
    className={cn(
      BaseStyle,
      disabled ? DisabledStyle : variant === 'solid' ? SolidStyle : HollowStyle,
      size === 'large' ? 'w-56 h-10' : 'h-8'
    )}
  />
);

// CORRECT
const styleClass = disabled ? DisabledStyle : VariantStyle[variant];
const sizeClass = SizeMap[size];
return <Button className={cn(BaseStyle, styleClass, sizeClass)} />;
```

**Rule:** Extract complex expressions to variables before return.

### ❌ Mutation

```typescript
// FORBIDDEN
const items = props.items;
items.push(newItem);
setState(items);

// CORRECT
const items = [...props.items, newItem];
setState(items);
```

**Rule:** NO mutation of props or state. Use immutable patterns.

### ❌ Unused Variables

```typescript
// FORBIDDEN
const [count, setCount] = useState(0);
const unused = 'foo';

// CORRECT
const [count, setCount] = useState(0);
```

**Rule:** `noUnusedLocals` enforced. Delete unused code.

## Accessibility

### ❌ Disabled a11y Rules Without Reason

```typescript
// FORBIDDEN (in eslint.config.js)
'jsx-a11y/alt-text': 'off', // No reason given

// CORRECT
// Design system enforces alt via TypeScript required prop
'jsx-a11y/alt-text': 'off',
```

**Rule:** Disabled a11y rules must have design rationale comment.
