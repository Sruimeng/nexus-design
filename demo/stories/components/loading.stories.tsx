import { Loading } from '@/components/loading';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Basic: Story = {
  render: () => (
    <div className="relative h-96 w-full">
      <Loading>
        <Loading.Icon />
      </Loading>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <div className="relative h-96 w-full">
      <Loading>
        <Loading.Icon />
        <p className="mt-4 text-text-secondary">Loading your content...</p>
      </Loading>
    </div>
  ),
};

export const OnlyOverlay: Story = {
  render: () => (
    <div className="relative h-96 w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <p>Content behind overlay</p>
      </div>
      <Loading>
        <div />
      </Loading>
    </div>
  ),
};

export const Programmatic: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleShow = () => {
      setIsLoading(true);
      const close = Loading.show();
      setTimeout(() => {
        close();
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div>
        <button
          onClick={handleShow}
          disabled={isLoading}
          className="rounded-3 bg-core-blue px-4 py-2 disabled:opacity-50"
        >
          Show Loading (2s)
        </button>
      </div>
    );
  },
};

export const ProgrammaticWithCustomContent: Story = {
  render: () => {
    const handleShow = () => {
      const closeFunc = Loading.show(
        <Loading>
          <Loading.Icon />
          <p className="mt-4 text-text-secondary">Processing your request...</p>
          <button
            onClick={() => closeFunc()}
            className="mt-4 border border-white/8 rounded-3 px-4 py-2"
          >
            Cancel
          </button>
        </Loading>,
      );

      setTimeout(closeFunc, 3000);
    };

    return (
      <button onClick={handleShow} className="rounded-3 bg-core-blue px-4 py-2">
        Show Custom Loading
      </button>
    );
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div className="relative h-96 w-full">
      <Loading>
        <div className="size-16 animate-pulse rounded-full bg-core-blue" />
      </Loading>
    </div>
  ),
};
