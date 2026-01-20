import { cn } from '@/utils';
import type React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  className?: string;
}

export const Icon: React.FC<Props> = ({ icon, className, ...props }) => {
  return <div className={cn(icon, 'v-mid', className)} {...props} />;
};
