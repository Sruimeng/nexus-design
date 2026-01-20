import { Tabs } from '@/ui/tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full">
      <Tabs.List className="mb-4 gap-2">
        <Tabs.Trigger
          value="tab1"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab2"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab3"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="border border-white/8 rounded-3 p-4">
        <h3 className="mb-2 text-lg">Content for Tab 1</h3>
        <p className="text-text-secondary">This is the content of the first tab.</p>
      </Tabs.Content>
      <Tabs.Content value="tab2" className="border border-white/8 rounded-3 p-4">
        <h3 className="mb-2 text-lg">Content for Tab 2</h3>
        <p className="text-text-secondary">This is the content of the second tab.</p>
      </Tabs.Content>
      <Tabs.Content value="tab3" className="border border-white/8 rounded-3 p-4">
        <h3 className="mb-2 text-lg">Content for Tab 3</h3>
        <p className="text-text-secondary">This is the content of the third tab.</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
      <Tabs.List className="flex-col gap-2">
        <Tabs.Trigger
          value="tab1"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Profile
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab2"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Settings
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab3"
          className="rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          Security
        </Tabs.Trigger>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Content value="tab1" className="border border-white/8 rounded-3 p-4">
          <h3 className="mb-2 text-lg">Profile Settings</h3>
          <p className="text-text-secondary">Manage your profile information.</p>
        </Tabs.Content>
        <Tabs.Content value="tab2" className="border border-white/8 rounded-3 p-4">
          <h3 className="mb-2 text-lg">Application Settings</h3>
          <p className="text-text-secondary">Configure application preferences.</p>
        </Tabs.Content>
        <Tabs.Content value="tab3" className="border border-white/8 rounded-3 p-4">
          <h3 className="mb-2 text-lg">Security Settings</h3>
          <p className="text-text-secondary">Manage security and privacy options.</p>
        </Tabs.Content>
      </div>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-full">
      <Tabs.List className="mb-4 gap-1">
        <Tabs.Trigger
          value="home"
          className="flex items-center gap-2 rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          <span>🏠</span>
          Home
        </Tabs.Trigger>
        <Tabs.Trigger
          value="search"
          className="flex items-center gap-2 rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          <span>🔍</span>
          Search
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          className="flex items-center gap-2 rounded-3 px-4 py-2 text-text-secondary data-[state=active]:bg-core-blue/20 data-[state=active]:text-text-primary"
        >
          <span>⚙️</span>
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="home" className="p-4">
        Home content
      </Tabs.Content>
      <Tabs.Content value="search" className="p-4">
        Search content
      </Tabs.Content>
      <Tabs.Content value="settings" className="p-4">
        Settings content
      </Tabs.Content>
    </Tabs>
  ),
};
