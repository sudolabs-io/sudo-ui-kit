import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { UserIcon } from 'components/icons'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { Input } from './input'

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address.' }),
})

type Props = {
  size: 'sm' | 'md' | 'lg'
  clearable: boolean
  icon: boolean
  tooltip: string
  required: boolean
}

const InputStory = ({ size, clearable, icon, tooltip, required }: Props) => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
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
          required={required}
          name="email"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel tooltip={tooltip}>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  size={size}
                  icon={icon && <UserIcon className="h-5 w-5" />}
                  placeholder="Enter your email address"
                  clearable={clearable}
                />
              </FormControl>
              {/* TODO do we want form message here? */}
              <FormDescription>We&apos;ll never share your personal information</FormDescription>
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
    clearable: true,
    size: 'md',
    icon: true,
    tooltip: 'Enter valid email address.',
    required: true,
  },
}

const meta: Meta<typeof InputStory> = {
  title: 'Components/Input/Input',
  component: InputStory,
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    clearable: { control: 'boolean' },
    icon: { control: 'boolean' },
    tooltip: { control: 'text' },
    required: { constrol: 'boolean' },
  },
  render: (args) => <InputStory {...args} />,
}

export default meta
