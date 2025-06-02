import { forwardRef, PropsWithChildren, RefObject } from 'react'
import { cn } from 'lib/utils'
import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from './button'

interface PropsWithClassName extends PropsWithChildren {
  className?: string
}

interface PropsWithHref extends PropsWithClassName, LinkProps {}

interface NavbarLogoProps extends Partial<PropsWithHref> {
  logoSrc: string
  logoAlt?: string
  title: string
}

interface NavbarItemGroupProps extends PropsWithClassName {
  id?: string
}

interface NavbarCTAButtonProps extends PropsWithClassName, ButtonProps {}

interface NavbarMenuButtonProps extends Partial<Omit<PropsWithClassName, 'children'>>, ButtonProps {
  srOnlyText?: string
  'data-collapse-toggle'?: string
  menuRef: RefObject<HTMLDivElement | null>
  onMenuVisibilityChange: () => void
}

interface NavbarItemProps extends PropsWithClassName {}

export const NavbarLogo = ({ href, logoSrc, logoAlt, title, className }: NavbarLogoProps) => {
  const children = (
    <>
      <img src={logoSrc} className="h-8" alt={logoAlt} />
      <span className="self-center whitespace-nowrap text-2xl font-semibold text-slate-900">
        {title}
      </span>
    </>
  )
  const wrapperClassName = cn('flex items-center space-x-3 rtl:space-x-reverse', className)

  if (href) {
    return (
      <Link href={href} className={wrapperClassName}>
        {children}
      </Link>
    )
  }
  return <div className={wrapperClassName}>{children}</div>
}

export const NavbarItemGroup = forwardRef<HTMLDivElement, NavbarItemGroupProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn(
        'hidden w-full items-center justify-between md:flex md:w-auto md:static fixed left-0 top-24',
        className,
      )}
      ref={ref}
      {...props}
    >
      <ul className="flex flex-col border border-gray-100 bg-white p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:rounded-lg md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
        {children}
      </ul>
    </div>
  ),
)

export const NavbarItem = ({ children, className, ...props }: NavbarItemProps) => (
  <li {...props}>{children}</li>
)

export const NavbarItemLink = ({ href, children, className }: PropsWithHref) => (
  <Link
    href={href}
    className={cn(
      'block rounded px-3 py-2 md:bg-transparent md:p-0 text-slate-900 text-base',
      className,
    )}
    aria-current="false"
  >
    {children}
  </Link>
)

export const NavbarButtonsWrapper = ({ children, className }: PropsWithClassName) => (
  <div
    className={cn(
      'flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse gap-4 items-center',
      className,
    )}
  >
    {children}
  </div>
)

export const NavbarCTAButton = ({ children, ...props }: NavbarCTAButtonProps) => (
  <Button {...props} type="button">
    {children}
  </Button>
)

export const NavbarMenuButton = ({
  icon,
  srOnlyText,
  className,
  'data-collapse-toggle': dataCollapseToggle,
  menuRef,
  onMenuVisibilityChange,
  ...props
}: NavbarMenuButtonProps) => (
  <Button
    data-collapse-toggle={dataCollapseToggle as string}
    className={cn('md:hidden p-0', className)}
    iconOnly
    icon={icon}
    variant="unstyled"
    size="xl"
    onClick={() => {
      menuRef.current?.classList.toggle('hidden')
      menuRef.current?.classList.toggle('block')
      onMenuVisibilityChange()
    }}
    {...props}
  >
    {srOnlyText && <span className="sr-only">{srOnlyText}</span>}
  </Button>
)

export const Navbar = ({ children, className }: PropsWithClassName) => (
  <nav className={cn('fixed start-0 top-0 z-20 w-full border-gray-200 bg-white', className)}>
    {children}
  </nav>
)

export const NavbarContent = ({ children, className }: PropsWithClassName) => (
  <div
    className={cn(
      'flex flex-wrap items-center justify-between md:p-6 md:px-10 px-4 h-24 md:h-fit',
      className,
    )}
  >
    {children}
  </div>
)
