import { IconButton } from '@/components/icon-button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const WithIcon: Story = {
  args: {
    icon: 'i-nexus:check-monotone',
    text: 'Confirm',
  },
};

export const OnlyIcon: Story = {
  args: {
    icon: 'i-nexus:delete-monotone',
  },
};

export const OnlyText: Story = {
  args: {
    text: 'Submit',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton icon="i-nexus:check-monotone" text="Accept" />
      <IconButton icon="i-nexus:close-monotone" text="Reject" />
      <IconButton icon="i-nexus:delete-monotone" text="Delete" />
      <IconButton icon="i-nexus:arrow-monotone" text="Next" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton variant="solid" icon="i-nexus:check-monotone" text="Solid" />
      <IconButton variant="hollow" icon="i-nexus:check-monotone" text="Hollow" />
      <IconButton variant="plain" icon="i-nexus:check-monotone" text="Plain" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton size="small" icon="i-nexus:check-monotone" text="Small" />
      <IconButton size="middle" icon="i-nexus:check-monotone" text="Middle" />
      <IconButton size="large" icon="i-nexus:check-monotone" text="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: 'i-nexus:check-monotone',
    text: 'Disabled',
    disabled: true,
  },
};
