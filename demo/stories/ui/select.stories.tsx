import { Select } from '@/ui/select';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => (
    <Select defaultValue="apple">
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="grape">Grape</Select.Item>
      </Select.Content>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Choose an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="1">Option 1</Select.Item>
        <Select.Item value="2">Option 2</Select.Item>
        <Select.Item value="3">Option 3</Select.Item>
      </Select.Content>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Select..." />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label className="px-4 py-2 text-xs text-text-disabled">Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Group>
        <Select.Separator className="my-1 h-px bg-white/10" />
        <Select.Group>
          <Select.Label className="px-4 py-2 text-xs text-text-disabled">Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
          <Select.Item value="tomato">Tomato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Disabled select" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="1">Option 1</Select.Item>
      </Select.Content>
    </Select>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Select a number" />
      </Select.Trigger>
      <Select.Content>
        {Array.from({ length: 50 }, (_, i) => (
          <Select.Item key={i} value={`item-${i}`}>
            Item {i + 1}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  ),
};
