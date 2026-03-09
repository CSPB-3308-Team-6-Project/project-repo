'use client'

import Link from 'next/link';
import { href } from '../../../../lib/url-helper';

// Mantine components for layout and UI elements
import { Container, Title, Text, Button, Group, Grid, Card } from '@mantine/core'

export default function HomePage() {

  return (

    <Container size="lg" py="xl">

      {/* ---------------- App Intro ---------------- */}

      <div className="text-center mb-16"> 

        <Title order={1} mb="md">
          Health & Emotion Tracker
        </Title>

        <Text size="lg" c="dimmed" maw={600} mx="auto">

          Track your emotional well-being and build better self-awareness.
          Our application allows users to log daily emotions, measure
          intensity levels, and review reports that highlight patterns
          in mood and mental health over time.

        </Text>

        <Group justify="center" mt="xl">

          <Button
            size="lg"
            component={Link}
            href={href('/mood/create')}
          >
            Log Your Mood
          </Button>

          <Button
            size="lg"
            variant="light"
            component={Link}
            href={href('/reports')}
          >
            View Reports
          </Button>

        </Group>

      </div>



      {/* ---------------- FEATURE CARDS ---------------- */}

      <Grid>

        {/* -------- Card 1 -------- */}

        <Grid.Col span={{ base: 12, md: 4 }}>

          <Card shadow="md" padding="lg" radius="md" withBorder>

            <Title order={4}>
              Track Daily Emotions
            </Title>

            <Text c="dimmed" mt="sm">

              Log your emotional state each day using a simple
              intensity scale. Over time this creates a record
              of how your mood changes and evolves.

            </Text>

          </Card>

        </Grid.Col>



        {/* -------- Card 2 -------- */}

        <Grid.Col span={{ base: 12, md: 4 }}>

          <Card shadow="md" padding="lg" radius="md" withBorder>

            <Title order={4}>
              Visual Reports
            </Title>

            <Text c="dimmed" mt="sm">

              Review your emotional history through charts and
              summaries that highlight trends across weeks
              and months.

            </Text>

          </Card>

        </Grid.Col>



        {/* -------- Card 3 -------- */}

        <Grid.Col span={{ base: 12, md: 4 }}>

          <Card shadow="md" padding="lg" radius="md" withBorder>

            <Title order={4}>
              Build Self Awareness
            </Title>

            <Text c="dimmed" mt="sm">

              By tracking emotional patterns, users can gain
              insight into triggers, habits, and lifestyle
              factors that influence mental well-being.

            </Text>

          </Card>

        </Grid.Col>

      </Grid>



      {/* ---------------- MOTIVATION SECTION ---------------- */}

      <Card mt="xl" padding="xl" radius="md" withBorder>

        <Title order={3} mb="sm">
          Why Track Your Emotional Health?
        </Title>

        <Text c="dimmed">

          Many people understand the importance of maintaining
          good health, but consistently tracking emotional
          well-being can be difficult. Our Health Tracker
          simplifies this process by allowing users to quickly
          record daily emotions and review trends over time.

          By combining simple input with visual reports,
          the application encourages reflection and helps
          users build healthier habits while gaining a
          deeper understanding of their emotional patterns.

        </Text>

      </Card>

    </Container>
  )
}