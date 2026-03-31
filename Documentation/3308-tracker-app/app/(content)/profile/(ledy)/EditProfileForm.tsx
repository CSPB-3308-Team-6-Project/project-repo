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

      <Stack>
        <TextInput
          label="First Name"
          name="firstName"
          defaultValue={user.firstName}
          required
        />

        <TextInput
          label="Last Name"
          name="lastName"
          defaultValue={user.lastName}
          required
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          defaultValue={user.email}
          required
        />

        <TextInput
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