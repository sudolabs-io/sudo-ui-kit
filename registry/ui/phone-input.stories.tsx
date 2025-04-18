import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { PhoneInput, PhoneInputProps } from './phone-input'

const formSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((value) => isValidPhoneNumber(value), 'Invalid phone number'),
})

interface PhoneInputStoryProps extends Pick<PhoneInputProps, 'disabled'> {
  required?: boolean
}

const PhoneInputStory = ({ required, disabled }: PhoneInputStoryProps) => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })
  return (
    <Form {...formMethods}>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          void formMethods.handleSubmit((formData) => console.log(formData))
        }}
      >
        <FormField
          control={formMethods.control}
          name="phoneNumber"
          required={required}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Phone number"
                  value={field.value}
                  onChange={(value) => field.onChange(value || '')}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    required: true,
    disabled: false,
  },
}

const meta: Meta<typeof PhoneInputStory> = {
  title: 'Components/PhoneInput/PhoneInput',
  component: PhoneInputStory,
  argTypes: {
    required: { type: 'boolean' },
    disabled: { type: 'boolean' },
  },
  render: (args) => <PhoneInputStory {...args} />,
  decorators: [
    (Story, context) => {
      document.body.classList[context.globals?.darkMode ? 'add' : 'remove']('dark') // applies dark mode to everything inside body, e.g. portals, dialogs, etc.
      return <Story />
    },
  ],
}

export default meta
