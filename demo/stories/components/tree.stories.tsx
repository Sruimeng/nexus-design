import { Tree, type ITreeNode } from '@/components/tree';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tree>;

const sampleData: ITreeNode[] = [
  {
    name: 'root',
    displayName: 'root',
    visible: true,
    disabled: false,
    children: [
      {
        name: 'src',
        displayName: 'src',
        visible: true,
        disabled: false,
        children: [
          {
            name: 'index.ts',
            displayName: 'index.ts',
            visible: true,
            disabled: false,
            children: [],
          },
          { name: 'app.tsx', displayName: 'app.tsx', visible: true, disabled: false, children: [] },
        ],
      },
      {
        name: 'public',
        displayName: 'public',
        visible: true,
        disabled: false,
        children: [
          {
            name: 'favicon.ico',
            displayName: 'favicon.ico',
            visible: true,
            disabled: false,
            children: [],
          },
        ],
      },
      {
        name: 'package.json',
        displayName: 'package.json',
        visible: true,
        disabled: false,
        children: [],
      },
    ],
  },
];

export const Basic: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>(['root']);

    return (
      <div className="w-96 border border-white/8 rounded-3 p-4">
        <Tree
          data={sampleData}
          selected={selected}
          expanded={expanded}
          onSelectChange={(name) =>
            setSelected((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onExpandedChange={(name) =>
            setExpanded((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onVisibleChange={(name) => console.log('Toggle visibility:', name)}
          onNameChange={(name, value) => console.log('Rename:', name, '->', value)}
          onDelete={(name) => console.log('Delete:', name)}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['src']);
    const [expanded, setExpanded] = useState<string[]>(['root', 'src']);

    return (
      <div className="w-96 border border-white/8 rounded-3 p-4">
        <Tree
          data={sampleData}
          selected={selected}
          expanded={expanded}
          readOnly
          onSelectChange={(name) =>
            setSelected((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onExpandedChange={(name) =>
            setExpanded((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onVisibleChange={() => {}}
          onNameChange={() => {}}
          onDelete={() => {}}
        />
      </div>
    );
  },
};

export const DeepNesting: Story = {
  render: () => {
    const deepData: ITreeNode[] = [
      {
        name: 'Level 1',
        displayName: 'Level 1',
        visible: true,
        disabled: false,
        children: [
          {
            name: 'Level 2',
            displayName: 'Level 2',
            visible: true,
            disabled: false,
            children: [
              {
                name: 'Level 3',
                displayName: 'Level 3',
                visible: true,
                disabled: false,
                children: [
                  {
                    name: 'file.txt',
                    displayName: 'file.txt',
                    visible: true,
                    disabled: false,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>(['Level 1', 'Level 2']);

    return (
      <div className="w-96 border border-white/8 rounded-3 p-4">
        <Tree
          data={deepData}
          selected={selected}
          expanded={expanded}
          onSelectChange={(name) =>
            setSelected((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onExpandedChange={(name) =>
            setExpanded((prev) =>
              prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
            )
          }
          onVisibleChange={(name) => console.log('Toggle:', name)}
          onNameChange={(name, value) => console.log('Rename:', name, value)}
          onDelete={(name) => console.log('Delete:', name)}
        />
      </div>
    );
  },
};
