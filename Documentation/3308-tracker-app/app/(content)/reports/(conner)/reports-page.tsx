
'use client'

import { Title, Text, Card, Grid, Select, ScrollArea, Group, Stack } from '@mantine/core'
import { LineChart } from '@mantine/charts'
import { useState } from 'react'
import { ITrackerPost } from '@/types/tracker/tracker-post'
import { LogMoodModal } from '../../tracking/(steph)/create/components/createButton'
import { ITracker } from '@/types/tracker/tracker'
import { IUser } from '@/types/user/user'
import { colors } from '@/lib/color-scheme'
import { useWindowSizes } from '@/context/window-sizes'

//Carl 3/27, adding this to work with your current set up and mix both trackerInfo and trackerPosts
export interface MixedTracker {
  id: string
  title: string
  trackerPosts: ITrackerPost[]
}

export default function ReportsPage({ trackerPosts, trackers, userInfo }: { trackerPosts: ITrackerPost[], trackers: ITracker[], userInfo: IUser | null }) {

  const { width } = useWindowSizes();

  // Carl 3/27, reworking this to work with the real data
  // const mockData = {
  //   id: "tracker-1",
  //   title: "My Mood Tracker",
  //   trackerPosts: trackerPosts
  // } as MixedTracker

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

  // Sort chart data by date for proper chronological display
  const chartData = Object.values(chartDataMap).sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

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
    { value: "All", label: "All" },
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
  const [selectedAvgEmotion, setSelectedAvgEmotion] = useState<string>("All")

  const filteredForAvg = selectedAvgEmotion === "All"
    ? trackerPosts
    : trackerPosts.filter((e) => e.emotion === selectedAvgEmotion)

  const avgRating =
    filteredForAvg.length > 0
      ? filteredForAvg.reduce((sum, e) => sum + e.rating, 0) / filteredForAvg.length
      : 0

  const mostFrequentEmotion = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  const cards = [
    (
      <Card shadow="sm" padding="lg" withBorder h={width > 900 ? '162px' : width > 638 ? '180' : 'auto'} bg={colors.card} w={'100%'}>

        <Title order={4} c={colors.textPrimary} size={width > 638 ? 'h4' : 'h5'}>Average Mood Intensity</Title>

        <Select
          mt="sm"
          data={emotionOptions}
          value={selectedAvgEmotion}
          onChange={(value) => setSelectedAvgEmotion(value || "All")}
          styles={{
            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
            label: { color: colors.label }
          }}
        />

        <Text size="xl" mt="sm" c={colors.textAccent}>
          {avgRating.toFixed(1)} / 10
        </Text>

      </Card>
    ),
    (
      <Card shadow="sm" padding="lg" withBorder h={width > 900 ? '162px' : width > 638 ? '180' : 'auto'} bg={colors.card} w={'100%'}>

        <Title order={4} c={colors.textPrimary} size={width > 638 ? 'h4' : 'h5'}>Most Frequent Emotion</Title>
        <Text size="xl" c={colors.textAccent}>{mostFrequentEmotion}</Text>

      </Card>
    ),
    (
      <Card shadow="sm" padding="lg" withBorder h={width > 900 ? '162px' : width > 638 ? '180' : 'auto'} bg={colors.card} w={'100%'}>

        <Title order={4} c={colors.textPrimary} size={width > 638 ? 'h4' : 'h5'}>Times Felt</Title>

        {/* DROPDOWN */}
        <Select
          mt="sm"
          data={emotionOptions.filter(e => e.value !== "All")} // remove "All" option for this stat
          value={selectedEmotion}
          onChange={setSelectedEmotion}
          placeholder="Select emotion"
          styles={{
            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
            label: { color: colors.label }
          }}
        />

        {/* RESULT */}
        <Text size="xl" mt="sm" c={colors.textAccent}>
          {selectedCount}
        </Text>

      </Card>
    )]





  return (

    <div className='gap-4 max-h-[90dvh] overflow-hidden flex flex-col justify-start items-center rounded-md p-1 w-full'>


      {/* PAGE TITLE */}
      <Group justify="space-between" mb="md" w={'100%'}>
        <div className='flex flex-row justify-between items-center px-4 w-full'>
          <div className='flex flex-col w-3/5'>
            <Title order={1} mb="md" c={colors.textPrimary}>
              Reports
            </Title>
            <Text c={colors.textSecondary} mb="xl">
              View trends and statistics based on your mood tracking data.
            </Text>
          </div>
          <LogMoodModal trackers={trackers} userInfo={userInfo} buttonWidth='' size='' />
        </div>
      </Group>

      {/* ---------------- STATS SECTION ---------------- */}

      <Stack w={'100%'} align="center" h={'80dvh'}>
        <ScrollArea h={'70dvh'} w={'100%'} type="auto" scrollbarSize={8} classNames={{ root: 'w-full', viewport: 'w-full' }}>
          <div
            className='gap-4 z-3 flex flex-col justify-start items-center rounded-md p-4 w-full min-h-[70dvh]'
            style={{
              backgroundColor: colors.sectionInner,
              boxShadow: `inset 0 4px 12px rgba(0, 0, 0, 0.6), inset 0 -4px 12px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${colors.divider}`,
              border: `1px solid ${colors.divider}`
            }}
          >

            <Grid mb="xl" w={'100%'} h={'fit-content'} mah={width > 900 ? '162px' : width > 638 ? '180px' : 'fit-content'}>

              {cards.map((card, index) => (
                width && width > 638
                  ? <Grid.Col key={index} span={4} w={'100%'}>{card}</Grid.Col>
                  : <Grid.Col key={index} span={12} w={'33%'}>{card}</Grid.Col>
              ))}

            </Grid>

            {/* ---------------- GRAPH SECTION ---------------- */}

            <Card shadow="sm" padding="lg" withBorder bg={colors.reportSection} w={'100%'}>

              <Title order={3} mb="md" c={colors.textPrimary}>
                Mood Trend Over Time
              </Title>

              <div className={`flex flex-col justify-start items-center w-full ${width > 638 ? 'h-[350px]' : 'h-[300px]'}`}>
                <LineChart
                  h={'100%'}
                  w={'95%'}
                  p={0}
                  m={0}
                  data={chartData}
                  styles={{
                    legendItemName: { color: colors.textPrimary },
                  }}
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
              </div>

            </Card>
          </div>
        </ScrollArea>
      </Stack>
    </div>
  )
}