import { cn } from 'lib/utils'

interface Props {
  ratio?: number
  children: React.ReactNode
  className?: string
}

export const AspectRatioBox = ({ ratio, children, className }: Props) => {
  const nonOptionalRation = ratio || 1
  const paddingTop = `${(1 / nonOptionalRation) * 100}%`

  return (
    <div className={cn('relative', className)} style={{ paddingTop }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
