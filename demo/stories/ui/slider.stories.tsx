import { Slider } from '@/ui/slider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    return <Slider value={value} onValueChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState([75]);
    return <Slider value={value} onValueChange={setValue} showValue />;
  },
};

export const WithAuto: Story = {
  render: () => {
    const [value, setValue] = useState([0]);
    return <Slider value={value} onValueChange={setValue} showValue showAuto />;
  },
};

export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState([150]);
    return <Slider value={value} onValueChange={setValue} min={0} max={200} showValue />;
  },
};

export const Disabled: Story = {
  render: () => <Slider value={[40]} disabled />,
};

export const DisabledWithValue: Story = {
  render: () => <Slider value={[60]} disabled showValue />,
};

export const MultipleControls: Story = {
  render: () => {
    const [volume, setVolume] = useState([70]);
    const [brightness, setBrightness] = useState([50]);
    const [contrast, setContrast] = useState([80]);

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm">Volume</p>
          <Slider value={volume} onValueChange={setVolume} showValue />
        </div>
        <div className="space-y-2">
          <p className="text-sm">Brightness</p>
          <Slider value={brightness} onValueChange={setBrightness} showValue />
        </div>
        <div className="space-y-2">
          <p className="text-sm">Contrast</p>
          <Slider value={contrast} onValueChange={setContrast} showValue />
        </div>
      </div>
    );
  },
};
