import type { Preview } from '@storybook/react'
import React from 'react'
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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],};

export default preview;