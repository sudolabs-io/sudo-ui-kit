import * as React from 'react'
import { SVGProps } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from 'lib/utils'

export interface SidebarHeaderProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
  collapsedIcon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, icon: Icon, collapsedIcon: CollapsedIcon, ...props }, ref) => (
    <div
      className={cn(
        'flex flex-none justify-center pt-4 sm:justify-start sm:pl-5 sm:pt-5',
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="hidden sm:block">
        <Icon />
      </div>

      <div className="block sm:hidden">
        <CollapsedIcon />
      </div>
    </div>
  ),
)

export interface SidebarItemProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  text?: string
  icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
  rightAddon?: React.FC
  isActive?: boolean
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, text, icon: Icon, rightAddon: RightAddon, isActive, ...props }, ref) => (
    <div
      className={cn(
        'flex flex-row justify-center gap-3 rounded-lg sm:justify-start items-center sm:px-3 sm:py-2 sm:hover:bg-slate-100 cursor-pointer',
        isActive && 'sm:bg-slate-100',
        className,
      )}
      ref={ref}
      {...props}
    >
      {typeof Icon !== 'undefined' && (
        <div className={cn('rounded-lg p-2 sm:p-0 hover:bg-slate-100', isActive && 'bg-slate-100')}>
          <Icon className={cn('text-slate-500', isActive && 'text-slate-900')} />
        </div>
      )}

      {text && <div className="hidden grow font-medium sm:block">{text}</div>}

      {typeof RightAddon !== 'undefined' && <RightAddon />}
    </div>
  ),
)

export interface SidebarItemGroupProps extends React.BaseHTMLAttributes<HTMLDivElement> {}

const SidebarItemGroup = React.forwardRef<HTMLDivElement, SidebarItemGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        'flex flex-none flex-col gap-2.5  border-b-[1px] pb-4 text-base font-medium sm:px-3',
        className,
      )}
      ref={ref}
      {...props}
    >
      {props.children}
    </div>
  ),
)

export interface SidebarCollapsibleItemGroupProps {
  value: string
}

const SidebarCollapsibleItemGroup = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & SidebarCollapsibleItemGroupProps
>(({ className, value, children, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn('sm:px-3', className)} {...props}>
    <AccordionPrimitive.Item value={value} className="rounded-lg sm:hover:bg-slate-100">
      {children}
    </AccordionPrimitive.Item>
  </AccordionPrimitive.Root>
))

export interface SidebarCollapsibleItemGroupTriggerProps {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
  isActive?: boolean
}

const SidebarCollapsibleItemGroupTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    SidebarCollapsibleItemGroupTriggerProps
>(({ className, icon: Icon, isActive, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex items-center text-start justify-center w-full text-lg sm:px-3 sm:py-2 gap-3 rounded-lg font-medium [&[data-state=open]>svg]:rotate-180',
        isActive && 'sm:bg-slate-100',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex-none rounded-lg p-2 sm:p-0 hover:bg-slate-100',
          isActive && 'bg-slate-100',
        )}
      >
        <Icon className={cn('text-slate-500', isActive && 'text-slate-900')} />
      </div>

      <div className="hidden grow gap-3 sm:block">{children}</div>

      <HiChevronDown className="hidden h-6 w-6 flex-none transition-transform duration-200 sm:block" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

const SidebarCollapsibleItemGroupContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-base transition-all pl-10 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
))

export interface SidebarFooterProps extends React.BaseHTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        'flex grow flex-col items-center justify-end gap-1 pb-4 sm:flex-row sm:items-end sm:justify-center',
        className,
      )}
      ref={ref}
    >
      {props.children}
    </div>
  ),
)

export interface SidebarProps extends React.BaseHTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, ...props }, ref) => (
  <div
    className={cn('flex h-full w-[60px] flex-col justify-start gap-4 sm:w-[250px]', className)}
    ref={ref}
    {...props}
  >
    {props.children}
  </div>
))

export {
  Sidebar,
  SidebarCollapsibleItemGroup,
  SidebarCollapsibleItemGroupContent,
  SidebarCollapsibleItemGroupTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
}
