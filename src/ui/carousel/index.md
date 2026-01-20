```tsx
<Carousel className="max-w-xs w-full">
  <Carousel.Content>
    {Array.from({ length: 5 }).map((_, index) => (
      <Carousel.Item key={index}>
        <div className="bg-white p-1">
          <div className="aspect-square flex items-center justify-center p-6">
            <span className="text-4xl text-black font-semibold">{index + 1}</span>
          </div>
        </div>
      </Carousel.Item>
    ))}
  </Carousel.Content>
  <Carousel.Previous>
    <div>111</div>
  </Carousel.Previous>
  <Carousel.Next>
    <div>111</div>
  </Carousel.Next>
  <Carousel.Dot className="bg-gray-1 data-[state=active]:bg-orange">
    <div>0</div>
  </Carousel.Dot>
</Carousel>
```
