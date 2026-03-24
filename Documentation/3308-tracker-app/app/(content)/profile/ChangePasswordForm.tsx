import { PasswordInput, Stack } from '@mantine/core';
import { changePassword } from './actions';
import SubmitButton from './SubmitButton';

export default function ChangePasswordForm() {
  return (
    <form action={changePassword}>
      <Stack>
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
          label="Update Password"
          loadingLabel="Updating..."
        />
      </Stack>
    </form>
  );
}