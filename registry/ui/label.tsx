import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { AsterixIcon, TooltipIcon } from 'components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const OPTIONAL_TAG = '- Optional'

const labelVariants = cva('inline-block text-sm font-medium leading-none text-foreground')

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & { required?: boolean; tooltip?: string }

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, children, required, tooltip, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
      <div className="flex items-center gap-0.5">
        {children}
        {required ? (
          <AsterixIcon className="h-3 w-3 text-foreground" />
        ) : (
          <span className="ml-0.5 font-normal">{OPTIONAL_TAG}</span>
        )}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TooltipIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </LabelPrimitive.Root>
  ),
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
