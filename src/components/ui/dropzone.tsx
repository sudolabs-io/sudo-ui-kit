import { useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { FileIcon, TrashIcon, UploadIcon } from 'components/icons'
import { Button } from './button'

export const Dropzone = () => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files))
    } else {
      setFiles([])
    }

    // clearing current value so the change event is fired also in case the same file(s) are uploaded
    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
  }

  const handleFileRemove = (fileName: string) => {
    if (files?.length) {
      setFiles([...files].filter((filter) => filter.name !== fileName))
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFiles(Array.from(event.dataTransfer.files))
      event.dataTransfer.clearData()
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone"
          className="flex h-48 w-full flex-col items-center justify-center rounded-lg bg-muted outline-dashed outline-2 outline-offset-[-1px] outline-input"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <UploadIcon className="text-muted-foreground" />
            <p className="text-sm text-popover-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs font-semibold text-muted-foreground">Max. File Size: 30MB</p>
            <Button
              size="xs"
              className="mt-2 h-[30px] bg-primary font-semibold text-primary-foreground"
              onClick={handleButtonClick}
            >
              <Search className="h-5 w-5" /> Browse file
            </Button>
          </div>
          <input
            id="dropzone"
            type="file"
            className="hidden"
            multiple
            ref={fileInputRef}
            onChange={handleFilesChange}
          />
        </label>
      </div>
      {files && (
        <div className="mt-2 flex flex-col gap-2">
          {Array.from(files).map(({ name }) => (
            <div className="flex items-center gap-2.5 rounded-md bg-muted p-4">
              <FileIcon className="text-popover-foreground" />
              <p className="grow text-popover-foreground">{name}</p>
              <TrashIcon
                className="cursor-pointer text-popover-foreground"
                onClick={() => {
                  handleFileRemove(name)
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
