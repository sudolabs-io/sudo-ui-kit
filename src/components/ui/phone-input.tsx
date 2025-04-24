import * as React from 'react'
import PhoneInputWithCountrySelect, {
  Country,
  DefaultInputComponentProps,
  getCountryCallingCode,
  Props,
  State,
} from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { Input, type InputProps } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { ScrollArea } from './scroll-area'
import 'react-phone-number-input/style.css'

const NO_COUNTRY_FOUND = 'No country found.'

const FlagComponent = ({ country, countryName }: { country: Country; countryName: string }) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

FlagComponent.displayName = 'FlagComponent'

type CountrySelectOption = { label: string; value: Country }

interface CountrySelectProps {
  disabled?: boolean
  value: Country
  onChange: (value: Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: Country) => {
      onChange(country)
    },
    [onChange],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="unstyled"
          className={cn('flex gap-[7px] rounded-e-none rounded-s-lg px-3')}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronDown className={cn('-mr-2 h-4 w-4 opacity-50 text-muted-foreground')} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>{NO_COUNTRY_FOUND}</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent country={option.value} countryName={option.label} />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-sm text-foreground/50">
                          {`+${getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn(
        'rounded-e-lg rounded-s-none bg-transparent dark:bg-transparent w-64 !pl-1',
        className,
      )}
      wrapperClassName="border-none"
      {...props}
    />
  ),
)

InputComponent.displayName = 'InputComponent'

export interface PhoneInputProps {
  value?: string
  onChange?: (value?: string) => void
  placeholder?: string
  defaultCountry?: Country
  className?: string
  disabled?: boolean
}

export const PhoneInput = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.Component<Props<DefaultInputComponentProps>, State<Props<DefaultInputComponentProps>>, any>,
  PhoneInputProps
>(({ onChange, defaultCountry = 'SK', className, ...props }, ref) => (
  <div className={cn('flex border border-input w-fit bg-background rounded-lg', className)}>
    <PhoneInputWithCountrySelect
      ref={ref}
      international
      defaultCountry={defaultCountry}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      onChange={(newValue) => onChange?.(newValue || '')}
      {...props}
    />
  </div>
))

PhoneInput.displayName = 'PhoneInput'
