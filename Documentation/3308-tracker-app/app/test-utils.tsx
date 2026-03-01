// MantineProvider is required to render components that use Mantine UI components in tests. 
// This file provides a custom render function that wraps the tested components with the necessary providers.

import { render, type RenderOptions } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

function Providers({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }