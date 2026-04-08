'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Container,
  Anchor,
  Alert,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IUser } from '@/types/user/user';
import { href } from '@/lib/url-helper';
import { createUser, type RegisterState } from './actions';

const initialState: RegisterState = {
  error: '',
  success: false,
};

export default function RegisterPage({ userInfo }: { userInfo: IUser | null }) {
  void userInfo;

  const [state, formAction] = useActionState(createUser, initialState);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    async function autoLogin() {
      if (!state.success || !emailValue || !passwordValue || isSigningIn) return;

      setIsSigningIn(true);

      await signIn('credentials', {
        email: emailValue,
        password: passwordValue,
        callbackUrl: href('/profile'),
      });
    }

    autoLogin();
  }, [state.success, emailValue, passwordValue, isSigningIn]);

  return (
    //UI Changes; wrap in Mantine container, Style register card
      <Container size="sm" py={60}>
      <Paper radius="md" p="xl" withBorder shadow="md" maw={500} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="md">
        Create an Account
      </Title>

      <form action={formAction}>
        <Stack gap="md">
          {state.error && (
            <Alert color="red" title="Error">
              {state.error}
            </Alert>
          )}

          <TextInput
            radius="md"
            size="md"
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />

          <TextInput
            radius="md"
            size="md"
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />

          <TextInput
            radius="md"
            size="md"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={emailValue}
            onChange={(event) => setEmailValue(event.currentTarget.value)}
          />

          <PasswordInput
            radius="md"
            size="md"
            label="Password"
            name="password"
            placeholder="Create a password"
            required
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.currentTarget.value)}
          />

          <TextInput
            radius="md"
            size="md"
            label="CU ID"
            name="cuID"
            placeholder="Enter your CU ID"
            required
          />

          <Button type="submit" loading={isSigningIn}>
            Register
          </Button>

          <Button component={Link} href={href('/')} variant="subtle">
            Cancel
          </Button>

          <Text size="sm" ta="center">
            Already have an account?{' '}
            <Anchor component={Link} href={href('/login')}>
              Log in
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
    </Container>
  );
}