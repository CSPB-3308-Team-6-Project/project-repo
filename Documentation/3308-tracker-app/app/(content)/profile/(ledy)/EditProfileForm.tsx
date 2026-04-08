import { Stack, TextInput } from '@mantine/core';
import { updateUser } from './actions';
import SubmitButton from './SubmitButton';

type EditProfileFormProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cuID: string;
  };
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  return (
    <form action={updateUser}>
      <input type="hidden" name="userId" value={user.id} />

      <Stack gap="md">
        <TextInput
          radius="md"
          size="md"
          label="First Name"
          name="firstName"
          defaultValue={user.firstName}
          required
        />

        <TextInput
          radius="md"
          size="md"
          label="Last Name"
          name="lastName"
          defaultValue={user.lastName}
          required
        />

        <TextInput
          radius="md"
          size="md"
          label="Email"
          name="email"
          type="email"
          defaultValue={user.email}
          required
        />

        <TextInput
          radius="md"
          size="md"
          label="CU ID"
          name="cuID"
          defaultValue={user.cuID}
          required
        />

        <SubmitButton
          label="Save Changes"
          loadingLabel="Saving..."
        />
      </Stack>
    </form>
  );
}