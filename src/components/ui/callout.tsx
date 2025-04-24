import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { AlertCircle } from 'lucide-react'

const calloutVariants = cva(
  cn(
    'flex gap-4 flex-wrap sm:flex-nowrap justify-between items-start relative w-full p-4 pl-[40px] bg-secondary-100',
    'border rounded-lg text-foreground',
  ),
  {
    variants: {
      variant: {
        danger: 'border-destructive text-destructive [&>svg]:text-destructive ',
      },
    },
  },
)

const Callout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof calloutVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(calloutVariants({ variant }), className)} {...props} />
))
Callout.displayName = 'Callout'

const CalloutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <AlertCircle size={16} className="absolute left-[-25px]" />
    <h5 ref={ref} className={cn('font-medium leading-none tracking-tight', className)} {...props}>
      {children}
    </h5>
  </div>
))
CalloutTitle.displayName = 'CalloutTitle'

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
))
CalloutDescription.displayName = 'CalloutDescription'

const CalloutContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
  ),
)
CalloutContent.displayName = 'CalloutContent'

const CalloutActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex gap-2 min-w-fit', className)} {...props} />
  ),
)
CalloutActions.displayName = 'CalloutActions'

export { Callout, CalloutActions, CalloutContent, CalloutDescription, CalloutTitle }
