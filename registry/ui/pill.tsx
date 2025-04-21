import { cn } from 'lib/utils'
import { Button, ButtonProps } from './button'

export interface PillProps extends ButtonProps {
  toggled?: boolean
}

export const Pill = ({ children, toggled = false, ...props }: PillProps) => (
  <Button
    className={cn(
      'rounded-full bg-background px-3 py-2 text-foreground hover:bg-accent focus:ring-ring disabled:text-foreground border border-input flex-shrink-0',
      toggled && 'bg-primary text-primary-foreground hover:bg-primary/90',
    )}
    {...props}
  >
    {children}
  </Button>
)
