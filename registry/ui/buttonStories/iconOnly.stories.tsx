import { Meta, StoryObj } from '@storybook/react'
import { UserIcon } from 'components/icons'
import { Button, ButtonProps } from '../button'

interface Props extends ButtonProps {}

const ButtonStory = (props: Props) => <Button {...props} />

type Story = StoryObj<typeof meta>

export const SquareXs: Story = {
  args: {
    size: 'icon-xs',
    icon: UserIcon,
    iconOnly: 'square',
  },
}

export const SquareSm: Story = {}
SquareSm.args = {
  ...SquareXs.args,
  size: 'icon-sm',
}

export const SquareBase: Story = {}
SquareBase.args = {
  ...SquareSm.args,
  size: 'icon-base',
}

export const SquareL: Story = {}
SquareL.args = {
  ...SquareBase.args,
  size: 'icon-l',
}

export const SquareXl: Story = {}
SquareXl.args = {
  ...SquareL.args,
  size: 'icon-xl',
}

export const CircleXs: Story = {
  args: {
    size: 'icon-xs',
    rightIcon: UserIcon,
    iconOnly: 'circle',
  },
}

export const CircleSm: Story = {}
CircleSm.args = {
  ...CircleXs.args,
  size: 'icon-sm',
}

export const CircleBase: Story = {}
CircleBase.args = {
  ...CircleSm.args,
  size: 'icon-base',
}

export const CircleL: Story = {}
CircleL.args = {
  ...CircleBase.args,
  size: 'icon-l',
}

export const CircleXl: Story = {}
CircleXl.args = {
  ...CircleL.args,
  size: 'icon-xl',
}

const meta: Meta<typeof ButtonStory> = {
  title: 'Components/Button/Icon Only',
  component: ButtonStory,
  argTypes: {
    size: { options: ['icon-xs', 'icon-sm', 'icon-base', 'icon-l', 'icon-xl'] },
    iconOnly: { options: [false, 'square', 'circle'] },
  },
  render: (args) => <ButtonStory {...args} />,
}

export default meta
