//Ledy's root

'use client';

import { Card, Container, Stack, Text, Title } from '@mantine/core';
import ProfileActions from './ProfileActions';
import { IUser } from '@/types/user/user';

export default function ProfilePage({ userInfo }: { userInfo: IUser | null }) {
  if (!userInfo) {
    return (
      <Container size="sm" py="xl">
        <Stack gap="lg">
          <Title order={1}>Profile</Title>
          <Text>No user found yet. Please register first.</Text>
        </Stack>
      </Container>
    );
  }

  const nameParts = userInfo.name.split(' ');

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>Profile</Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="xs">
            <Text><strong>Name:</strong> {userInfo.name}</Text>
            <Text><strong>Email:</strong> {userInfo.email}</Text>
            <Text><strong>CU ID:</strong> {userInfo.cuID}</Text>
            <Text>
              <strong>Member Since:</strong>{' '}
              {new Date(userInfo.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Card>

        <ProfileActions
          user={{
            id: userInfo.id,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: userInfo.email,
            cuID: userInfo.cuID,
          }}
        />
      </Stack>
    </Container>
  );
}