import { Meta, StoryObj } from '@storybook/react'
import { cn } from 'lib/utils'
import { Separator, SeparatorProps } from './separator'

const SeparatorStory = ({ orientation = 'horizontal' }: SeparatorProps) => (
  <div className={cn('flex gap-2', orientation === 'horizontal' ? 'flex-col' : 'flex-row')}>
    <div>
      <p>First</p>
    </div>
    <Separator orientation={orientation} />
    <div>
      <p>Second</p>
    </div>
  </div>
)

type Story = StoryObj<typeof SeparatorStory>

export const Horizontal: Story = {
  render: () => <SeparatorStory />,
}

export const Vertical: Story = {}
Vertical.args = {
  ...Horizontal.args,
  orientation: 'vertical',
}

const meta: Meta<typeof SeparatorStory> = {
  title: 'Components/Separator/Separator',
  component: SeparatorStory,
}

export default meta
