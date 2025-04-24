import * as React from 'react'
import { useState } from 'react'
import { cn } from 'lib/utils'

const CHOOSE_A_FILE = 'Choose a file'

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label, description, disabled, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0])
      } else {
        setFile(null)
      }
    }

    return (
      <div className="flex flex-col gap-2">
        {label && <div className="text-sm font-medium text-foreground">{label}</div>}
        <label htmlFor="file" className={disabled ? 'opacity-50' : ''}>
          <div className="flex h-9 text-sm">
            <div
              className={cn(
                'flex cursor-pointer items-center text-nowrap rounded-l-lg bg-primary px-5 text-primary-foreground',
                disabled ? '!cursor-default' : '',
              )}
            >
              {CHOOSE_A_FILE}
              <input
                id="file"
                type="file"
                className="hidden"
                ref={ref}
                onChange={handleFileChange}
                disabled={disabled}
                {...props}
              />
            </div>
            <div
              className={cn(
                'w-full flex items-center rounded-r-lg border border-input bg-background px-5 text-muted-foreground',
                file && 'text-foreground font-medium',
              )}
            >
              {file ? file.name : 'No file chosen'}
            </div>
          </div>
        </label>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    )
  },
)
FileInput.displayName = 'FileInput'

export { FileInput }
