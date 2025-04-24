import { Meta, StoryObj } from '@storybook/react'
import { SocialButton, SocialButtonProps } from './socialButton'

const SocialButtonStory = (props: SocialButtonProps) => <SocialButton {...props} />

type Story = StoryObj<typeof meta>

export const GoogleSolid: Story = {}
GoogleSolid.args = {
  type: 'google',
  children: 'Sign in with Google',
  variant: 'solid',
}

export const GoogleOutline: Story = {}
GoogleOutline.args = {
  ...GoogleSolid.args,
  variant: 'outline',
}

export const GoogleTransparent: Story = {}
GoogleTransparent.args = {
  ...GoogleSolid.args,
  variant: 'transparent',
}

export const GoogleIcon: Story = {}
GoogleIcon.args = {
  ...GoogleSolid.args,
  variant: 'icon',
}

export const FacebookSolid: Story = {}
FacebookSolid.args = {
  type: 'facebook',
  children: 'Sign in with Facebook',
  variant: 'solid',
}

export const FacebookOutline: Story = {}
FacebookOutline.args = {
  ...FacebookSolid.args,
  variant: 'outline',
}

export const FacebookTransparent: Story = {}
FacebookTransparent.args = {
  ...FacebookSolid.args,
  variant: 'transparent',
}

export const FacebookIcon: Story = {}
FacebookIcon.args = {
  ...FacebookSolid.args,
  variant: 'icon',
}

export const AppleSolid: Story = {}
AppleSolid.args = {
  type: 'apple',
  variant: 'solid',
  children: 'Sign in with Apple',
}

export const AppleOutline: Story = {}
AppleOutline.args = {
  ...AppleSolid.args,
  variant: 'outline',
}

export const AppleTransparent: Story = {}
AppleTransparent.args = {
  ...AppleSolid.args,
  variant: 'transparent',
}

export const AppleIcon: Story = {}
AppleIcon.args = {
  ...AppleSolid.args,
  variant: 'icon',
}

const meta: Meta<typeof SocialButtonStory> = {
  title: 'Components/SocialButton/SocialButton',
  component: SocialButtonStory,
}

export default meta
