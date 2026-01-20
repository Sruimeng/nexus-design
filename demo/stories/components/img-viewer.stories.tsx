import { ImgViewer } from '@/components/img-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof ImgViewer> = {
  title: 'Components/ImgViewer',
  component: ImgViewer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImgViewer>;

export const Single: Story = {
  render: () => (
    <ImgViewer
      className="h-48 w-48 rounded-3"
      src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400"
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <ImgViewer
      className="h-48 w-48 rounded-3"
      src={[
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      ]}
    />
  ),
};

export const WithDelete: Story = {
  render: () => {
    const [images, setImages] = useState([
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    ]);

    return (
      <div className="flex gap-4">
        {images.map((src, index) => (
          <ImgViewer key={index} className="h-48 w-48 rounded-3" src={src}>
            <ImgViewer.Delete onClick={() => setImages(images.filter((_, i) => i !== index))} />
          </ImgViewer>
        ))}
      </div>
    );
  },
};

export const FromFile: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    return (
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFile(file);
          }}
          className="text-sm"
        />
        {file && <ImgViewer className="h-48 w-48 rounded-3" src={file} />}
      </div>
    );
  },
};

export const Gallery: Story = {
  render: () => {
    const images = [
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    ];

    return (
      <div className="grid grid-cols-4 gap-4">
        {images.map((src, index) => (
          <ImgViewer key={index} className="h-32 w-32 rounded-3" src={src} />
        ))}
      </div>
    );
  },
};
