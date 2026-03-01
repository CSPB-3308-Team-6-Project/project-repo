import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()], // registers the react plugin- react plugin enables jsx support and other react-specific features in the Vite build process.
    test: {
        environment: 'jsdom', // sets the testing environment to jsdom, which makes document, window, and HTMLElment available in the test environment, allowing you to test components that interact with the DOM.
        setupFiles: ['./vitest.setup.ts'], //global setup file that runs before each test, allowing you to configure the testing environment, set up global variables, or perform any necessary initialization.
        globals: true, // allows you to use global variables like describe, it, expect, etc., without needing to import them in each test file.
    },
    resolve: {
        alias: { 
            '@': path.resolve(__dirname, './'), // creates an alias '@' that points to the root directory of the project, allowing you to import modules using '@/path/to/module' instead of relative paths like '../../path/to/module'.
        },
    },
})

