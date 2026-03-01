// extends Vitest's expect with methods from react-testing-library
// runs once before all tests, allowing you to set up the testing environment and import necessary libraries or configurations that should be available globally in all test files.
import '@testing-library/jest-dom'

// jsdom does not implement window.matchMedia, which is required by MantineProvider.
// This mock implementation allows tests that rely on MantineProvider to run without errors.
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated method, but some libraries might still use it
        removeListener: vi.fn(), // Deprecated method, but some libraries might still use it
        addEventListener: vi.fn(),  // Modern method for adding event listeners
        removeEventListener: vi.fn(), // Modern method for removing event listeners
        dispatchEvent: vi.fn(), // Method to dispatch events        
    }))
})
