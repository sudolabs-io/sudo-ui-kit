import { Meta, StoryObj } from '@storybook/react'
import Indicator from './indicator'

const IndicatorStory = () => <Indicator variant="number">1</Indicator>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <IndicatorStory />,
}

const meta: Meta<typeof IndicatorStory> = {
  title: 'Components/Indicator/Indicator',
  component: IndicatorStory,
}

export default meta
