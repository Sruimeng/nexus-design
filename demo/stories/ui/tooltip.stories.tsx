import { Tooltip } from '@/ui/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Hover me</button>
      </Tooltip.Trigger>
      <Tooltip.Content className="px-3 py-2 text-sm">This is a tooltip</Tooltip.Content>
    </Tooltip>
  ),
};

export const TopPosition: Story = {
  render: () => (
    <div className="pt-16">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button className="rounded-3 bg-core-blue px-4 py-2">Top</button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top" className="px-3 py-2 text-sm">
          Tooltip at top
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Right</button>
      </Tooltip.Trigger>
      <Tooltip.Content side="right" className="px-3 py-2 text-sm">
        Tooltip at right
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const BottomPosition: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Bottom</button>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom" className="px-3 py-2 text-sm">
        Tooltip at bottom
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Left</button>
      </Tooltip.Trigger>
      <Tooltip.Content side="left" className="px-3 py-2 text-sm">
        Tooltip at left
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const TipsHelper: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Need help?</span>
      <Tooltip.Tips>
        This is a helper tooltip that provides additional information about this feature.
      </Tooltip.Tips>
    </div>
  ),
};

export const TipsWithLongText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Complex feature</span>
      <Tooltip.Tips side="right">
        This feature allows you to configure advanced settings. Make sure to read the documentation
        before making changes. Incorrect configuration may cause unexpected behavior.
      </Tooltip.Tips>
    </div>
  ),
};
