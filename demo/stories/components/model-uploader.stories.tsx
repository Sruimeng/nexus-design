import { ModelUploader } from '@/components/model-uploader';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof ModelUploader> = {
  title: 'Components/ModelUploader',
  component: ModelUploader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModelUploader>;

export const Basic: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <div className="space-y-4">
        <ModelUploader
          className="h-48 w-96 rounded-3"
          icon="i-nexus:model-monotone"
          title="Upload 3D Model"
          description="FBX, OBJ, STL, GLB (Max 50MB)"
          onChange={setFile}
        />
        {file && (
          <div className="text-sm text-text-secondary">
            Selected: {file.name} ({Math.round(file.size / 1024 / 1024)}MB)
          </div>
        )}
      </div>
    );
  },
};

export const Required: Story = {
  render: () => (
    <ModelUploader
      className="h-48 w-96 rounded-3"
      icon="i-nexus:model-monotone"
      title="Upload Model"
      description="Required field"
      required
      onChange={(file) => console.log('File:', file)}
    />
  ),
};

export const CustomSize: Story = {
  render: () => (
    <ModelUploader
      className="h-64 w-64 rounded-3"
      icon="i-nexus:model-monotone"
      title="3D Asset"
      onChange={(file) => console.log('File:', file)}
    />
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="relative h-48 w-96 border border-white/20 rounded-3 border-dashed">
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-4xl">📦</div>
          <div className="text-sm text-text-primary">Drop 3D model here</div>
          <div className="mt-1 text-xs text-text-secondary">.fbx .obj .stl .glb</div>
        </div>
      </div>
      <ModelUploader.Input onChange={(file) => console.log('Custom:', file)} />
    </div>
  ),
};
