import * as React from 'react'
import { DayPicker, DropdownProps } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { cn } from 'lib/utils'
import { buttonVariants } from './button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * This component is modified version of shadcn/ui's Calendar component.
 * It includes the changes from this PR: https://github.com/shadcn-ui/ui/pull/1680
 * which adds selects for month and year.
 */
const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  defaultMonth,
  ...props
}: CalendarProps & {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}) => {
  const selectedMonth = props.mode === 'single' ? defaultMonth || props.selected : defaultMonth

  const handleCalendarChange = (
    value: string | number,
    e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const event = {
      target: {
        value: String(value),
      },
    } as React.ChangeEvent<HTMLSelectElement>
    e(event)
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      defaultMonth={selectedMonth}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-3',
        caption_start: 'is-start',
        caption_between: 'is-between',
        caption_end: 'is-end',
        caption: 'flex justify-center pt-1 relative items-center gap-1',
        caption_label:
          'flex h-7 text-sm font-medium justify-center items-center grow [.is-multiple_&]:flex',
        caption_dropdowns: 'flex justify-center grow dropdowns pl-7 pr-8 gap-0.5',
        multiple_months: 'is-multiple',
        vhidden: 'hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden',
        nav: "flex items-center [&:has([name='previous-month'])]:order-first [&:has([name='next-month'])]:order-last",
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-6 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-center',
        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2 justify-center',
        cell: cn(
          'relative p-0 size-8 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md text-foreground',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        root: 'bg-popover w-fit rounded-md border border-border shadow-md',
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        IconLeft: () => <ChevronLeftIcon className="size-4 text-foreground" />,
        // eslint-disable-next-line react/no-unstable-nested-components
        IconRight: () => <ChevronRightIcon className="size-4 text-foreground" />,
        // eslint-disable-next-line react/no-unstable-nested-components
        Dropdown: ({ ...dropdownProps }) => {
          const isYearsDropdown = dropdownProps.name === 'years'
          const childrenArray = isYearsDropdown
            ? React.Children.toArray(dropdownProps.children).reverse()
            : React.Children.toArray(dropdownProps.children)

          return (
            <Select
              {...dropdownProps}
              onValueChange={(value) => {
                if (dropdownProps.onChange) {
                  handleCalendarChange(value, dropdownProps.onChange)
                }
              }}
              value={String(dropdownProps.value)}
              disabled={props.disabled === true} // disabled might be also array of disabled dates
            >
              <SelectTrigger
                className={cn(
                  'h-7 font-medium [.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex text-foreground',
                )}
              >
                <SelectValue placeholder={dropdownProps?.caption}>
                  {dropdownProps?.caption}
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                className={cn(
                  'scrolling-auto min-w-[var(--radix-popper-anchor-width)] overflow-y-auto bg-popover',
                  !isYearsDropdown && 'max-h-[var(--radix-popper-available-height);]',
                )}
              >
                {dropdownProps.children &&
                  childrenArray.map((child) => {
                    const { value, children } = (child as React.ReactElement<DropdownProps>).props

                    return (
                      <SelectItem
                        value={String(value)}
                        className="min-w-[var(--radix-popper-anchor-width)] pr-7 data-[state=checked]:bg-accent"
                        key={`datepicker-select-${value}`}
                      >
                        {children}
                      </SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
