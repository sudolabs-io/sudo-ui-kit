import type { Preview } from '@storybook/react'
import React from 'react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../app/globals.css'
import { TooltipProvider } from '../src/components/ui/tooltip'

const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </div>
  )
}

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  (Story) => (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  ),
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators,
}

export default preview