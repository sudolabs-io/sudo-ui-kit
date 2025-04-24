import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 border bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        outline: 'bg-transparent text-foreground hover:bg-accent',
      },
      shape: {
        square: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'square',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

function Badge({
  className,
  variant,
  leftAddon,
  rightAddon,
  children,
  shape,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} {...props}>
      {leftAddon && leftAddon}
      {children}
      {rightAddon && rightAddon}
    </div>
  )
}

export { Badge, badgeVariants }
