import type React from 'react';
import { useEffect, useState } from 'react';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const SnapInput: React.FC<Props> = ({ value, onChange, ...props }) => {
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleInputBlur = () => {
    setEditValue(value);
    onChange?.(editValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange?.(editValue);
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onChange?.(editValue);
    }
  };

  return (
    <input
      {...props}
      type="text"
      value={editValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleInputKeyDown}
      onClick={(e) => e.stopPropagation()}
    />
  );
};
