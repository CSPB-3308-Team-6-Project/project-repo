//Ledy's root

'use client';

import { Card, Container, Stack, Text, Title } from '@mantine/core';
import ProfileActions from './ProfileActions';
import { IUser } from '@/types/user/user';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';
import { colors } from '@/lib/color-scheme';

export default function ProfilePage({ userInfo, trackers, trackerPosts }: { userInfo: IUser, trackers: ITracker[] | null, trackerPosts: ITrackerPost[] | null }) {

  return (
    <Container size="md" py={50}>
      <Stack gap="xl">
        <Title order={1} ta="center" c={colors.textPrimary}>
          Profile
        </Title>
        <Card shadow="md" padding="xl" radius="lg" withBorder bg={colors.card}>
          <Stack gap="md">
            <Text size="md" c={colors.textPrimary}><strong>Name:</strong> {userInfo.name}</Text>
            <Text size="md" c={colors.textPrimary}><strong>Email:</strong> {userInfo.email}</Text>
            <Text size="md" c={colors.textPrimary}><strong>CU ID:</strong> {userInfo.cuID}</Text>
            <Text size="md" c={colors.textPrimary}>
              <strong>Member Since:</strong>{' '}
              {new Date(userInfo.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Card>
        <ProfileActions user={userInfo} trackers={trackers} trackerPosts={trackerPosts} />
      </Stack>
    </Container>
  );
}