import { useId, useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { TreeItem } from 'context/DNDTreeContext'
import { useDNDTree } from 'hooks/useDNDTree'
import { isUndefined } from 'lodash'
import { DraggableOverlay } from './dnd-drag-and-drop'
import { DNDTreeItems } from './dnd-tree-items'
import { moveItem } from './utils/dnd'
import { updateItems } from './utils/dnd-tree'

export const DNDTree = () => {
  const id = useId()
  const [draggedItem, setDraggedItem] = useState<TreeItem | null>(null)
  const { treeItems, setTreeItems } = useDNDTree()

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const overId = over?.id as string | null
    const activeItemId = active.id as string

    if (overId) {
      const { parentId, beforeId } = moveItem({
        dropzoneId: overId,
        items: treeItems,
        onMove: setTreeItems,
        id: activeItemId,
      })

      if (parentId && !isUndefined(beforeId)) {
        const updatedItems = updateItems({
          beforeId,
          parentId,
          itemId: activeItemId,
          items: treeItems,
        })
        setTreeItems(updatedItems)
      }
    }
    setDraggedItem(null)
  }

  const handleDragStart = ({ active }: DragEndEvent) => {
    setTimeout(() =>
      setDraggedItem({
        id: active.id as string,
        name: active.data.current?.name,
      } as TreeItem),
    )
  }

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <DNDTreeItems draggedItemId={draggedItem?.id} />
      {draggedItem && <DraggableOverlay name={draggedItem.name} />}
    </DndContext>
  )
}
