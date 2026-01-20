import { Carousel } from '@/ui/carousel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Basic: Story = {
  render: () => (
    <div className="mx-auto max-w-lg w-full">
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>
            <div className="rounded-3 bg-core-blue/20 p-12 text-center">Slide 1</div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="rounded-3 bg-status-success/20 p-12 text-center">Slide 2</div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="rounded-3 bg-status-warning/20 p-12 text-center">Slide 3</div>
          </Carousel.Item>
        </Carousel.Content>
      </Carousel>
    </div>
  ),
};

export const WithControls: Story = {
  render: () => (
    <div className="mx-auto max-w-lg w-full space-y-4">
      <Carousel>
        <Carousel.Content>
          {Array.from({ length: 5 }, (_, i) => (
            <Carousel.Item key={i}>
              <div className="rounded-3 bg-core-blue/20 p-12 text-center">Slide {i + 1}</div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>
      <div className="flex justify-center gap-2">
        <Carousel>
          <Carousel.Content>
            {Array.from({ length: 5 }, (_, i) => (
              <Carousel.Item key={i} />
            ))}
          </Carousel.Content>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            <Carousel.Previous className="rounded-3 bg-surface-primary/80 px-4 py-2">
              Prev
            </Carousel.Previous>
            <Carousel.Next className="rounded-3 bg-surface-primary/80 px-4 py-2">
              Next
            </Carousel.Next>
          </div>
        </Carousel>
      </div>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div className="mx-auto max-w-lg w-full">
      <Carousel>
        <Carousel.Content>
          {Array.from({ length: 4 }, (_, i) => (
            <Carousel.Item key={i}>
              <div className="rounded-3 bg-core-blue/20 p-12 text-center">Slide {i + 1}</div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <div className="mt-4 flex justify-center gap-2">
          <Carousel.Dot className="size-2 rounded-full bg-white/20 data-[state=active]:bg-core-blue" />
        </div>
      </Carousel>
    </div>
  ),
};

export const Autoplay: Story = {
  render: () => (
    <div className="mx-auto max-w-lg w-full">
      <Carousel plugins={[Carousel.Plugin.Autoplay({ delay: 2000 })]}>
        <Carousel.Content>
          {Array.from({ length: 3 }, (_, i) => (
            <Carousel.Item key={i}>
              <div className="rounded-3 bg-status-success/20 p-12 text-center">
                Auto Slide {i + 1}
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>
    </div>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl w-full">
      <Carousel opts={{ align: 'start' }}>
        <Carousel.Content className="gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Carousel.Item key={i} className="basis-1/3">
              <div className="rounded-3 bg-core-blue/20 p-8 text-center">{i + 1}</div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>
    </div>
  ),
};
