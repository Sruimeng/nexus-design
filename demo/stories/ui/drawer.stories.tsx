import { Button } from '@/ui/button';
import { Drawer } from '@/ui/drawer';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button variant="solid">Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>This is a drawer component.</Drawer.Description>
          </Drawer.Header>
          <div className="p-4">
            <p className="text-sm text-text-secondary">
              Drawer content goes here. Swipe down or click outside to close.
            </p>
          </div>
          <Drawer.Footer>
            <Button variant="solid" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button variant="hollow">Edit Profile</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Edit Profile</Drawer.Title>
            <Drawer.Description>Make changes to your profile here.</Drawer.Description>
          </Drawer.Header>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm">Name</p>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm">Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
              />
            </div>
          </div>
          <Drawer.Footer className="flex-row gap-2">
            <Button variant="hollow" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="solid" onClick={() => setOpen(false)} className="flex-1">
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

export const NoScaleBackground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Drawer shouldScaleBackground={false} open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button variant="solid">Open (No Scale)</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>No Scale Background</Drawer.Title>
          </Drawer.Header>
          <div className="p-4">
            <p className="text-sm text-text-secondary">
              Background doesn&apos;t scale when drawer opens.
            </p>
          </div>
        </Drawer.Content>
      </Drawer>
    );
  },
};
