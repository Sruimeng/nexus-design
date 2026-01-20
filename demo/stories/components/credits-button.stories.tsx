import { CreditsButton } from '@/components/credits-button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CreditsButton> = {
  title: 'Components/CreditsButton',
  component: CreditsButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreditsButton>;

export const WithCount: Story = {
  args: {
    text: 'Generate',
    count: 10,
  },
};

export const OnlyText: Story = {
  args: {
    text: 'Continue',
  },
};

export const OnlyCount: Story = {
  args: {
    count: 25,
  },
};

export const LargeCount: Story = {
  args: {
    text: 'Create',
    count: 999,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <CreditsButton text="Generate Model" count={5} />
      <CreditsButton text="Enhance Quality" count={10} />
      <CreditsButton text="Premium Export" count={15} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <CreditsButton variant="solid" text="Solid" count={10} />
      <CreditsButton variant="hollow" text="Hollow" count={10} />
      <CreditsButton variant="plain" text="Plain" count={10} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CreditsButton size="small" text="Small" count={5} />
      <CreditsButton size="middle" text="Middle" count={10} />
      <CreditsButton size="large" text="Large" count={15} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    text: 'Insufficient Credits',
    count: 100,
    disabled: true,
  },
};
