import { TreeItem } from 'context/DNDTreeContext'

const findParent = (currentItems: TreeItem[], currentParentId: string): TreeItem | null => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of currentItems) {
    if (item.id === currentParentId) {
      return item
    }
    if (item.children) {
      const found = findParent(item.children, currentParentId)
      if (found) {
        return found
      }
    }
  }
  return null
}

export const createTreeItem = ({
  items,
  name,
  parentId,
}: {
  items: TreeItem[]
  name: string
  parentId: string
}): TreeItem[] => {
  const newItem: TreeItem = { id: `${Date.now()}`, name }

  if (parentId === null) {
    return [...items, newItem]
  }

  const parent = findParent(items, parentId)
  if (!parent) {
    throw new Error(`Parent with id ${parentId} not found`)
  }

  if (!parent.children) {
    parent.children = []
  }

  parent.children.push(newItem)
  return items
}

const updateItem = (currentItems: TreeItem[], itemId: string, name: string): boolean => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of currentItems) {
    if (item.id === itemId) {
      item.name = name
      return true
    }
    if (item.children) {
      if (updateItem(item.children, itemId, name)) {
        return true
      }
    }
  }
  return false
}

export const updateTreeItem = ({
  itemId,
  items,
  name,
}: {
  items: TreeItem[]
  itemId: string
  name: string
}): TreeItem[] => {
  if (!updateItem(items, itemId, name)) {
    throw new Error(`Item with id ${itemId} not found`)
  }

  return items
}

export const deleteTreeItem = (currentItems: TreeItem[], itemId: string): TreeItem[] =>
  currentItems.reduce((acc, item) => {
    if (item.id === itemId) {
      return acc
    }
    if (item.children) {
      // eslint-disable-next-line no-param-reassign
      item.children = deleteTreeItem(item.children, itemId)
    }
    return [...acc, item]
  }, [] as TreeItem[])
