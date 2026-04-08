//Ledy's root

'use client';

import { Card, Container, Stack, Text, Title } from '@mantine/core';
import ProfileActions from './ProfileActions';
import { IUser } from '@/types/user/user';

export default function ProfilePage({ userInfo }: { userInfo: IUser | null }) {
  if (!userInfo) {
    return (
      //changes to make the page less cramped and centered
      <Container size="md" py={50}>
        <Stack gap="xl">
          <Title order={1} ta="center">
            Profile
          </Title>
          <Text ta="center" c="dimmed">
            No user found yet. Please register first.
          </Text>
        </Stack>
      </Container>
    );
  }

  const nameParts = userInfo.name.split(' ');

  return (
    <Container size="md" py={50}>
      <Stack gap="xl">
        <Title order={1} ta="center">
          Profile
        </Title>

        <Card shadow="md" padding="xl" radius="lg" withBorder>
          <Stack gap="md">
            <Text size="md"><strong>Name:</strong> {userInfo.name}</Text>
            <Text size="md"><strong>Email:</strong> {userInfo.email}</Text>
            <Text size="md"><strong>CU ID:</strong> {userInfo.cuID}</Text>
            <Text size="md">
              <strong>Member Since:</strong>{' '}
              {new Date(userInfo.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Card>

        *<ProfileActions
          user={{
            id: userInfo.id,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: userInfo.email,
            cuID: userInfo.cuID,
          }}
        />
        <Text>Profile actions temporarily removed for testing.</Text>
      </Stack>
    </Container>
  );
}