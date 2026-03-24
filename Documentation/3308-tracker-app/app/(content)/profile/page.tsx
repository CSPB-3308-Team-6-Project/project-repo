import { Card, Container, Stack, Text, Title } from '@mantine/core';
import ProfileActions from './ProfileActions';

export default async function ProfilePage() {
  const user = {
    id: 1,
    firstName: 'Ledy',
    lastName: 'User',
    email: 'ledy@example.com',
    cuID: '123456789',
    createdAt: new Date('2026-01-01'), /*Mock data for now*/
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>Profile</Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="xs">
            <Text>
              <strong>First Name:</strong> {user.firstName}
            </Text>
            <Text>
              <strong>Last Name:</strong> {user.lastName}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            <Text>
              <strong>CU ID:</strong> {user.cuID}
            </Text>
            <Text>
              <strong>Member Since:</strong>{' '}
              {user.createdAt.toLocaleDateString()}
            </Text>
          </Stack>
        </Card>

        <ProfileActions user={user} />
      </Stack>
    </Container>
  );
}

