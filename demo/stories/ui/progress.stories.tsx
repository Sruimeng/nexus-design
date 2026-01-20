import { Progress } from '@/ui/progress';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  args: {
    value: 60,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const CustomColor: Story = {
  args: {
    value: 75,
    indicator: 'bg-status-success',
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-2">
        <Progress value={progress} />
        <div className="text-center text-sm text-text-secondary">{progress}%</div>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading...</span>
        <span className="text-text-secondary">65%</span>
      </div>
      <Progress value={65} />
    </div>
  ),
};

export const MultipleStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm">Processing</div>
        <Progress value={33} />
      </div>
      <div className="space-y-2">
        <div className="text-sm">Uploading</div>
        <Progress value={66} indicator="bg-status-warning" />
      </div>
      <div className="space-y-2">
        <div className="text-sm">Complete</div>
        <Progress value={100} indicator="bg-status-success" />
      </div>
    </div>
  ),
};
