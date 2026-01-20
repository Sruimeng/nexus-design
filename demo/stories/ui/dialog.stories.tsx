import { Confirm, Dialog, Dialoger } from '@/ui/dialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Dialoger />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-3 bg-core-blue px-4 py-2">Open Dialog</button>
      </Dialog.Trigger>
      <Dialog>
        <div className="w-96 rounded-4 bg-obsidian-100 p-6">
          <h2 className="mb-4 text-xl">Dialog Title</h2>
          <p className="mb-4 text-text-secondary">This is a basic dialog example.</p>
          <div className="flex justify-end gap-2">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="border border-white/8 rounded-3 px-4 py-2">Cancel</button>
              </Dialog.Trigger>
            </Dialog.Root>
            <button className="rounded-3 bg-core-blue px-4 py-2">Confirm</button>
          </div>
        </div>
      </Dialog>
    </Dialog.Root>
  ),
};

export const Programmatic: Story = {
  render: () => {
    const handleShow = () => {
      const closeFunc = Dialog.show(
        <div className="w-96 rounded-4 bg-obsidian-100 p-6">
          <h2 className="mb-4 text-xl">Programmatic Dialog</h2>
          <p className="mb-4 text-text-secondary">Opened via Dialog.show()</p>
          <button onClick={() => closeFunc()} className="rounded-3 bg-core-blue px-4 py-2">
            Close
          </button>
        </div>,
      );
    };

    return (
      <button onClick={handleShow} className="rounded-3 bg-core-blue px-4 py-2">
        Show Dialog
      </button>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const handleConfirm = async () => {
      const result = await Confirm.show({
        title: 'Delete Item',
        description: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      });
      console.log('Confirmed:', result);
    };

    return (
      <button onClick={handleConfirm} className="rounded-3 bg-status-error px-4 py-2">
        Delete Item
      </button>
    );
  },
};
