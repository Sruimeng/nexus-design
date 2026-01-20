import { Icon } from '@/components/icon';
import { Toggle, ToggleGroup } from '@/ui/toggle';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Button: Story = {
  args: {
    variant: 'button',
    children: 'Toggle',
  },
};

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    children: 'Navigation',
  },
};

export const IconToggle: Story = {
  args: {
    variant: 'icon',
    children: <Icon icon="i-nexus:check-monotone" />,
  },
};

export const GroupButton: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroup.Item value="left" variant="button">
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" variant="button">
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" variant="button">
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const GroupNavigation: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="home">
      <ToggleGroup.Item value="home" variant="navigation">
        Home
      </ToggleGroup.Item>
      <ToggleGroup.Item value="about" variant="navigation">
        About
      </ToggleGroup.Item>
      <ToggleGroup.Item value="contact" variant="navigation">
        Contact
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const GroupIcon: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroup.Item value="bold" variant="icon">
        <Icon icon="i-nexus:check-monotone" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" variant="icon">
        <Icon icon="i-nexus:close-monotone" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" variant="icon">
        <Icon icon="i-nexus:arrow-monotone" />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};
