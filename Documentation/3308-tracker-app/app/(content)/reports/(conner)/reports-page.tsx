
'use client'

import { Title, Text, Card, Grid } from '@mantine/core'

import { LineChart } from '@mantine/charts'

import { ITracker } from '@/types/tracker/tracker'
import { IUser } from '@/types/user/user'
import { ITrackerPost } from '@/types/tracker/tracker-post'

//Carl 3/27, adding this to work with your current set up and mix both trackerInfo and trackerPosts
export interface MixedTracker {
  id: string
  title: string
  trackerPosts: ITrackerPost[]
}

export default function ReportsPage({userInfo, trackerInfo, trackerPosts}: {userInfo: IUser | null, trackerInfo: ITracker[] | null, trackerPosts: ITrackerPost[]}) {
  console.log(`Just putting this here to clear the warning: `, userInfo, trackerInfo, trackerPosts)


  // Carl 3/27, reworking this to work with the real data
  const mockData = {
    id: "tracker-1",
    title: "My Mood Tracker",
    trackerPosts: trackerPosts
  } as MixedTracker

  //Old mock saved for you convience:
  // const mockData: ITracker = {
  //   id: "tracker-1",
  //   title: "My Mood Tracker",
  //   trackerPosts: [
  //     { id: "post-1", rating: 3, emotion: "Angry", recordedAt: new Date("2026-03-01") },
  //     { id: "post-2", rating: 8, emotion: "Excited", recordedAt: new Date("2026-03-02") },
  //     { id: "post-3", rating: 4, emotion: "Lonely", recordedAt: new Date("2026-03-03") },
  //     { id: "post-4", rating: 7, emotion: "Restful", recordedAt: new Date("2026-03-04") },
  //   ]
  // }

  /*
    Transform data into format Mantine expects for charts

    Mantine LineChart expects:
    [
      { date: "label", value: number }
    ]
  */
  const chartData = mockData.trackerPosts.map((entry) => ({
    date: entry.recordedAt.toISOString().split('T')[0], // "YYYY-MM-DD"
    rating: entry.rating
  }))

  /*
    STAT CALCULATIONS
  */

  // Average mood rating
  const avgRating =
    mockData.trackerPosts.reduce((sum, e) => sum + e.rating, 0) /
    mockData.trackerPosts.length

  // Count how many times user felt "Happy" (Excited as example)
  const happyCount =
    mockData.trackerPosts.filter(e => e.emotion === "Excited").length

  return (

    <div>

      {/* PAGE TITLE */}
      <Title order={1} mb="md">
        Reports
      </Title>

      <Text c="dimmed" mb="xl">
        View trends and statistics based on your mood tracking data.
      </Text>


      {/* ---------------- STATS SECTION ---------------- */}

      <Grid mb="xl">

        {/* Average Rating */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" withBorder>

            <Title order={4}>Average Mood</Title>

            <Text size="xl" mt="sm">
              {avgRating.toFixed(1)} / 10
            </Text>

          </Card>
        </Grid.Col>


        {/* Happy Count */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" withBorder>

            <Title order={4}>Times Felt Excited</Title>

            <Text size="xl" mt="sm">
              {happyCount}
            </Text>

          </Card>
        </Grid.Col>

      </Grid>


      {/* ---------------- GRAPH SECTION ---------------- */}

      <Card shadow="sm" padding="lg" withBorder>

        <Title order={3} mb="md">
          Mood Trend Over Time
        </Title>

        <LineChart
          h={300}
          data={chartData}

          /*
            dataKey = what goes on X axis
          */
          dataKey="date"

          /*
            series defines what lines to draw
          */
          series={[
            { name: "rating", label: "Mood Rating" }
          ]}

        />

      </Card>

    </div>

  )
}