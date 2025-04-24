import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './form'
import { MultiSelect } from './multi-select'

const Options = [
  {
    value: 'next.js',
    label: 'Next.js',
    icon: Dog,
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    icon: Cat,
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
    icon: Turtle,
  },
  {
    value: 'remix',
    label: 'Remix',
    icon: Rabbit,
  },
  {
    value: 'astro',
    label: 'Astro',
    icon: Fish,
  },
]

const formSchema = z.object({
  framework: z.string(),
})

type Props = {
  label: string
  placeholder: string
  description: string
  required: boolean
}

const MultiSelectStory = ({ label, placeholder, description, required }: Props) => {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      framework: undefined,
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
          name="framework"
          control={formMethods.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-foreground">{label}</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
                  onValueChange={field.onChange}
                  options={Options}
                  placeholder={placeholder}
                />
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
    label: 'Framework',
    placeholder: 'Framework',
    description: 'Choose your favorite framework',
    required: true,
  },
}

const meta: Meta<typeof MultiSelectStory> = {
  title: 'Components/MultiSelect/MultiSelect',
  component: MultiSelectStory,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
  },
  render: (args) => <MultiSelectStory {...args} />,
}

export default meta
