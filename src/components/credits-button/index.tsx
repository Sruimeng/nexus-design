import { Button } from '@/ui';
import { Icon } from '../icon';

interface Props extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  count?: number;
  text?: string;
  children?: React.ReactNode;
}

export const CreditsButton: React.FC<Props> = (props) => {
  return (
    <Button variant="solid" size="large" {...props}>
      {props.children}
      {props.text}
      {props.count ? (
        <div className="flex items-center pl-1.5">
          <Icon className="size-5" icon="i-nexus-bolt-monotone" />
          <span className="pl-1.5">{props.count}</span>
        </div>
      ) : null}
    </Button>
  );
};
