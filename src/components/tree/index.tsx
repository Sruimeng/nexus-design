import { useCallback } from 'react';
import { TreeNode, type ITreeNode } from './node';

export type { ITreeNode } from './node';

interface Props {
  data: ITreeNode[];
  selected: string[];
  expanded: string[];
  readOnly?: boolean;
  onDelete: (name: string) => void;
  onNameChange: (name: string, value: string) => void;
  onVisibleChange: (name: string) => void;
  onSelectChange: (name: string) => void;
  onExpandedChange: (name: string) => void;
}

export const Tree: React.FC<Props> = ({
  data,
  selected,
  expanded,
  readOnly,
  onDelete,
  onNameChange,
  onVisibleChange,
  onSelectChange,
  onExpandedChange,
}) => {
  const renderTree = useCallback(
    (nodes: ITreeNode[], level = 0) => {
      return nodes.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          level={level}
          selected={selected}
          expanded={expanded}
          readOnly={readOnly}
          onDelete={onDelete}
          onSelectChange={onSelectChange}
          onExpandedChange={onExpandedChange}
          onNameChange={onNameChange}
          onVisibleChange={onVisibleChange}
        >
          {node.children &&
            node.children.length &&
            renderTree(node.children, level < 5 ? level + 1 : 5)}
        </TreeNode>
      ));
    },
    [
      selected,
      expanded,
      readOnly,
      onDelete,
      onSelectChange,
      onExpandedChange,
      onNameChange,
      onVisibleChange,
    ],
  );

  return <ul className="w-full list-none">{renderTree(data)}</ul>;
};
