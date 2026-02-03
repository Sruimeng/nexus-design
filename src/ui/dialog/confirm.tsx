import { Icon } from '@/components';
import { FrostGlass } from '@/tokens/materials';
import { cn } from '@/utils';
import type * as React from 'react';
import { Button } from '../button';
import { Dialog } from './dialog';

interface Params {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancel?: React.ReactNode;
  confirm?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

interface Props extends Params {
  onClose: () => void;
}

interface IConfirm extends React.FC<Props> {
  show: (params?: Params) => void;
}

const Confirm: IConfirm = ({
  className,
  title,
  description,
  cancel,
  confirm,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  onClose,
}) => {
  const handleCancel = async () => {
    try {
      await onCancel?.();
    } finally {
      onClose();
    }
  };

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
    } finally {
      onClose();
    }
  };

  return (
    <div className={cn('w-95 p-4 rounded-6 relative text-text-primary', FrostGlass, className)}>
      <Icon
        icon="i-nexus-close-monotone"
        className="absolute right-4 top-4 size-5 cursor-pointer text-text-secondary"
        onClick={handleCancel}
      />
      <h3 className="mb-4 mt-6 text-center text-4.5 text-text-primary">{title}</h3>
      <div className="text-center text-4 text-text-secondary">{description}</div>
      <div className="mt-6 flex gap-4">
        {cancel ? (
          cancel
        ) : (
          <Button variant="plain" className="flex-1 font-bold" onClick={handleCancel}>
            {cancelText}
          </Button>
        )}
        {confirm ? (
          confirm
        ) : (
          <Button variant="solid" className="flex-1 font-bold" onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </div>
    </div>
  );
};

Confirm.show = (params) => {
  const close = Dialog.show(<Confirm {...params} onClose={() => close()} />);
};

export { Confirm };
