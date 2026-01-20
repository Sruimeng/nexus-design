import { Button } from '@/ui/button';
import { Collapsible } from '@/ui/collapsible';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-96 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Can I use this in my project?</h4>
          <Collapsible.Trigger asChild>
            <Button variant="plain" size="small">
              {open ? '−' : '+'}
            </Button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content className="space-y-2">
          <div className="border border-white/8 rounded-3 px-4 py-3 text-sm">
            Yes. Free to use for personal and commercial projects.
          </div>
        </Collapsible.Content>
      </Collapsible>
    );
  },
};

export const MultipleItems: Story = {
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
      <div className="w-96 space-y-4">
        <Collapsible open={open1} onOpenChange={setOpen1} className="space-y-2">
          <div className="flex items-center justify-between border border-white/8 rounded-3 p-4">
            <h4 className="text-sm font-medium">Installation</h4>
            <Collapsible.Trigger asChild>
              <button className="text-sm">{open1 ? '−' : '+'}</button>
            </Collapsible.Trigger>
          </div>
          <Collapsible.Content>
            <div className="px-4 py-3 text-sm text-text-secondary">
              Run: npm install @nexus-design/ui
            </div>
          </Collapsible.Content>
        </Collapsible>

        <Collapsible open={open2} onOpenChange={setOpen2} className="space-y-2">
          <div className="flex items-center justify-between border border-white/8 rounded-3 p-4">
            <h4 className="text-sm font-medium">Usage</h4>
            <Collapsible.Trigger asChild>
              <button className="text-sm">{open2 ? '−' : '+'}</button>
            </Collapsible.Trigger>
          </div>
          <Collapsible.Content>
            <div className="px-4 py-3 text-sm text-text-secondary">
              Import components and use them in your app.
            </div>
          </Collapsible.Content>
        </Collapsible>

        <Collapsible open={open3} onOpenChange={setOpen3} className="space-y-2">
          <div className="flex items-center justify-between border border-white/8 rounded-3 p-4">
            <h4 className="text-sm font-medium">Customization</h4>
            <Collapsible.Trigger asChild>
              <button className="text-sm">{open3 ? '−' : '+'}</button>
            </Collapsible.Trigger>
          </div>
          <Collapsible.Content>
            <div className="px-4 py-3 text-sm text-text-secondary">
              All components support className prop for custom styling.
            </div>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-96 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Details</h4>
        <Collapsible.Trigger asChild>
          <Button variant="plain" size="small">
            Toggle
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <div className="border border-white/8 rounded-3 px-4 py-3 text-sm text-text-secondary">
          This section is open by default.
        </div>
      </Collapsible.Content>
    </Collapsible>
  ),
};
