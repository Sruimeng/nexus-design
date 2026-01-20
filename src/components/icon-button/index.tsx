import { Button } from '@/ui';
import { cn } from '@/utils';
import type React from 'react';
import { Icon } from '../icon';

interface Props extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  icon?: string;
  iconClassName?: string;
  text?: string;
}

export const IconButton: React.FC<Props> = ({ icon, text, iconClassName, ...props }) => {
  return (
    <Button variant="solid" size="large" {...props}>
      {icon && <Icon className={cn('mr-1 size-5', iconClassName)} icon={icon} />}
      {text}
    </Button>
  );
};
