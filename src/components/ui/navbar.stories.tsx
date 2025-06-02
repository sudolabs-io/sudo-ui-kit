import { Meta } from '@storybook/react'
import { useNavbarMenu } from 'hooks/useMenu'
import { MenuIcon } from 'components/icons'
import { PhoneIcon } from 'components/icons/PhoneIcon'
import { SearchIcon } from 'components/icons/SearchIcon'
import { WorldIcon } from 'components/icons/WorldIcon'
import {
  Navbar,
  NavbarButtonsWrapper,
  NavbarContent,
  NavbarCTAButton,
  NavbarItem,
  NavbarItemGroup,
  NavbarItemLink,
  NavbarLogo,
  NavbarMenuButton,
} from './navbar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Separator } from './separator'

const NAVBAR_ID = 'navbar-sticky'

const NavbarWithCTAButton = () => {
  const { menuRef, isMenuExpanded, onMenuVisibilityChange } = useNavbarMenu()

  return (
    <Navbar>
      <NavbarContent>
        <NavbarLogo
          title="Logo Title"
          logoSrc="https://flowbite.com/docs/images/logo.svg"
          logoAlt="Flowbite logo"
        />
        <NavbarItemGroup className="grow md:px-8" ref={menuRef}>
          <NavbarItem>
            <NavbarItemLink href="">Home</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Store</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">About</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Contact</NavbarItemLink>
          </NavbarItem>
        </NavbarItemGroup>
        <NavbarButtonsWrapper>
          <NavbarCTAButton className="hidden bg-transparent md:flex">Log In</NavbarCTAButton>
          <NavbarCTAButton className="hidden md:flex">Action button</NavbarCTAButton>
          <NavbarMenuButton
            icon={MenuIcon}
            srOnlyText="Open navbar menu button"
            aria-controls={NAVBAR_ID}
            aria-expanded={isMenuExpanded}
            data-collapse-toggle={NAVBAR_ID}
            menuRef={menuRef}
            onMenuVisibilityChange={onMenuVisibilityChange}
          />
        </NavbarButtonsWrapper>
      </NavbarContent>
    </Navbar>
  )
}
export const WithCTAButton = () => <NavbarWithCTAButton />

const NavbarWithCTAButtons = () => {
  const { menuRef, isMenuExpanded, onMenuVisibilityChange } = useNavbarMenu()

  return (
    <Navbar>
      <NavbarContent>
        <NavbarItemGroup className="md:hidden lg:flex" ref={menuRef}>
          <NavbarItem>
            <NavbarItemLink href="">Home</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Store</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">About</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Contact</NavbarItemLink>
          </NavbarItem>
        </NavbarItemGroup>
        <NavbarLogo
          title="Logo Title"
          logoSrc="https://flowbite.com/docs/images/logo.svg"
          logoAlt="Flowbite logo"
        />
        <NavbarButtonsWrapper>
          <NavbarCTAButton rightIcon={PhoneIcon} variant="unstyled" className="hidden p-0 md:flex">
            Talk to sales
          </NavbarCTAButton>
          <NavbarCTAButton
            icon={WorldIcon}
            iconOnly
            variant="unstyled"
            className="hidden p-0 md:flex"
          />
          <NavbarCTAButton
            icon={SearchIcon}
            iconOnly
            variant="unstyled"
            className="hidden p-0 md:flex"
          />
          <NavbarCTAButton variant="outline" className="hidden border-slate-600 md:flex">
            Log In
          </NavbarCTAButton>
          <NavbarCTAButton>Action button</NavbarCTAButton>
          <NavbarMenuButton
            icon={MenuIcon}
            srOnlyText="Open navbar menu button"
            aria-controls={NAVBAR_ID}
            aria-expanded={isMenuExpanded}
            data-collapse-toggle={NAVBAR_ID}
            menuRef={menuRef}
            onMenuVisibilityChange={onMenuVisibilityChange}
          />
        </NavbarButtonsWrapper>
      </NavbarContent>
    </Navbar>
  )
}
export const WithCTAButtons = () => <NavbarWithCTAButtons />

const NavbarWithSearch = () => {
  const { menuRef, isMenuExpanded, onMenuVisibilityChange } = useNavbarMenu()

  return (
    <Navbar>
      <NavbarContent>
        <NavbarLogo
          title="Logo Title"
          logoSrc="https://flowbite.com/docs/images/logo.svg"
          logoAlt="Flowbite logo"
        />
        <NavbarItemGroup ref={menuRef}>
          <NavbarItem>
            <NavbarItemLink href="">Home</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Store</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">About</NavbarItemLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarItemLink href="">Contact</NavbarItemLink>
          </NavbarItem>
        </NavbarItemGroup>
        <NavbarButtonsWrapper className="items-center gap-4">
          <NavbarCTAButton leftIcon={SearchIcon} variant="unstyled" className="hidden p-0 sm:flex">
            Search
          </NavbarCTAButton>
          <Separator orientation="vertical" className="hidden h-[15px] sm:flex" />
          <div className="hidden sm:flex">
            <Select>
              <SelectTrigger className="w-[180px] border-none p-0 focus:outline-none focus:ring-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <NavbarMenuButton
            icon={MenuIcon}
            srOnlyText="Open navbar menu button"
            aria-controls={NAVBAR_ID}
            aria-expanded={isMenuExpanded}
            data-collapse-toggle={NAVBAR_ID}
            menuRef={menuRef}
            onMenuVisibilityChange={onMenuVisibilityChange}
          />
        </NavbarButtonsWrapper>
      </NavbarContent>
    </Navbar>
  )
}
export const WithSearch = () => <NavbarWithSearch />

const meta: Meta = {
  title: 'Components/Navbar/Navbar',
}

export default meta
