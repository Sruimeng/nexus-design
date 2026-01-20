import { Button } from '@/ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'hollow', 'plain'],
      description: 'Button visual style',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child component (Slot)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    children: 'Solid Button',
    variant: 'solid',
    size: 'large',
  },
};

export const Hollow: Story = {
  args: {
    children: 'Hollow Button',
    variant: 'hollow',
    size: 'large',
  },
};

export const Plain: Story = {
  args: {
    children: 'Plain Button',
    variant: 'plain',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'solid',
    size: 'small',
  },
};

export const Middle: Story = {
  args: {
    children: 'Middle',
    variant: 'solid',
    size: 'middle',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'solid',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'solid',
    size: 'large',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <Button variant="solid" size="small">
          Solid Small
        </Button>
        <Button variant="solid" size="middle">
          Solid Middle
        </Button>
        <Button variant="solid" size="large">
          Solid Large
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="hollow" size="small">
          Hollow Small
        </Button>
        <Button variant="hollow" size="middle">
          Hollow Middle
        </Button>
        <Button variant="hollow" size="large">
          Hollow Large
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="plain" size="small">
          Plain Small
        </Button>
        <Button variant="plain" size="middle">
          Plain Middle
        </Button>
        <Button variant="plain" size="large">
          Plain Large
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="solid" size="large" disabled>
          Disabled
        </Button>
        <Button variant="hollow" size="large" disabled>
          Disabled
        </Button>
        <Button variant="plain" size="large" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};
