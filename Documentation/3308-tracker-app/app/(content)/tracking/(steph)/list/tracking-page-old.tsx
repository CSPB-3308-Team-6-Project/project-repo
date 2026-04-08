// 'use client'

// import Link from "next/link"
// import { href } from "@/lib/url-helper"

// import { Title, Text, Card, Button, Stack } from "@mantine/core"
// import { ITracker } from "@/types/tracker/tracker"
// import { ITrackerPost } from "@/types/tracker/tracker-post"
// import { IUser } from "@/types/user/user"
// import { LogMoodModal } from "../create/components/createButton"

// export default function TrackingPage({ userInfo, trackerInfo, trackerPosts }: { userInfo: IUser | null, trackerInfo: ITracker[] | null, trackerPosts: ITrackerPost[] }) {
//   console.log('trackerInfo:', trackerInfo);
//   return (

//     <>

//       <Title order={1} mb="md">
//         Mood Tracking
//       </Title>

//       <Text c="dimmed" mb="xl">
//         Log your emotions and review your history to better understand your mental health trends.
//       </Text>

//       {/* ACTION CARDS */}
//       <Stack gap="lg">

//         {/* LOG MOOD */}
//         <Card shadow="sm" padding="lg" withBorder>

//           <Title order={3}>Log a Mood</Title>

//           <Text mt="sm" mb="md">
//             Record how you're feeling right now with a rating and emotion.
//           </Text>

//           <LogMoodModal />

//         </Card>

//         {/* VIEW LOGS */}
//         <Card shadow="sm" padding="lg" withBorder>

//           <Title order={3}>View Mood Logs</Title>

//           <Text mt="sm" mb="md">
//             See your past entries and track changes over time.
//           </Text>

//           <Button
//             component={Link}
//             href={href('/tracking/list')}
//             variant="outline"
//           >
//             View Logs
//           </Button>

//         </Card>

//       </Stack>

//     </>

//   )
// }