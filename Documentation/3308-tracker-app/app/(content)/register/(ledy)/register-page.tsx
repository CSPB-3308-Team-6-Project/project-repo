'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
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
    <Paper radius="md" p="xl" withBorder maw={400} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="md">
        Create an Account
      </Title>

      <form action={formAction}>
        <Stack>
          {state.error && (
            <Alert color="red" title="Error">
              {state.error}
            </Alert>
          )}

          <TextInput
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />

          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={emailValue}
            onChange={(event) => setEmailValue(event.currentTarget.value)}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a password"
            required
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.currentTarget.value)}
          />

          <TextInput
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
  );
}