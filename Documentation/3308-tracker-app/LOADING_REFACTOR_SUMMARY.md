# Loading State Refactoring Summary

## Problem
You had `BaseWrapper` being used in multiple page components, causing the loading overlay to render multiple times when navigating between pages. This happened because each page was creating its own loading state.

## Solution
Moved to a **centralized loading state** approach:

### 1. Created Loading Context (`components/providers/loading-provider.tsx`)
- Provides a global loading state using React Context
- Any component can access `loading` and `setLoading` using the `useLoading()` hook
- Ensures only ONE loading state exists across the entire app

### 2. Updated Layout Structure (`app/layout.tsx`)
- Moved user session fetching to the root layout
- Wraps all content with `<ClientLayout>` which provides the loading context
- `BaseWrapper` is now applied ONCE at the top level, not in each page

### 3. Removed BaseWrapper from Individual Pages
Updated these files to remove their local `BaseWrapper` usage:
- `app/(content)/home/components/home-page.tsx`
- `app/(content)/register/(ledy)/register-page.tsx`
- `app/(content)/login/(ledy)/login-page.tsx`
- `app/(content)/profile/(ledy)/profile-page.tsx`
- `app/(content)/tracking/(steph)/tracking-page.tsx`
- `app/(content)/reports/(conner)/reports-page.tsx`

### 4. Updated Components to Use Context
Pages that need to control loading (like login/register) now use:
```tsx
import { useLoading } from '@/components/providers/loading-provider'

function MyPage() {
  const { loading, setLoading } = useLoading()
  // Use setLoading(true) when starting an async operation
  // Use setLoading(false) when done
}
```

## Benefits
✅ **Single Loading Overlay** - Only one overlay renders at a time  
✅ **Global State** - Loading state is shared across all components  
✅ **Cleaner Code** - Pages don't need to manage local loading state  
✅ **Better UX** - Consistent loading behavior across navigation  
✅ **No Duplication** - `BaseWrapper` only wraps content once  

## How to Use
1. **To show loading**: Call `setLoading(true)` before async operations
2. **To hide loading**: Call `setLoading(false)` when operation completes
3. **Access in any component**: Import and use `useLoading()` hook

Example:
```tsx
const { setLoading } = useLoading()

const handleSubmit = async () => {
  setLoading(true)
  try {
    await someAsyncOperation()
  } finally {
    setLoading(false)
  }
}
```
