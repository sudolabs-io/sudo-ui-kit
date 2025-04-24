import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'

const indicatorVariants = cva('', {
  variants: {
    variant: {
      default: '',
      number: '',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface IndicatorProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {}

const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      className={cn(
        indicatorVariants({ variant }),
        'min-w-4 max-w-fit rounded-full bg-destructive px-2.5 py-0.5 text-foreground text-center ',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
)
export default Indicator
