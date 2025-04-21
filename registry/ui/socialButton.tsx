import { PropsWithChildren, ReactElement } from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { cn } from 'lib/utils'
import { Button } from './button'

interface SocialButtonProps extends PropsWithChildren {
  type: 'facebook' | 'google' | 'apple'
  variant: 'solid' | 'outline' | 'transparent' | 'icon'
}

const brandToIconMap: Record<SocialButtonProps['type'], ReactElement> = {
  google: <FcGoogle className="h-[24px] w-[24px]" />,
  facebook: <FaFacebook className="h-[24px] w-[24px]" />,
  apple: <FaApple className="h-[24px] w-[24px]" />,
}

const brandToClassName: Record<
  SocialButtonProps['type'],
  Partial<Record<SocialButtonProps['variant'], string>>
> = {
  google: {
    solid: 'bg-[#4285F4] hover:bg-[#4285F4] text-white',
    outline: 'bg-white hover:bg-white border-[1px] border-black text-black',
    transparent: 'bg-white hover:bg-white shadow-md text-black',
    icon: 'bg-white hover:bg-white shadow-md p-2',
  },
  facebook: {
    solid: 'bg-[#4285F4] hover:bg-[#4285F4] text-white',
    outline: 'bg-white hover:bg-white border-[1px] border-[#1877F2] text-[#1877F2]',
    transparent: 'bg-white hover:bg-white shadow-md text-[#1877F2]',
    icon: 'bg-white hover:bg-white shadow-md p-2 text-[#1877F2]',
  },
  apple: {
    solid: 'bg-black hover:bg-black text-white',
    outline: 'bg-white hover:bg-white border-[1px] border-black text-black',
    transparent: 'bg-white hover:bg-white shadow-md text-black',
    icon: 'bg-white hover:bg-white shadow-md p-2 text-black',
  },
}

const SocialButton = ({ type, variant, children }: SocialButtonProps) => (
  <Button className={cn(brandToClassName[type][variant])}>
    {brandToIconMap[type]}
    {variant !== 'icon' && children}
  </Button>
)

export { SocialButton, type SocialButtonProps }
