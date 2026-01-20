import { Button } from '@/ui/button';
import { Toaster, toast } from '@/ui/sonner';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Basic: Story = {
  render: () => <Button onClick={() => toast('Event has been created')}>Show Toast</Button>,
};

export const Success: Story = {
  render: () => <Button onClick={() => toast.success('Successfully saved!')}>Success Toast</Button>,
};

export const Error: Story = {
  render: () => <Button onClick={() => toast.error('Something went wrong')}>Error Toast</Button>,
};

export const Warning: Story = {
  render: () => (
    <Button onClick={() => toast.warning('Please check your input')}>Warning Toast</Button>
  ),
};

export const Info: Story = {
  render: () => <Button onClick={() => toast.info('New updates available')}>Info Toast</Button>,
};

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        })
      }
    >
      With Description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }
    >
      With Action
    </Button>
  ),
};

export const Promise: Story = {
  render: () => {
    const handleClick = () => {
      const promise = new window.Promise<{ name: string }>((resolve) =>
        setTimeout(() => resolve({ name: 'Sonner' }), 2000),
      );

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data: { name: string }) => `${data.name} toast has been added`,
        error: 'Error',
      });
    };

    return <Button onClick={handleClick}>Show Promise Toast</Button>;
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button onClick={() => toast('First toast')}>Toast 1</Button>
      <Button onClick={() => toast('Second toast')}>Toast 2</Button>
      <Button onClick={() => toast('Third toast')}>Toast 3</Button>
    </div>
  ),
};
