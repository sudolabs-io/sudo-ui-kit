import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../form'
import { Input } from '../input'

const NAME_LABEL = 'Name'
const CANCEL = 'Cancel'

const formSchema = z.object({
  name: z.string().min(1).max(128),
})

type DNDItemDialogrops = {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: ({ name }: { name: string }) => void
  defaultValues?: {
    name: string
  }
}

export const DNDItemDialog = ({
  title,
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
}: DNDItemDialogrops) => {
  const isUpdatingItem = Boolean(defaultValues)

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      name: defaultValues?.name ?? '',
    },
  })
  const { handleSubmit, formState } = formMethods

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[35rem]">
        <Form {...formMethods}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(({ name }) => onSubmit({ name }))}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex flex-col gap-1">
              <FormField
                required
                name="name"
                control={formMethods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{NAME_LABEL}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name of item" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="ml-auto mt-4 flex gap-2">
              <Button variant="secondary" onClick={onClose}>
                {CANCEL}
              </Button>
              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                disabled={!formState.isDirty}
              >
                {isUpdatingItem ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
