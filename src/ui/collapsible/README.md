```tsx
// bottom
<div className="fixed bottom-50 w-50 overflow-hidden">
  <Collapsible  direction="bottom">
    <Collapsible.Content className="z-0 bg-gray">
      <div className="Repository">
        <span className="Text">@radix-ui/primitives</span>
      </div>
      <div className="Repository">
        <span className="Text">@radix-ui/colors</span>
      </div>
      <div className="Repository">
        <span className="Text">@radix-ui/themes</span>
      </div>
    </Collapsible.Content>
    <Collapsible.Trigger className="w-50 bg-amber">111</Collapsible.Trigger>
  </Collapsible>
</div>
// top
<div className="w-50 overflow-hidden">
  <Collapsible>
    <Collapsible.Trigger className="w-50 bg-amber">111</Collapsible.Trigger>
    <Collapsible.Content direction="top" className="z-0 bg-gray">
      <div className="Repository">
        <span className="Text">@radix-ui/primitives</span>
      </div>
      <div className="Repository">
        <span className="Text">@radix-ui/colors</span>
      </div>
      <div className="Repository">
        <span className="Text">@radix-ui/themes</span>
      </div>
    </Collapsible.Content>
  </Collapsible>
</div>
```
