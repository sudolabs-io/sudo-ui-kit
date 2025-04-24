import { Meta, StoryObj } from '@storybook/react'
import { Dropzone } from './dropzone'

const DropzoneStory = () => <Dropzone />

type Story = StoryObj<typeof Dropzone>

export const Default: Story = {
  render: () => <DropzoneStory />,
}

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone',
  component: Dropzone,
}

export default meta
