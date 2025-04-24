import React from 'react'
import { TreeItem } from 'context/DNDTreeContext'
import { useDNDTree } from 'hooks/useDNDTree'
import { cn } from 'lib/utils'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../button'
import { LAST_DROPZONE_ID } from '../constants'
import { DNDDeleteItemDialog } from './dnd-delete-item-dialog'
import { Draggable, DroppableLine } from './dnd-drag-and-drop'
import { DNDItemDialog } from './dnd-item-dialog'
import { findItemById, findNestedLevel, getNestedLevelCount } from './utils/dnd'
import { createTreeItem, deleteTreeItem, updateTreeItem } from './utils/dnd-tree-items'

const MAX_ITEM_NESTED_LEVEL = 3
const ITEM_ROOT_LEVEL = 1
const ADD_SUB_ITEM = 'Add sub item'

type ItemToCreateProps = {
  level: number
  parentId: string | null
}

type ItemToUpdateProps = {
  id: string
  name: string
  level: number
}

type ItemToDeleteProps = {
  id: string
  name: string
  level: number
}

type RenderItemProps = {
  item: TreeItem
  level: number
}

interface DNDItemTreeProps {
  draggedItemId?: string
}

export const DNDTreeItems = ({ draggedItemId }: DNDItemTreeProps) => {
  const [collapsedIds, setCollapsedIds] = React.useState<string[]>([])
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const { treeItems, setTreeItems } = useDNDTree()

  const [itemToCreate, setItemToCreate] = React.useState<ItemToCreateProps | null>(null)
  const [itemToUpdate, setItemToUpdate] = React.useState<ItemToUpdateProps | null>(null)
  const [itemToDelete, setItemToDelete] = React.useState<ItemToDeleteProps | null>(null)

  const isDragging = Boolean(draggedItemId)
  const topLevelIds = treeItems.map(({ id }) => id)
  const isActiveItemOnTopLevel = topLevelIds.includes(draggedItemId ?? '') && isDragging

  const handleCollapse = (groupId: string) => {
    setCollapsedIds((prevIds) =>
      prevIds.includes(groupId) ? prevIds.filter((id) => id !== groupId) : [...prevIds, groupId],
    )
  }

  const draggedItem = draggedItemId ? findItemById({ items: treeItems, id: draggedItemId }) : null
  const draggedItemLevel = getNestedLevelCount({ item: draggedItem })

  const renderItem = ({ item: { id, name, children }, level }: RenderItemProps) => {
    const isRootLevel = level === ITEM_ROOT_LEVEL

    const overItemNestedLevel = findNestedLevel({ items: treeItems, itemId: id })
    const nestedLevels = draggedItemLevel + overItemNestedLevel

    return (
      <div className="my-[-1px]" key={id}>
        {!isRootLevel &&
          isDragging &&
          !isActiveItemOnTopLevel &&
          nestedLevels < MAX_ITEM_NESTED_LEVEL && <DroppableLine id={id} />}
        <div onMouseEnter={() => setHoveredId(id)}>
          <Draggable
            id={id}
            isDraggable={!isRootLevel}
            className={cn(isRootLevel && 'border-l-0 py-3 pl-4')}
            name={name}
            isDroppableEnabled={nestedLevels < MAX_ITEM_NESTED_LEVEL - 1}
          >
            {!isRootLevel && hoveredId === id && (
              <>
                <Button
                  onClick={() => setItemToDelete({ id, level, name })}
                  size="xs"
                  variant="unstyled"
                  className="p-2 text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  onClick={() => setItemToUpdate({ id, level, name })}
                  size="xs"
                  variant="unstyled"
                  className="p-2 text-foreground"
                >
                  <Pencil size={16} />
                </Button>
              </>
            )}
            {level < MAX_ITEM_NESTED_LEVEL && (
              <>
                <Button
                  onClick={() => setItemToCreate({ level: level + 1, parentId: id })}
                  variant="ghost"
                  size="sm"
                  className="text-foreground"
                >
                  {ADD_SUB_ITEM}
                </Button>
                <div className="w-9">
                  {(children?.length ?? 0) > 0 && (
                    <Button
                      size="sm"
                      variant="unstyled"
                      className="p-2 text-foreground"
                      onClick={() => handleCollapse(id)}
                    >
                      {collapsedIds.includes(id) ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                  )}
                </div>
              </>
            )}
          </Draggable>
        </div>
        {!collapsedIds.includes(id) && draggedItemId !== id && (
          <div className="ml-3">
            {children?.map((child) => renderItem({ item: child, level: level + 1 }))}
            {children?.[children.length - 1]?.id &&
              isDragging &&
              !isActiveItemOnTopLevel &&
              nestedLevels < MAX_ITEM_NESTED_LEVEL - 1 && (
                <DroppableLine id={`${LAST_DROPZONE_ID}${children[children.length - 1].id}`} />
              )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div onMouseLeave={() => setHoveredId(null)}>
      {treeItems.map((item) => (
        <div key={item.id} className="mb-6 overflow-hidden rounded-lg border">
          {renderItem({ item, level: ITEM_ROOT_LEVEL })}
        </div>
      ))}
      {itemToCreate && (
        <DNDItemDialog
          isOpen
          title="Create tree item"
          onClose={() => setItemToCreate(null)}
          onSubmit={({ name }) => {
            if (itemToCreate.parentId) {
              const updatedItems = createTreeItem({
                name,
                parentId: itemToCreate.parentId,
                items: treeItems,
              })
              setTreeItems(updatedItems)
              setItemToCreate(null)
            }
          }}
        />
      )}
      {itemToUpdate && (
        <DNDItemDialog
          isOpen
          title="Update tree item"
          onClose={() => setItemToUpdate(null)}
          defaultValues={{ name: itemToUpdate.name }}
          onSubmit={({ name }) => {
            if (itemToUpdate.id) {
              const updatedItems = updateTreeItem({
                name,
                itemId: itemToUpdate.id,
                items: treeItems,
              })
              setTreeItems(updatedItems)
              setItemToUpdate(null)
            }
          }}
        />
      )}
      {itemToDelete && (
        <DNDDeleteItemDialog
          isOpen
          itemToDelete={itemToDelete}
          onClose={() => setItemToDelete(null)}
          onSubmit={() => {
            if (itemToDelete.id) {
              deleteTreeItem(treeItems, itemToDelete.id)
              setItemToDelete(null)
            }
          }}
        />
      )}
    </div>
  )
}
