import { Meta, StoryObj } from '@storybook/react'
import { FileInput, FileInputProps } from './file-input'

type FileInputStoryProps = Pick<FileInputProps, 'disabled'>

const FileInputStory = (props: FileInputStoryProps) => (
  <FileInput label="Upload file" description="This is a description." {...props} />
)

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const meta: Meta<typeof FileInputStory> = {
  title: 'Components/FileInput/FileInput',
  component: FileInputStory,
  render: (args) => <FileInputStory {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { type: 'boolean', defaultValue: false } },
}

export default meta
