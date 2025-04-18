import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '../button'

interface Props extends ButtonProps {}

const ButtonStory = (props: Props) => <Button {...props}>Click me</Button>

type Story = StoryObj<typeof meta>

export const SizeXs: Story = {
  args: {
    size: 'xs',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
  },
}

export const SizeBase: Story = {
  args: {
    size: 'base',
  },
}

export const SizeL: Story = {
  args: {
    size: 'l',
  },
}

export const SizeXl: Story = {
  args: {
    size: 'xl',
  },
}

const meta: Meta<typeof ButtonStory> = {
  title: 'Components/Button/Text Only',
  component: ButtonStory,
  argTypes: {
    size: { options: ['xs', 'sm', 'base', 'l', 'xl'] },
  },
  render: (args) => <ButtonStory {...args} />,
}

export default meta
