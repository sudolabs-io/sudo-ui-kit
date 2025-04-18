import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '../button'

interface Props extends ButtonProps {}

const ButtonStory = (props: Props) => <Button {...props}>Click me</Button>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
}

const meta: Meta<typeof ButtonStory> = {
  title: 'Components/Button/Variants',
  component: ButtonStory,
  argTypes: {
    variant: { options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
  },
  render: (args) => <ButtonStory {...args} />,
}

export default meta
