import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '../button'

interface Props extends ButtonProps {}

const ButtonStory = (props: Props) => <Button {...props}>Click me</Button>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: true,
  },
}

const meta: Meta<typeof ButtonStory> = {
  title: 'Components/Button/Loading',
  component: ButtonStory,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'base', 'l', 'xl'],
    },
    iconOnly: { options: [false, 'square', 'circle'] },
  },
  render: (args) => <ButtonStory {...args} />,
}

export default meta
