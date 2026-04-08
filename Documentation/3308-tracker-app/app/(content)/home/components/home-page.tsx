//Conners

'use client'

import Link from 'next/link';
import { href } from '../../../../lib/url-helper';

// Mantine components for layout and UI elements
import { Container, Title, Text, Button, Group, Grid, Card, ScrollArea } from '@mantine/core'
import { useWindowSizes } from '@/context/window-sizes';
import { IUser } from '@/types/user/user';
import { LogMoodModal } from '../../tracking/(steph)/create/components/createButton';
import { colors } from '@/lib/color-scheme';

export default function HomePage({ userInfo }: { userInfo: IUser | null }) {

  const { width, height } = useWindowSizes();
  const buttonWidth = width && width > 768 ? '20%' : '60%';
  const buttonDivClass = width && width > 768 ? 'flex flex-row items-center justify-center w-full space-x-8' : 'flex flex-col items-center justify-center w-full space-y-4';
  const cardHeight = width && width > 768 ? '180px' : 'auto';
  const scrollAreaSize = height - 80;

  return (
    <ScrollArea h={scrollAreaSize}>
      <Container size="lg" py="xl" w={'100%'} h={'screen'} style={{ overflowY: 'hidden' }}>

        {/* ---------------- App Intro ---------------- */}


        <div className="text-center mb-16 w-full">

          <Title order={1} mb="md" c={colors.textPrimary}>
            Health & Emotion Tracker
          </Title>

          <Text size="lg" c={colors.textSecondary} maw={600} mx="auto">

            Track your emotional well-being and build better self-awareness.
            Our application allows users to log daily emotions, measure
            intensity levels, and review reports that highlight patterns
            in mood and mental health over time.

          </Text>

          <Group justify="center" mt="xl" w={'100%'}>

            {userInfo ? (
              <div className={buttonDivClass}>
                {/* USER IS LOGGED IN */}
                <LogMoodModal trackers={null} userInfo={userInfo} buttonWidth={buttonWidth} size='lg' />

                <Button
                  size="lg"
                  variant="light"
                  component={Link}
                  href={href('/reports')}
                  w={buttonWidth}
                  color={colors.buttonSubmit}
                >
                  View Reports
                </Button>
              </div>
            ) : (
              <div className={buttonDivClass}>
                {/* USER IS NOT LOGGED IN */}
                <Button
                  size="lg"
                  variant="light"
                  component={Link}
                  href={href('/login')}
                  w={buttonWidth}
                  styles={{
                    root: {
                      backgroundColor: colors.buttonLogin,
                      color: colors.textPrimary,
                    },
                  }}
                >
                  Log In
                </Button>

                <Button
                  size="lg"
                  component={Link}
                  href={href('/register')}
                  w={buttonWidth}
                  color={colors.buttonRegister}
                >
                  Register
                </Button>

              </div>
            )}

          </Group>

        </div>



        {/* ---------------- FEATURE CARDS ---------------- */}

        <Grid h={'auto'} w={'100%'} mb="xl">

          {/* -------- Card 1 -------- */}

          <Grid.Col span={{ base: 12, md: 4 }} h={'auto'}>

            <Card shadow="md" padding="lg" radius="md" withBorder w={'100%'} h={cardHeight} bg={colors.card}>

              <Title order={4} c={colors.textPrimary}>
                Track Daily Emotions
              </Title>

              <Text c={colors.textSecondary} mt="sm">

                Log your emotional state each day using a simple
                intensity scale. Over time this creates a record
                of how your mood changes and evolves.

              </Text>

            </Card>

          </Grid.Col>



          {/* -------- Card 2 -------- */}

          <Grid.Col span={{ base: 12, md: 4 }}>

            <Card shadow="md" padding="lg" radius="md" withBorder w={'100%'} h={cardHeight} bg={colors.card}>

              <Title order={4} c={colors.textPrimary}>
                Visual Reports
              </Title>

              <Text c={colors.textSecondary} mt="sm">

                Review your emotional history through charts and
                summaries that highlight trends across weeks
                and months.

              </Text>

            </Card>

          </Grid.Col>



          {/* -------- Card 3 -------- */}

          <Grid.Col span={{ base: 12, md: 4 }}>

            <Card shadow="md" padding="lg" radius="md" withBorder w={'100%'} h={cardHeight} bg={colors.card}>

              <Title order={4} c={colors.textPrimary}>
                Build Self Awareness
              </Title>

              <Text c={colors.textSecondary} mt="sm">

                By tracking emotional patterns, users can gain
                insight into triggers, habits, and lifestyle
                factors that influence mental well-being.

              </Text>

            </Card>

          </Grid.Col>

        </Grid>



        {/* ---------------- MOTIVATION SECTION ---------------- */}

        <Card mt="xl" padding="xl" radius="md" withBorder bg={colors.card}>

          <Title order={3} mb="sm" c={colors.textPrimary}>
            Why Track Your Emotional Health?
          </Title>

          <Text c={colors.textSecondary}>

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
    </ScrollArea>


  )
}