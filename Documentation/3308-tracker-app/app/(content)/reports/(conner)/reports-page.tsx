
'use client'

import { Title, Text, Card, Grid, Select, Container } from '@mantine/core'

import { LineChart } from '@mantine/charts'

import { useState } from 'react'

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

  // old chart data
  // const chartData = mockData.trackerPosts.map((entry) => ({
  //   date: entry.recordedAt.toISOString().split('T')[0], // "YYYY-MM-DD"
  //   rating: entry.rating
  // }))

  const emotions = ["Angry", "Excited", "Lonely", "Restful"]

  const chartDataMap: Record<string, any> = {}

  // build grouped data by date
  trackerPosts.forEach((entry) => {
    const date = entry.recordedAt.toISOString().split('T')[0]

    if (!chartDataMap[date]) {
      chartDataMap[date] = { date }

      // initialize all emotions to null
      emotions.forEach((emotion) => {
        chartDataMap[date][emotion] = null
      })
    }

  chartDataMap[date][entry.emotion] = entry.rating
  })

  const chartData = Object.values(chartDataMap)

  // hardcoded data to see line graph
  // const chartData = [
  //   { date: "2026-04-01", Angry: 3, Excited: 7, Lonely: 4, Restful: 6 },
  //   { date: "2026-04-02", Angry: 5, Excited: 6, Lonely: 2, Restful: 8 },
  //   { date: "2026-04-03", Angry: 2, Excited: 9, Lonely: 3 },
  //   { date: "2026-04-04", Angry: 6, Excited: 5, Lonely: 5, Restful: 4 },
  // ]

  /*
    STAT CALCULATIONS
  */

  
  // Count how many times user felt specified emotion and 
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>("Excited")
  
  const emotionOptions = [
    { value: "Angry", label: "Angry" },
    { value: "Excited", label: "Excited" },
    { value: "Lonely", label: "Lonely" },
    { value: "Restful", label: "Restful" },
  ]

  const selectedCount = trackerPosts.filter(e => e.emotion === selectedEmotion).length || 0

  const emotionCounts: Record<string, number> = {}

  trackerPosts.forEach(e => {
    emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1
  })

  // Average logged emotion intensities
  const [selectedAvgEmotion, setSelectedAvgEmotion] = useState<string>("Angry")
  
  const filteredForAvg = trackerPosts.filter((e) => e.emotion === selectedAvgEmotion)
    
  const avgRating =
  filteredForAvg.length > 0
    ? filteredForAvg.reduce((sum, e) => sum + e.rating, 0) / filteredForAvg.length
    : 0

  const mostFrequentEmotion = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  return (

    <Container size="lg">

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
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" withBorder>

            <Title order={4}>Average Mood Intensity</Title>

            <Select
              mt="sm"
              data={emotionOptions}
              value={selectedAvgEmotion}
              onChange={(value) => setSelectedAvgEmotion(value || "Angry")}
            />

            <Text size="xl" mt="sm">
              {avgRating.toFixed(1)} / 10
            </Text>

          </Card>
        </Grid.Col>

        {/* Most Frequent Emotion */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" withBorder>

          <Title order={4}>Most Frequent Emotion</Title>
          <Text size="xl">{mostFrequentEmotion}</Text>

          </Card>
        </Grid.Col>
      
      


        {/* Selected Emotion Count */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" withBorder>

            <Title order={4}>Times Felt</Title>

            {/* DROPDOWN */}
            <Select
              mt="sm"
              data={emotionOptions}
              value={selectedEmotion}
              onChange={setSelectedEmotion}
              placeholder="Select emotion"
            />

            {/* RESULT */}
            <Text size="xl" mt="sm">
              {selectedCount}
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

          withLegend
          legendProps={{ verticalAlign: 'top' }}

          /*
            series defines what lines to draw
          */
            series={[
              { name: "Angry", label: "😡 Angry", color: "red" },
              { name: "Excited", label: "😄 Excited", color: "yellow" },
              { name: "Lonely", label: "😔 Lonely", color: "blue" },
              { name: "Restful", label: "😌 Restful", color: "green" },
            ]}

        />

      </Card>

    </Container>

  )
}