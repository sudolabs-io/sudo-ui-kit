import { createContext, Dispatch, SetStateAction } from 'react'

export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
}

export interface DNDTreeContextProps {
  treeItems: TreeItem[]
  setTreeItems: Dispatch<SetStateAction<TreeItem[]>>
}

export const DNDTreeContext = createContext<DNDTreeContextProps>({
  treeItems: [],
  setTreeItems: () => {},
})
