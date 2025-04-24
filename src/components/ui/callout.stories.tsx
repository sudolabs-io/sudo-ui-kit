import { ComponentProps } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { CloseIcon } from 'components/icons'
import { Button } from './button'
import {
  Callout,
  CalloutActions,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from './callout'

const ALERT_TITLE = 'Alert title'
const ALERT_DESCRIPTION = 'This is an alert description.'
const ALERT_BUTTON_TEXT = 'Button'

const CalloutStory = ({ variant, ...props }: ComponentProps<typeof Callout>) => (
  <Callout variant={variant} {...props}>
    <CalloutContent>
      <CalloutTitle>{ALERT_TITLE}</CalloutTitle>
      <CalloutDescription>{ALERT_DESCRIPTION}</CalloutDescription>
    </CalloutContent>
    <CalloutActions>
      <Button leftIcon={CloseIcon} {...(variant === 'danger' && { variant: 'destructive' })}>
        {ALERT_BUTTON_TEXT}
      </Button>
    </CalloutActions>
  </Callout>
)

type Story = StoryObj<typeof Callout>

export const Default: Story = {
  render: (args) => <CalloutStory {...args} />,
  args: {
    variant: null,
  },
}

export const Danger: Story = {
  ...Default,
  args: {
    variant: 'danger',
  },
}

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout/Callout',
  component: CalloutStory,
}

export default meta
