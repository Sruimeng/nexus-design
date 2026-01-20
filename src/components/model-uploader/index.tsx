import { FrostGlass } from '@/tokens/materials';
import { toast } from '@/ui';
import { checkSize, checkType, cn } from '@/utils';
import grid from '@assets/grid.webp';
import type React from 'react';
import { Icon } from '../icon';

interface InputProps {
  onChange: (file: File) => void;
}

const Input: React.FC<InputProps> = ({ onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const model = e.target.files?.[0];
    if (!model) return;

    if (!checkSize(model, 50)) {
      toast.error('The uploaded file size cannot exceed 50 MB');
      return;
    }

    if (!checkType(model, 'model')) {
      toast.error('This file type is not supported.');
      return;
    }

    onChange(model);
    e.target.value = '';
  };

  return (
    <input
      className="absolute inset-0 cursor-pointer opacity-0"
      type={'file'}
      max={1}
      multiple={false}
      accept=".fbx,.obj,.stl,.glb"
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
  onChange: (file: File) => void;
}

interface IModelUploader extends React.FC<Props> {
  Input: React.FC<InputProps>;
}

const BaseStyle =
  'relative size-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-fast ease-smooth hover:bg-surface-hover';
const BorderStyle = cn('box-border border border-dashed border-white/20', FrostGlass);

export const ModelUploader: IModelUploader = ({
  className,
  icon,
  title,
  description,
  required,
  onChange,
}) => {
  return (
    <div className={cn(BaseStyle, BorderStyle, className)}>
      {icon && <Icon className="size-4" icon={icon} />}
      {title && (
        <div className="my-1 max-w-2/3 w-37.5 text-center text-wrap text-2.5 text-text-primary">
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
          className="absolute right-3 top-3 size-6 text-status-error"
          icon="i-nexus:required-monotone"
        />
      )}
      <div
        className="absolute left-0 top-0 z-0 size-full bg-contain bg-repeat"
        style={{ backgroundImage: `url(${grid})` }}
      />
      <Input onChange={onChange} />
    </div>
  );
};

ModelUploader.Input = Input;
