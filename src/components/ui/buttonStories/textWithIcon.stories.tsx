import { Meta, StoryObj } from '@storybook/react'
import { UserIcon } from 'components/icons'
import { Button, ButtonProps } from '../button'

type Story = StoryObj<typeof meta>

interface Props extends ButtonProps {}

const ButtonStory = (props: Props) => <Button {...props}>Click me</Button>

export const LeftIconXs: Story = {
  args: {
    size: 'xs',
    leftIcon: UserIcon,
  },
}

export const LeftIconSm: Story = {}
LeftIconSm.args = {
  ...LeftIconXs.args,
  size: 'sm',
}

export const LeftIconBase: Story = {}
LeftIconBase.args = {
  ...LeftIconSm.args,
  size: 'base',
}

export const LeftIconL: Story = {}
LeftIconL.args = {
  ...LeftIconBase.args,
  size: 'l',
}

export const LeftIconXl: Story = {}
LeftIconXl.args = {
  ...LeftIconL.args,
  size: 'xl',
}

export const RightIconXs: Story = {
  args: {
    size: 'xs',
    rightIcon: UserIcon,
  },
}

export const RightIconSm: Story = {}
RightIconSm.args = {
  ...RightIconXs.args,
  size: 'sm',
}

export const RightIconBase: Story = {}
RightIconBase.args = {
  ...RightIconSm.args,
  size: 'base',
}

export const RightIconL: Story = {}
RightIconL.args = {
  ...RightIconBase.args,
  size: 'l',
}

export const RightIconXl: Story = {}
RightIconXl.args = {
  ...RightIconL.args,
  size: 'xl',
}

const meta: Meta<typeof ButtonStory> = {
  title: 'Components/Button/Text With Icon',
  component: ButtonStory,
  argTypes: {
    size: { options: ['xs', 'sm', 'base', 'l', 'xl'] },
  },
  render: (args) => <ButtonStory {...args} />,
}

export default meta
