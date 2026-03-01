# Testing Guide — Health Tracker App

This guide explains how to write, organize, and run tests for this project. All contributors should read this before writing any new code, since this project follows **Test Driven Development (TDD)** — tests are written _before_ the implementation.

---

## Table of Contents

1. [The Testing Setup](#the-testing-setup)
2. [Running Tests](#running-tests)
3. [Where to Put Test Files](#where-to-put-test-files)
4. [Two Kinds of Tests](#two-kinds-of-tests)
5. [The Core Tools](#the-core-tools)
6. [The TDD Workflow](#the-tdd-workflow-red--green--refactor)
7. [Important: Client Components Only](#important-client-components-only)
8. [Mocking Next.js Imports](#mocking-nextjs-imports)
9. [Quick Reference](#quick-reference)

---

## The Testing Setup

The following files configure the test environment. **You do not need to modify these to write tests.**

| File | Purpose |
|---|---|
| `vitest.config.ts` | Configures Vitest: React plugin, jsdom environment, path aliases |
| `vitest.setup.ts` | Loads jest-dom matchers globally before every test |
| `vitest.d.ts` | TypeScript type reference for jest-dom |
| `tsconfig.json` | Includes `vitest/globals` so TypeScript knows about `describe`, `it`, `expect` |

### Installed Packages

| Package | Role |
|---|---|
| `vitest` | The test runner — finds and executes test files |
| `@vitejs/plugin-react` | Lets Vitest understand JSX/TSX syntax |
| `jsdom` | Simulates a browser DOM environment in Node.js |
| `@testing-library/react` | Renders components and queries what is on screen |
| `@testing-library/user-event` | Simulates realistic user interactions (click, type, etc.) |
| `@testing-library/jest-dom` | Adds readable DOM matchers like `toBeInTheDocument()` |

---

## Running Tests

All commands are run from inside the `Documentation/3308-tracker-app/` directory.

```bash
# Watch mode — re-runs affected tests on every file save
# Use this while developing
npm test

# Run all tests once and exit
# Use this before committing
npm run test:run

# Run all tests once and show a coverage report
npm run test:coverage
```

> **Tip:** Start `npm test` (watch mode) at the beginning of every work session and leave it running. It will automatically re-run only the tests related to any file you save, giving you instant feedback without manual steps.

---

## Where to Put Test Files

Test files live **next to the file they are testing**, in the same folder. Vitest automatically finds any file ending in `.test.ts` or `.test.tsx`.

```
app/
  components/
    WaterTracker.tsx          ← the component
    WaterTracker.test.tsx     ← its tests  (same folder)
  utils/
    formatDate.ts             ← a utility function
    formatDate.test.ts        ← its tests  (same folder)
```

> **Why co-location?** Keeping the test next to the source file makes it easy to find, makes it obvious when a file has no tests, and keeps related code together when you rename or move things.

---

## Two Kinds of Tests

### Kind 1 — Unit Tests (pure logic, no UI)

Use these for utility functions, calculations, and data transformations — anything that takes input and returns output with no DOM or React involved. These use plain `.test.ts` files (no `x` in the extension because there is no JSX).

```ts
// app/utils/calculateProgress.test.ts

import { calculateProgress } from './calculateProgress'

describe('calculateProgress', () => {
  it('returns 100 when goal is met exactly', () => {
    expect(calculateProgress(8, 8)).toBe(100)
  })

  it('returns 50 when halfway to goal', () => {
    expect(calculateProgress(4, 8)).toBe(50)
  })

  it('caps at 100 when goal is exceeded', () => {
    expect(calculateProgress(10, 8)).toBe(100)
  })

  it('returns 0 when nothing has been logged', () => {
    expect(calculateProgress(0, 8)).toBe(0)
  })
})
```

### Kind 2 — Component Tests (React UI)

Use these for React components — what they render, how they respond to user interaction, and what they display given different data. These use `.test.tsx` files (with `x` because they contain JSX).

```tsx
// app/components/WaterTracker.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaterTracker } from './WaterTracker'

describe('WaterTracker', () => {
  it('displays the label', () => {
    render(<WaterTracker />)
    expect(screen.getByText('Glasses of water today')).toBeInTheDocument()
  })

  it('starts with a value of 0', () => {
    render(<WaterTracker />)
    expect(screen.getByRole('spinbutton')).toHaveValue(0)
  })

  it('calls onSave with the entered value when submitted', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()

    render(<WaterTracker onSave={onSave} />)

    await user.clear(screen.getByRole('spinbutton'))
    await user.type(screen.getByRole('spinbutton'), '6')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledWith(6)
  })
})
```

---

## The Core Tools

### `render` and `screen`

`render` mounts a component into the simulated DOM. `screen` lets you query what is on screen.

```tsx
import { render, screen } from '@testing-library/react'

render(<MyComponent prop="value" />)
```

**Query methods on `screen`:**

```ts
screen.getByText('Hello')                        // finds by visible text content
screen.getByRole('button')                       // finds by ARIA role
screen.getByRole('button', { name: 'Save' })     // by role AND accessible label
screen.getByLabelText('Email')                   // finds input by its <label>
screen.getByPlaceholderText('Enter a value...')  // finds by placeholder text

screen.queryByText('Hello')   // returns null instead of throwing if not found
screen.findByText('Hello')    // async — waits for the element to appear
```

> **Prefer `getByRole` when possible.** It mirrors how screen readers perceive the page, so your tests verify accessibility at the same time as functionality.

---

### `userEvent`

`userEvent` simulates realistic user interactions. Always call `userEvent.setup()` first, and always `await` every action.

```tsx
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

await user.click(element)
await user.type(element, 'some text')
await user.clear(element)
await user.selectOptions(element, 'option value')
await user.tab()   // keyboard navigation
```

---

### `vi.fn()` — Mock Functions

A mock function records whether it was called and what arguments it received. Use it when a component accepts a callback prop and you need to verify it fires correctly.

```tsx
const onSave = vi.fn()

render(<MyComponent onSave={onSave} />)
// ... interact with the component ...

expect(onSave).toHaveBeenCalled()           // was it called at all?
expect(onSave).toHaveBeenCalledWith(6)      // called with this specific value?
expect(onSave).toHaveBeenCalledTimes(1)     // called exactly once?
```

---

### Common Matchers

**Existence**
```ts
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()
```

**Form values**
```ts
expect(input).toHaveValue('some text')
expect(input).toHaveValue(42)
```

**Element state**
```ts
expect(button).toBeDisabled()
expect(button).toBeEnabled()
expect(checkbox).toBeChecked()
```

**Content**
```ts
expect(element).toHaveTextContent('Hello')
```

**Logic and equality**
```ts
expect(result).toBe(42)           // strict equality (===), use for primitives
expect(result).toEqual({ a: 1 }) // deep equality, use for objects and arrays
expect(result).toBeTruthy()
expect(result).toBeFalsy()
expect(result).toBeNull()
```

---

## The TDD Workflow (Red → Green → Refactor)

This is the core loop for every new feature or component.

### Step 1 — Write the test first (🔴 Red)

Create the test file _before_ the implementation file exists. Describe what you expect the code to do. Run `npm test`. The test will fail — that is the correct and expected starting state. A failing test means you have clearly defined the goal.

### Step 2 — Implement until green (🟢 Green)

Create the implementation file and write just enough code to make the test pass. Do not add extra features or edge cases yet. Watch the terminal go from red to green.

### Step 3 — Improve without breaking (🔵 Refactor)

Clean up the implementation — rename variables, extract helpers, simplify logic. The test keeps running in the background. If it turns red, you broke something and can fix it immediately before moving on.

**Then repeat** this loop for each new behaviour.

> **The key discipline:** never write implementation code without a failing test that demands it. If you find yourself writing code that no test covers, stop and write the test first.

---

## Important: Client Components Only

Next.js has two kinds of components:

- **Server Components** — the default. Rendered on the server. _Cannot_ be tested with React Testing Library.
- **Client Components** — marked with `'use client'` at the top. _Can_ be fully tested.

Any component that has forms, buttons, state, or event handlers **must** be a Client Component. Add `'use client'` as the very first line:

```tsx
'use client'

import { useState } from 'react'

export function WaterTracker() {
  // ...
}
```

> If you try to test a component without `'use client'` and get errors about async components or missing context, adding `'use client'` is almost always the fix.

---

## Mocking Next.js Imports

Some Next.js features do not work inside jsdom. If your component uses navigation hooks or other Next.js utilities, mock them at the top of the test file.

### Mocking navigation hooks

```tsx
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/tracker',
  redirect: vi.fn(),
}))
```

### Mocking `next/image`

```tsx
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}))
```

Place `vi.mock(...)` calls at the top of the test file, before any `describe` blocks. Vitest hoists them automatically.

---

## Quick Reference

### File naming and location

| What you are testing | File extension | Location |
|---|---|---|
| A React component | `.test.tsx` | Same folder as the component |
| A utility function or logic | `.test.ts` | Same folder as the function |

### Commands

| Command | When to use |
|---|---|
| `npm test` | While developing — stays running, re-runs on save |
| `npm run test:run` | Before committing — single pass, then exits |
| `npm run test:coverage` | To see which lines of code are not yet tested |

### Required imports for component tests

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```

### Required on any interactive component file

```tsx
'use client'   // must be the very first line of the file
```

### TDD in one line

> Write a failing test → make it pass → clean up → repeat.
