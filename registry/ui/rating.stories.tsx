import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Rating, RatingProps } from './rating'

type RatingStoryProps = Pick<RatingProps, 'initialRating'>

const RatingStory = ({ initialRating }: RatingStoryProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [fixedValue, setFixedValue] = useState<number | null>(null)

  return (
    <>
      <Rating
        initialRating={initialRating}
        onHover={(value) => setHoverValue(value)}
        onChange={(value) => setFixedValue(value)}
      />
      <p>Hover value: {hoverValue}</p>
      <p>Fixed value: {fixedValue}</p>
    </>
  )
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <RatingStory {...args} />,
  args: {
    initialRating: 3,
  },
  argTypes: {
    initialRating: { type: 'number', defaultValue: 1 },
  },
}

const meta: Meta<typeof RatingStory> = {
  title: 'Components/Rating/Rating',
  component: RatingStory,
}

export default meta
