import { Avatar } from '@/ui/avatar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar className="size-16">
      <Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar className="size-16 bg-core-blue/20 text-text-primary">
      <Avatar.Fallback>AB</Avatar.Fallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <Avatar.Image src="https://github.com/shadcn.png" alt="Small" />
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-12">
        <Avatar.Image src="https://github.com/shadcn.png" alt="Medium" />
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-16">
        <Avatar.Image src="https://github.com/shadcn.png" alt="Large" />
        <Avatar.Fallback>L</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-24">
        <Avatar.Image src="https://github.com/shadcn.png" alt="XLarge" />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="size-12 border-2 border-surface-primary">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
        <Avatar.Fallback>U1</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-12 border-2 border-surface-primary">
        <Avatar.Fallback className="bg-core-blue/20">U2</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-12 border-2 border-surface-primary">
        <Avatar.Fallback className="bg-status-success/20">U3</Avatar.Fallback>
      </Avatar>
      <Avatar className="size-12 border-2 border-surface-primary bg-text-disabled/20">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};
