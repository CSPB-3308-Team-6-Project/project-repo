'use client';

import { useState } from 'react';
import { Alert, PasswordInput, Stack } from '@mantine/core';
import { changePassword } from './actions';
import SubmitButton from './SubmitButton';

type ChangePasswordFormProps = {
  userId: number;
  onSuccess: () => void;
};

export default function ChangePasswordForm({
  userId,
  onSuccess,
}: ChangePasswordFormProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');
    setIsPending(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await changePassword(formData);

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setSuccess(result.success);
      setIsPending(false);

      setTimeout(() => {
        onSuccess();
      }, 800);
    } catch {
      setError('Something went wrong while updating the password.');
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="userId" value={userId} />

      <Stack>
        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" title="Success">
            {success}
          </Alert>
        )}

        <PasswordInput
          label="Old Password"
          name="oldPassword"
          required
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          required
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          required
        />

        <SubmitButton
          label={isPending ? 'Updating...' : 'Update Password'}
          loadingLabel="Updating..."
        />
      </Stack>
    </form>
  );
}