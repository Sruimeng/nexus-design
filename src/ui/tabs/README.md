```tsx
<Tabs defaultValue="tab1">
  <Tabs.List className="bg-gray">
    <Tabs.Trigger
      className="bg-blue-2 transition data-[state=active]:bg-blue-5"
      value="tab1"
    >
      标签页 1
    </Tabs.Trigger>
    <Tabs.Trigger
      className="bg-orange-2 transition data-[state=active]:bg-orange-5"
      value="tab2"
    >
      标签页 2
    </Tabs.Trigger>
    {/* 可以再使用一个div来做背景的滑块 */}
    <div>111</div>
  </Tabs.List>
  <Tabs.Content value="tab1" className="bg-blue">
    <div>标签页 1 的内容</div>
  </Tabs.Content>
  <Tabs.Content value="tab2" className="bg-orange">
    <div>标签页 2 的内容</div>
  </Tabs.Content>
</Tabs>
```
