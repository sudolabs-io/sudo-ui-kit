import { useRef, useState } from 'react'

export const useNavbarMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)

  const onMenuVisibilityChange = () => {
    setIsMenuExpanded(!!menuRef.current?.classList.contains('block'))
  }

  return {
    menuRef,
    isMenuExpanded,
    onMenuVisibilityChange,
  }
}
