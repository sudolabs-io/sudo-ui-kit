import React, { PropsWithChildren } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cn } from 'lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, type ButtonProps } from './button'

export type PillRowProps = {
  children: React.ReactElement<ButtonProps>[]
} & React.HTMLAttributes<HTMLDivElement>

interface ScrollButtonProps extends PropsWithChildren, ButtonProps {}

const ScrollButton = ({ children, ...props }: ScrollButtonProps) => (
  <Button
    size="icon-sm"
    className="rounded-full border border-input bg-background text-foreground hover:bg-accent focus:ring-ring disabled:text-foreground"
    iconOnly
    {...props}
  >
    {children}
  </Button>
)

export const PillRow = ({ children, className, ...props }: PillRowProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const isAnimating = React.useRef(false)

  const [isScrolling, setIsScrolling] = React.useState(false)
  const [isEndOfScroll, setIsEndOfScroll] = React.useState(false)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollAreaRef.current) {
      return
    }
    const { scrollWidth, offsetWidth, scrollLeft } = scrollAreaRef.current
    const itemWidth = scrollWidth / children.length // average width of each item
    const slideWidth = offsetWidth - itemWidth
    const directionMultiplier = direction === 'left' ? -1 : 1
    const scrollValue = scrollLeft + slideWidth * directionMultiplier

    scrollAreaRef.current.scrollLeft = Math.min(scrollValue, scrollWidth)
  }

  const handleScroll = () => {
    if (!isAnimating.current) {
      window.requestAnimationFrame(() => {
        // but if there's a problem, we can use a debounce
        if (scrollAreaRef.current) {
          const { scrollWidth, offsetWidth, scrollLeft } = scrollAreaRef.current
          // This is probably called 60x/sec, but react batching might take care of it
          setIsScrolling(scrollLeft > 0)
          setIsEndOfScroll(scrollLeft >= scrollWidth - offsetWidth - 1)
          isAnimating.current = false
        }
      })
      isAnimating.current = true
    }
  }

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const area = scrollAreaRef.current // nedeed for cleanup
      setIsEndOfScroll(area.scrollWidth <= area.offsetWidth)
      area.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      return () => {
        area.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
    return () => undefined
  }, [])

  // if the children change and no scroll event is triggered, we need to check if we're at the end of the scroll
  // isScrolling should be okay, because shrinking scroll area should trigger a scroll event
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollAreaRef.current
      setIsEndOfScroll(scrollLeft >= scrollWidth - offsetWidth - 1)
    }
  }, [children])

  return (
    <div className={cn('relative my-5', className)} {...props}>
      {isScrolling && (
        <div className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/10 p-1 drop-shadow-xl backdrop-blur-3xl lg:-left-3">
          <ScrollButton onClick={() => scroll('left')}>
            <ChevronLeft size={20} />
          </ScrollButton>
        </div>
      )}
      {!isEndOfScroll && (
        <div className="absolute -right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/20 p-1 drop-shadow-xl backdrop-blur-3xl lg:-right-4">
          <ScrollButton onClick={() => scroll('right')}>
            <ChevronRight size={20} />
          </ScrollButton>
        </div>
      )}

      <ScrollArea.Root className="relative inline-flex w-full flex-row items-center">
        <ScrollArea.Viewport
          ref={scrollAreaRef}
          className={cn('[&>div]:!flex [&>div]:gap-2 scroll-smooth snap-x w-full')}
        >
          {children}
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  )
}
