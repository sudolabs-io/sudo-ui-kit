import { useEffect } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ToastAction } from './toast'
import { Toaster } from './toaster'
import { toast } from './use-toast'

const ToastStory = () => {
  useEffect(() => {
    toast({
      title: 'Look at it!',
      description: 'This is the example toast for you to see.',
      action: <ToastAction altText="Approve">Approve</ToastAction>,
      variant: 'destructive',
    })
  })

  return (
    <div>
      <p>Some content...</p>
    </div>
  )
}

type Story = StoryObj<typeof ToastStory>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <ToastStory />
    </>
  ),
}

const meta: Meta<typeof ToastStory> = {
  title: 'Components/Toast/Toast',
  component: ToastStory,
}

export default meta
