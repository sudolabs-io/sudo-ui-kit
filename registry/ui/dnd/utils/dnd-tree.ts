import { TreeItem } from 'context/DNDTreeContext'

const findAndRemoveItem = (
  currentItems: TreeItem[],
  currentItemId: string,
): { item: TreeItem | null; remainingItems: TreeItem[] } => {
  for (let i = 0; i < currentItems.length; i += 1) {
    const item = currentItems[i]
    if (item.id === currentItemId) {
      const remainingItems = [...currentItems.slice(0, i), ...currentItems.slice(i + 1)]
      return { item, remainingItems }
    }
    if (item.children) {
      const { item: found, remainingItems } = findAndRemoveItem(item.children, currentItemId)
      if (found) {
        item.children = remainingItems
        return { item: found, remainingItems: currentItems }
      }
    }
  }
  return { item: null, remainingItems: currentItems }
}

const insertItem = (
  currentItems: TreeItem[],
  currentItem: TreeItem,
  currentBeforeId: string | null,
): TreeItem[] => {
  if (currentBeforeId === null) {
    return [...currentItems, currentItem]
  }
  const index = currentItems.findIndex((i) => i.id === currentBeforeId)
  if (index === -1) {
    return [...currentItems, currentItem]
  }
  return [...currentItems.slice(0, index), currentItem, ...currentItems.slice(index)]
}

const findParent = (currentItems: TreeItem[], currentParentId: string): TreeItem | null => {
  // eslint-disable-next-line no-restricted-syntax
  for (const currentItem of currentItems) {
    if (currentItem.id === currentParentId) {
      return currentItem
    }
    if (currentItem.children) {
      const found = findParent(currentItem.children, currentParentId)
      if (found) {
        return found
      }
    }
  }
  return null
}

export const updateItems = ({
  beforeId,
  itemId,
  items,
  parentId,
}: {
  items: TreeItem[]
  itemId: string
  parentId: string | null
  beforeId: string | null
}): TreeItem[] => {
  const { item, remainingItems } = findAndRemoveItem(items, itemId)
  if (!item) {
    throw new Error(`Item with id ${itemId} not found`)
  }

  if (parentId === null) {
    return insertItem(remainingItems, item, beforeId)
  }

  const parent = findParent(remainingItems, parentId)
  if (!parent) {
    throw new Error(`Parent with id ${parentId} not found`)
  }

  if (!parent.children) {
    parent.children = []
  }

  parent.children = insertItem(parent.children, item, beforeId)

  const updateParent = (currentItems: TreeItem[]): TreeItem[] =>
    currentItems.map((currentItem) => {
      if (currentItem.id === parentId) {
        return { ...currentItem, children: parent.children }
      }
      if (currentItem.children) {
        return { ...currentItem, children: updateParent(currentItem.children) }
      }
      return currentItem
    })
  return updateParent(remainingItems)
}
