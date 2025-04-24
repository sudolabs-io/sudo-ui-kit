import { Meta, StoryObj } from '@storybook/react'
import {
  AdjustmentsIcon,
  ComponentsIcon,
  FileIcon,
  InboxIcon,
  LifeBuoyIcon,
  LockIcon,
  MiniSudolabsIcon,
  PieChartIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SudolabsIcon,
  WorldIcon,
} from 'components/icons'
import { Button } from './button'
import Indicator from './indicator'
import {
  Sidebar,
  SidebarCollapsibleItemGroup,
  SidebarCollapsibleItemGroupContent,
  SidebarCollapsibleItemGroupTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
} from './sidebar'

const MessagesIndicator = (messageCount: number) => (
  <Indicator variant="number" className="hidden sm:block">
    {messageCount}
  </Indicator>
)

const SidebarStory = () => (
  <div className="h-screen">
    <Sidebar>
      <SidebarHeader icon={SudolabsIcon} collapsedIcon={MiniSudolabsIcon} />

      <SidebarItemGroup>
        <SidebarItem icon={PieChartIcon} text="Overview" isActive />
        <SidebarItem icon={FileIcon} text="Pages" />
      </SidebarItemGroup>

      <SidebarCollapsibleItemGroup type="single" collapsible value="submenu-1">
        <SidebarCollapsibleItemGroupTrigger icon={ShoppingCartIcon} isActive>
          Sales
        </SidebarCollapsibleItemGroupTrigger>

        <SidebarCollapsibleItemGroupContent>
          <SidebarItem text="Product list" className="sm:px-0" />
          <SidebarItem text="Billing" className="sm:px-0" />
          <SidebarItem text="Invoice" className="sm:px-0" />
        </SidebarCollapsibleItemGroupContent>
      </SidebarCollapsibleItemGroup>

      <SidebarItemGroup>
        <SidebarItem icon={InboxIcon} text="Messages" rightAddon={() => MessagesIndicator(1)} />
        <SidebarItem icon={LockIcon} text="Authentication" />
      </SidebarItemGroup>

      <SidebarItemGroup>
        <SidebarItem icon={PieChartIcon} text="Docs" />
        <SidebarItem icon={ComponentsIcon} text="Components" />
        <SidebarItem icon={LifeBuoyIcon} text="Help" />
      </SidebarItemGroup>

      <SidebarItemGroup className="px-2">
        <Button className="w-full text-center ">Sign In</Button>
      </SidebarItemGroup>

      <SidebarFooter>
        <SidebarItem icon={AdjustmentsIcon} />
        <SidebarItem icon={WorldIcon} />
        <SidebarItem icon={SettingsIcon} />
      </SidebarFooter>
    </Sidebar>
  </div>
)

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => <SidebarStory />,
}

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
