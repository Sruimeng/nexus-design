import { ImgUploader } from '@/components/img-uploader';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof ImgUploader> = {
  title: 'Components/ImgUploader',
  component: ImgUploader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImgUploader>;

export const Basic: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    return (
      <div className="space-y-4">
        <ImgUploader
          className="h-48 w-96 rounded-3"
          icon="i-nexus:image-monotone"
          title="Upload Image"
          description="Click or drag to upload"
          onChange={(f) => setFile(f as File)}
        />
        {file && (
          <div className="text-sm text-text-secondary">
            Selected: {file.name} ({Math.round(file.size / 1024)}KB)
          </div>
        )}
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => (
    <ImgUploader
      className="h-48 w-96 rounded-3"
      icon="i-nexus:image-monotone"
      title="Upload Image"
      description="Required field"
      required
      onChange={(f) => console.log('File:', f)}
    />
  ),
};

export const Multiple: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <ImgUploader
          className="h-48 w-96 rounded-3"
          icon="i-nexus:image-monotone"
          title="Upload Multiple Images"
          description="Select multiple files"
          multiple
          onChange={(f) => setFiles(f as File[])}
        />
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Selected files ({files.length}):</div>
            {files.map((file, i) => (
              <div key={i} className="text-sm text-text-secondary">
                {file.name} ({Math.round(file.size / 1024)}KB)
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const CustomSize: Story = {
  render: () => (
    <ImgUploader
      className="h-64 w-64 rounded-full"
      icon="i-nexus:image-monotone"
      title="Avatar"
      description="Upload profile picture"
      onChange={(f) => console.log('Avatar:', f)}
    />
  ),
};

export const WithPreview: Story = {
  render: () => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (f: File | File[]) => {
      const file = f as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    };

    return (
      <div className="flex gap-4">
        <ImgUploader
          className="h-48 w-48 rounded-3"
          icon="i-nexus:image-monotone"
          title="Upload"
          onChange={handleChange}
        />
        {preview && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Preview:</div>
            <img src={preview} alt="Preview" className="h-48 w-48 rounded-3 object-cover" />
          </div>
        )}
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => (
    <div className="relative h-48 w-96 border border-white/20 rounded-3 border-dashed">
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-4xl">📁</div>
          <div className="text-sm text-text-primary">Drop files here</div>
          <div className="mt-1 text-xs text-text-secondary">or click to browse</div>
        </div>
      </div>
      <ImgUploader.Input onChange={(f) => console.log('Custom:', f)} />
    </div>
  ),
};
