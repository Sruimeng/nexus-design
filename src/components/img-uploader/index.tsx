import { FrostGlass } from '@/tokens/materials';
import { toast } from '@/ui';
import { checkSize, checkType, cn } from '@/utils';
import grid from '@assets/grid.webp';
import type React from 'react';
import { useCallback, useState } from 'react';
import { Icon } from '../icon';

interface InputProps {
  onChange: (file: File | File[]) => void;
  multiple?: boolean;
}

const Input: React.FC<InputProps> = ({ onChange, multiple = false }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const image = e.target.files?.[0];
    if (!image) return;

    if (!checkSize(image, 5)) {
      toast.error('The uploaded file size cannot exceed 5 MB');
      return;
    }

    if (!checkType(image, 'image')) {
      toast.error('This file type is not supported.');
      return;
    }

    onChange(multiple ? Array.from(e.target.files || []) : image);
    e.target.value = '';
  };

  return (
    <input
      className="absolute inset-0 cursor-pointer opacity-0"
      type={'file'}
      max={10}
      multiple={multiple}
      accept="image/png,image/webp,image/jpg,image/jpeg"
      onChange={handleChange}
    />
  );
};

interface Props {
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  required?: boolean;
  onChange: (file: File | File[]) => void;
  multiple?: boolean;
}

interface IImgUploader extends React.FC<Props> {
  Input: React.FC<InputProps>;
}

const BaseStyle =
  'relative size-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-fast ease-smooth hover:bg-surface-hover';
const BorderStyle = 'box-border border border-dashed border-border-dim';
const DragOverStyle = cn('bg-core-blue/10 w-full hover:bg-core-blue/10', FrostGlass);

export const ImgUploader: IImgUploader = ({
  className,
  icon,
  title,
  description,
  required,
  onChange,
  multiple,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback(() => setIsDragOver(true), []);
  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  return (
    <div
      className={cn(BaseStyle, BorderStyle, className, isDragOver && DragOverStyle)}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragLeave}
    >
      {icon && <Icon className="size-5" icon={icon} />}
      {title && (
        <div className="my-1.5 max-w-2/3 w-37.5 text-center text-wrap text-2.5 text-text-primary">
          {title}
        </div>
      )}
      {description && (
        <div className="max-w-2/3 w-37.5 text-center text-wrap text-2.5 text-text-secondary">
          {description}
        </div>
      )}
      {required && (
        <Icon
          className="absolute right-3 top-3 size-3 text-status-error"
          icon="i-nexus:required-monotone"
        />
      )}
      <div
        className="absolute left-0 top-0 z-0 size-full bg-contain bg-repeat"
        style={{ backgroundImage: `url(${grid})` }}
      />
      <Input onChange={onChange} multiple={multiple} />
    </div>
  );
};

ImgUploader.Input = Input;
