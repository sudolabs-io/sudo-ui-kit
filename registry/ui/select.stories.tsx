import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

const formSchema = z.object({
  theme: z.string(),
})

type Props = {
  label: string
  placeholder: string
  description: string
  required: boolean
}

const SelectStory = ({ label, placeholder, description, required }: Props) => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: undefined,
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
          name="theme"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>{description}</FormDescription>
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
    label: 'Theme',
    placeholder: 'Theme',
    description: 'Chosen theme is saved in your browser',
    required: true,
  },
}

const meta: Meta<typeof SelectStory> = {
  title: 'Components/Select/Select',
  component: SelectStory,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
  },
  render: (args) => <SelectStory {...args} />,
}

export default meta
