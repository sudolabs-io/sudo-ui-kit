import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { CloseIcon } from 'components/icons'
import { useFormField } from './form'

const inputWrapperVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'h-[37px] text-sm',
      md: 'h-[42px] text-sm',
      lg: 'h-[52px] text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputWrapperVariants> & {
    icon?: React.ReactNode
    clearable?: boolean
    wrapperClassName?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, type, size, icon, clearable, wrapperClassName = '', ...props }, ref) => {
    const { resetField, getFieldState } = useFormContext()
    const { name } = useFormField()
    const { invalid } = getFieldState(name)

    return (
      <div>
        <div
          className={cn(
            'flex items-center overflow-hidden border rounded-lg border-input',
            'focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
            invalid && 'border-red-500 focus-within:border-red-500',
            inputWrapperVariants({ size }),
            wrapperClassName,
          )}
        >
          {icon && (
            <div
              className={cn(
                'text-foreground ps-4 h-full flex items-center justify-center shrink-0',
              )}
            >
              {icon}
            </div>
          )}
          <input
            formNoValidate
            value={value}
            type={type}
            className={cn(
              'flex w-full h-full bg-background text-foreground px-4 py-2 placeholder:text-muted-foreground',
              'focus-visible:outline-none',
              'disabled:placeholder-muted-foreground disabled:text-muted-foreground disabled:cursor-not-allowed',
              icon && 'ps-2.5',
              className,
            )}
            ref={ref}
            {...props}
          />
          {clearable && value && (
            <div className={cn('pe-4 h-full flex items-center justify-center shrink-0')}>
              <CloseIcon
                onClick={() => resetField(name)}
                className="h-5 w-5 shrink-0 cursor-pointer text-foreground"
              />
            </div>
          )}
        </div>
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
