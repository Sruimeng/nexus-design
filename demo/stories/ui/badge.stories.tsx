import { Badge } from '@/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Dot: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="rounded-3 bg-core-blue px-4 py-2">Notifications</button>
      <Badge />
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="rounded-3 bg-core-blue px-4 py-2">Messages</button>
      <Badge>9</Badge>
    </div>
  ),
};

export const LargeCount: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="rounded-3 bg-core-blue px-4 py-2">Inbox</button>
      <Badge>99+</Badge>
    </div>
  ),
};

export const OnAvatar: Story = {
  render: () => (
    <div className="relative inline-block">
      <div className="size-12 rounded-full bg-core-blue/20" />
      <Badge />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="relative inline-block">
        <button className="rounded-3 bg-core-blue px-4 py-2">Tasks</button>
        <Badge>3</Badge>
      </div>
      <div className="relative inline-block">
        <button className="rounded-3 bg-core-blue px-4 py-2">Alerts</button>
        <Badge>12</Badge>
      </div>
      <div className="relative inline-block">
        <button className="rounded-3 bg-core-blue px-4 py-2">Updates</button>
        <Badge />
      </div>
    </div>
  ),
};
