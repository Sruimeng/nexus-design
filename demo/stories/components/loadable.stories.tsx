import { Loadable } from '@/components/loadable';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Loadable> = {
  title: 'Components/Loadable',
  component: Loadable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loadable>;

export const Basic: Story = {
  render: () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

    const loadMore = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
    };

    return (
      <div className="h-96 overflow-auto border border-white/8 rounded-3">
        <Loadable onLoadMore={loadMore}>
          <div className="p-4 space-y-2">
            {items.map((item) => (
              <div key={item} className="rounded-3 bg-surface-dim p-4">
                Item {item}
              </div>
            ))}
          </div>
        </Loadable>
      </div>
    );
  },
};

export const WithGrid: Story = {
  render: () => {
    const [items, setItems] = useState(Array.from({ length: 12 }, (_, i) => i + 1));

    const loadMore = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setItems((prev) => [...prev, ...Array.from({ length: 12 }, (_, i) => prev.length + i + 1)]);
    };

    return (
      <div className="h-96 overflow-auto border border-white/8 rounded-3">
        <Loadable onLoadMore={loadMore}>
          <div className="grid grid-cols-3 gap-4 p-4">
            {items.map((item) => (
              <div
                key={item}
                className="aspect-square flex items-center justify-center rounded-3 bg-core-blue/20"
              >
                {item}
              </div>
            ))}
          </div>
        </Loadable>
      </div>
    );
  },
};

export const LimitedData: Story = {
  render: () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
      if (!hasMore) return;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newItems = Array.from({ length: 10 }, (_, i) => items.length + i + 1);
      setItems((prev) => [...prev, ...newItems]);
      if (items.length >= 30) setHasMore(false);
    };

    return (
      <div className="h-96 overflow-auto border border-white/8 rounded-3">
        <Loadable onLoadMore={loadMore}>
          <div className="p-4 space-y-2">
            {items.map((item) => (
              <div key={item} className="rounded-3 bg-surface-dim p-4">
                Item {item}
              </div>
            ))}
            {!hasMore && (
              <div className="py-4 text-center text-sm text-text-secondary">No more items</div>
            )}
          </div>
        </Loadable>
      </div>
    );
  },
};
