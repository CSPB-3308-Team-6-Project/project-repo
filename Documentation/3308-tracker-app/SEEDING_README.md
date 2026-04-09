# Database Seeding Instructions

## What Was Created

1. **Seed Data File** (`/lib/seed-data.ts`)
   - Contains 60 pre-generated tracker posts
   - Emotions: Angry, Excited, Lonely, Restful
   - Ratings: Random values between 1-10
   - Dates: Spread across the last 5 months (Nov 2025 - Apr 2026)

2. **Seed Button Component** (`/app/(content)/profile/(ledy)/SeedDataButton.tsx`)
   - Client component with a button to trigger seeding
   - Shows progress percentage while seeding
   - Uses toast notifications for feedback
   - Adds a 100ms delay between entries to avoid overwhelming the database

## How to Use

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Log in to your application** at http://localhost:3000

3. **Navigate to your Profile page**

4. **Click the "Seed Database (60 entries)" button**
   - The button will show progress as it seeds: "Seeding... X%"
   - It will create 60 tracker post entries
   - You'll see a success toast when complete

5. **Go to the Tracking or Reports page** to see your seeded data!

## Notes

- The button uses your current logged-in user's email
- All entries will be added to the "Mood Tracker" (created automatically if it doesn't exist)
- You can click the button multiple times to add more data (it will create duplicates)
- The seeding process takes about 6-7 seconds (100ms delay × 60 entries)

## To Remove the Button (for production)

Once you're done testing, you can remove the seed button by:
1. Removing the `<SeedDataButton>` line from `/app/(content)/profile/(ledy)/ProfileActions.tsx`
2. Removing the import for `SeedDataButton` from the same file
3. (Optional) Delete `/app/(content)/profile/(ledy)/SeedDataButton.tsx` and `/lib/seed-data.ts`
