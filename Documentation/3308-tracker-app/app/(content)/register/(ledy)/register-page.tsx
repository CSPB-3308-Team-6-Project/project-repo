'use client';

import Link from 'next/link';
import {
  Container,
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { href } from '@/lib/url-helper';
import { createUser, RegisterState } from './actions';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useLoading } from '@/components/providers/loading-provider';
import { colors } from '@/lib/color-scheme';

export type RegisterFormValues = {
  name: string;
  email: string;
  cuID: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormType = UseFormReturnType<RegisterFormValues, (values: RegisterFormValues) => RegisterFormValues>


export default function RegisterPage() {

  const router = useRouter();
  const profileUrl = href('/profile');
  const loginUrl = href('/login');
  const { setLoading } = useLoading();

  const registerForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      cuID: '',
      password: '',
      confirmPassword: ''
    },
    validate: {
      name: (value: string) => (
        !value ? 'Name is required' : null
      ),
      email: (value: string) => (
        !value ? 'Email is required'
          : !/^\S+@\S+$/.test(value) ? 'Invalid email'
            : value.length < 5 ? 'Invalid email'
              : null
      ),
      password: (value: string) => (
        !value ? 'Password is required'
          : value.length < 5 ? 'Password length must be greater than 5 characters' : null
      ),
      confirmPassword: (value: string, values: { name: string, email: string, cuID: string, password: string, confirmPassword: string }) => (
        !value ? 'Must confirm your password'
          : value !== values.password ? 'Confirm Password and Password must match'
            : value.length < 5 ? 'Password length must be greater than 5 characters'
              : null
      )
    }
  })

  const attemptRegister = async (registerForm: RegisterFormType) => {

    registerForm.clearErrors();
    setLoading(true);

    if (!registerForm) {
      console.log('No form data');
      setLoading(false);
      return;
    }

    const validation = registerForm.validate();

    if (validation.hasErrors) {
      registerForm.setErrors(validation.errors);
      setLoading(false);
      return;
    }
    try {

      const values = registerForm.getValues();

      const result = await createUser(values) as RegisterState;

      if (!result) {
        console.log('No result from registration attempt');
        setLoading(false);
        return;
      }

      if (result.error === 'duplicate user') {
        console.log('Invalid input');
        router.push(loginUrl);
      }

      if (!result.success) {
        console.log('Registration attempt failed:', result.error);
        toast.error(result.message || 'Registration attempt failed, Please try again');
        setLoading(false);
        return;
      }

      toast.success('Registration successful! Logging you in now...');
      await signIn('credentials', {
        email: registerForm.values.email,
        password: registerForm.values.password,
        redirect: false,
      });

      router.push(profileUrl);

    } catch (e: any) {
      console.log('Error with registration attempt: ', e);
      setLoading(false);
      return;
    }


  };

  return (
    //UI Changes; wrap in Mantine container, Style register card
    <Container size="sm" py={60}>
      <Paper radius="md" p="xl" withBorder shadow="md" maw={500} mx="auto" mt="xl" bg={colors.card}>
        <Title order={2} ta="center" mb="md" c={colors.textPrimary}>
          Create an Account
        </Title>

        <form action={() => attemptRegister(registerForm)}>

          <TextInput
            radius="md"
            size="md"
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
            mt={'md'}
            withAsterisk
            error={registerForm.errors.name}
            key={registerForm.key('name')}
            {...registerForm.getInputProps('name')}
            styles={{
              input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
              label: { color: colors.label }
            }}
          />

          <TextInput
            radius="md"
            size="md"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            mt={'md'}
            withAsterisk
            error={registerForm.errors.email}
            key={registerForm.key('email')}
            {...registerForm.getInputProps('email')}
            styles={{
              input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
              label: { color: colors.label }
            }}
          />

          <TextInput
            radius="md"
            size="md"
            label="CU ID"
            name="cuID"
            placeholder="Enter your CU ID"
            mt={'md'}
            error={registerForm.errors.cuID}
            key={registerForm.key('cuID')}
            {...registerForm.getInputProps('cuID')}
            styles={{
              input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
              label: { color: colors.label }
            }}
          />

          <PasswordInput
            radius="md"
            size="md"
            label="Password"
            name="password"
            placeholder="Create a password"
            required
            mt={'md'}
            withAsterisk
            error={registerForm.errors.password}
            key={registerForm.key('password')}
            {...registerForm.getInputProps('password')}
            styles={{
              input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
              label: { color: colors.label }
            }}
          />

          <PasswordInput
            radius="md"
            size="md"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            mt={'md'}
            withAsterisk
            error={registerForm.errors.confirmPassword}
            key={registerForm.key('confirmPassword')}
            {...registerForm.getInputProps('confirmPassword')}
            styles={{
              input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
              label: { color: colors.label }
            }}
          />

          <div className='flex justify-evenly my-6 space-x-4 w-full'>
            <Button type="submit" color={colors.buttonRegister}>
              Register
            </Button>
            <Button type='button' component={Link} href={href('/')} bg={colors.buttonCancel} color={colors.buttonCancel}>
              Cancel
            </Button>
          </div>

          <Text size="sm" ta="center" c={colors.textSecondary}>
            Already have an account?{' '}
            <Anchor component={Link} href={href('/login')} c={colors.textAccent}>
              Log in
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}