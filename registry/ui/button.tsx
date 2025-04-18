import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { LoaderIcon } from 'components/icons/LoaderIcon'
import { IconProps } from 'components/icons/types'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        unstyled: '',
      },
      size: {
        xs: 'h-[34px] px-3 py-2 text-xs',
        sm: 'h-[37px] px-3 py-2 text-sm',
        base: 'h-[42px] px-5 py-2.5 text-sm',
        l: 'h-[48px] px-5 py-3 text-base',
        xl: 'h-[52px] px-6 py-3.5 text-base',
        'icon-xs': 'h-5 w-5 p-1',
        'icon-sm': 'p-2',
        'icon-base': 'p-2.5',
        'icon-l': 'p-3',
        'icon-xl': 'p-3.5',
      },
      iconOnly: {
        false: 'rounded-lg',
        square: 'rounded-md',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      iconOnly: false,
    },
  },
)

const iconVariants = cva('inline-block items-center justify-center', {
  variants: {
    size: {
      xs: 'h-[18px] w-[18px]',
      sm: 'h-[18px] w-[18px]',
      base: 'h-[21px] w-[21px]',
      l: 'h-[24px] w-[24px]',
      xl: 'h-[24px] w-[24px]',
      'icon-xs': 'h-3 w-3',
      'icon-sm': 'h-3 w-3',
      'icon-base': 'h-[14px] w-[14px]',
      'icon-l': 'h-4 w-4',
      'icon-xl': 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.FC<IconProps>
  rightIcon?: React.FC<IconProps>
  icon?: React.FC<IconProps>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      asChild = false,
      isLoading,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, iconOnly }))}
        ref={ref}
        {...props}
      >
        {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
        {typeof LeftIcon !== 'undefined' && !isLoading && (
          <LeftIcon className={cn(iconVariants({ size, className }))} />
        )}
        {props.children}
        {typeof RightIcon !== 'undefined' && !isLoading && (
          <RightIcon className={cn(iconVariants({ size, className }))} />
        )}
        {typeof Icon !== 'undefined' && !isLoading && (
          <Icon className={cn(iconVariants({ size, className }))} />
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
