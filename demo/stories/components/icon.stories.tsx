import { Icon } from '@/components/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    icon: 'i-nexus:check-monotone',
    className: 'size-6',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="i-nexus:check-monotone" className="size-4" />
      <Icon icon="i-nexus:check-monotone" className="size-6" />
      <Icon icon="i-nexus:check-monotone" className="size-8" />
      <Icon icon="i-nexus:check-monotone" className="size-12" />
      <Icon icon="i-nexus:check-monotone" className="size-16" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="i-nexus:check-monotone" className="size-8 text-core-blue" />
      <Icon icon="i-nexus:check-monotone" className="size-8 text-status-success" />
      <Icon icon="i-nexus:check-monotone" className="size-8 text-status-warning" />
      <Icon icon="i-nexus:check-monotone" className="size-8 text-status-error" />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6">
      <Icon icon="i-nexus:check-monotone" className="size-8" />
      <Icon icon="i-nexus:close-monotone" className="size-8" />
      <Icon icon="i-nexus:arrow-monotone" className="size-8" />
      <Icon icon="i-nexus:delete-monotone" className="size-8" />
      <Icon icon="i-nexus:image-monotone" className="size-8" />
      <Icon icon="i-nexus:model-monotone" className="size-8" />
      <Icon icon="i-nexus:required-monotone" className="size-8" />
      <Icon icon="i-nexus:bolt-monotone" className="size-8" />
    </div>
  ),
};
