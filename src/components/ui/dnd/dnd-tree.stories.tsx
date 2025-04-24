import { useMemo, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { DNDTreeContext, DNDTreeContextProps, TreeItem } from 'context/DNDTreeContext'
import { DNDTree } from './dnd-tree'

const MockItems = [
  { id: '1', name: 'Item 1' },
  {
    id: '2',
    name: 'Item 2',
    children: [
      { id: '2.1', name: 'Item 2.1' },
      { id: '2.2', name: 'Item 2.2' },
    ],
  },
  { id: '3', name: 'Item 3' },
  {
    id: '4',
    name: 'Item 4',
    children: [
      { id: '4.1', name: 'Item 4.1' },
      { id: '4.2', name: 'Item 4.2' },
    ],
  },
  { id: '5', name: 'Item 5' },
  {
    id: '6',
    name: 'Item 6',
    children: [
      { id: '6.1', name: 'Item 6.1' },
      { id: '6.2', name: 'Item 6.2' },
    ],
  },
  { id: '7', name: 'Item 7' },
  {
    id: '8',
    name: 'Item 8',
    children: [
      { id: '8.1', name: 'Item 8.1' },
      { id: '8.2', name: 'Item 8.2' },
    ],
  },
  { id: '9', name: 'Item 9' },
  { id: '10', name: 'Item 10' },
]

const DNDTreeStory = () => {
  const [treeItems, setTreeItems] = useState<TreeItem[]>(MockItems)

  const contextValue = useMemo<DNDTreeContextProps>(
    () => ({ treeItems, setTreeItems }),
    [treeItems, setTreeItems],
  )

  return (
    <DNDTreeContext.Provider value={contextValue}>
      <DNDTree />
    </DNDTreeContext.Provider>
  )
}

type Story = StoryObj<typeof DNDTree>

export const Default: Story = {
  render: () => <DNDTreeStory />,
}

const meta: Meta<typeof DNDTree> = {
  title: 'Components/DNDTree/DNDTree',
  component: DNDTree,
  decorators: [
    (Story, context) => {
      document.body.classList[context.globals?.darkMode ? 'add' : 'remove']('dark') // applies dark mode to everything inside body, e.g. portals, dialogs, etc.
      return <Story />
    },
  ],
} as Meta<typeof DNDTree>

export default meta
