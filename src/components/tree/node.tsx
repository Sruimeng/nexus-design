import { Popover, SnapInput } from '@/ui';
import { cn } from '@/utils';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { Icon } from '../icon';

export interface ITreeNode {
  name: string;
  displayName: string;
  visible: boolean;
  disabled: boolean;
  children: ITreeNode[];
}

interface Props {
  node: ITreeNode;
  selected: string[];
  expanded: string[];
  level: number;
  readOnly?: boolean;
  onDelete: (name: string) => void;
  onNameChange: (name: string, value: string) => void;
  onVisibleChange: (name: string) => void;
  onSelectChange: (name: string) => void;
  onExpandedChange: (name: string) => void;
  children?: React.ReactNode;
}

export const TreeNode: React.FC<Props> = ({
  node,
  selected,
  expanded,
  level,
  readOnly,
  onDelete,
  onSelectChange,
  onExpandedChange,
  onNameChange,
  onVisibleChange,
  children,
}) => {
  const { name, displayName, visible, disabled } = node;
  const isExpanded = expanded.includes(name);
  const isSelected = selected.includes(name);
  const canExpand = Boolean(children);
  const [edit, setEdit] = useState(false);
  const clickTimerRef = useRef(0);
  const computedStyle = useMemo(() => {
    if (disabled) return 'opacity-50 cursor-not-allowed';
    if (isSelected) return level ? 'bg-core-blue/10' : 'bg-core-blue/20';
    if (visible) return level ? 'hover:bg-surface-dim' : 'hover:bg-surface-hover';
    if (!visible) return 'opacity-50';
    return '';
  }, [disabled, isSelected, visible, level]);

  const Expanded = useMemo(() => {
    return (
      <div className="size-3">
        {canExpand && (
          <Icon
            className="size-3 text-text-disabled data-[state=close]-rotate-180"
            data-state={isExpanded ? 'open' : 'close'}
            icon="i-nexus:arrow-monotone"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onExpandedChange(name);
            }}
          />
        )}
      </div>
    );
  }, [canExpand, isExpanded, name, onExpandedChange]);

  const NamePart = useMemo(() => {
    if (edit) {
      return (
        <SnapInput
          className="mx-1 h-7 min-w-0 border border-core-blue rounded-2 bg-transparent p-2 text-3 outline-none"
          value={displayName}
          autoFocus
          onChange={(value) => {
            setEdit(false);
            onNameChange(name, value);
          }}
        />
      );
    }
    return <div className="flex-1 truncate text-start text-3">{displayName}</div>;
  }, [displayName, edit, name, onNameChange]);

  const Node = useMemo(() => {
    return (
      <button
        className="h-full flex flex-1 items-center justify-center gap-1 overflow-hidden"
        disabled={disabled}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          if (clickTimerRef.current) {
            clearTimeout(clickTimerRef.current);
            clickTimerRef.current = 0;
          }
          clickTimerRef.current = window.setTimeout(() => {
            onSelectChange(name);
            clickTimerRef.current = 0;
          }, 100);
        }}
        onDoubleClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          if (clickTimerRef.current) {
            clearTimeout(clickTimerRef.current);
            clickTimerRef.current = 0;
          }
          if (!readOnly) setEdit(true);
        }}
      >
        <Icon
          className="mr-2 flex-shrink-0 text-text-secondary"
          icon={children ? 'i-nexus:group-monotone' : 'i-nexus:cube-monotone'}
        />
        {NamePart}
      </button>
    );
  }, [NamePart, children, disabled, name, onSelectChange, readOnly]);

  const Visible = useMemo(() => {
    return (
      <button
        className="rounded-1.5 p-1 hover:bg-surface-hover"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          onVisibleChange(name);
        }}
        disabled={disabled}
      >
        <Icon
          className="size-4"
          icon={visible ? 'i-nexus:visible-monotone' : 'i-nexus:invisible-monotone'}
        />
      </button>
    );
  }, [disabled, name, onVisibleChange, visible]);

  const Menu = useMemo(() => {
    if (readOnly) return null;

    return (
      <Popover>
        <Popover.Trigger disabled={disabled} className="rounded-1.5 p-1 hover:bg-surface-hover">
          <Icon className="size-4" icon="i-nexus:more-horizontal-monotone" />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-38 rounded-4 p-2" side="bottom" align="end" sideOffset={6}>
            <button
              className="w-full flex items-center gap-1 rounded-5 px-1.5 py-2 hover:bg-surface-hover"
              onClick={() => onDelete(name)}
              disabled={disabled}
            >
              <Icon className="size-4" icon="i-nexus:delete-monotone" />
              <p className="text-3">Delete</p>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    );
  }, [disabled, name, onDelete, readOnly]);

  return (
    <li className="tree-node relative w-full">
      <div
        className={cn('flex items-center w-full h-8.5 cursor-pointer', computedStyle)}
        style={{ paddingLeft: `${level * 1}rem` }}
      >
        {Expanded}
        {Node}
        <div className="mr-3 flex gap-1">
          {Visible}
          {Menu}
        </div>
      </div>
      {canExpand && isExpanded && <ul className="w-full">{children}</ul>}
    </li>
  );
};
