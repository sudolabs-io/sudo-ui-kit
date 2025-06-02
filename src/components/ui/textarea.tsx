import * as React from 'react'
import { cn } from 'lib/utils'
import { Label } from './label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  placeholder: string
  topNote?: string
  bottomNote?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, placeholder, topNote, bottomNote, ...props }, ref) => (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Label className="text-foreground">{label}</Label>
        {topNote && <p className="text-xs text-muted-foreground">{topNote}</p>}
      </div>
      <textarea
        className={cn(
          'placeholder-muted-foreground resize-none flex min-h-[80px] w-full rounded-md border border-solid border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground',
          className,
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {bottomNote && <p className="text-xs text-muted-foreground">{bottomNote}</p>}
    </div>
  ),
)
Textarea.displayName = 'Textarea'

export { Textarea }
