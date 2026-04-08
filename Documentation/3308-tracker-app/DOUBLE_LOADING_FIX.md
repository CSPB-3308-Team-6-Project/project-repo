# Double Loading Overlay - Root Cause & Fix

## The Problem 🐛

You were seeing **TWO loading overlays** rendering on certain pages (especially register and login pages).

## Root Cause 🔍

You were fetching user information from the database in **MULTIPLE places**:

### Before:
1. **Root Layout** (`app/layout.tsx`):
   ```tsx
   const userDoc = await prisma.user.findUnique({...})  // ❌ Database query
   ```

2. **Register Page** (`app/(content)/register/page.tsx`):
   ```tsx
   const userDoc = await prisma.user.findUnique({...})  // ❌ DUPLICATE database query
   ```

3. **Login Page** (`app/(content)/login/page.tsx`):
   ```tsx
   const userDoc = await prisma.user.findUnique({...})  // ❌ DUPLICATE database query
   ```

**Result:** When navigating to these pages, BOTH the layout AND the page were querying the database, causing React to show loading states twice.

## The Solution ✅

### 1. Removed Duplicate Database Queries

Updated these files to only check the session (lightweight), not query the database:

- **register/page.tsx** - Now only checks `getServerSession()`, doesn't query database
- **login/page.tsx** - Now only checks `getServerSession()`, doesn't query database

### 2. Created User Context Provider

Added `components/providers/user-provider.tsx` to share user info from the root layout to all components via React Context.

```tsx
export function useUser() {
  const context = useContext(UserContext)
  return context
}
```

### 3. Single Source of Truth

Now user info is fetched **ONCE** in the root layout and shared throughout the app via context.

## Summary of Changes

### Files Modified:
1. ✅ `app/(content)/register/page.tsx` - Removed duplicate DB query
2. ✅ `app/(content)/login/page.tsx` - Removed duplicate DB query  
3. ✅ `app/(content)/profile/page.tsx` - Simplified error handling
4. ✅ `components/wrappers/client-layout.tsx` - Added UserProvider
5. ✅ `components/wrappers/nav-wrapper.tsx` - Fixed useEffect loading issue

### Files Created:
1. ✅ `components/providers/user-provider.tsx` - User context provider
2. ✅ `components/providers/loading-provider.tsx` - Loading state provider

## How It Works Now

```
Root Layout (fetches user ONCE)
    ↓
ClientLayout (provides user via context)
    ↓
BaseWrapper (shows loading overlay)
    ↓
Individual Pages (use session check only, no DB query)
```

## Result

✅ Only ONE database query for user info  
✅ Only ONE loading overlay renders  
✅ Faster page navigation  
✅ Cleaner, more maintainable code  
✅ No duplicate loading states
