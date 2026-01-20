import { Popover } from '@/ui/popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Open Popover</button>
      </Popover.Trigger>
      <Popover.Content className="w-64 p-4">
        <Popover.Title>Popover Title</Popover.Title>
        <p className="text-sm text-text-secondary">This is the content of the popover.</p>
      </Popover.Content>
    </Popover>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Open</button>
      </Popover.Trigger>
      <Popover.Content className="w-64 p-4">
        <Popover.Arrow className="fill-obsidian-100" />
        <p className="text-sm">Popover with arrow</p>
      </Popover.Content>
    </Popover>
  ),
};

export const TopPosition: Story = {
  render: () => (
    <div className="pt-32">
      <Popover>
        <Popover.Trigger asChild>
          <button className="rounded-3 bg-core-blue px-4 py-2">Top</button>
        </Popover.Trigger>
        <Popover.Content side="top" className="w-64 p-4">
          <p className="text-sm">Positioned at top</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Right</button>
      </Popover.Trigger>
      <Popover.Content side="right" className="w-64 p-4">
        <p className="text-sm">Positioned at right</p>
      </Popover.Content>
    </Popover>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Left</button>
      </Popover.Trigger>
      <Popover.Content side="left" className="w-64 p-4">
        <p className="text-sm">Positioned at left</p>
      </Popover.Content>
    </Popover>
  ),
};
