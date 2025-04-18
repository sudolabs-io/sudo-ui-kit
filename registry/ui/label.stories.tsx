import { Meta, StoryObj } from '@storybook/react'
import { Label, LabelProps } from './label'

const LabelStory = (props: LabelProps) => <Label {...props}>Last name</Label>

type Story = StoryObj<typeof LabelStory>

export const Default: Story = {
  render: () => <LabelStory />,
}

export const Required: Story = {}
Required.args = {
  ...Default.args,
  required: true,
}

export const WithTooltip: Story = {}
WithTooltip.args = {
  ...Required.args,
  tooltip: 'We always keep your information safe.',
}

const meta: Meta<typeof LabelStory> = {
  title: 'Components/Label/Label',
  component: LabelStory,
}

export default meta
