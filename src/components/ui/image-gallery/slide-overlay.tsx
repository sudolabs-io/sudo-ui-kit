interface SlideOverlayProps {
  title: string
}

export const SlideOverlay = ({ title }: SlideOverlayProps) => (
  <div className="absolute bottom-0 flex h-full w-full items-center justify-center bg-background/80">
    <p className="text-lg font-medium leading-[54px] text-foreground">{title}</p>
  </div>
)
