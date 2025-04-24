import { TreeItem } from 'context/DNDTreeContext'
import { LAST_DROPZONE_ID, TREE_ITEM_DROPZONE_ID } from 'components/ui/constants'

type FindItemByIdProps<T> = {
  items: T[]
  id: string
}

export const findItemById = <T extends TreeItem>({ items, id }: FindItemByIdProps<T>): T | null => {
  let result = null

  items.forEach((item) => {
    if (item.id === id) {
      result = item
    } else if (item.children) {
      const found = findItemById({ items: item.children, id })
      if (found) {
        result = found
      }
    }
  })

  return result
}

type FindNestedLevelProps = {
  items: TreeItem[]
  itemId: string
  currentLevel?: number
}

export function findNestedLevel({ items, itemId, currentLevel = 0 }: FindNestedLevelProps) {
  let result = -1

  items.forEach((item) => {
    if (item.id === itemId) {
      result = currentLevel
    } else if (item.children) {
      const nestedLevel = findNestedLevel({
        items: item.children,
        itemId,
        currentLevel: currentLevel + 1,
      })
      if (nestedLevel !== -1) {
        result = nestedLevel
      }
    }
  })

  return result
}

type CountNestedLevelsProps = {
  item: TreeItem | null
  currentLevel?: number
}

export const getNestedLevelCount = ({ item, currentLevel = 0 }: CountNestedLevelsProps) => {
  if (!item?.children || item.children.length === 0) {
    return currentLevel
  }

  let maxNestedLevels = currentLevel

  item.children.forEach((child) => {
    const nestedLevels = getNestedLevelCount({ item: child, currentLevel: currentLevel + 1 })
    maxNestedLevels = Math.max(maxNestedLevels, nestedLevels)
  })

  return maxNestedLevels
}

type RecursiveRemoveItemByIdProps<T> = {
  items: T[]
  id: string
}

export const recursiveRemoveItemById = <T extends TreeItem>({
  items,
  id,
}: RecursiveRemoveItemByIdProps<T>) =>
  items.reduce((acc, item) => {
    if (item.id === id) {
      return acc
    }
    const newItem = { ...item }
    if (newItem.children) {
      newItem.children = recursiveRemoveItemById({ items: newItem.children, id })
    }
    acc.push(newItem)
    return acc
  }, [] as T[])

type MoveItemProps<T extends TreeItem> = {
  dropzoneId: string
  id: string
  onMove: (items: T[]) => void
  items: T[]
}

type MoveItemReturnType = {
  parentId?: string
  beforeId?: string | null
}

const getOverId = (dropzoneId: string) => {
  if (dropzoneId?.includes(LAST_DROPZONE_ID)) {
    return dropzoneId.split(LAST_DROPZONE_ID)[1]
  }
  if (dropzoneId?.includes(TREE_ITEM_DROPZONE_ID)) {
    return dropzoneId.split(TREE_ITEM_DROPZONE_ID)[1]
  }
  return dropzoneId
}

type FindParentIdProps = {
  items: TreeItem[]
  itemId: string
  parentId?: string | null
}

export const findParentId = ({ items, itemId, parentId = null }: FindParentIdProps) => {
  if (!itemId) {
    return null
  }

  let result: string | null = null

  items.forEach((item) => {
    if (item.id === itemId) {
      result = parentId
    } else if (item.children) {
      result = result || findParentId({ items: item.children, itemId, parentId: item.id })
    }
  })

  return result
}

export const moveItem = <T extends TreeItem>({
  dropzoneId,
  id,
  onMove,
  items,
}: MoveItemProps<T>): MoveItemReturnType => {
  if (id === dropzoneId) {
    return {}
  }

  const overId = getOverId(dropzoneId)

  if (overId === id) {
    return {}
  }

  const parentId = findParentId({ items, itemId: overId })
  const itemToMove = findItemById({ items, id })

  if (!itemToMove) {
    return {}
  }

  const updatedItems = recursiveRemoveItemById({ items, id })

  if (dropzoneId.includes(TREE_ITEM_DROPZONE_ID)) {
    const parent = findItemById({ items: updatedItems, id: overId })

    if (parent) {
      parent.children = [...(parent?.children || []), itemToMove]
    }

    onMove(updatedItems)

    return { parentId: overId, beforeId: null }
  }

  if (!parentId) {
    if (dropzoneId === LAST_DROPZONE_ID) {
      onMove([...updatedItems, itemToMove])
      return { beforeId: null }
    }
    const index = updatedItems.findIndex((item) => item.id === overId)
    updatedItems.splice(index, 0, itemToMove)

    onMove(updatedItems)
    return { beforeId: overId }
  }

  const parent = findItemById({ items: updatedItems, id: parentId })

  if (parent) {
    if (dropzoneId.includes(LAST_DROPZONE_ID)) {
      parent.children = [...(parent?.children || []), itemToMove]
      onMove(updatedItems)

      return { parentId, beforeId: null }
    }
    parent.children = parent.children || []

    const index = parent.children.findIndex((item) => item.id === overId)
    parent.children.splice(index, 0, itemToMove)

    onMove(updatedItems)

    return { parentId, beforeId: overId }
  }
  return {}
}
