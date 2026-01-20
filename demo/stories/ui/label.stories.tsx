import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  args: {
    children: 'Label Text',
  },
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-check" disabled />
      <Label htmlFor="disabled-check" className="peer">
        Disabled option
      </Label>
    </div>
  ),
};
