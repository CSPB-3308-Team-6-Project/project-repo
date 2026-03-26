//Ledy's root

'use client'
import { Card, Container, Stack, Text, Title } from '@mantine/core';
import ProfileActions from './ProfileActions';
import { IUser } from '@/types/user/user';

export default function ProfilePage({ userInfo }: { userInfo: IUser | null }) {
  console.log(`Just putting this here to clear the warning: `, userInfo)
    const user: IUser = {
        id: 1,
        name: 'Ledy User',
        email: 'ledy@example.com',
        cuID: '123456789',
        trackerIDs: [],
        createdAt: new Date('2026-01-01'),
        password: 'fake'
      };
    
      return (
        <Container size="sm" py="xl">
          <Stack gap="lg">
            <Title order={1}>Profile</Title>
    
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="xs">
                <Text><strong>Name:</strong> {user.name}</Text>
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
    
            <ProfileActions user={{
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1] || '',
              email: user.email,
              cuID: user.cuID,
      }}
    />
          </Stack>
        </Container>
      );
}