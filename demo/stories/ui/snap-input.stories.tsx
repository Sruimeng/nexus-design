import { SnapInput } from '@/ui/snap-input';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof SnapInput> = {
  title: 'UI/SnapInput',
  component: SnapInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SnapInput>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('Click to edit');
    return (
      <SnapInput
        value={value}
        onChange={setValue}
        className="border border-white/8 rounded-3 bg-transparent px-3 py-2"
      />
    );
  },
};

export const Number: Story = {
  render: () => {
    const [value, setValue] = useState('42');
    return (
      <div className="space-y-2">
        <p className="text-sm">Value</p>
        <SnapInput
          value={value}
          onChange={setValue}
          className="w-24 border border-white/8 rounded-3 bg-transparent px-3 py-2 text-center"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <SnapInput
      value="Disabled"
      onChange={() => {}}
      disabled
      className="border border-white/8 rounded-3 bg-transparent px-3 py-2"
    />
  ),
};

export const InlineEdit: Story = {
  render: () => {
    const [title, setTitle] = useState('Project Title');
    const [description, setDescription] = useState('Click to edit description');

    return (
      <div className="border border-white/8 rounded-3 p-4 space-y-4">
        <SnapInput
          value={title}
          onChange={setTitle}
          className="border-0 bg-transparent px-2 py-1 text-xl font-bold focus:border-b focus:border-core-blue"
        />
        <SnapInput
          value={description}
          onChange={setDescription}
          className="border-0 bg-transparent px-2 py-1 text-sm text-text-secondary focus:border-b focus:border-core-blue"
        />
      </div>
    );
  },
};
