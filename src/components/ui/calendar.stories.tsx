import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Meta, StoryObj } from '@storybook/react'
import { addDays } from 'date-fns'
import { Calendar, CalendarProps } from './calendar'

const LOWEST_YEAR = 1995
const HIGHEST_YEAR = 2065

type CalendarStoryProps = Pick<
  CalendarProps,
  'showOutsideDays' | 'fromYear' | 'toYear' | 'disabled'
>

const CalendarSingleStory = (args: CalendarStoryProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown-buttons"
      selected={date}
      onSelect={setDate}
      {...args}
    />
  )
}

const CalendarRangeStory = (args: CalendarStoryProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  return (
    <Calendar
      mode="range"
      captionLayout="dropdown-buttons"
      selected={dateRange}
      onSelect={setDateRange}
      {...args}
    />
  )
}

const CalendarMultipleStory = (args: CalendarStoryProps) => {
  const [dates, setDates] = useState<Date[] | undefined>(undefined)

  return (
    <Calendar
      mode="multiple"
      captionLayout="dropdown-buttons"
      selected={dates}
      onSelect={setDates}
      {...args}
    />
  )
}

type Story = StoryObj<typeof Calendar>

const commonArgs = {
  showOutsideDays: true,
  fromYear: LOWEST_YEAR,
  toYear: HIGHEST_YEAR,
  disabled: [addDays(new Date(), 1), addDays(new Date(), 2)],
}

const commonArgTypes = {
  showOutsideDays: {
    control: { type: 'boolean' as const },
  },
  fromYear: {
    control: { type: 'number' as const },
  },
  toYear: {
    control: { type: 'number' as const },
  },
  disabled: {
    control: { type: 'object' as const },
  },
}

export const Single: Story = {
  render: (args: CalendarStoryProps) => <CalendarSingleStory {...args} />,
  args: commonArgs,
  argTypes: commonArgTypes,
}

export const Range: Story = {
  render: (args: CalendarStoryProps) => <CalendarRangeStory {...args} />,
  args: commonArgs,
  argTypes: commonArgTypes,
}

export const Multiple: Story = {
  render: (args: CalendarStoryProps) => <CalendarMultipleStory {...args} />,
  args: commonArgs,
  argTypes: commonArgTypes,
}

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar/Calendar',
  component: Calendar,
} as Meta

export default meta
