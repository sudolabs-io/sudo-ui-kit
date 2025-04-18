import { Meta, StoryFn } from '@storybook/react'
import { CloseIcon } from 'components/icons'
import { ClockIcon } from 'components/icons/ClockIcon'
import { Badge, BadgeProps } from '../badge'

const Template: StoryFn<typeof Badge> = (args: BadgeProps) => <Badge {...args} shape="pill" />

export const Default = Template.bind({})
Default.args = {
  children: 'Badge',
}

export const WithLeftAddon = Template.bind({})
WithLeftAddon.args = {
  ...Default.args,
  leftAddon: <ClockIcon className="h-3 w-3" />,
}

export const WithRightAddon = Template.bind({})
WithRightAddon.args = {
  ...WithLeftAddon.args,
  rightAddon: <CloseIcon className="h-3 w-3" />,
}

export const Outline = Template.bind({})
Outline.args = {
  ...WithRightAddon.args,
  variant: 'outline',
}

export default {
  title: 'Components/Badge/Pill',
  component: Badge,
} as Meta
