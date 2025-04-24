import { Meta, StoryObj } from '@storybook/react'
import { Pill, PillProps } from './pill'

const PillStory = (props: PillProps) => <Pill {...props}>Cooking recipes</Pill>

type Story = StoryObj<typeof PillStory>

export const Default: Story = {
  render: (args) => <PillStory {...args} />,
}

export const Toggled: Story = {
  ...Default,
  args: {
    toggled: true,
  },
}

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
}

const meta: Meta<typeof PillStory> = {
  title: 'Components/Pill/Pill',
  component: PillStory,
}

export default meta
