import { DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from 'lib/utils'
import { ArrowUpIcon, Equal } from 'lucide-react'
import { Button } from '../button'
import { TREE_ITEM_DROPZONE_ID } from '../constants'

type DroppableProps = {
  id: string
  className?: string
}

export const DroppableLine = ({ id, className }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={cn('relative min-h-1', isOver && 'bg-primary-600', className)}>
      {isOver && <ArrowUpIcon className="absolute left-[-10px] top-[-5px] text-foreground" />}
    </div>
  )
}

type DraggableOverlayProps = {
  name: string
  icon?: React.ReactElement
}

export const DraggableOverlay = ({ name, icon }: DraggableOverlayProps) => (
  <DragOverlay className="min-w-full cursor-grab">
    <div className="flex items-center gap-1.5 rounded-lg border px-4 py-1">
      <Button className="cursor-grab p-2" size="xs" variant="unstyled">
        <Equal size={16} />
      </Button>
      {icon}
      <p className="text-sm">{name}</p>
    </div>
  </DragOverlay>
)

type DraggableProps = {
  id: string
  name: string
  className?: string
  children?: React.ReactNode
  isDraggable?: boolean
  isDroppableEnabled?: boolean
}

export const Draggable = ({
  id,
  className,
  children,
  name,
  isDraggable = true,
  isDroppableEnabled = false,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data: { name },
  })
  const {
    setNodeRef: setDroppableRef,
    isOver: isDroppableOver,
    active: droppableActive,
  } = useDroppable({ id: `${TREE_ITEM_DROPZONE_ID}${id}`, disabled: !isDroppableEnabled })

  return (
    <div
      className={cn(
        'py-2 px-3 pr-1.5 border border-secondary-200 border-r-0 bg-background',
        active?.id === id && 'opacity-50',
        droppableActive?.id !== id && isDroppableOver && 'bg-primary-300 ',
        className,
      )}
    >
      <div className="relative flex items-center gap-1.5">
        <div ref={setDroppableRef} className="pointer-events-none absolute h-[1px] w-full" />
        {isDraggable && (
          <Button
            ref={setNodeRef}
            size="xs"
            variant="unstyled"
            className="cursor-grab p-2"
            {...listeners}
            {...attributes}
          >
            <Equal size={16} />
          </Button>
        )}
        <p className="ml-0.5 text-sm text-foreground">{name}</p>
        <div className="ml-auto flex items-center">{children}</div>
      </div>
    </div>
  )
}
