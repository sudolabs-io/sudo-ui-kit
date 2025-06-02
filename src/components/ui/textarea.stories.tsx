import { Meta, StoryObj } from '@storybook/react'
import { Textarea, TextareaProps } from './textarea'

interface Props extends TextareaProps {}

const TextareaStory = (props: Props) => <Textarea {...props} />

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Your message',
    placeholder: 'Write text here ...',
  },
}

export const WithTopNote: Story = {}
WithTopNote.args = {
  ...Default.args,
  topNote: 'A note for extra info',
}

export const WithBottomNote: Story = {}
WithBottomNote.args = {
  ...WithTopNote.args,
  bottomNote: 'A note for extra info',
}

const meta: Meta<typeof TextareaStory> = {
  title: 'Components/Textarea/Textarea',
  component: TextareaStory,
  argTypes: {
    label: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    topNote: { control: { type: 'text' } },
    bottomNote: { control: { type: 'text' } },
  },
  render: (args) => <TextareaStory {...args} />,
}

export default meta
